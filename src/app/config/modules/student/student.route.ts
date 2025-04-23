import  express  from "express";
import { Studentcontrollers } from "./student.controller";
const router = express.Router()

router.post('/create-student',Studentcontrollers.createstudent);

router.get('/',Studentcontrollers.getallstudent)
router.get('/:studentid',Studentcontrollers.getasinglestudentdata)

export default  router
