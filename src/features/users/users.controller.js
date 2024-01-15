import { validationResult } from "express-validator";
import UserModel from "./users.model.js";


export default class UserController{

    static register(req, res){
        const {name, email, password} = req.body;
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.send(error.array());
        }
        const result = UserModel.registerUser(name, email, password);
        res.status(201).json(result);
    }

    static login(req, res){
        const {email, password} = req.body;
        try{
            const result = UserModel.confirmLogin(email,password);
            return res.status(200).json(result);
        }catch(error){
            next(error);
            // res.status(404).send("User not found");
        }
        
    }

    
}
