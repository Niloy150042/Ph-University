import { department_model } from "../academic_department/academic_department.model"
import { faculty_model } from "../academic_faculty/academic_faculty.model"
import semesterregistraionmodel from "../semester_registration/semester_registration.model"
import { Tofferedcourse } from "./offered_course.interface"
import { offerecoursemodel } from "./offered_course.model"
import { Coursemodel } from '../courses/courses.model'


const createofferedcouse = async(payload:Tofferedcourse)=>{

//   checking if all payloads are  exist in db  or not
    
    const {semesterregistration,academic_faculty,academic_department,course,section,days,startTime,endTime}=payload

    const issemesterexist = await semesterregistraionmodel.findById(semesterregistration)
    if(!issemesterexist){
        throw new Error ('Semester is not exist in the semester database')
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
        throw new Error ('course is not exist in the course database')
    }

    const academicsemester = issemesterexist.academicsemester

    // check if the department is belong to the facutly 

    const isdepertmentbelongtofaculty = await department_model.findOne({ academic_faculty, _id:academic_department})
    if(!isdepertmentbelongtofaculty){
        throw new Error('department is not belong to faculty')
    }
    const isofferedcoursealreadyexistwithsection = await offerecoursemodel.findOne ({section})

 
    // checking the time confliction of the academic faculty with same time 


    const assignschedules = await offerecoursemodel.find({semesterregistration,days}).
    select('days startTime endTime')
    console.log(assignschedules);
    
    const newschedules={
      days,startTime,endTime
    }
  //  console.log(newschedules);
   assignschedules.forEach((schedule)=>{
    if((schedule.startTime ==newschedules.startTime && schedule.endTime == newschedules.endTime)||(newschedules.startTime<schedule.startTime && newschedules.endTime<schedule.endTime))
      throw new Error('please try to take class in new schedule ')

   })

    if(!isofferedcoursealreadyexistwithsection){
         const result = await offerecoursemodel.create({...payload,academicsemester})
       return result 
    }
    else{
        throw new Error ('course cannot offer in same section')
    }
   
}
export const offeredcourseservices ={
    createofferedcouse
}