import mongoose from 'mongoose';
import { offerecoursemodel } from '../offered_course/offered_course.model';
import { studentmodel } from '../student/student.model';
import { TenrolledCourses } from './enrolledCourses.interface';
import EnrolledCourse from './enrolledCourses.model';
import semesterregistraionmodel from '../semester_registration/semester_registration.model';
import { Coursemodel } from '../courses/courses.model';

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

    // if (!isstudentexists) {
    //   throw new Error('this student is not exists ');
    // }

    // checking if the student is already enrolled or not

    // const isstudentalreadyenrolled = await EnrolledCourse.findOne({
    //   semesterRegistration: isofferedCourseExists.semesterregistration,
    //   academicSemester: isofferedCourseExists.academicsemester,
    //   student: isstudentexists?._id,
    // });

    // if (isstudentalreadyenrolled) {
    //   throw new Error('this student has already enrolled to the course');
    // }

    // ami jei course tate enroll korte jacchi tar credit ...
    const isSemesterRegestrationexist = await semesterregistraionmodel
      .findById(
        {
          _id: isofferedCourseExists.semesterregistration,
        },
        { _id: -1 },
      )
      .select('maxcredit');
    console.log(
      'enroll kora course credit ',
      isSemesterRegestrationexist?.maxcredit,
    );

    // retriving enrolled course creadit for that student

    const enrolledCourseCredit = await Coursemodel.findById(
      { _id: isofferedCourseExists.course },
      { credits: 1, _id: -1 },
    );

    // retriving  all enrolled course credit for that student

    const isEnrolledCourses = await EnrolledCourse.aggregate([
      {
        $match: {
          semesterRegistration: isofferedCourseExists.semesterregistration,
          student: isstudentexists?._id,
        },
      },

      {
        $lookup: {
          from: 'courses', // related collection name (model er collection name check kore niben)
          localField: 'course',
          foreignField: '_id',
          as: 'enrolledcoursedetails',
        },
      },
      {
        $unwind: '$enrolledcoursedetails',
      },
      {
        $project: {
          _id: 0, // hide EnrolledCourse _id
          credits: '$enrolledcoursedetails.credits', // only credits field show
        },
      },
      {
        $group: {
          _id: null,
          totalEnrolledCredits: { $sum: '$credits' },
        },
      },
      {
        $project: {
          _id: 0, // hide EnrolledCourse _id
          totalEnrolledCredits: 1, // only credits field show
        },
      },
    ]);
    console.log('amar enrolled credits', isEnrolledCourses);

    // check total creadits exceeds maxcredtits or not

    const totalcredits =
      isEnrolledCourses.length > 0
        ? isEnrolledCourses[0].totalEnrolledCredits
        : 0;
    // console.log( 'tota credits', totalcredits);
    // console.log('enrolled kora course creadit',enrolledCourseCredit?.credits);

    // console.log(totalcredits+enrolledCourseCredit?.credits);

    if (
      totalcredits &&
      isSemesterRegestrationexist &&
      totalcredits + enrolledCourseCredit?.credits >
        isSemesterRegestrationexist?.maxcredit
    ) {
      throw new Error('Credits limits exceed');
    }

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isofferedCourseExists.semesterregistration,
          academicSemester: isofferedCourseExists.academicsemester,
          academicFaculty: isofferedCourseExists.academic_faculty,
          academicDepartment: isofferedCourseExists.academic_department,
          offeredcourse: offeredcourse,
          course: isofferedCourseExists.course,
          student: isstudentexists?._id,
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
    return null;
  } catch (err) {
    await session.abortTransaction();
    throw new Error(`transaction is abborted --->${err}`);
  } finally {
    session.endSession();
  }
};

const updateEnrolledCourseMarksintoDB = async (
  payload: Partial<TenrolledCourses>,
  adminId: string,
) => {
  const { semesterRegistration, offeredcourse, student, courseMarks } = payload;
  // check if they are exist into db or not
  const isSemesterRegistrationExist = await semesterregistraionmodel.findById({
    _id: semesterRegistration,
  });
  if (!isSemesterRegistrationExist) {
    throw new Error('Semseter registration is not exist in DB');
  }
  const isOfferedCourseExist = await offerecoursemodel.findById(offeredcourse);
  if (!isOfferedCourseExist) {
    throw new Error('offeredcourse  is not exist in DB');
  }

  const isStudentExist = await studentmodel.findById(student);
  if (!isStudentExist) {
    throw new Error('student  is not exist in DB');
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }
  const result = await EnrolledCourse.findOneAndUpdate(
    { semesterRegistration },
    modifiedData,
    { new: true },
  );
  return result;
};

export const enrolledCourseServie = {
  createEnrolledCourseintoDB,
  updateEnrolledCourseMarksintoDB,
};
