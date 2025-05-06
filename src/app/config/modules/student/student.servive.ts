import { student } from "./student.interface";
import { studentmodel } from "./student.model";
const createstudentintodb = async (student:student)=>{
     const result = await studentmodel.create(student) // mongoose built in static method
     return result
}
const getallstudentfromdb = async(query)=>{
    const queryobj = {...query}
//  console.log(queryobj);
//   console.log(query);
    let  searchterm =''
    if(query.SearchTerm){
        searchterm=query.SearchTerm
    }
    // console.log(searchterm);

  const studentsearchablefield =['email', 'name.firstname','name.lastname','gender','avatar','bloodgroup','persentaddress']
   const searchquery =studentmodel.find(
        {
            $or:studentsearchablefield.map((field)=>({
                [field]:{$regex:searchterm , $options: 'i'}
            }))
        }
    )
    const removefields = ['SearchTerm','sort','limit']
    // console.log(removefields);
    removefields.forEach((el)=>delete queryobj[el]);
    console.log(query);
    console.log(queryobj);

    const filterquery  =  searchquery.find(queryobj) .populate('admissionsemester').populate({
        path:'academicdepartment',
        populate:{
            path:'academic_faculty'
        }
    })

 let sort = 'createdAt'
 if (query.sort){
    sort=query.sort
    console.log(sort); 
 }
const sortquery = filterquery.sort(sort)

let limit =1
if(query.limit){
    limit = query.limit 
}
const limitquery =  await sortquery.limit(limit)
    return limitquery

}

const getasinglestudent =async(id)=>{
    const result =await studentmodel.findOne({_id:id})
    return result
}

export  const studentservices ={
    createstudentintodb,getallstudentfromdb,getasinglestudent
}