
let id=1;
export default class CommentsModel{
    constructor(userId, postId, content){
        this.commentId = ++id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
    
    static get(postId){
        const result = comments.filter(c => c.postId == postId);
        if(!result){
            return ({message:"No comments found"});
        }
        return result;
    }

    static add(userId, postId, content){
        const newComment = new CommentsModel(userId, postId, content);
        comments.push(newComment);
        return newComment;
    }

    static update(commentId, userId, content){
        const comment = comments.find(c => c.commentId==commentId && c.userId==userId);
        if(!comment){
            throw new Error("No comment found");
        }
        comment.content = content;
        return comment;
    }


    static delete(commentId, userId){
        const commentIndex = comments.findIndex(c => c.commentId==commentId && c.userId==userId);
        
        if(!commentIndex){
            throw new Error("No comment found");
        }
        const deletedComment = comments.splice(commentIndex, 1);

        return deletedComment[0];
    }


}

let comments = [
    {
        commentId:"100",
        postId:"1",
        userId:"1",
        content:"This is a funny comment"

    }
]