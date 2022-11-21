import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
    const isMounted = useRef(true)
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        if (isMounted) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }

        return () => {
            isMounted.current = false;
        }

    }, [isMounted])

    return { loggedIn, checkingStatus }
}

// stackoverflow: 1. protected route with firebase
//                2. cleanup memory leaks on an unmounted componenet in react hooks