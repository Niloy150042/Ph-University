import express, { NextFunction, Request, Response } from 'express';
import { usercontroller } from './user.controller'
import studentvalidationSchema from '../student/student.zod.validation';
import myarmymiddlware from '../utils/validationrequest';

const userrouter = express.Router();

userrouter.post(
  '/create-student',
  myarmymiddlware(studentvalidationSchema),
  usercontroller.createstudent,
);

export default userrouter;
