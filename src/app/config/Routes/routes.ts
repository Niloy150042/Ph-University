import express from 'express';
import studentrouter from '../modules/student/student.route';
import userrouter from '../modules/user/user.route';
import semesterrouter from '../modules/academicsemester/academic_semester.route';
import facultyrouter from '../modules/academic_faculty/academic_faculty.route';
import departmentrouter from '../modules/academic_department/academic_department.route';


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
    path:'/faculty-router',
    route:facultyrouter
  },
  {
  path:'/department-router',
  route:departmentrouter
  }
];

modulerouter.forEach(route => router.use(route.path, route.route));
// router.use('/students',studentroutes),   router.use('/users',userroutes)

export default router;
