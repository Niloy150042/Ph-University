import express  from 'express';
import { usercontroller } from './user.controller'
import studentvalidationSchema from '../student/student.zod.validation';
import myarmymiddlware from '../utils/validationrequest';
import auth from '../utils/auth';
import { USER_ROLE } from './user.constant';

const userrouter = express.Router();

userrouter.post(
  '/create-student',auth(USER_ROLE.admin),
  myarmymiddlware(studentvalidationSchema),
  usercontroller.createstudent,
);

userrouter.patch('/delete-student/:id',usercontroller.deletestudent)

export default userrouter;
