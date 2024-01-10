import PostsModel from "./posts.model";


export default class PostsController {

    static posts(req, res) {
        const userId = req.body.userId;
        const result = PostsModel.getPosts(userId);
        if (result) {
            return res.send(200).send(result);
        }
        res.send(404).json({ message: "post not found with logged in user" });
    }

    static allPosts(req, res) {
        const result = PostsModel.getAllPosts();
        if (!result) {
            return res.send(400).json({ message: "post not found" });
        }

        return res.send(200).send(result);
    }

    static createPost(req, res){
        const {userId, caption, imageUrl} = req.body;

        try{
            const post = PostsModel.addPost(userId, caption, imageUrl); 
            return res.status(201).json(post);
        }catch(err){
            res.status(500).send(err);
        }
    }

    static getPostById(req, res){
        const postId = req.params.id;

        try{
            const post = PostsModel.getPostById(postId);
            return res.status(200).json(post);

        }catch(err){
            res.status(400).json({message: "Cannot retrive requested post"});
        }

    }

    static updatePost(req, res){
        const postId = req.params.id;
        const {userId, caption, imageUrl} = req.body;

        try{
            const post = PostsModel.getPostById(postId, userId, caption, imageUrl);
            return res.status(200).json(post);

        }catch(err){
            res.status(400).json({message: "Cannot retrive requested post"});
        }

    }

}