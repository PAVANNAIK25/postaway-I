import express from 'express';
import PostsController from './posts.controller.js';

const postsRouter = express.Router();

//get routes
postsRouter.get("/filter", PostsController.filter);
postsRouter.get("/", PostsController.posts);  // done
postsRouter.get("/draft", PostsController.getDraft); // done
postsRouter.get("/all", PostsController.allPosts); // done
postsRouter.get("/archive", PostsController.getArchive); //done
postsRouter.get("/bookmark", PostsController.getBookmarkPosts); 
postsRouter.get("/most-recent", PostsController.sortPostByDate);
postsRouter.get("/:id", PostsController.getPostById);

// POST Routes
postsRouter.post("/", PostsController.createPost);
postsRouter.post("/draft", PostsController.postDraft);

//PUT Routes
postsRouter.put("/archive", PostsController.archivePost);
postsRouter.put("/bookmark", PostsController.bookmarkPost);
postsRouter.put("/:id", PostsController.updatePost);

// Delete Routes
postsRouter.delete("/:id", PostsController.deletePost);


export default postsRouter;