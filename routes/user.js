const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const UserModelInstance = new UserModel();


module.exports = (app) => {
  
  app.use("/users", router);

  router.get("/:userId", async (req, res, next) => {

    try {
      // TODO
      res.status(200).send(await UserModelInstance.getUserById());
    } catch(err) {
      next(err);
    }
  })

  router.put("/:userId", async (req, res, next) => {
    
    try {
      // TODO
      await updateUser(req.body.data);
      res.status(200).end()
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
