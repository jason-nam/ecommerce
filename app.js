const express = require("express");
const app = express();

const loaders = require("./loaders");
const { PORT } = require("./config");

async function startServer() {

    loaders(app); // init app loaders
  
    // starting server
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    })

}

startServer();