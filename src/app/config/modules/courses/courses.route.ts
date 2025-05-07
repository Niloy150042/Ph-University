import express from 'express'
import { coursecontroller } from './courses.controller'

const courserouter = express.Router()
courserouter.post('/create-course' , coursecontroller.createcourse)
courserouter.get('/get-courses', coursecontroller.findallcourse)
courserouter.get('/get-single-course/:id',coursecontroller.getasinglecourse)
courserouter.patch('/update-course/:id' ,coursecontroller.updatecourse)
courserouter.patch('/delete-course /:id',coursecontroller.deletecourse) 

export default courserouter