import express, { NextFunction, Request, Response } from 'express';
import { usercontroller } from './user.controller';

const userrouter = express.Router();

const myarmymiddlware = (name) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(`khara ami shenabahini amar nam ${name}`);
    next();
  };
};

userrouter.post('/create-student',myarmymiddlware('validaterequst'),usercontroller.createstudent,
);

export default userrouter;
