
import axios from "axios";

const changeCart = (setCart, navigate, location, authToast, str) => {

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
        authToast(str)
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
            removeItem(cartitemid, cart, userId, setCart)
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

const urlChange = (str) => {
    return str.replaceAll(' ', '-').toLowerCase()
}

const states = [
    { name: 'Alabama', code: 'AL' },
    { name: 'Alaska', code: 'AK' },
    { name: 'Arizona', code: 'AZ' },
    { name: 'Arkansas', code: 'AR' },
    { name: 'California', code: 'CA' },
    { name: 'Colorado', code: 'CO' },
    { name: 'Connecticut', code: 'CT' },
    { name: 'Delaware', code: 'DE' },
    { name: 'District of Columbia', code: 'DC'},
    { name: 'Florida', code: 'FL' },
    { name: 'Georgia', code: 'GA' },
    { name: 'Hawaii', code: 'HI' },
    { name: 'Idaho', code: 'ID' },
    { name: 'Illinois', code: 'IL' },
    { name: 'Indiana', code: 'IN' },
    { name: 'Iowa', code: 'IA' },
    { name: 'Kansas', code: 'KS' },
    { name: 'Kentucky', code: 'KY' },
    { name: 'Louisiana', code: 'LA' },
    { name: 'Maine', code: 'ME' },
    { name: 'Maryland', code: 'MD' },
    { name: 'Massachusetts', code: 'MA' },
    { name: 'Michigan', code: 'MI' },
    { name: 'Minnesota', code: 'MN' },
    { name: 'Mississippi', code: 'MS' },
    { name: 'Missouri', code: 'MO' },
    { name: 'Montana', code: 'MT' },
    { name: 'Nebraska', code: 'NE' },
    { name: 'Nevada', code: 'NV' },
    { name: 'New Hampshire', code: 'NH' },
    { name: 'New Jersey', code: 'NJ' },
    { name: 'New Mexico', code: 'NM' },
    { name: 'New York', code: 'NY' },
    { name: 'North Carolina', code: 'NC' },
    { name: 'North Dakota', code: 'ND' },
    { name: 'Ohio', code: 'OH' },
    { name: 'Oklahoma', code: 'OK' },
    { name: 'Oregon', code: 'OR' },
    { name: 'Pennsylvania', code: 'PA' },
    { name: 'Rhode Island', code: 'RI' },
    { name: 'South Carolina', code: 'SC' },
    { name: 'South Dakota', code: 'SD' },
    { name: 'Tennessee', code: 'TN' },
    { name: 'Texas', code: 'TX' },
    { name: 'Utah', code: 'UT' },
    { name: 'Vermont', code: 'VT' },
    { name: 'Virginia', code: 'VA' },
    { name: 'Washington', code: 'WA' },
    { name: 'West Virginia', code: 'WV' },
    { name: 'Wisconsin', code: 'WI' },
    { name: 'Wyoming', code: 'WY' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'Guam', code: 'GU' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Virgin Islands', code: 'VI' },
]

const provinces = [ 
    { name: 'Alberta', code: 'AB' }, 
    { name: 'British Columbia', code: 'BC' }, 
    { name: 'Manitoba', code: 'MB' }, 
    { name: 'New Brunswick', code: 'NB' }, 
    { name: 'Newfoundland and Labrador', code: 'NL' }, 
    { name: 'Northwest Territories', code: 'NT' }, 
    { name: 'Nova Scotia', code: 'NS' }, 
    { name: 'Nunavut', code: 'NU' }, 
    { name: 'Ontario', code: 'ON' }, 
    { name: 'Prince Edward Island', code: 'PE' }, 
    { name: 'Quebec', code: 'QC' }, 
    { name: 'Saskatchewan', code: 'SK' }, 
    { name: 'Yukon Territory', code: 'YT' } 
]


export { changeCart, removeItem, updateItem, urlChange, states, provinces };
