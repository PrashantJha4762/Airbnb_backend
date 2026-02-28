import { Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const AppErrorHandler=(err:AppError,req:Request,res:Response)=>{
    console.log(err);
    res.send(err.statusCode).json({
        success:"false",
        message:err.message,
    })
}
export const GenericErrorHandler=(err:Error,req:Request,res:Response)=>{
    console.log(err);
    res.send(500).json({
        success:"false",
        message:"Internal server error",
    })
}