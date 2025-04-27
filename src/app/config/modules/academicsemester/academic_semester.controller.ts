import { NextFunction, Request, Response } from "express"
import { createsemesters } from "./academic_semester.service"
import asynccatch from "../utils/catchasync"
import status from "http-status"

const createacademicsemester =asynccatch(async(req:Request,res:Response,next:NextFunction)=>{
    const semester=req.body
   const result= await createsemesters.createsemesterintodb(semester)
    res.status(status.OK).send({
        success:true,
        message:'semester created successfully',
        semester:result
    })

})

export const semestercontroller ={
    createacademicsemester
}