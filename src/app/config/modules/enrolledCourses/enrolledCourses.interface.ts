import { Types } from 'mongoose';

export type TGrade = 'A' | 'B' | 'c' | 'D' | 'E' | 'F' | 'NA';

export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};

export type TenrolledCourses = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offeredcourse: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: TGrade;
  gradePoint: number;
  iscompleted: boolean;
};
