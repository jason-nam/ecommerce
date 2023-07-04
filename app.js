const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const loaders = require("./loaders");
const { PORT } = require("./config");

async function startServer() {

    app.use(bodyParser.urlencoded({
        extended: false
      }));
      app.use(bodyParser.json());

    loaders(app); // init app loaders
  
    // starting server
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    })

}

startServer();