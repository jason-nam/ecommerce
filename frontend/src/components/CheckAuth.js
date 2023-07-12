
import React, { useState, useEffect } from "react";
import axios from "axios";

const checkIfLoggedIn = function (setUserId, signal, isMounted){

    axios.get("/api/checkAuth", {signal: signal})
    .then((res) => {
        if (isMounted) {
            if (res.data.loggedIn) {
                setUserId(res.data.user.id)
            }
            else
                setUserId(-1)
        }
    })
    .catch(err => console.log(err.response, "Session Error")); 
    
  };
  
  export default checkIfLoggedIn;
