import { student } from '../student/student.interface';
import {  Tuser } from './user.interface';
import usermodel from './user.model';

const createstudentintodb = async (password: string, student: student) => {
  //    jodi postman /client theke password na diye default pass diye dey
  const userdata: Partial<Tuser> = {};

  userdata.password = password || (process.env.DEFAULT_PASS as string);
  //   menually generated id
  const id = '2030100001';
  userdata.id = id;

  userdata.role = 'student';

  const result = await usermodel.create(userdata);
//   create a student
if(Object.keys(result).length){
    student.id=userdata.id
    student.user =result._id
}

  return result;
};
export const userservice = {
  createstudentintodb,
};
