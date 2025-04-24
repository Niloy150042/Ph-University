import { student } from '../student/student.interface';
import { studentmodel } from '../student/student.model';
import { Tuser } from './user.interface';
import usermodel from './user.model';

const createstudentintodb = async (student: student, password: string) => {
  //    jodi postman /client theke password na diye default pass diye dey
  const userdata: Partial<Tuser> = {};

  userdata.password = password || (process.env.DEFAULT_PASS as string);
  //   menually generated id
  const id = '2030100001';
  userdata.id = id;

  userdata.role = 'student';

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
