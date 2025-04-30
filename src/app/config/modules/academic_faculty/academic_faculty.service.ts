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

const getasinglefaculty =async(id:string)=>{
    const result = await faculty_model.findById({_id:id})
    return result
}

const updatesinglefaculty =async(id:string ,  payload: Partial<Tacademic_faculty>)=>{
   
    const result =faculty_model.findOneAndUpdate({_id:id} ,payload,{new:true})
    return result 
}

export const facultyservie = {
  createacademicfacultyintodb,
  getallfaculties,
  getasinglefaculty,updatesinglefaculty
};
