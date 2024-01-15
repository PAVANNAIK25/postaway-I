import express from 'express';
import CommentsController from './comments.controller.js';

const commentsRouter = express.Router();

commentsRouter.get("/:id", CommentsController.comments);
commentsRouter.post("/:id", CommentsController.createComment);
commentsRouter.put("/:comId", CommentsController.updateComment);
commentsRouter.delete("/:comId", CommentsController.deleteComment);



export default commentsRouter;