import express from 'express'
import LikesController from './likes.controller.js';

const likesRouter = express.Router();

likesRouter.get("/:postid", LikesController.getLikes);
likesRouter.get("/toggle/:postid", LikesController.toggleLikes);


export default likesRouter;