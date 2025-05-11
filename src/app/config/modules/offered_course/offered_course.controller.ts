import { Request, Response } from "express";
import asynccatch from "../utils/catchasync";
import { offeredcourseservices } from "./offered_course.service";
import status from "http-status";

const createofferedcourse = asynccatch(async(req:Request,res:Response,next)=>{
     const result = await offeredcourseservices.createofferedcouse(req.body)
     res.status(status.OK).send({
        success:true,
        message:"offered course created successfully",
        data:result 
     })
})

export const  offerecoursecontroller ={
    createofferedcourse
}