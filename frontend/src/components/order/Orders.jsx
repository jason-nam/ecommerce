import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Orders.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

export function Orders({userId}) {
    const [ orders, setOrders ] = useState([])
    const [ clickedNum, setClickedNum ] = useState(null)
    const [ selectedOrder, setSelectedOrder ] = useState([])

    useEffect(() => {
        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

            axios.get('/api/orders', { signal })
            .then(res => {
                if (isMounted) {
                    setOrders(res.data)
                }
            })
            .catch(err => console.log(err))

            return () => {
                isMounted = false;
                isMounted && controller.abort()
            }
        }
    }, [userId, setOrders])

    const showOrder = (id) => {
        if (id === clickedNum) {
            setClickedNum(null)
            setSelectedOrder([])
        } else {
            setClickedNum(id)
            if (userId > 0) {
                axios.get(`/api/orders/${id}`)
                .then(res => {
                    setSelectedOrder(res.data)
                })
                .catch(err => console.log(err))
            }
        }
    }
    
    return (
        <div className="orders">
            
            <div className="head">
                <h1 id="title">My Orders</h1>
            </div>

            {userId === -1 ?  
                <div className="logged-out-orders">
                    <Link to="/login"><button className="auth-redirect">Sign In</button></Link>
                    <Link to="/register"><button className="auth-redirect">Register</button></Link>
                </div>
                : userId !== null ? 
                <>
                    <div className="order order-head">
                        <div className="order-id tb-head">Order #</div>
                        <div className="order-date tb-head">Date</div>
                        <div className="order-status tb-head">Status</div>
                        <div className="order-total tb-head">Order Total</div>
                        <div className="order-view tb-head"></div>
                    </div>
                    {orders.length ? orders.slice(0).reverse().map(order => {
                        return <div key={order.id} className="order-container">
                                    <div className="order">
                                        <div className="order-id order-detail">{order.id}</div>
                                        <div className="order-date order-detail">{order.created.slice(0, 10)}</div>
                                        <div className="order-status order-detail">{order.status}</div>
                                        <div className="order-total order-detail">${order.total}</div>
                                        <div className="order-view order-detail">
                                            <button type="button" className="order-detail-button" onClick={e => showOrder(order.id)}>
                                                {clickedNum === order.id ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                            </button>
                                        </div>
                                    </div>
                                    {clickedNum === order.id ? 
                                    <div className="order-item-container">
                                        {selectedOrder.map(x =>
                                            <div className="order-item" key={x.id}>
                                                <div className="order-item-left">
                                                    <img src={x.image.split(', ')[0]}></img>
                                                </div>
                                                <div className="oi-name">{x.name}</div>
                                                <div className="oi-price">Price: ${x.price}</div>
                                                <div className="oi-qty">Qty: {x.qty}</div>
                                            </div>
                                        )}
                                    </div>
                                    : null }
                                </div>
                    }) : null}
                </>
                : null
                }

        </div>
    )
}