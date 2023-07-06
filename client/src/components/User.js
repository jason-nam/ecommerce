import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

export function User() {

    const { id } = useParams()

    const [user, setUser] = useState("");
    useEffect(() => {
        fetch("/users/"+id)
        .then((res) => res.json())
        .then((data) => setUser(data[0]));
    }, []);

  return (
    <div className="App">
      <div>{user.firstname} {user.lastname}</div>
    </div>
  );
}

