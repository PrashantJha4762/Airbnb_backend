import { Request, Response } from 'express';
import logger from '../config/logger.config';

const pinghandler=(req:Request,res:Response)=>{
    res.status(400).send("Pong");
    logger.info(`Username: ${req.query.name}`,{CorrelationId:req.headers['x-correlation-Id']})
}
export  default pinghandler