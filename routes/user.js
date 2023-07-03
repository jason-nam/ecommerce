const express = require("express");
const router = express.Router();

const UserService = require("../services/userServices");
const UserServiceInstance = new UserService();


module.exports = (app) => {
  
  app.use("/users", router);
  app.use(express.urlencoded({ extended: false }));

  router.get("/:userId", async (req, res, next) => {

    try {

      const { userId } = req.params;
      const response = await UserServiceInstance.get(userId);

      res.status(200).send(response);

    } catch(err) {
      next(err);
    }
  })

  router.put("/:userId", async (req, res, next) => {
    
    try {

      const { userId } = req.params;
      const data = req.body;

      const response = await UserServiceInstance.update({ userId, ...data });

      res.status(200).end(response);

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
