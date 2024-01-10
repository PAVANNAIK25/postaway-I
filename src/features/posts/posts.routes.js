import express from 'express';
import PostsController from './posts.controller.js';

const postsRouter = express.Router();

postsRouter.get("/", PostsController.posts);
postsRouter.get("/all", PostsController.allPosts);
postsRouter.post("/", PostsController.createPost);
postsRouter.get("/:id", PostsController.getPostById);
postsRouter.put("/:id", PostsController.updatePost);
postsRouter.delete("/:id", PostsController.deletePost)


export default postsRouter;