import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Orders.css'

export function GuestOrder({userId}) {

    const [ order, setOrder ] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (userId > 0)
            navigate("/orders")
    })

    useEffect(() => {
        setOrder({
            cart: JSON.parse(localStorage.getItem("GUEST_ORDER_CART")), 
            total: localStorage.getItem("GUEST_ORDER_TOTAL"),
            created: localStorage.getItem("GUEST_ORDER_DATE"),
            id: localStorage.getItem("GUEST_ORDER_ID")
        })
    }, [setOrder])
    
    return (
        <div className="orders">
            <div className="head">
                <h1 id="title">Order Received</h1>
            </div>
                <>
                    {order!==null && order.created?
                    <div className="guest-order">
                        <div className="order-id">Order #: {order.id}</div>
                        <div className="order-date">Order Date: {order.created.slice(0, 10)}</div>
                        <div className="order-total">Order Total: ${order.total}</div>
                    </div>
                    : null
                    }
                    {order!==null && order.cart ? order.cart.map(x =>
                    <div className="order-item" key={x.id}>
                        <div className="order-item-left">
                            <img src={x.image.split(', ')[0]}></img>
                        </div>
                        <div className="oi-name">{x.name}</div>
                        <div className="oi-price">Price: ${x.price}</div>
                        <div className="oi-qty">Qty: {x.qty}</div>
                    </div>
                    )
                    : null
                    }
                </>
                
        </div>
    )
}