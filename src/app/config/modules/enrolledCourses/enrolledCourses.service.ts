import EnrolledCourse from "./enrolledCourses.model"

const createEnrolledCourseintoDB = async()=>{
    const result = await EnrolledCourse.create()
    return result

}

export const enrolledCourseServie ={
    createEnrolledCourseintoDB
}