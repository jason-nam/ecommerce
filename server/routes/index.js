const userRouter = require("./user");
const productRouter = require("./product");
const authenticationRouter = require("./authentication");
const cartRouter = require("./cart");

module.exports = (app) => {
    userRouter(app);
    productRouter(app);
    authenticationRouter(app);
    cartRouter(app);
    // TODO
}