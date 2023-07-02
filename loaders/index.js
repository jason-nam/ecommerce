module.exports = async (app) => {

    // error handling
    app.use((err, req, res, next) => {
        const { message, status } = err;

        return res.status(status).send({ message });
    })

}