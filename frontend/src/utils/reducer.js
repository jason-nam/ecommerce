/* Reducers */

//Checkout.jsx
export const checkoutReducer = (state, action) => {
    switch (action.type) {
        case "CALCULATE":
            let subtotal = action.payload.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2);
            let tax = (subtotal * 0.13).toFixed(2);
            let shipping = 0;
            return {
                ...state,
                subtotal,
                tax,
                shipping,
                total: (parseFloat(subtotal) + parseFloat(tax) + parseFloat(shipping)).toFixed(2) ,
            };
        case "RESET":
            return {
                ...state,
                subtotal: 0,
                tax: 0,
                shipping: 0,
                total: 0,
            }

    }
};  

export const checkoutInitialState = {
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
}

//Product.jsx
export const productReducer = (state, action) => {
    switch (action.type) {
        case "PRODUCT_SUCCESS":
            return {
                ...state,
                product: action.payload,
                error: false,
                loading: false,
            }
        case "PRODUCT_FAIL":
            return {
                ...state,
                error: true,
                loading: false,
            }
        case "REC_PRODUCTS":
            return {
                ...state,
                rec_products: action.payload,
                rec_error: false,
                rec_loading: false,
            }
    }
}

export const productInitialState = {
    product: {},
    error: false,
    loading: true,
    rec_products: [],
    rec_error: false,
    rec_loading: true,
}

//ProductList.jsx
export const productListReducer = (state, action) => {
    switch (action.type) {
        case "PL_SUCCESS":
            return {
                ...state,
                products: action.products,
                productsCount: action.count,
                error: false,
                loading: false,
            }
        case "PL_FAIL":
            return {
                ...state,
                error: true,
                loading: false,
            }
    }
}

export const productListInitialState = {
    products: [],
    productsCount: 0,
    error: false,
    loading: true,
}

//Login.jsx
export const loginReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                newLogin: true,
                error: false,
                authFail: false,
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                authFail: true,
                error: false,
                newLogin: false,
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                error: true,
                authFail: false,
            }
    }
}

export const registerReducer = (state, action) => {
    switch (action.type) {
        case "REG_SUCCESS":
            return {
                ...state,
                registered: true,
                userExists: false,
                error: false,
            }
        case "REG_USEREXISTS":
            return {
                ...state,
                userExists: true,
                error: false,
            }
        case "REG_ERROR":
            return {
                ...state,
                error: true,
                userExists: false
            }
    }
}

export const loginInitialState = {
    authFail: false,
    newLogin: false,
    error: false,
}

export const registerInitialState = {
    registered: false,
    userExists: false,
    error: false,
}