
import { Tcourses } from "./courses.interface"
import { course } from "./courses.model"

const createcourseintodb = async(coursedata :Tcourses)=>{
    const result = await course.create(coursedata)
    return result
}
const getallcourses = async()=>{
    const result = await course.find().populate('preRequisitecourse.course')
    return result
}
const getasinglecourse = async(id)=>{
    const result = await course.findById(id).populate('preRequisitecourse.course')
    return result 
}
const updatesinglecourse = async( id ,payload :Partial<Tcourses>)=>{
     const {preRequisitecourse , ...courseremainingdata} =payload
    const updatebasicourseinfo= await course.findByIdAndUpdate({_id:id},courseremainingdata ,{new:true})
    const deleteprerequisitecourse = preRequisitecourse?.filter(el=>el.course && el.isdeleted).map(el=>el.course)
    const updateprereqquisitecoursefromdb = await course.findByIdAndUpdate({_id:id} ,{
        $pull:{preRequisitecourse:{course:{$in:deleteprerequisitecourse}}}
    } )
    return updatebasicourseinfo
}
const deletecourse = async(id:string)=>{
    const result = await course.findOneAndUpdate({_id:id},{isdeleted:true},{new:true})
    return result
}
export const courseservices = {
    createcourseintodb,
    getallcourses,
    getasinglecourse,
    updatesinglecourse,
    deletecourse
}