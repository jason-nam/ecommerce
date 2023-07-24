import React, { useState, useEffect } from "react";
import Header from "../header/Header"
import CartRight from "../subcomponents/CartRight"


export function Home({userId, cart, setCart}) {

    return (
    <>
        <Header userId={userId} />
        <CartRight { ...{userId, cart, setCart} }/>
    </>)
}

