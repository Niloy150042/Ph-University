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

  userdata.id =  await generatestudentid(admissionsemester as Tacademic_semester);


  const newuser = await usermodel.create(userdata);

  //   create a student
  if (Object.keys(newuser).length) {
    student.id = newuser.id;
    student.user = newuser._id;
    const newstudent = await studentmodel.create(student);
    return newstudent;
  }
};
export const userservice = {
  createstudentintodb,
};
