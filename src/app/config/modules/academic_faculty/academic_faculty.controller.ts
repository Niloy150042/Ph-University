import { NextFunction, Request, Response } from 'express';
import asynccatch from '../utils/catchasync';
import status from 'http-status';
import { createfaculty } from './academic_faculty.service';

const createacademicfaculty = asynccatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const faculty = req.body;
    const result = await createfaculty.createacademicfacultyintodb(faculty);
    res.status(status.OK).send({
      success: true,
      message: `faculty created  successfully`,
      semester: result,
    });
  },
);

export const facultycontroller = {
  createacademicfaculty,
};
