const userRouter = require("./user");
const productRouter = require("./product");

module.exports = (app, passport) => {
    userRouter(app);
    productRouter(app);
}