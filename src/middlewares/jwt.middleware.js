import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next)=>{

    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(400).json({error: 'Unauthorized'});
    }

    try{
        const payload = jwt.verify(authHeader, 'CDED783BBEC3B7F8897F6EFE12E7E');
        req.body.userId = payload.user;
        next();
    }catch(err){
        return res.status(400).json({error: err.message});
    }

}