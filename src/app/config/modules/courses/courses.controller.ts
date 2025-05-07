import { Request, Response } from "express";
import asynccatch from "../utils/catchasync";
import { courseservices } from "./courses.service";
import status from "http-status";



const createcourse = asynccatch((req :Request,res:Response,next)=>{
   const course = req.body 
   const result = courseservices.createcourseintodb(course)
   res.status(status.OK).send({
    success:true,
    message:'courses created successfully ',
    data:result
   })
})

const findallcourse = asynccatch((req :Request,res:Response,next)=>{

    const result = courseservices.getallcourses()
    res.status(status.OK).send({
     success:true,
     message:'courses retrived successfully ',
     data:result
    })
 })

 const getasinglecourse = asynccatch((req :Request,res:Response,next)=>{
    const id = req.params.id 
    const result = courseservices.getasinglecourse(id)
    res.status(status.OK).send({
     success:true,
     message:'your course retrived successfully ',
     data:result
    })
 })

 const updatecourse = asynccatch((req :Request,res:Response,next)=>{
    const id = req.params.id 
    const payload = req.query
    const result = courseservices.updatesinglecourse(id,payload)
    res.status(status.OK).send({
     success:true,
     message:'course updated successfully ',
     data:result
    })
 })

 const deletecourse = asynccatch((req :Request,res:Response,next)=>{
    const id = req.params.id 
    const result = courseservices.deletecourse(id)
    res.status(status.OK).send({
     success:true,
     message:'course deleted successfully ',
     data:result
    })
 })
 export const  coursecontroller ={
    createcourse,
    findallcourse,
    getasinglecourse,
    updatecourse,
    deletecourse
 }