import { NextFunction, Request, Response } from 'express';
import asynccatch from '../utils/catchasync';
import status from 'http-status';
import { facultyservie } from './academic_faculty.service';

const createacademicfaculty = asynccatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const faculty = req.body;
    const result = await facultyservie.createacademicfacultyintodb(faculty);
    res.status(status.OK).send({
      success: true,
      message: `faculty created  successfully`,
      semester: result,
    });
  },
);

const getfaculties = asynccatch(async (req: Request, res: Response) => {
   
  const result = await facultyservie.getallfaculties();
  res.status(status.OK).send({
    success: true,
    message: 'all faculties are retrived successfully',
    faculties: result,
  });
});

const getasinglefaculty = asynccatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await facultyservie.getasinglefaculty(id);

  res.status(status.OK).send({
    success: true,
    message: ` ${id} faculty is  retrived successfully`,
    faculties: result,
  });
});

const updateasinglefaculty = asynccatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const payload = req.body;
  const result = await facultyservie.updatesinglefaculty(id, payload);

  res.status(status.OK).send({
    success: true,
    message: ` ${id} faculty is  updated  successfully`,
    faculties: result,
  });
});

export const facultycontroller = {
  createacademicfaculty,
  getfaculties,
  getasinglefaculty,
  updateasinglefaculty,
};
