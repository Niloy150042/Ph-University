import express from 'express';
import { coursecontroller } from './courses.controller';
import myarmymiddlware from '../utils/validationrequest';
import updatevalidationschema, {
  facultyvalidationschema,
} from './courses.validation';
import auth from '../utils/auth';
import { USER_ROLE } from '../user/user.constant';

const courserouter = express.Router();
courserouter.post(
  '/create-course',
  auth(USER_ROLE.admin),
  myarmymiddlware(updatevalidationschema),
  coursecontroller.createcourse,
);
// jodi kono docutment na thake tahole first create koro then update koro
courserouter.put(
  '/:courseID/assign-faculties',
  auth(USER_ROLE.admin),
  myarmymiddlware(facultyvalidationschema),
  coursecontroller.assignfacultyandcourse,
);
courserouter.delete(
  '/:courseID/delete-faculties',
  auth(USER_ROLE.admin),
  coursecontroller.removefacultyfromcourse,
);

courserouter.get(
  '/get-courses',
  auth(USER_ROLE.admin),
  coursecontroller.findallcourse,
);
courserouter.get(
  '/get-single-course/:id',
  auth(USER_ROLE.admin),
  coursecontroller.getasinglecourse,
);
courserouter.patch(
  '/update-course/:id',
  auth(USER_ROLE.admin),
  myarmymiddlware(updatevalidationschema),
  coursecontroller.updatecourse,
);
courserouter.patch('/delete-course/:id', coursecontroller.deletecourse);

export default courserouter;
