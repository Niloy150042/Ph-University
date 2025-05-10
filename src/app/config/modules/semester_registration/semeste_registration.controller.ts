import { Request, Response } from "express";
import asynccatch from "../utils/catchasync";
import { semesterregistraionservice } from "./semester_registration.service";
import status from "http-status";

const createsemesterregistration = asynccatch(async(req:Request,res:Response,next)=>{
    const result = await semesterregistraionservice.createsemesterregistrationintodb(req.body)
    res.status(status.OK).send({
        success:true,
        message:'semester registration is successfull',
        data:result
    })

})

export const semesterregistrationcontroller ={
    createsemesterregistration
}