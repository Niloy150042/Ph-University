import  express  from "express";
import { Studentcontrollers } from "./student.controller";
import auth from "../utils/auth";
import { USER_ROLE } from "../user/user.constant";
const studentrouter = express.Router()

studentrouter.post('/create-student',auth(),Studentcontrollers.createstudent);

studentrouter.get('/get-students',Studentcontrollers.getallstudent)

studentrouter.get('/get-singlestudent/:id' , auth(USER_ROLE.student, USER_ROLE.admin,USER_ROLE.faculty), Studentcontrollers.getasinglestudentdata)

// router.get('/:studentid',Studentcontrollers.getasinglestudentdata)

export default  studentrouter
