import express, { NextFunction, Request, Response } from 'express';
import { usercontroller } from './user.controller';

const userrouter = express.Router();


const myarmymiddlware =(req:Request,res:Response,next:NextFunction)=>{
    console.log('khara ami shenabahini');
    next()
  
}

userrouter.post('/create-student', myarmymiddlware, usercontroller.createstudent);

export default userrouter;
