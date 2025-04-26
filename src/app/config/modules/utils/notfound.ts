import { Request, Response } from "express";
import { normalize } from "path";

const notfound =(req:Request,res:Response)=>{
    return res.status(500).send({
        success:false,
        message:"API not found",
        
    })
}

export default notfound