import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

const ListingItem = ({ listing, id, onEdit, onDelete }) => {

    return (
        <li className="categoryListing">
            <Link to={`/category/${listing.type}/${id}`}
                className="categoryListingLink">
                <img src={listing.imgUrls[0]} alt={listing.name}
                    className="categoryListingImg" />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">{listing.location}</p>
                    <p className="categoryListingName">{listing.name}</p>
                    <p className="categoryListingPrice">
                        ${listing.offer ?
                            listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        {listing.type === 'rent' && ' / Month'}
                    </p>

                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt="bed" />
                        <p className="categoryListingText">
                            {listing.bedrooms} Bedroom{listing.bedrooms > 1 ? 's' : ''}
                        </p>
                        <img src={bathtubIcon} alt="bathtub" />
                        <p className="categoryListingText">
                            {listing.bathrooms} Bathroom{listing.bathrooms > 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </Link>

            {onDelete && (
                <DeleteIcon className="removeIcon"
                    fill='rgb(231, 76, 60)'
                    onClick={() => onDelete(listing.id, listing.name)} />
            )}

            {onEdit && (
                <EditIcon className="editIcon"
                    fill='rgb(79, 147, 0)'
                    onClick={() => onEdit(id)} />
            )}
        </li>
    )
}

export default ListingItem