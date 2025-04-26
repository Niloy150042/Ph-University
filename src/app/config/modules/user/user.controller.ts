import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userservice } from './user.service';
import sendresponse from '../utils/sendresponse';
import status from 'http-status';


// following dry principle 
const asynccatch = (fn:RequestHandler)=>{
  return (req :Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch(err=>next(err))

  }
 
}

const createstudent = asynccatch (async (req, res) => {
  const { student, password } = req.body;

  
    const result = await userservice.createstudentintodb(student, password);

    sendresponse(res, {
      statuscode: status.OK,
      success: true,
      message: 'student creatd successfuly',
      data: result,
    });
  
})

export const usercontroller = {
  createstudent,
};
