const routers = require("../routes")
const expressMiddleware = require("../middleware/express");

module.exports = async (app) => {

    // load express middleware
    const expressApp = await expressMiddleware(app);

    // load authenticator middleware
    // TODO

    // load API route handlers
    await routers(app);

    // error handling
    app.use((err, req, res, next) => {

        const { message, status } = err;
        
        return res.status(status).send({ message });

    })

}