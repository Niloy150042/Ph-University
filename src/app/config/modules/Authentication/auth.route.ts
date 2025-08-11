import express from 'express';
import myarmymiddlware from '../utils/validationrequest';
import { Authvalidation } from './auth.validation';
import { Authcontroller } from './auth.controller';
import auth from '../utils/auth';
import { USER_ROLE } from '../user/user.constant';
const authrouter = express.Router();

authrouter.post(
  '/login',
  myarmymiddlware(Authvalidation.loginvalidationschema),
  Authcontroller.loginguser,
);

authrouter.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  myarmymiddlware(Authvalidation.changepasswordvalidationschema),
  Authcontroller.changepassword,
);

authrouter.post(
  '/refresh-token',
  myarmymiddlware(Authvalidation.refreshtokenvalidationschema),
  Authcontroller.refreshToken,
);

authrouter.post(
  '/forget-password',
  myarmymiddlware(Authvalidation.refreshtokenvalidationschema),
  Authcontroller.refreshToken,
);

export default authrouter;
