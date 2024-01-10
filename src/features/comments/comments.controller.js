import CommentsModel from "./comments.model";

export default class CommentsController{
   
    static comments(req, res){
        // const userId = req.body.userId;
        const postId = req.params.id;
        try{
            const result = CommentsModel.get(postId);
            res.status(200).send(result);
        }catch(err){
            res.status(400).send({error: err});
        }
    }

    static createComment(req, res){
        const {userId, content} = req.body;
        const postId = req.params.id;
        try{
            const result = CommentsModel.add(userId, postId, content);
            res.status(201).send({message: "Comment updated successfully", comment: result});
        }catch(err){
            res.status(400).send({error: err});
        }
    }

    static updateComment(req, res){
        const commentId = req.params.id;
        const userId = req.body.userId;
        const content = req.query.content;
        
        try{
            const result = CommentsModel.update(commentId, userId, content);
            res.status(201).send({message: "Comment updated successfully", comment: result});
        }catch(err){
            res.status(400).send({error: err});
        }
    }

    static deleteComment(req, res){
        const commentId = req.params.id;
        const userId = req.body.userId;
        try{
            const result = CommentsModel.delete(commentId, userId);
            res.status(201).send({message: "Comment deleted successfully", deletedComment: result});
        }catch(err){
            res.status(400).send({error: err});
        }
    }

}
