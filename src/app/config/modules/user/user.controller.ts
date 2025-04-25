import { NextFunction, Request, Response } from 'express';
// import userzodvalidation from './user.validation';
import { userservice } from './user.service';

const createstudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { student, password } = req.body;
  // console.log(student,password);
  // const zodvalidationschema = userzodvalidation.parse(user)

  try {
    const result = await userservice.createstudentintodb(student, password);
    res.status(201).send({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const usercontroller = {
  createstudent,
};
