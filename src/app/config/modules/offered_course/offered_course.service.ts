import { Tofferedcourse } from "./offered_course.interface"
import { offerecoursemodel } from "./offered_course.model"

const createofferedcouse = async(payload:Tofferedcourse)=>{
    const result = await offerecoursemodel.create(payload)
    return result 
}
export const offeredcourseservices ={
    createofferedcouse
}