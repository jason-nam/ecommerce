import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";


export function User() {

    const { id } = useParams()
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        axios.get("/api/users/profile", 
        { signal: controller.signal })
        .then((res) => {
            if (isMounted) {
                setUser(res.data[0]);
                setLoading(false);
            }
        })
        .catch(err => setError(true));
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }

    }, [id]);

    if (error) {
        return (
        <div className="user-page">
            Bad Request
        </div>
    )
    } else
        return !loading ?(
            <div className="user-page">
                <div>{user.firstname} {user.lastname}</div>
                <Link to="/cart">Cart</Link>
            </div>
        ) :
        (<p>loading</p>)
        ;
}

