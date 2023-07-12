const routers = require("../routes")
const expressMiddleware = require("../middleware/express");
const authMiddleware = require("../middleware/auth");
const passportMiddleware = require("../middleware/passport");
const passport = require('passport')


module.exports = async (app) => {

    // load express middleware
    const expressApp = await expressMiddleware(app);

    // load authenticator middleware
    const passportApp = await passportMiddleware(expressApp);

    // await authMiddleware(expressApp);

    // load API route handlers
    await routers(app, passport);

    // error handling
    app.use((err, req, res, next) => {

        const { message, status } = err;
        
        return res.status(status).send({ message });

    })

}