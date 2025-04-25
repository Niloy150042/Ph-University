import { NextFunction, Request, Response } from 'express';
import { studentservices } from './student.servive';
import studentSchema from './student.zod.validation';

const createstudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    // const zodvalidationschema = studentSchema.parse(student);

    const result = await studentservices.createstudentintodb(student);
    res.status(201).json({
      success: true,
      message: 'student data is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'somthing went wrong bro ',
      error: error,
    });
  }
};

const getallstudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await studentservices.getallstudentfromdb();
    res.status(201).send({
      success: true,
      message: 'congrats! all data is retrived',
      data: [result],
    });
  } catch (err) {
    next(err)
  }
};
const getasinglestudentdata = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentid } = req.params;
    const result = await studentservices.getasinglestudent(studentid);
    res.status(201).send({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err)
  }
}



export const Studentcontrollers = {
  createstudent,
  getallstudent,
  getasinglestudentdata,
};
