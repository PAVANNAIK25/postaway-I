let id = 1;
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

        return post;
    }

    static updatePost(postId, userId, caption, imageUrl) {
        const post = this.getPostById(postId);
        if (post.userId == userId) {
            if (caption && imageUrl) {
                post.caption = caption;
                post.imageUrl = imageUrl;
            }
        }
    }

}


let posts = [
    {
        postId: 1,
        userId: 1,
        caption: "This is my first post",
        imageUrl: "url",
    }
]