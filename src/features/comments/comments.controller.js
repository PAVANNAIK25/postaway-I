import CommentsModel from "./comments.model.js";

export default class CommentsController {


    static pagination(comments, req) {
        const pageCount = Math.ceil(comments.length / 10);
        let page = parseInt(req.query.page);
        if (!page) { page = 1; }
        if (page > pageCount) {
            page = pageCount;
        }
        return {
            "page": page,
            "pageCount": pageCount
        }
    }

    static comments(req, res, next) {
        const postId = req.params.id;
        try {
            const searchResult = CommentsModel.get(postId);
            const result = CommentsController.pagination(searchResult, req);
            return res.status(200).json({
                "page": result.page,
                "pageCount": result.pageCount,
                "posts": searchResult.slice(result.page * 10 - 10, result.page * 10)
            });
        } catch (err) {
            next(err);
        }
    }



    static createComment(req, res, next) {
        const { userId, content } = req.body;
        const postId = req.params.id;
        try {
            const result = CommentsModel.add(userId, postId, content);
            res.status(201).send({ message: "Comment updated successfully", comment: result });
        } catch (err) {
            next(err);
        }
    }

    static updateComment(req, res, next) {
        const commentId = req.params.comId;
        const userId = req.body.userId;
        const content = req.query.content;

        try {
            const result = CommentsModel.update(commentId, userId, content);
            res.status(201).send({ message: "Comment updated successfully", comment: result });
        } catch (err) {
            next(err);
        }
    }

    static deleteComment(req, res, next) {
        const commentId = req.params.comId;
        const userId = req.body.userId;
        try {
            const result = CommentsModel.delete(commentId, userId);
            res.status(201).send({ message: "Comment deleted successfully", deletedComment: result });
        } catch (err) {
            next(err);
        }
    }

}
