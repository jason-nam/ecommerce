const express = require("express");
const router = express.Router();

module.exports = (app) => {
  
  app.use("/users", router);

  router.get("/:userId", async (req, res, next) => {

    try {

    } catch(err) {
      next(err);
    }
  })

  router.put("/:userId", async (req, res, next) => {
    
    try {

    } catch(err) {
      next(err);
    }
  })
}

// // notice here I'm requiring my database adapter file
// // and not requiring node-postgres directly
// import * as db from '../db/index.js'

// app.get('/:id', async (req, res, next) => {
//   const result = await db.query('SELECT * FROM customer WHERE id = $1', [req.params.id])
//   res.send(result.rows[0])
// })

// // ... many other routes in this file
