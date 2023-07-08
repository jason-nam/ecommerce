import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";


export function User() {

    const { id } = useParams()
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/users/"+id)
        .then((res) => {
            setUser(res.data[0]);
            setLoading(false);
        })
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

