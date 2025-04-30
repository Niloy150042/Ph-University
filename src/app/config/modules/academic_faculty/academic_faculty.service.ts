import { Tacademic_faculty } from './academic_faculty.interface';
import { faculty_model } from './academic_faculty.model';

const createacademicfacultyintodb = async (faculty: Tacademic_faculty) => {
  const result = await faculty_model.create(faculty);
  return result;
};

const getallfaculties = async()=>{
    const result =await faculty_model.find()
    return result 

}

export const facultyservie = {
  createacademicfacultyintodb,
  getallfaculties
};
