import  express  from "express";
import { Studentcontrollers } from "./student.controller";
import auth from "../utils/auth";
const studentrouter = express.Router()

studentrouter.post('/create-student',auth(),Studentcontrollers.createstudent);

studentrouter.get('/get-students',Studentcontrollers.getallstudent)

// router.get('/:studentid',Studentcontrollers.getasinglestudentdata)

export default  studentrouter
