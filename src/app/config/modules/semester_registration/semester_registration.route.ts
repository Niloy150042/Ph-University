import express from 'express';
import myarmymiddlware from '../utils/validationrequest';
import { semesterregistrationcontroller } from './semeste_registration.controller';
import semesterregistrationvalidation from './semester_registration.validation';

const semester_registarion_router = express.Router();

semester_registarion_router.post(
  '/create-semester-registration',
  myarmymiddlware(semesterregistrationvalidation),
  semesterregistrationcontroller.createsemesterregistration,
);

export default semester_registarion_router;
