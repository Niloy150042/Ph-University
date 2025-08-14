import express from 'express';
import myarmymiddlware from '../utils/validationrequest';
import { enrolledCourseValidation } from './enrolledCourses.validation';
import { enrolledCourseController } from './enrolledCourses.controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  myarmymiddlware(
    enrolledCourseValidation.cerateEnrolledCourseValidationSchema,
  ),
  enrolledCourseController.createEnrolledCourse,
);

export const enrolledCourseRouter = router;
