import { department_model } from "../academic_department/academic_department.model"
import { faculty_model } from "../academic_faculty/academic_faculty.model"
import semesterregistraionmodel from "../semester_registration/semester_registration.model"
import { Tofferedcourse } from "./offered_course.interface"
import { offerecoursemodel } from "./offered_course.model"
import { Coursemodel } from '../courses/courses.model'

const createofferedcouse = async(payload:Tofferedcourse)=>{

//   checking if all payloads are  exist in db  or not
    
    const {semesterregistration,academic_faculty,academic_department,course}=payload

    const issemesterexist = await semesterregistraionmodel.findById(semesterregistration)
    if(!issemesterexist){
        throw  new Error ('Semester is not exist in the semester database')
    }
      const isacademicfacultyexist = await faculty_model.findById(academic_faculty)

      if(!isacademicfacultyexist){
        throw  new Error ('academic_faculty is not exist in the academic faculty database')
    }
    const isdepartmentexist = await department_model.findById(academic_department)
      if(!isdepartmentexist){
        throw  new Error ('academic department is not exist in the academic department database')
    }

    const iscourseexist = await Coursemodel.findById(course)

      if(!iscourseexist){
        throw  new Error ('course is not exist in the course database')
    }

    const academicsemester = issemesterexist.academicsemester
    
    const result = await offerecoursemodel.create({...payload,academicsemester})

    return result 
}
export const offeredcourseservices ={
    createofferedcouse
}