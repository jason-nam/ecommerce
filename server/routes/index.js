const userRouter = require("./user");
const productRouter = require("./product");
const authenticationRouter = require("./authentication");
const cartRouter = require("./cart");
const orderRouter = require("./order");

module.exports = (app) => {
    userRouter(app);
    productRouter(app);
    authenticationRouter(app);
    cartRouter(app);
    orderRouter(app);
    // TODO
}