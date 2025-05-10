import { semestermodel } from "../academicsemester/academic_semseter.model"
import { Tsemesterregistration } from "./semester_registration.interface"
import semesterregistraionmodel from "./semester_registration.model"

const createsemesterregistrationintodb = async(payload :Tsemesterregistration)=>{

  const academicsemester = payload.academicsemester
  console.log(academicsemester);

  const isthereanyrunningsemester = await semesterregistraionmodel.findOne({
    $or:[{status:"UPCOMING"},{status:"ONGOING"}]
    
  })
  if(isthereanyrunningsemester){
    throw new Error (` your ${isthereanyrunningsemester.status} semester is already running , you cant enter another semester registration untill its end `)
  }

  // checking is there semester named this objectid into db ?
  const issemesterexist = await semestermodel.findOne({_id:academicsemester})
  
  if(!issemesterexist){
    throw new Error ('there are no semester in this name')
  }

  const issemesterregistered = await semesterregistraionmodel.findOne({academicsemester})


  if(issemesterregistered){
    throw new Error ('this semester is already registered')
  }
  else{
    const result = await semesterregistraionmodel.create(payload)
    return result 
  }
}
const getallregisteredsemester = async()=>{
    const result = await semesterregistraionmodel.find()
    return result 
}

const getsingleregisteredsemester = async(id)=>{
    const result = await semesterregistraionmodel.find({_id:id})
    return result 
}

const updateregesteredsemester = async(id:string,payload:Partial<Tsemesterregistration>)=>{
  const istheresmesterexist = await semesterregistraionmodel.findById({_id:id})
  if(!istheresmesterexist){
    throw new Error ('there are no semester for this id into database ')
  }
  if(istheresmesterexist.status=='ENDED'){
    throw new Error ('Your semester has been endeed , you cant update this ')
  }
  const result = await semesterregistraionmodel.findOneAndUpdate({_id:id},payload,{new:true})
  return result 

}

export const semesterregistraionservice ={
    createsemesterregistrationintodb,
    getallregisteredsemester,
    getsingleregisteredsemester,
    updateregesteredsemester
    
}