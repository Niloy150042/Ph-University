import express from 'express'
import myarmymiddlware from '../utils/validationrequest'
import { Authvalidation } from './auth.validation'
import { Authcontroller } from './auth.controller'
const authrouter = express.Router()

authrouter.post('/login',myarmymiddlware(Authvalidation.loginvalidationschema),Authcontroller.loginguser)

export default authrouter