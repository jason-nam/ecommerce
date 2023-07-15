import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../header/Header"


export function Home() {
    const [ userId, setUserId ] = useState(null);

    return <Header userId={userId} setUserId={setUserId}/>
}

