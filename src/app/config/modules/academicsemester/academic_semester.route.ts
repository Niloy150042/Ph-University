import express from 'express'
import { semestercontroller } from './academic_semester.controller'

const semesterrouter = express.Router()
semesterrouter.route('/create-semester',semestercontroller.createacademicsemester)

export default semesterrouter