import express from 'express'
import { usercontroller } from './user.controller'

const router =express.Router()

router.post('/create-student',usercontroller.creatuser)

export default router