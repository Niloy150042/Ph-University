import express from 'express'
import myarmymiddlware from '../utils/validationrequest'
import { faculty_validation } from './academic_faculty.validation'

const facultyrouter =express.Router()

facultyrouter.post('/create-academic-faculty',myarmymiddlware(faculty_validation.academic_faculty_validationschema),   )

export default facultyrouter



