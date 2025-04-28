import { NextFunction, Request, Response } from 'express';
import { createsemesters } from './academic_semester.service';
import status from 'http-status';
import asynccatch from '../utils/catchasync';

const createacademicsemester = asynccatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const semester = req.body;
    const result = await createsemesters.createsemesterintodb(semester);
    res.status(status.OK).send({
      success: true,
      message: 'Academic semester created successfully',
      semester: result,
    });
  },
);
const getallsemester = asynccatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await createsemesters.getallsemesterfromdb();
    res.status(status.OK).send({
      success: true,
      message: 'Academic semester retruved successfully',
      semester: result,
    });
  },
);

export const semestercontroller = {
  createacademicsemester,getallsemester
};
