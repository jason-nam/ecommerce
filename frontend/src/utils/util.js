
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

const changeCart = (setCart, navigate, location) => {

    const ec = localStorage.getItem('ECOMMERCE_CART')
    let ls = JSON.parse(ec ? ec : "[]")

    // move localstorage items to db cart
    axios.post(
        "/api/carts/items/multi", 
        { items: ls })
    .then(res => {
        localStorage.removeItem('ECOMMERCE_CART')
        localStorage.removeItem('ECOMMERCE_ITEMID')
        setCart(res.data.items)
        if (location.key !== "default")
            navigate(-1)
        else
            navigate("/")
    })
    .catch(err => console.log(err))   
}

//remove item from cart
const removeItem = (cartitemid, cart, userId, setCart) => {
    let updatedCart = cart.filter(x=> (x.cartitemid !== cartitemid));
    if (userId > 0) {
        axios.delete(`/api/carts/items/${cartitemid}`)
            .then(res => {
                setCart(updatedCart)
            })
            .catch(err => console.log(err))
    } else {
        localStorage.setItem('ECOMMERCE_CART', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }
}

const updateItem = (bool, cartitemid, qty, productid, cartid, cart, userId, setCart) => {
    if (bool) {
        qty++;
    } else {
        if (qty === 1) {
            return;
        }
        qty--
    }
    
    let updatedCart = cart.splice(0).map(x=> {
        if (x.cartitemid===cartitemid) {
            x['qty']=qty;
        }
        return x;
    })
    if (userId > 0) {
        axios.put(`/api/carts/items/${cartitemid}`, {qty, productid, cartid})
            .then(res => setCart(updatedCart))
            .catch(err => console.log(err))
    } else {
        localStorage.setItem('ECOMMERCE_CART', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

}

export { checkIfLoggedIn, changeCart, removeItem, updateItem };
