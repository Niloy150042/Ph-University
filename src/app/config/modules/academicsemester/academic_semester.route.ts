import express from 'express'
import { semestercontroller } from './academic_semester.controller'
import { academicvalidation } from './academic_semester_validation'
import myarmymiddlware from '../utils/validationrequest'

const semesterrouter = express.Router()
semesterrouter.post('/create-academic-semester',myarmymiddlware(academicvalidation.AcademicSemesterZodSchema), semestercontroller.createacademicsemester)

semesterrouter.get('/get-semester',semestercontroller.getallsemester)
semesterrouter.get('/get-a-semester/:id',semestercontroller.getasinglesemester)
semesterrouter.patch('/update-a-semester/:id',semestercontroller.updateasinglesemester)

export default semesterrouter