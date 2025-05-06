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
    const removefields = ['SearchTerm','sort','limit','page','fields']
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
 let limit =1
if(query.limit){
    limit = Number(query.limit )
}
 let page =1 
 let skip =0

 if(query.page){
    page=Number(query.page,)
    skip = (page-1)*limit
 }

 let fields = '__v'
 if(query.fields){
   fields = query.fields.split(',').join(' ')
   console.log(fields);
 }
const sortquery = filterquery.sort(sort)
const paginatedquery = sortquery.skip(skip)

const limitquery =   paginatedquery.limit(limit)
const fieldfilterquery = await limitquery.select(fields)
return fieldfilterquery

}

const getasinglestudent =async(id)=>{
    const result =await studentmodel.findOne({_id:id})
    return result
}

export  const studentservices ={
    createstudentintodb,getallstudentfromdb,getasinglestudent
}