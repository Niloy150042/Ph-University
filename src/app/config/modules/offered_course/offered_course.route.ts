import express from 'express';
import myarmymiddlware from '../utils/validationrequest';
import { offercoursezodshape } from './offered_coures.validation';
import { offerecoursecontroller } from './offered_course.controller';
 const offered_course_router = express.Router()

offered_course_router.post(
  '/create-offered-courses',
  myarmymiddlware(offercoursezodshape),
  offerecoursecontroller.createofferedcourse,
);

offered_course_router.get('/')

export default offered_course_router

