import ApplicationError from "../../error-handler/applicationError.js";
import UserModel from "../users/users.model.js";

let id = 3;
export default class PostsModel {
    constructor(userId, caption, imageUrl) {
        this.postId = ++id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.date = new Date().toISOString();
    }

    static getPosts(userId) {
        const result = posts.filter(p => p.userId == userId && !p.draft && !p.archive);
        if(result.length==0){
            throw new ApplicationError('No post found', 404);
        }
        return result;
    }

    static sortByDate(){
        const sorted = posts.sort(function (a, b){
            if(a.date < b.date){
                return 1;
            }else if(a.date > b.date){
                return -1;
            }
            return 0;
        });
        return sorted;
    }

    static getAllPosts() {
        const result = posts.filter(p => !p.draft && !p.archive);
        return result;
    }

    static addPost(userId, caption, imageUrl) {
        const newPost = new PostsModel(userId, caption, imageUrl);
        posts.push(newPost);
        return newPost;

    }

    static getPostById(postId) {
        const post = posts.find(p => p.postId == postId);
        if (!post) {
            throw new ApplicationError("Post not found", 404);
        }
        return post;
    }

    static updatePost(postId, userId, caption, imageUrl) {
        const post = this.getPostById(postId);
        if (!post) {
            throw new ApplicationError("Post not found", 400);
        }
        if (post.userId == userId) {
            if (caption) {
                post.caption = caption;
            }
            if (imageUrl) {
                post.imageUrl = imageUrl;
            }
            return post;
        } else {
            throw new ApplicationError("User not found", 400);
        }
    }

    static deletePost(postId, userId) {
        const post = this.getPostById(postId);
        if (!post) {
            throw new ApplicationError("Post not found", 400);
        }

        if (post.userId != userId) {
            throw new ApplicationError("Post is not posted by this user", 404);
        } else {
            const index = posts.findIndex(p => p.postId == postId);
            if (index < 0) {
                throw new ApplicationError("Post not found", 404);
            }

            const deletedItem = posts.splice(index, 1);
            return deletedItem[0];
        }
    }

    static filterPost(search) {

        const result = posts.filter(i => i.caption.includes(search));

        if (result.length == 0) {
            throw new ApplicationError("OOPs... No post found", 400);
        }

        return result;

    }

    static draftPost(userId, caption, imageUrl) {
        const newPost = new PostsModel(userId, caption, imageUrl);
        newPost.draft = true;
        posts.push(newPost);
        return newPost;
    }

    static getDrafts(userId) {
        const result = posts.filter(p => p.draft && p.userId == userId);
        if(result.length==0){
            throw new ApplicationError("No draft found", 404);
        }
        return result;
    }

    static archivePostToggle(postId, userId) {
        const post = posts.find(p => p.postId == postId && p.userId == userId);
        if (!post) {
            throw new ApplicationError("Post not found!", 404);
        }

        if(post.archive==true){
            delete post.archive;
            return {message: "Post removed from Archive", post: post};
        }
        post.archive = true;
        return {message: "Post saved to Archive", post: post};;
    }

    static getArchive(userId) {
        const result = posts.filter(p => p.archive && (p.userId == userId));

        if(result.length==0){
            throw new ApplicationError("No Archive found", 400);
        }
        return result;
    }

    static bookmarkPostToggle(userId, postId){
        const post = this.getPostById(postId);
        if(!post){
            throw new ApplicationError('Post not found', 400);
        }

        try {
            const user = UserModel.getUserById(userId);
            if(!user.bookmark){
                user.bookmark = [postId];
                return {message: "Post saved to bookmark", post:post};
            }
            const index = user.bookmark.findIndex(p => p == postId);
            if(index >= 0){
                const p = user.bookmark.splice(index, 1);
                return {message: "Post removed from bookmark", post:post};
            }
            user.bookmark.push(postId);
            return {message: "Post saved to bookmark", post:post};
        } catch (err) {
            throw new ApplicationError(err.message, 400);
        }
    }

    static getBookmarkPosts(userId){
        try {
            const user = UserModel.getUserById(userId);
            if(!user.bookmark){
                throw new ApplicationError("No bookmark post found", 400);
            }
            const result = user.bookmark;
            return result.map(pId => this.getPostById(pId));
        } catch (err) {
            throw new ApplicationError(err.message, 400);
        }
    }

}


let posts = [
    {
        postId: 1,
        userId: 1,
        caption: "This is my first post",
        imageUrl: "url",
        date: new Date('12/01/2023').toISOString()
    },

    {
        postId: 2,
        userId: 1,
        caption: "This is my first post",
        imageUrl: "url2",
        date: new Date('12/02/2023').toISOString()
    },

    {
        postId: 3,
        userId: 2,
        caption: "This is my first post",
        imageUrl: "url2",
        date: new Date('12/02/2023').toISOString()
    },

    {
        postId: 4,
        userId: 2,
        caption: "This is my first post",
        imageUrl: "url2",
        date: new Date('12/01/2023').toISOString()
    },
    {
        postId: 5,
        userId: 2,
        caption: "This is my first post",
        imageUrl: "url2",
        date: new Date('12/05/2023').toISOString()
    }
]