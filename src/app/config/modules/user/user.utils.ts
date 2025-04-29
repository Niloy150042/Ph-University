import { Tacademic_semester } from '../academicsemester/academic_semester.interface';
import { user } from '../user.model';

const laststudentid = async () => {
  const laststudent = await user
    .findOne({ role: 'student' })
    .lean()
    .sort({ createdAt: -1 });
  //2030 01 0001

  return laststudent?.id ? laststudent.id : undefined;
};
export const generatestudentid = async (semester: Tacademic_semester) => {
  const  currentid = (0).toString().padStart(4,'0')//0000
  const lastenrlledstudentid = await laststudentid();

  if (lastenrlledstudentid) {
    
    const laststudentsemestercode = lastenrlledstudentid.slice(4, 6);
    const lastsemesteryear = lastenrlledstudentid.slice(0, 4);
    if (
      semester.year == lastsemesteryear &&
      semester.code == laststudentsemestercode
    ) {
      let incrementid = (Number(lastenrlledstudentid.slice(6,10)) + 1).toString().padStart(4, '0')
     return  incrementid = `${semester.year}${semester.code}${incrementid}`;
      
    } 
    else {
    
      const  incrementid = (Number(currentid) + 1).toString().padStart(4, '0');
      // console.log( (`${semester.year}${semester.code}${incrementid}`)); 
      return (`${semester.year}${semester.code}${incrementid}`) 
  
    }
  }
    else {
    
    const  incrementid = (Number(currentid) + 1).toString().padStart(4, '0');
    // console.log( (`${semester.year}${semester.code}${incrementid}`)); 
    return (`${semester.year}${semester.code}${incrementid}`) 

  }
 
};
