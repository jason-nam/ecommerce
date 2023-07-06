import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

export function User() {

    const { id } = useParams()
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/users/"+id)
        .then((res) => {
            if (!res.ok)
                throw new Error(res.status)
            else
                return res.json()
            })
        .then((data) => {
            setUser(data[0]);
            setLoading(false);
        })
        .catch((err) => setError(true));        
    }, [id]);

    if (error) {
        return (
        <div className="App">
            User does not exist
        </div>
    )
    } else
        return !loading ?(
            <div className="App">
            <div>{user.firstname} {user.lastname}</div>
            </div>
        ) :
        (<p>loading</p>)
        ;
}

