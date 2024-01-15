//imporing third party and external modules

import express from 'express';
import bodyParser from 'body-parser';

// importing Internal modules
import userRouter from './src/features/users/users.routes.js';
import postsRouter from './src/features/posts/posts.routes.js';
import { jwtAuth } from './src/middlewares/jwt.middleware.js';
import commentsRouter from './src/features/comments/comments.routes.js';
import likesRouter from './src/features/likes/likes.routes.js';
import { upload } from './src/middlewares/file-upload.middleware.js';
import ApplicationError from './src/error-handler/applicationError.js';
import logCreater, {reqLogger} from './src//middlewares/logger.middleware.js';
import swagger from 'swagger-ui-express';
import apidocs from './swagger.json' assert {type: "json"};


const app = express();
app.use(bodyParser.json());

//All routes 
app.use("/api-docs", swagger.serve, swagger.setup(apidocs));
app.use("/api/users", reqLogger, userRouter);
app.use("/api/posts", upload.single('imageUrl'), reqLogger,  jwtAuth, postsRouter);
app.use("/api/comments", jwtAuth, reqLogger, commentsRouter);
app.use("/api/likes", jwtAuth, reqLogger, likesRouter);

app.get('/', (req, res)=>{
    res.send("Welcome to Postaway App");
})

// Handling errors at application level

app.use((err, req, res, next)=>{
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    
    const logData = `req URL: ${req.url}, Timestamp: ${new Date().toString()}, Error Message: ${err.message}`;
    logCreater.error(logData);
    res.status(500).send("Something went wrong, please try again later");
});

// handling invalid requests on server

app.use((req, res, next) => { 
    res.status(404).send( 
        "Request not found on the server, please refer API docs") 
}) 

export default app;