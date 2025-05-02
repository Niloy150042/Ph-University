import mongoose from 'mongoose';
import { Tacademic_semester } from '../academicsemester/academic_semester.interface';
import { semestermodel } from '../academicsemester/academic_semseter.model';
import { student } from '../student/student.interface';
import { studentmodel } from '../student/student.model';
import { Tuser } from './user.interface';
import usermodel from './user.model';
import { generatestudentid } from './user.utils';

const createstudentintodb = async (student: student, password: string) => {
  //    jodi postman /client theke password na diye default pass diye dey
  const userdata: Partial<Tuser> = {};

  userdata.password = password || (process.env.DEFAULT_PASS as string);
  //   menually generated id

  userdata.role = 'student';

  const admissionsemester = await semestermodel.findById(
    student.admissionsemester,
  );

  // creating transaction and rollback

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userdata.id = await generatestudentid(
      admissionsemester as Tacademic_semester,
    );
    // starting transaction 1
    const newuser = await usermodel.create([userdata], { session });
    if (!newuser) {
      throw new Error('user is not created successflly');
    }
    student.id = newuser[0].id;
    student.user = newuser[0]._id;
    // starting second transaction
    const newstudent = await studentmodel.create([student], { session });
    if (!newstudent) {
      throw new Error('student is not created successflly');
    }
    session.commitTransaction();
    session.endSession();
    return newstudent;
  } catch (err){
    session.abortTransaction();
    session.endSession();
    throw new Error(`transaction is aborted ${err}`)
  }

  //   create a student
};
export const userservice = {
  createstudentintodb,
};
