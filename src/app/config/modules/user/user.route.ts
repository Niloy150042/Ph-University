import express from 'express';
import { usercontroller } from './user.controller';

const userrouter = express.Router();

userrouter.post('/create-student', usercontroller.createstudent);

export default userrouter;
