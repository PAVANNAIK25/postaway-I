import LikesModel from "./likes.model.js";

export default class LikesController{

    static getLikes(req, res, next){
        const postId = req.paramss.postid;
        try{
            const result = LikesModel.get(postId);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }

    static toggleLikes(req, res, next){
        const postId = req.params.postid;
        const userId = req.body.userId;
        try{
            const result = LikesModel.toggleLike(postId, userId);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }

}