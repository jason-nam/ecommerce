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


// // const express = require('express')
// import express from "express";
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })