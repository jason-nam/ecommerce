const routers = require("../routes")
const expressMiddleware = require("../middleware/express");
const passportMiddleware = require("../middleware/passport");
// const authMiddleware = require("../middleware/auth");

module.exports = async (app) => {

    // load express middleware
    const expressApp = await expressMiddleware(app);

    // load authenticator middleware
    const passportApp = await passportMiddleware(expressApp);

    // authentication middleware
    // await authMiddleware(expressApp);

    // load API route handlers
    await routers(app, passportApp);

    // error handling
    app.use((err, req, res, next) => {

        const { message, status } = err;
        
        return res.status(status).send({ message });

    })

}