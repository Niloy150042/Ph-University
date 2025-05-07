
import { Tcourses } from "./courses.interface"
import { course } from "./courses.model"

const createcourseintodb = async(course :Tcourses)=>{
    const result = await course.create(course)
    return result
}
const getallcourses = async()=>{
    const result = await course.find()
    return result

}
const getasinglecourse = async(id)=>{
    const result = await course.findById(id)
    return result 
}
const updatesinglecourse = async( id ,payload)=>{
    const result = await course.findByIdAndUpdate({id} , payload ,{new:true})
    return result 
}
const deletecourse = async(id)=>{
    const result = await course.findOneAndUpdate({id},{isdeleted:true},{new:true})
    return result
}
export const courseservices = {
    createcourseintodb,
    getallcourses,
    getasinglecourse,
    updatesinglecourse,
    deletecourse
}