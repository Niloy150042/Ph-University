import { studentservices } from './student.servive';
import catchasync from '../utils/catchasync'
import globalErrorHandler from '../utils/globalerrohandler';
import { NextFunction } from 'express';

//assigning higher order function 


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
    const result = await studentservices.getallstudentfromdb(req.query);
    res.status(201).send({
      success: true,
      message: 'congrats! all data is retrived',
      data: [result],
    });
  
})
const getasinglestudentdata = catchasync(async (req, res, next:NextFunction) => {
  
    const { studentid } = req.params;
    const result = await studentservices.getasinglestudent(studentid);
    res.status(201).send({
      success: true,
      data: result,
    });
    next(globalErrorHandler)
   
})

export const Studentcontrollers = {
  createstudent,
  getallstudent,
  getasinglestudentdata,
};
