import express from 'express';
import myarmymiddlware from '../utils/validationrequest';
import { faculty_validation } from './academic_faculty.validation';
import { facultycontroller } from './academic_faculty.controller';

const facultyrouter = express.Router();

facultyrouter.post(
  '/create-academic-faculty',
  myarmymiddlware(faculty_validation.academic_faculty_validationschema),
  facultycontroller.createacademicfaculty,
);

facultyrouter.get('/get-faculties', facultycontroller.getfaculties);

facultyrouter.get(
  '/get-single-faculty/:id',
  facultycontroller.getasinglefaculty,
);
facultyrouter.patch(
  '/update-single-faculty/:id',
  facultycontroller.updateasinglefaculty,
);

export default facultyrouter;
