import { Tacademic_department } from './academic_department.interface';
import { department_model } from './academic_department.model';

const createdepartmentintodb = async (
  department: Tacademic_department,
  departmentname: string,
) => {
  const isExist = await department_model.findOne({ name: departmentname });
 
  if (isExist) {
    throw new Error('Department name must be unique');
  } else {
    const result = await department_model.create(department);
    return result;
  }
};
const getalldepartment = async () => {
  const result = await department_model.find();
  return result;
};
const getsingledepartment = async (id: string) => {
  const result = await department_model.findById({ _id: id });
  return result;
};

const updateasingledepartment =async(id:string,payload:Tacademic_department)=>{
    
        const result =await department_model.findOneAndUpdate({_id :id},payload,{new:true})
        return result
    

}

export const departmentservice = {
  createdepartmentintodb,
  getalldepartment,
  getsingledepartment,updateasingledepartment
};
