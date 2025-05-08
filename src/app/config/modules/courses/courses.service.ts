import mongoose from 'mongoose';
import { Tcoursefaculty, Tcourses } from './courses.interface';
import { course, coursefaculty } from './courses.model';

const createcourseintodb = async (coursedata: Tcourses) => {
  const result = await course.create(coursedata);
  return result;
};
const getallcourses = async () => {
  const result = await course.find().populate('preRequisitecourse.course');
  return result;
};
const getasinglecourse = async id => {
  const result = await course
    .findById(id)
    .populate('preRequisitecourse.course');
  return result;
};
const updatesinglecourse = async (id, payload: Partial<Tcourses>) => {
  const { preRequisitecourse, ...courseremainingdata } = payload;

  // starting transaction

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatebasicourseinfo = await course.findByIdAndUpdate(
      { _id: id },
      courseremainingdata,
      { new: true, session },
    );

    if (!updatebasicourseinfo) {
      throw new Error('failed to update basiccourse information');
    }

    if (preRequisitecourse && preRequisitecourse.length > 0) {
      const deleteprerequisitecourse = preRequisitecourse
        ?.filter(el => el.course && el.isdeleted)
        .map(el => el.course);

      const updateprereqquisitecoursefromdb = await course.findByIdAndUpdate(
        { _id: id },
        {
          $pull: {
            preRequisitecourse: { course: { $in: deleteprerequisitecourse } },
          },
        },
        { new: true, session },
      );

      if (!updateprereqquisitecoursefromdb) {
        throw new Error('failed to delete prerequisitecourse information');
      }

      // adding new prerequisite course below

      const addprerequisitecourse = preRequisitecourse.filter(
        el => el.course && !el.isdeleted,
      );
      // console.log(addprerequisitecourse);

      // Get the updated course's current prerequisites
      const updatedCourse = await course.findById(id);

      const existingCourses = updatedCourse?.preRequisitecourse || [];
      // console.log(existingCourses);

      // Step 4: Check if any course to add already exists
      const isDuplicate = addprerequisitecourse.some(item =>
        existingCourses.some(
          existing =>
            existing.course == item.course &&
            existing.isdeleted == item.isdeleted,
        ),
      );

      if (isDuplicate) {
        throw new Error('course already exist');
      }

      // Step 5: If no duplicate, add new prerequisite courses

      const addprerequisitecourses = await course.findByIdAndUpdate(
        { _id: id },
        {
          $addToSet: {
            preRequisitecourse: { $each: addprerequisitecourse },
          },
        },
        { new: true, session },
      );

      if (!addprerequisitecourses) {
        throw new Error('Failed to add new prerequisite courses');
      }
    }
    if (session.inTransaction()) {
      await session.commitTransaction();
      session.endSession();
    }

    const result = await course
      .findById({ _id: id })
      .populate('preRequisitecourse.course');
    return result;
  } catch (err) {
    console.error('Error occurred while updating course:', err); 

    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    throw new Error('failed to update course info');
  }
};
const deletecourse = async (id: string) => {
  const result = await course.findOneAndUpdate(
    { _id: id },
    { isdeleted: true },
    { new: true },
  );
  return result;
};

const assignfacultyintocourseintodb = async(id:string,payload:Partial<Tcoursefaculty>)=>{
 
  const result = await coursefaculty.findByIdAndUpdate(id,
    {
      $setOnInsert: { course: id },
      $addToSet:{faculty:{ $each : payload }},
    },
    {upsert:true,new:true}
  ).populate('faculty').populate('course')
  return result
}

const removefacaultyfromcoursefromdb = async(id:string,payload:Partial<Tcoursefaculty>)=>{
  
  const result = await coursefaculty.findByIdAndUpdate(id,
    {
       $pull:{faculty:{ $in: payload}}
    },  
  ).populate('faculty').populate('course')
  return result
}


export const courseservices = {
  createcourseintodb,
  getallcourses,
  getasinglecourse,
  updatesinglecourse,
  deletecourse,
  assignfacultyintocourseintodb,
  removefacaultyfromcoursefromdb
};
