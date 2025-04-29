
import { Tacademic_semester } from './academic_semester.interface';
import { semestermodel } from './academic_semseter.model';
import { ObjectId } from 'mongoose';

const createsemesterintodb = async (semester: Tacademic_semester) => {
  const result = await semestermodel.create(semester);
  return result;
};

const getallsemesterfromdb = async () => {
  const result = await semestermodel.find();
  return result;
};

const getasinglesemesterfromdb = async () => {
  const result = await semestermodel.findOne();
  return result;
};

const updateasinglesemesterfromdb = async (id: string, updatedata) => {
  const result = await semestermodel
    .find()
    .updateMany({ _id: id }, { $set: { name: 'summer', code: '03' } });
  return result;
};

export const createsemesters = {
  createsemesterintodb,
  getallsemesterfromdb,
  getasinglesemesterfromdb,
  updateasinglesemesterfromdb,
};
