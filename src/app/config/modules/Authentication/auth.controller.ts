import { Request, response, Response } from "express";
import asynccatch from "../utils/catchasync";
import sendresponse from "../utils/sendresponse";
import { Authservices } from "./auth.service";
import status from "http-status";

const loginauth = asynccatch(async(req:Request,res:Response)=>{
    const payload =req.body
   const result = await Authservices.loginuser(payload)
   sendresponse(res,{
    statuscode:status.OK,
    success:true,
    message :'login user successfully',
    data:result

   })
})

export const authcontroller ={
    loginauth
}