import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../header/Header"
import Cart from "../subcomponents/CartRight"


export function Home() {
    const [ userId, setUserId ] = useState(null);

    return (<div>
        <Header userId={userId} setUserId={setUserId}/>
        {/* <Cart userId={userId} /> */}
    </div>)
}

