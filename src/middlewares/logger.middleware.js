import { json } from 'express';
import winston from 'winston';

const logCreater = winston.createLogger({
        level:"info",
        format: winston.format.json(),
        transports:[
            new winston.transports.File({filename: 'error.log', level: 'error'}),
            new winston.transports.File({filename: 'logs.log', level: 'info'}),
        ]
})


export const reqLogger = (req, res, next)=>{
    const logData = `Log Url: ${req.url}- Timestamp: ${new Date().toString()} - Log Data- ${JSON.stringify(req.body)}`;
    if(!req.url.includes('login') || !req.url.includes('register')){
        logCreater.info(logData);
    }

    next();
}
export default logCreater;