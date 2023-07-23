import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../header/Header"
import CartRight from "../subcomponents/CartRight"


export function Home({userId}) {

    return (<div>
        <Header userId={userId} />
        <CartRight userId={userId} />
    </div>)
}

