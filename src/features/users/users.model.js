import jwt from 'jsonwebtoken';

let id=1;
export default class UserModel{

    constructor(name, email, password){
        this.userId = ++id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static registerUser(name, email, password){
        const result = users.find(u => u.email==email);
        if(result){
            return {message: "User email is already registred with us. Please login to continue"};
        }else{
            const newUser = new UserModel(name, email, password);
            users.push(newUser);
            return {message:"User registered succefully"};
        }
    }

    static confirmLogin(email, password){
        const user  = users.find(u => u.email==email && u.password==password);
        if(user){
           const token = jwt.sign({user: user.userId}, 'CDED783BBEC3B7F8897F6EFE12E7E',{
                expiresIn: '1d',
                algorithm: 'HS256'
            });
            return {message: "login Successful", token: token};
        }else{
            return {message: "Invalid credentials"};
        }
    }

    
}

let users = [{
    userId:1,
    name:"Pavan Naik",
    email:"pavan@gmail.com",
    password:"pavanN"
}]  