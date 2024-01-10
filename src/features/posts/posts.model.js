let id = 3;
export default class PostsModel {
    constructor(userId, caption, imageUrl) {
        this.postId = ++id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static getPosts(userId) {
        const result = posts.filter(p => p.userId == userId);
        return result;
    }

    static getAllPosts() {
        return posts;
    }

    static addPost(userId, caption, imageUrl) {
        const newPost = new PostsModel(userId, caption, imageUrl);
        posts.push(newPost);
        return newPost;

    }

    static getPostById(postId) {
        const post = posts.find(p => p.postId == postId);
        if(!post){
            throw new Error("Post not found");
        }
        return post;
    }

    static updatePost(postId, userId, caption, imageUrl) {
        const post = this.getPostById(postId);
        if(!post){
            throw new Error("Post not found");
        }
        if (post.userId == userId) {
            if(caption){
                post.caption = caption;
            }
            if(imageUrl){
                post.imageUrl=imageUrl;
            }
            return post;
        }else{
            throw new Error("User not found");
        }
    }

    static deletePost(postId, userId){
        const post = this.getPostById(postId);
        if(!post){
            throw new Error("Post not found");
        }

        if(post.userId != userId){
            throw new Error("Post is not posted by this user");
        }else{
            const index = posts.findIndex(p => p.postId== postId);
            const deletedItem = posts.splice(index,1);
            return deletedItem[0];
        }

        
    }

}


let posts = [
    {
        postId: 1,
        userId: 1,
        caption: "This is my first post",
        imageUrl: "url",
    },

    {
        postId: 2,
        userId: 1,
        caption: "This is my Second post",
        imageUrl: "url2",
    },

    {
        postId: 3,
        userId: 2,
        caption: "This is my first post",
        imageUrl: "url2",
    }



]