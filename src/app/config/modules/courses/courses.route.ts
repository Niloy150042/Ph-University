import express from 'express';
import { coursecontroller } from './courses.controller';
import myarmymiddlware from '../utils/validationrequest';
import updatevalidationschema, {
  facultyvalidationschema,
} from './courses.validation';

const courserouter = express.Router();
courserouter.post(
  '/create-course',
  myarmymiddlware(updatevalidationschema),
  coursecontroller.createcourse,
);
// jodi kono docutment na thake tahole first create koro then update koro 
courserouter.put(
  '/:courseID/assign-faculties',
  myarmymiddlware(facultyvalidationschema),
  coursecontroller.assignfacultyandcourse,
);
courserouter.delete(
    '/:courseID/delete-faculties',
    coursecontroller.removefacultyfromcourse,
  );

courserouter.get('/get-courses', coursecontroller.findallcourse);
courserouter.get('/get-single-course/:id', coursecontroller.getasinglecourse);
courserouter.patch(
  '/update-course/:id',
  myarmymiddlware(updatevalidationschema),
  coursecontroller.updatecourse,
);
courserouter.patch('/delete-course/:id', coursecontroller.deletecourse);

export default courserouter;
