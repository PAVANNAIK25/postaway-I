import PostsModel from "./posts.model.js";


export default class PostsController {

    static posts(req, res) {
        const userId = req.body.userId;
        const result = PostsModel.getPosts(userId);
        if (result) {
            return res.status(200).send(result);
        }
        res.status(404).json({ error: "post not found with logged in user" });
    }

    static allPosts(req, res) {
        const result = PostsModel.getAllPosts();
        if (!result) {
            return res.status(400).json({ error: "post not found" });
        }

        return res.status(200).send(result);
    }

    static createPost(req, res){
        const {userId, caption, imageUrl} = req.body;

        try{
            const post = PostsModel.addPost(userId, caption, imageUrl); 
            return res.status(201).json(post);
        }catch(err){
            res.status(500).send({error: err.message});
        }
    }

    static getPostById(req, res){
        const postId = req.params.id;

        try{
            const post = PostsModel.getPostById(postId);
            return res.status(200).json(post);

        }catch(err){
            res.status(400).json({error: err.message});
        }

    }

    static updatePost(req, res){
        const postId = req.params.id;
        const userId = req.body;
        const {caption, imageUrl} = req.params;

        try{
            const post = PostsModel.updatePost(postId, userId, caption, imageUrl);
            return res.status(200).json(post);

        }catch(err){
            res.status(400).json({error: err.message});
        }

    }

    static deletePost(req, res){
        const postId = req.params.id;
        const userId = req.body.userId;

        try{
            const deletedItem = PostsModel.deletePost(postId, userId);
            return res.status(202).send({message: "Post deleted successfully", deletedItem: deletedItem});
        }catch(err){
            res.status(400).send({error: err.message});
        }

    }

}