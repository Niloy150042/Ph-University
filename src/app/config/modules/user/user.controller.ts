import { NextFunction, Request, Response } from 'express';
// import userzodvalidation from './user.validation';
import { userservice } from './user.service';
import sendresponse from '../utils/sendresponse';
import status from 'http-status';

const createstudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { student, password } = req.body;
  // console.log(student,password);
  // const zodvalidationschema = userzodvalidation.parse(user)

  try {
    const result = await userservice.createstudentintodb(student, password);
    
    sendresponse(res,{
      statuscode:status.OK,
      success:true,
      message:'student creatd successfuly',
      data:result
    })
    

  } catch (err) {
    next(err);
  }
};

export const usercontroller = {
  createstudent,
};
