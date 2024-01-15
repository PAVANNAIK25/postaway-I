import PostsModel from "./posts.model.js";

export default class PostsController {


    static pagination(posts, req) {
        const pageCount = Math.ceil(posts.length / 10);
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

    static posts(req, res) {
        const userId = req.body.userId;
        try {
            const postResult = PostsModel.getPosts(userId);
            const result = PostsController.pagination(postResult, req);

            return res.status(200).json({
                "page": result.page,
                "pageCount": result.pageCount,
                "posts": postResult.slice(result.page * 10 - 10, result.page * 10)
            });
        } catch (err) {
            next(err);
        }
    }

    static sortPostByDate(req, res) {
        const sortedPost = PostsModel.sortByDate();
        const result = PostsController.pagination(sortedPost, req);
        return res.status(200).json({
            "page": result.page,
            "pageCount": result.pageCount,
            "posts": sortedPost.slice(result.page * 10 - 10, result.page * 10)
        });

    }

    static allPosts(req, res) {
        const posts = PostsModel.getAllPosts();
        if (!posts) {
            return res.status(400).json({ error: "post not found" });
        }
        const result = PostsController.pagination(posts, req);

        return res.status(200).json({
            "page": result.page,
            "pageCount": result.pageCount,
            "posts": posts.slice(result.page * 10 - 10, result.page * 10)
        });
    }

    static createPost(req, res, next) {
        const { userId, caption } = req.body;
        const imageUrl = req.file.path;
        try {
            const post = PostsModel.addPost(userId, caption, imageUrl);
            return res.status(201).json(post);
        } catch (err) {
            next(err);
        }
    }

    static getPostById(req, res, next) {
        const postId = req.params.id;

        try {
            const post = PostsModel.getPostById(postId);
            return res.status(200).json(post);

        } catch (err) {
            next(err);
        }

    }

    static updatePost(req, res, next) {
        const postId = req.params.id;
        const { userId, caption } = req.body;
        const imageUrl = req.file.path;

        try {
            const post = PostsModel.updatePost(postId, userId, caption, imageUrl);
            return res.status(200).json(post);

        } catch (err) {
            next(err);
        }

    }

    static deletePost(req, res, next) {
        const postId = req.params.id;
        const userId = req.body.userId;

        try {
            const deletedItem = PostsModel.deletePost(postId, userId);
            return res.status(202).send({ message: "Post deleted successfully", deletedItem: deletedItem });
        } catch (err) {
            next(err);
        }

    }

    // feture to filter based on caption

    static filter(req, res, next) {
        const search = req.query.search;
        try {
            const searchResult = PostsModel.filterPost(search);
            const result = PostsController.pagination(searchResult, req);
            return res.status(200).json({
                "page": result.page,
                "pageCount": result.pageCount,
                "posts": searchResult.slice(result.page * 10 - 10, result.page * 10)
            });
        } catch (err) {
            next(err);
        }
    }

    //  feature of save as draft

    static postDraft(req, res, next) {
        const { userId, caption } = req.body;
        const imageUrl = req.file.path;

        try {
            const result = PostsModel.draftPost(userId, caption, imageUrl);
            res.status(201).json({ message: "draft created successfully", result: result });
        } catch (err) {
            next(err);
        }
    }

    static getDraft(req, res, next) {
        const userId = req.body.userId;

        try {
            const draftResult = PostsModel.getDrafts(userId);
            const result = PostsController.pagination(draftResult, req);
            return res.status(200).json({
                "page": result.page,
                "pageCount": result.pageCount,
                "posts": draftResult.slice(result.page * 10 - 10, result.page * 10)
            });
        } catch (error) {
            next(error);
        }
    }

    //  feature of save to archive

    static archivePost(req, res, next) {
        const userId = req.body.userId;
        const postId = req.query.postId;

        try {
            const result = PostsModel.archivePostToggle(postId, userId);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }

    }

    static getArchive(req, res, next) {
        const userId = req.body.userId;
        try {
            const archiveResults = PostsModel.getArchive(userId);
            const result = PostsController.pagination(archiveResults, req);
            return res.status(200).json({
                "page": result.page,
                "pageCount": result.pageCount,
                "posts": archiveResults.slice(result.page * 10 - 10, result.page * 10)
            });
        } catch (error) {
            next(error);
        }
    }

    // bookmark Post 

    static bookmarkPost(req, res, next) {
        const userId = req.body.userId;
        const postId = req.query.postId;
        try {
            const result = PostsModel.bookmarkPostToggle(userId, postId);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

    static getBookmarkPosts(req, res, next) {
        const userId = req.body.userId;
        try {
            const bookmarkResult = PostsModel.getBookmarkPosts(userId);
            const result = PostsController.pagination(bookmarkResult, req);
            return res.status(200).json({
                "page": result.page,
                "pageCount": result.pageCount,
                "posts": bookmarkResult.slice(result.page * 10 - 10, result.page * 10)
            });
        } catch (error) {
            next(error);
        }
    }

}