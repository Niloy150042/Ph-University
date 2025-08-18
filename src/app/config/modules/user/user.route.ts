import express, { NextFunction, Request, Response } from 'express';
import { usercontroller } from './user.controller';
import studentvalidationSchema from '../student/student.zod.validation';
import myarmymiddlware from '../utils/validationrequest';
import auth from '../utils/auth';
import { USER_ROLE } from './user.constant';
import { upload } from '../utils/sendImgaeToCloudinary';

const userrouter = express.Router();

userrouter.post(
  '/create-student',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  upload.single('File'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  myarmymiddlware(studentvalidationSchema),
  usercontroller.createstudent,
);

userrouter.patch('/delete-student/:id', usercontroller.deletestudent);

userrouter.get(
  '/me',
  auth('student', 'admin', 'faculty'),
  usercontroller.getme,
);

export default userrouter;
