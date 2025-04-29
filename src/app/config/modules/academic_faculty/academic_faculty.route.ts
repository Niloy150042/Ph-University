import express from 'express'
import myarmymiddlware from '../utils/validationrequest'
import { faculty_validation } from './academic_faculty.validation'
import { facultycontroller } from './academic_faculty.controller'

const facultyrouter =express.Router()

facultyrouter.post('/create-academic-faculty',myarmymiddlware(faculty_validation.academic_faculty_validationschema),  facultycontroller.createacademicfaculty)

export default facultyrouter



