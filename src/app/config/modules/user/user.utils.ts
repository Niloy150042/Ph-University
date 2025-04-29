import { Tacademic_semester } from '../academicsemester/academic_semester.interface';
import { user } from '../user.model';

const laststudentid = async (semester: Tacademic_semester) => {
  const semesterPrefix = `${semester.year}${semester.code}`; // e.g. 203001

  const laststudent = await user
    .findOne(
      {
        role: 'student',
        id: { $regex: `^${semesterPrefix}` }, // Only match IDs starting with this semester+code
      },
      { id: 1, _id: 0 }
    )
    .lean()
    .sort({ createdAt: -1 });

  return laststudent?.id ? laststudent.id : undefined;
};

export const generatestudentid = async (semester: Tacademic_semester) => {
  const currentid = (0).toString().padStart(4, '0'); // 0000
  const lastenrlledstudentid = await laststudentid(semester);

  if (lastenrlledstudentid) {
    // Same semester, increment the last 4 digits
    const  incrementid = (Number(lastenrlledstudentid.slice(6, 10)) + 1)
      .toString()
      .padStart(4, '0');

    return `${semester.year}${semester.code}${incrementid}`;
  } else {
    // No student exists in this semester yet, start from 0001
    const incrementid = (Number(currentid) + 1).toString().padStart(4, '0');
    return `${semester.year}${semester.code}${incrementid}`;
  }
};
