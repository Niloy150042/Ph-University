import { Tacademic_semester } from './academic_semester.interface';
import { semestermodel } from './academic_semseter.model';

const createsemesterintodb = async (semester: Tacademic_semester) => {
  const result = await semestermodel.create(semester);
  return result;
};

const getallsemesterfromdb =async ()=>{
  const result =await semestermodel.find()
  return result
}

export const createsemesters = {
  createsemesterintodb,
  getallsemesterfromdb
};
