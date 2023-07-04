const routers = require("../routes")
const bodyParser = require('body-parser');

module.exports = async (app) => {

    // TODO
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(bodyParser.json());

    // Load API route handlers
    await routers(app);

    // error handling
    app.use((err, req, res, next) => {

        const { message, status } = err;
        
        return res.status(status).send({ message });

    })

}