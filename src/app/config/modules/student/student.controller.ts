import {  NextFunction, Request, RequestHandler, Response } from 'express';
import { studentservices } from './student.servive';

//assigning higher order function 
const catchasync = (fn:RequestHandler)=>{
  return (req :Request,res:Response,next:NextFunction) =>{
    Promise.resolve(fn(req,res ,next)).catch(err=> next(err))
  }
}

const createstudent = catchasync(async (req,res) => {
 
    const student = req.body;
    // const zodvalidationschema = studentSchema.parse(student);

    const result = await studentservices.createstudentintodb(student);
    res.status(201).json({
      success: true,
      message: 'student data is created successfully',
      data: result,
    });
   
})

const getallstudent = catchasync(async (req, res, next) => {

    const result = await studentservices.getallstudentfromdb();
    res.status(201).send({
      success: true,
      message: 'congrats! all data is retrived',
      data: [result],
    });
  
})
const getasinglestudentdata = catchasync(async (req, res, next) => {
  
    const { studentid } = req.params;
    const result = await studentservices.getasinglestudent(studentid);
    res.status(201).send({
      success: true,
      data: result,
    });
   
})

export const Studentcontrollers = {
  createstudent,
  getallstudent,
  getasinglestudentdata,
};
