import { Tacademic_semester } from '../academicsemester/academic_semester.interface';
import { user } from '../user.model';

const laststudentid = async () => {
  const laststudent = await user
    .findOne({ role: 'student' })
    .lean()
    .sort({ createdAt: -1 });

  return laststudent?.id ? laststudent.id.substring(6) : undefined;
};

export const generatestudentid = async (semester: Tacademic_semester) => {
  const currentid = (await laststudentid()) || (0).toString();
  let incrementid = (Number(currentid) + 1).toString().padStart(4, '0');
  incrementid = `${semester.year}${semester.code}${incrementid}`;
  return incrementid;
};
