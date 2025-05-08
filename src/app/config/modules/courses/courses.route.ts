import express from 'express'
import { coursecontroller } from './courses.controller'
import myarmymiddlware from '../utils/validationrequest'
import updatevalidationschema from './courses.validation'

const courserouter = express.Router()
courserouter.post('/create-course' ,myarmymiddlware(updatevalidationschema),coursecontroller.createcourse)
courserouter.post('/:courseID/assign-faculties',coursecontroller.assignfacultyandcourse)

courserouter.get('/get-courses', coursecontroller.findallcourse)
courserouter.get('/get-single-course/:id',coursecontroller.getasinglecourse)
courserouter.patch('/update-course/:id' , myarmymiddlware(updatevalidationschema),coursecontroller.updatecourse)
courserouter.patch('/delete-course/:id',coursecontroller.deletecourse) 

export default courserouter