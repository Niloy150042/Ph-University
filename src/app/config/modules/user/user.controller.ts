import { Request, Response } from 'express';
// import userzodvalidation from './user.validation';
import { userservice } from './user.service';

const createstudent = async (req: Request, res: Response) => {
  const { student, password } = req.body;
  // const zodvalidationschema = userzodvalidation.parse(user)
  const result = await userservice.createstudentintodb(student, password);
  try {
    res.status(201).send({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: false,
      error: err,
    });
  }
};

export const usercontroller = {
  createstudent,
};
