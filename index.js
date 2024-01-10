//imporing third party and external modules

import express from 'express';
import bodyParser from 'body-parser';

// importing Internal modules
import userRouter from './src/features/users/users.routes.js';
import postsRouter from './src/features/posts/posts.routes.js';
import { jwtAuth } from './src/middlewares/jwt.middleware.js';

const app = express();
app.use(bodyParser.json());

//All routes 
app.use("/api/users", userRouter);
app.use("/api/posts", jwtAuth, postsRouter);

app.get('/', (req, res)=>{
    res.send("Welcome to Postaway App");
})

export default app;