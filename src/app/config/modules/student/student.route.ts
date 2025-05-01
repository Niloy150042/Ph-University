import  express  from "express";
import { Studentcontrollers } from "./student.controller";
const studentrouter = express.Router()

studentrouter.post('/create-student',Studentcontrollers.createstudent);

studentrouter.get('/get-students',Studentcontrollers.getallstudent)
// router.get('/:studentid',Studentcontrollers.getasinglestudentdata)

export default  studentrouter
