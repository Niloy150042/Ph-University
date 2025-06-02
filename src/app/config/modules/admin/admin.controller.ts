import { Request, Response } from "express";
import asynccatch from "../utils/catchasync";
import { adminservices } from "./admin.service";
import sendresponse from "../utils/sendresponse";

const createadmin = asynccatch(async(req:Request,res:Response)=>{
    const admindata = req.body
    const data = await adminservices.craeteadminintodb(admindata,admindata.password)
    sendresponse(res,{
        statuscode:201,
        success:true,
        message:'admin created successfully',
        data
})
})
export const admincontroller = {
    createadmin
}