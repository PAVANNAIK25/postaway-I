import ApplicationError from "../../error-handler/applicationError.js";
import PostsModel from "../posts/posts.model.js";

let id = 200;
export default class LikesModel {

    constructor(userId, postId) {
        this.likeId = ++id;
        this.userId = userId;
        this.postId = postId;
    }

    static get(postId) {
        const post = PostsModel.getPostById(postId);
        if (!post) {
            throw new ApplicationError("Post not found", 404);
        }
        const result = likes.filter(l => l.postId == postId);
        if (result.length==0) {
            throw new ApplicationError("No likes found", 400);
        }
        return result;
    }

    static toggleLike(postId, userId) {
        const post = PostsModel.getPostById(postId);
        if (!post) {
            throw new ApplicationError("Post not found", 404);
        }
        const index = likes.findIndex(l => l.postId == postId && l.userId == userId);
        if (index < 0) {
            const like = new LikesModel(userId, postId);
            likes.push(like);
            return { message: "Liked!" };
        }

        likes.splice(index, 1);
        return { message: "Unliked!" };
    }


}

let likes = [{
    likeId: '200',
    userId: '1',
    postId: '1'
}]