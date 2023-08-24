const userRouter = require("./user");
const productRouter = require("./product");
const authenticationRouter = require("./authentication");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const categoryRouter = require("./category");
const paymentRouter = require("./payment");
const billingRouter = require("./billing");
const imageRouter = require("./image");
const shippingRouter = require("./shipping");

module.exports = (app, passport) => {
    userRouter(app);
    productRouter(app);
    authenticationRouter(app, passport);
    cartRouter(app);
    orderRouter(app);
    categoryRouter(app);
    paymentRouter(app);
    billingRouter(app);
    imageRouter(app);
    shippingRouter(app);
}