import express from 'express'
import myarmymiddlware from '../utils/validationrequest'
import { authvalidation } from './auth.validation'
import { authcontroller } from './auth.controller'
const authrouter = express.Router()

authrouter.post('/create-auth-login',myarmymiddlware(authvalidation.loginvalidationschema),authcontroller.loginauth)

export default authrouter