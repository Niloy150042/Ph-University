import mongoose from 'mongoose';
import { offerecoursemodel } from '../offered_course/offered_course.model';
import { studentmodel } from '../student/student.model';
import { TenrolledCourses } from './enrolledCourses.interface';
import EnrolledCourse from './enrolledCourses.model';

const createEnrolledCourseintoDB = async (
  userid: string,
  payload: TenrolledCourses,
) => {
  const session = await mongoose.startSession();
  try {
    const { offeredcourse } = payload;
    // using transaction and rollback

    session.startTransaction();

    const isofferedCourseExists = await offerecoursemodel.findById({
      _id: offeredcourse,
    });
    if (!isofferedCourseExists) {
      throw new Error('offerd course is not exists in DB');
    }

    if (isofferedCourseExists?.maxcapacity >= 70) {
      throw new Error('Offered course room is full');
    }

    const isstudentexists = await studentmodel.findOne(
      { id: userid },
      { _id: 1 },
    );
    if (!isstudentexists) {
      throw new Error('this student is not exists ');
    }

    // checking if the student is already enrolled or not

    const isstudentalreadyenrolled = await EnrolledCourse.findOne({
      semesterRegistration: isofferedCourseExists.semesterregistration,
      academicSemester: isofferedCourseExists.academicsemester,
      student: isstudentexists._id,
    });

    if (isstudentalreadyenrolled) {
      throw new Error('this student has already enrolled to the course');
    }

    // check total creadits exceeds maxcredtits or not

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isofferedCourseExists.semesterregistration,
          academicSemester: isofferedCourseExists.academicsemester,
          academicFaculty: isofferedCourseExists.academic_faculty,
          academicDepartment: isofferedCourseExists.academic_department,
          offeredcourse: offeredcourse,
          course: isofferedCourseExists.course,
          student: isstudentexists._id,
          faculty: isofferedCourseExists.academic_faculty,
          isEnrolled: true,
          iscompleted: false,
        },
      ],
      { session },
    );

    const maxcapacity = isofferedCourseExists.maxcapacity - 1;
    await offerecoursemodel.findByIdAndUpdate(
      offeredcourse,
      {
        maxcapacity: maxcapacity - 1,
      },
      { session },
    );
    // amar write operation ekhanei shesh hoise ... tai commit ...
    await session.commitTransaction();
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw new Error(`transaction is abborted --->${err}`);
  } finally {
    session.endSession();
  }
};

export const enrolledCourseServie = {
  createEnrolledCourseintoDB,
};
