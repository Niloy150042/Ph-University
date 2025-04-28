import express from 'express'
import { semestercontroller } from './academic_semester.controller'
import { academicvalidation } from './academic_semester_validation'
import myarmymiddlware from '../utils/validationrequest'

const semesterrouter = express.Router()
semesterrouter.post('/create-academic-semester',myarmymiddlware(academicvalidation.AcademicSemesterZodSchema), semestercontroller.createacademicsemester)

export default semesterrouter