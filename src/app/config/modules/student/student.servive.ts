import { student } from "./student.interface";
import { studentmodel } from "./student.model";
const createstudentintodb = async (student:student)=>{
     const result = await studentmodel.create(student) // mongoose built in static method
     return result
}
const getallstudentfromdb = async(query)=>{
    let  searchterm =''
    if(query.SearchTerm){
        searchterm=query.SearchTerm
    }
    const result = await studentmodel.find(

        {
            $or:['email', 'name.firstname','name.lastname','gender','avatar','bloodgroup','persentaddress'].map((field)=>({
                [field]:{$regex:searchterm , $options: 'i'}
            }))
        }

    ).populate('admissionsemester').populate({
        path:'academicdepartment',
        populate:{
            path:'academic_faculty'
        }
    })
    return result
}

const getasinglestudent =async(id)=>{
    const result =await studentmodel.findOne({_id:id})
    return result
}

export  const studentservices ={
    createstudentintodb,getallstudentfromdb,getasinglestudent
}