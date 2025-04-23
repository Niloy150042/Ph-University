import { student } from "./student.interface";
import { studentmodel } from "./student.model";


const createstudentintodb = async (student:student)=>{
     const result = await studentmodel.create(student) // mongoose built in static method
     return result
}

const getallstudentfromdb = async()=>{
    const result = await studentmodel.find()
    return result

}

const getasinglestudent =async(id)=>{
    const result =await studentmodel.findOne({id})
    return result
}

export  const studentservices ={
    createstudentintodb,getallstudentfromdb,getasinglestudent
}