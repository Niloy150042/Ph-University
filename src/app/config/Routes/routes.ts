import experss from 'express';
import studentrouter from '../modules/student/student.route';
import userrouter from '../modules/user/user.route';

const router = experss.Router();

const modulerouter = [
  {
    path: '/students',
    route: studentrouter,
  },
  {
    path: '/users',
    route: userrouter,
  },
];

modulerouter.forEach(route => router.use(route.path, route.route));
// router.use('/students',studentroutes),   router.use('/users',userroutes)

export default router;
