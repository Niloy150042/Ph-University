import { Tacademic_semester } from "../academicsemester/academic_semester.interface";

export  const generatestudentid = (semester: Tacademic_semester) => {
    const  currentid = (0).toString()
    let  incrementid=  (Number(currentid)+1).toString().padStart(4,'0')
    incrementid = `${semester.year}${semester.code}${incrementid}`
    return incrementid

};