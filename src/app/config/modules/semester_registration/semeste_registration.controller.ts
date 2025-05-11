import { Request, Response } from 'express';
import asynccatch from '../utils/catchasync';
import { semesterregistraionservice } from './semester_registration.service';
import status from 'http-status';

const createsemesterregistration = asynccatch(
  async (req: Request, res: Response, next) => {
    const result =
      await semesterregistraionservice.createsemesterregistrationintodb(
        req.body,
      );
    res.status(status.OK).send({
      success: true,
      message: 'semester registration is successfull',
      data: result,
    });
  },
);

const getallsemester = asynccatch(async (req: Request, res: Response, next) => {
  const result = await semesterregistraionservice.getallregisteredsemester();
  res.status(status.OK).send({
    success: true,
    message: 'all reagestered semester is retrived successfully',
    data: result,
  });
});

const getsinglesemester = asynccatch(
  async (req: Request, res: Response, next) => {
    const id = req.params.id;
    const result =
      await semesterregistraionservice.getsingleregisteredsemester(id);
    res.status(status.OK).send({
      success: true,
      message: 'your reagestered semester is retrived successfully',
      data: result,
    });
  },
);

const updateasinglesemester = asynccatch(
  async (req: Request, res: Response, next) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await semesterregistraionservice.updateregesteredsemester(
      id,
      payload,
    );
    res.status(status.OK).send({
      success: true,
      message: 'your reagestered semester is updated successfully',
      data: result,
    });
  },
);

export const semesterregistrationcontroller = {
  createsemesterregistration,
  getallsemester,
  getsinglesemester,
  updateasinglesemester,
};
