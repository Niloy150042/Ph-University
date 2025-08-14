import { Request, Response } from 'express';
import asynccatch from '../utils/catchasync';
import { enrolledCourseServie } from './enrolledCourses.service';
import status from 'http-status';

const createEnrolledCourse = asynccatch(async (req: Request, res: Response) => {
  const result = await enrolledCourseServie.createEnrolledCourseintoDB();
  res.status(status.OK).send({
    success: true,
    message: ' Student enrolled intto the offerd course successfully',
    data: result,
  });
});

export const  enrolledCourseController ={
    createEnrolledCourse
}
