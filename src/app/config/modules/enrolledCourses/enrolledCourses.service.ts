import { offerecoursemodel } from '../offered_course/offered_course.model';
import { studentmodel } from '../student/student.model';
import { TenrolledCourses } from './enrolledCourses.interface';
import EnrolledCourse from './enrolledCourses.model';

const createEnrolledCourseintoDB = async (
  userid: string,
  payload: TenrolledCourses,
) => {
  const { offeredcourse } = payload;

  const isofferedCourseExists = await offerecoursemodel.findById({
    id: offeredcourse,
  });
  if (!isofferedCourseExists) {
    throw new Error('offerd course is not exists in DB');
  }

  if (isofferedCourseExists?.maxcapacity <= 70) {
    throw new Error('Offered course room is full');
  }

  const isstudentexists = await studentmodel.findById({ id: userid });
  if (!isstudentexists) {
    throw new Error('this student is not exists ');
  }

  // checking if the student is already enrolled or not

  const isstudentalreadyenrolled = await EnrolledCourse.find({
    semesterRegistration: isofferedCourseExists.semesterregistration,
    academicSemester: isofferedCourseExists.academicsemester,
    student: isstudentexists._id,
  });
  if (isstudentalreadyenrolled) {
    throw new Error('this student has already enrolled to the course');
  }


  
};

export const enrolledCourseServie = {
  createEnrolledCourseintoDB,
};
