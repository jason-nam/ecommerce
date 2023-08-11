
import axios from "axios";

// Check authentication status
const checkIfLoggedIn = function (setUserId, signal, isMounted){

    axios.get("/api/checkAuth", {signal: signal})
    .then((res) => {
        if (isMounted) {
            if (res.data.loggedIn) {
                setUserId(res.data.user.id)
            } else {
                setUserId(-1)
            }
        }
    })
    .catch(err => console.log(err.response, "Session Error")); 
    
};

const changeCart = (setCart, navigate) => {

    const ec = localStorage.getItem('ECOMMERCE_CART')
    let ls = JSON.parse(ec ? ec : "[]")

    // move localstorage items to db cart
    axios.post(
        "/api/carts/mycart/items/multi", 
        { items: ls })
    .then(res => {
        localStorage.removeItem('ECOMMERCE_CART')
        localStorage.removeItem('ECOMMERCE_ITEMID')
        setCart(res.data.items)
        navigate(-1)
    })
    .catch(err => console.log(err))   
}


export { checkIfLoggedIn, changeCart };
