import express from 'express';
import studentrouter from '../modules/student/student.route';
import userrouter from '../modules/user/user.route';
import semesterrouter from '../modules/academicsemester/academic_semester.route';
import facultyrouter from '../modules/academic_faculty/academic_faculty.route';
import departmentrouter from '../modules/academic_department/academic_department.route';
import courserouter from '../modules/courses/courses.route';
import semester_registarion_router from '../modules/semester_registration/semester_registration.route';
import offered_course_router from '../modules/offered_course/offered_course.route';
import adminrouter from '../modules/admin/admin.route';
import authrouter from '../modules/Authentication/auth.route';

const router = express.Router();

const modulerouter = [
  {
    path: '/students',
    route: studentrouter,
  },
  {
    path: '/users',
    route: userrouter,
  },
  {
    path: '/academic-semesters',
    route: semesterrouter,
  },
  {
    path: '/faculty-router',
    route: facultyrouter,
  },
  {
    path: '/department-router',
    route: departmentrouter,
  },
  {
    path: '/courses',
    route: courserouter,
  },
  {
    path: '/semester-registration',
    route: semester_registarion_router,
  },
  {
    path: '/offered-course',
    route: offered_course_router,
  },
  {
    path: '/authentication',
    route: authrouter,
  },
  {
    path: '/admin',
    route: adminrouter,
  },
];
modulerouter.forEach(route => router.use(route.path, route.route));

// router.use('/students',studentroutes), router.use('/users',userroutes)

export default router;
