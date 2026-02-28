import { NextFunction, Request, Response } from 'express'
import {ZodObject} from 'zod'
import logger from '../config/logger.config';
export const validaterequestbody=(schema:ZodObject<any>)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            logger.info("validating request body");
            await schema.parseAsync(req.body)
            logger.info("request body is valid");
            next();
        }
        catch(error){
            logger.info("request body is invalid");
            res.status(400).json({
                message:"Invalid request body",
                success:false,
                error:error
            })
        }
    }
}
export const validaterequestquery=(schema:ZodObject<any>)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            logger.info("validating request query");
            await schema.parseAsync(req.query)
            logger.info("request query is valid");
            next();
        }
        catch(error){
            logger.info("request query is invalid");
            res.status(400).json({
                message:"Invalid request query",
                success:false,
                error:error
            })
        }
    }
}