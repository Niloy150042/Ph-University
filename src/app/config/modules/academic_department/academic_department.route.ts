import express from 'express';
import myarmymiddlware from '../utils/validationrequest';

import { departmentcontroller } from './academic_department.controller';
import { academic_department_validation } from './academic_department.validation';

const departmentrouter = express.Router();

departmentrouter.post(
  '/create-department',
  myarmymiddlware(academic_department_validation),
  departmentcontroller.createdepartment,
);

departmentrouter.get('/get-departments', departmentcontroller.getalldepartment);
departmentrouter.get(
  '/get-singledepartment/:id',
  departmentcontroller.getasingledepartment,
);
departmentrouter.patch(
  '/update-department/:id',
  departmentcontroller.updatedepartment,
);

export default departmentrouter;
