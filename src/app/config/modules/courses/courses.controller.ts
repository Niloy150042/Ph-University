import { Request, Response } from 'express';
import asynccatch from '../utils/catchasync';
import { courseservices } from './courses.service';
import status from 'http-status';
import { faculty_model } from '../academic_faculty/academic_faculty.model';

const createcourse = asynccatch( async (req: Request, res: Response, next) => {
  const course = req.body;
  const result =  await  courseservices.createcourseintodb(course);
  res.status(status.OK).send({
    success: true,
    message: 'courses created successfully ',
    data: result,
  });
});

const findallcourse = asynccatch( async(req: Request, res: Response, next) => {
  const result = await courseservices.getallcourses();
  res.status(status.OK).send({
    success: true,
    message: 'courses retrived successfully ',
    data: result,
  });
});

const getasinglecourse = asynccatch(async (req: Request, res: Response, next) => {
  const id = req.params.id;
  const result = await courseservices.getasinglecourse(id);
  res.status(status.OK).send({
    success: true,
    message: 'your course retrived successfully ',
    data: result,
  });
});

const updatecourse = asynccatch(async (req: Request, res: Response, next) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await courseservices.updatesinglecourse(id, payload);
  res.status(status.OK).send({
    success: true,
    message: 'course updated successfully ',
    data: result,
  });
});

const deletecourse = asynccatch(async(req: Request, res: Response, next) => {
  const id = req.params.id;
  const result = await courseservices.deletecourse(id);
  res.status(status.OK).send({
    success: true,
    message: 'course deleted successfully ',
    data: result,
  });
});
const assignfacultyandcourse = asynccatch(async(req,res,next)=>{
  const courseID= req.params.courseID
  const payload = req.body.faculty
  const result = await courseservices.assignfacultyintocourseintodb(courseID,payload)
  res.status(status.OK).send({
    success: true,
    message: 'created  faculty into the course  successfully ',
    faculty: result,
  });
})

const removefacultyfromcourse = asynccatch(async(req,res,next)=>{
  const courseID= req.params.courseID
  const payload = req.body.faculty
  const result = await courseservices.removefacaultyfromcoursefromdb(courseID,payload)
  res.status(status.OK).send({
    success: true,
    message: 'faculty removed from the course  successfully ',
    faculty:result
  });
})



 
export const coursecontroller = {
  createcourse,
  findallcourse,
  getasinglecourse,
  updatecourse,
  deletecourse,
  assignfacultyandcourse,
  removefacultyfromcourse
};
