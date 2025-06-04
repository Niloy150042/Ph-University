import express from 'express';
import { admincontroller } from './admin.controller';
import myarmymiddlware from '../utils/validationrequest';
import adminvalidationschema from './admin.validation';
const adminrouter = express.Router();

adminrouter.post(
  '/create-admin',
  myarmymiddlware(adminvalidationschema),
  admincontroller.createadmin,
);



export default adminrouter;
