import semesterregistraionmodel from "../semester_registration/semester_registration.model"
import { Tofferedcourse } from "./offered_course.interface"
import { offerecoursemodel } from "./offered_course.model"

const createofferedcouse = async(payload:Tofferedcourse)=>{
//   checking if the admission semester is exist or not
    
    const {semesterregistration,academic_faculty,academic_department,course}=payload

    const issemesterexist = await semesterregistraionmodel.findById(semesterregistration)
    if(!issemesterexist){
        throw  new Error ('Semester is not exist in the semester database')
    }
      if(!academic_faculty){
        throw  new Error ('academic_faculty is not exist in the academic faculty database')
    }
      if(!academic_department){
        throw  new Error ('academic department is not exist in the academic department database')
    }
      if(!course){
        throw  new Error ('course is not exist in the course database')
    }
    

    const result = await offerecoursemodel.create(payload)
    return result 
}
export const offeredcourseservices ={
    createofferedcouse
}