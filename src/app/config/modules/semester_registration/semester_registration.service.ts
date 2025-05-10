import { semestermodel } from "../academicsemester/academic_semseter.model"
import { Tsemesterregistration } from "./semester_registration.interface"
import semesterregistraionmodel from "./semester_registration.model"

const createsemesterregistrationintodb = async(payload :Tsemesterregistration)=>{
  const academicsemester = payload.academicsemester
  // checking is there semester named this objectid into db ?
  const issemesterexist = await semestermodel.findOne(academicsemester)
  if(!issemesterexist){
    throw new Error ('there are no semester in this name')
  }

  const issemesterregistered = await semesterregistraionmodel.findOne(academicsemester)
  if(issemesterregistered){
    throw new Error ('this semester is already registered')
  }
  else{
    const result = await semesterregistraionmodel.create(payload)
    return result 
  }


}

export const semesterregistraionservice ={
    createsemesterregistrationintodb
}