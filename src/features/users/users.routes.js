import express from 'express';
import UserController from './users.controller.js';
import { validateLogin, validateRegistration } from '../../middlewares/validation.middleware.js';

const userRouter = express.Router();

userRouter.post("/register", validateRegistration, UserController.register);
userRouter.post("/login", validateLogin, UserController.login);

export default userRouter;
