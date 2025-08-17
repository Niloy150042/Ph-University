import express from 'express';
import myarmymiddlware from '../utils/validationrequest';
import { enrolledCourseValidation } from './enrolledCourses.validation';
import { enrolledCourseController } from './enrolledCourses.controller';
import auth from '../utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',auth(USER_ROLE.student),
  myarmymiddlware(
    enrolledCourseValidation.cerateEnrolledCourseValidationSchema,
  ),
  enrolledCourseController.createEnrolledCourse,
);

router.patch('/update-course-marks', auth(USER_ROLE.admin),myarmymiddlware(enrolledCourseValidation.updateEnrolledCourseValidationSchema),enrolledCourseController.updateEnrolledCourseMarks)

export const enrolledCourseRouter = router;
