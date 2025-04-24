import  express  from "express";
import { Studentcontrollers } from "./student.controller";
const studentrouter = express.Router()

studentrouter.post('/create-student',Studentcontrollers.createstudent);

// router.get('/',Studentcontrollers.getallstudent)
// router.get('/:studentid',Studentcontrollers.getasinglestudentdata)

export default  studentrouter
