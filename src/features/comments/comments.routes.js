import express from 'express';
import CommentsController from './comments.controller';

const commentsRouter = express.Router();

commentsRouter.get("/:id", CommentsController.comments);
commentsRouter.post("/:id", CommentsController.createComment);
commentsRouter.put("/:id", CommentsController.updateComment);



export default commentsRouter;