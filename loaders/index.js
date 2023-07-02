const routers = require("../routes")

module.exports = async (app) => {

    // TODO
    await routers(app);

    // error handling
    app.use((err, req, res, next) => {
        const { message, status } = err;

        return res.status(status).send({ message });
    })

}