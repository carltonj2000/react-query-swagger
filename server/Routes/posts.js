/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         userId:
 *           type: integer
 *           description: id of author
 *         title:
 *           type: string
 *           description: title of post
 *         body:
 *           type: string
 *           description: content of post *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my article
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Posts
 *    description: posts of users
 */

import express from "express";
import data from "../data";

const postRouter = express.Router();
postRouter.use(express.json()); // to use body object in requests

postRouter.get("/", (req, res) => {
  res.send(data);
});

postRouter.get("/:id", (req, res) => {
  const post = data.find((post) => post.id === +req.params.id);
  if (!post) {
    res.sendStatus(404);
  }
  res.send(post);
});

postRouter.post("/", (req, res) => {
  try {
    const post = {
      ...req.body,
      id: data.length + 1,
    };
    data.push(post);
    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

postRouter.put("/:id", (req, res) => {
  try {
    let post = data.find((post) => post.id === +req.params.id);
    post.userId = req.body.userId;
    post.title = req.body.title;
    post.body = req.body.body;

    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

postRouter.delete("/:id", (req, res) => {
  let post = data.find((post) => post.id === +req.params.id);
  const index = data.indexOf(post);

  if (post) {
    data.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = postRouter;
