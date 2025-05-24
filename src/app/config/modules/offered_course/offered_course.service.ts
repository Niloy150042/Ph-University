import { semestermodel } from "../academicsemester/academic_semseter.model"
import { Tofferedcourse } from "./offered_course.interface"
import { offerecoursemodel } from "./offered_course.model"

const createofferedcouse = async(payload:Tofferedcourse)=>{
//   checking if the admission semester is exist or not
    const academiscsemesterexist =  await semestermodel.findById({_id:payload.academicsemester})
    if(!academiscsemesterexist){
        throw new Error(`your ${payload.academicsemester} doesnt exist on semester database`)
    }
    
    const result = await offerecoursemodel.create(payload)
    return result 
}
export const offeredcourseservices ={
    createofferedcouse
}