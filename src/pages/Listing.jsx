import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Spinner from "../componenets/Spinner"
import shareIcon from '../assets/svg/shareIcon.svg'

const Listing = () => {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                // console.log(docSnap.data())
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }

    return (
        <main>
            <div className="wrapSwiper">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}>
                    {listing.imgUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="swiperSlideDiv"
                                style={{
                                    width: '100%',
                                    height: '40vw',
                                    background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                    backgroundSize: 'cover'
                                }}
                            >
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 1500)
            }}>
                <img src={shareIcon} alt="share" />
            </div>

            {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

            <div className="listingDetails">
                <p className="listingName">
                    {listing.name} - $
                    {listing.offer ?
                        listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>

                <p className="listingLocation">{listing.location}</p>
                <p className="listingType">
                    For {listing.type === 'rent' ? 'Rent' : 'Sale'}
                </p>
                {listing.offer && (
                    <p className="discountPrice">
                        ${listing.regularPrice - listing.discountedPrice} Discount
                    </p>
                )}

                <ul className="listingDetailsList">
                    <li>
                        {listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms} {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>

                <p className="listingLocationTitle">Location</p>

                <div className="leafletContainer">
                    <MapContainer style={{ height: '100%', width: '100%' }}
                        center={[listing.geolocation.lat, listing.geolocation.lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link
                        to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className='primaryButton'>
                        Contact Landlord
                    </Link>
                )}
            </div>
        </main>
    )
}

export default Listing

// stackoverflow: how to fix error failed to compile node modules react leaflet core esm path