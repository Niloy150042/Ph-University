import { Tofferedcourse } from "./offered_course.interface"
import { offerecoursemodel } from "./offered_course.model"

const createofferedcouse = async(payload:Tofferedcourse)=>{
//   checking if the admission semester is exist or not





    const result = await offerecoursemodel.create(payload)
    return result 
}
export const offeredcourseservices ={
    createofferedcouse
}