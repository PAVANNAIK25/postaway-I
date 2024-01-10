import express from 'express';
import PostsController from './posts.controller';

const postsRouter = express.Router();

postsRouter.get("/", PostsController.posts);
postsRouter.get("/all", PostsController.allPosts);
postsRouter.post("/", PostsController.allPosts);
postsRouter.get("/:id", PostsController.allPosts);
postsRouter.put("/:id", PostsController.updatePost);


export default postsRouter;