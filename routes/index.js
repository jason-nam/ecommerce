const userRouter = require("./user");
const productRouter = require("./product");
const authenticationRouter = require("./authentication");

module.exports = (app) => {
    userRouter(app);
    productRouter(app);
    authenticationRouter(app);
    // TODO
}