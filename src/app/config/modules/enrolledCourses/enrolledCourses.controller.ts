import { Request, Response } from 'express';
import asynccatch from '../utils/catchasync';
import { enrolledCourseServie } from './enrolledCourses.service';
import status from 'http-status';
import sendresponse from '../utils/sendresponse';

const createEnrolledCourse = asynccatch(async (req: Request, res: Response) => {
  const userid=req.user.data.id
  const result = await enrolledCourseServie.createEnrolledCourseintoDB(userid,req.body);
  res.status(status.OK).send({
    success: true,
    message: ' Student enrolled intto the offerd course successfully',
    data: result,
  });
});

const updateEnrolledCourseMarks = asynccatch(async(req:Request, res:Response)=>{
  const adminId = req.user.data.id 

   const result = await enrolledCourseServie.updateEnrolledCourseMarksintoDB(req.body ,adminId)
    res.status(status.OK).send({
    success: true,
    message: ' updated  course  marks successfully',
    data: result,
  });
})

export const  enrolledCourseController ={
    createEnrolledCourse,
    updateEnrolledCourseMarks
}
