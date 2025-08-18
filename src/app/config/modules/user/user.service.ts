import mongoose from 'mongoose';
import { Tacademic_semester } from '../academicsemester/academic_semester.interface';
import { semestermodel } from '../academicsemester/academic_semseter.model';
import { student } from '../student/student.interface';
import { studentmodel } from '../student/student.model';
import { Tuser } from './user.interface';
import usermodel from './user.model';
import { generatestudentid } from './user.utils';
import { JwtPayload } from 'jsonwebtoken';
import { adminmodel } from '../admin/admin.model';
import { faculty_model } from '../academic_faculty/academic_faculty.model';
import { sendImageToCloudinary } from '../utils/sendImgaeToCloudinary';

const createstudentintodb = async (
  file: Express.Multer.File | undefined,
  student: student,
  password: string,
) => {
  const userdata: Partial<Tuser> = {};

  if (!student.email) {
    throw new Error('Email is required for creating a student');
  }
  userdata.email = student.email;

  userdata.password = password || (process.env.DEFAULT_PASS as string);
  userdata.role = 'student';

  const admissionsemester = await semestermodel.findById(
    student.admissionsemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userdata.id = await generatestudentid(
      admissionsemester as Tacademic_semester,
    );

    if (file) {
      const { path } = file;
      const imagename = `${userdata.id}-${student.name.firstname}`;
      const image = await sendImageToCloudinary(imagename, path);
      student.profileimage = image?.secure_url;
    }

    // hosting profileimage url to cloudinary ->

    const newuser = await usermodel.create([userdata], { session });
    if (!newuser) {
      throw new Error('user is not created successfully');
    }

    student.id = newuser[0].id;
    student.user = newuser[0]._id;

    const newstudent = await studentmodel.create([student], { session });
    if (!newstudent) {
      throw new Error('student is not created successfully');
    }

    await session.commitTransaction();
    return newstudent;
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction(); // Fix 2: Proper rollback
    }
    throw new Error(`transaction is aborted ${err}`);
  } finally {
    session.endSession(); // Always close session
  }
};

const deleteuserfromdb = async (id: string) => {
  // session initialization
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteuser = await usermodel.findOneAndUpdate(
      { id: Number(id) },
      { $set: { isdeleted: true } },
      { new: true, session },
    );
    if (!deleteuser) {
      throw new Error('user is not deleted ');
    }

    const deletestudent = await studentmodel.findOneAndUpdate(
      { id: Number(id) },
      { $set: { isdeleted: true } },
      { new: true, session },
    );

    if (!deletestudent) {
      throw new Error('student is not deleted');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletestudent;
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction(); // ✅ Abort only if session is still active
    }
    session.endSession();
  }
};

const getmeservice = async (payload: JwtPayload) => {
  let result = null;
  if (payload.data.role == 'student') {
    return (result = await studentmodel.findOne({ id: payload.data.id }));
  }
  if (payload.data.role == 'admin') {
    return (result = await adminmodel.findOne({ id: payload.data.id }));
  }
  if (payload.data.role == 'faculty') {
    return (result = await faculty_model.findOne({ id: payload.data.id }));
  }
};

export const userservice = {
  createstudentintodb,
  deleteuserfromdb,
  getmeservice,
};
