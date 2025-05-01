import { Request, Response } from 'express';
import asynccatch from '../utils/catchasync';
import { departmentservice } from './academic_department.service';
import status from 'http-status';
import { department_model } from './academic_department.model';
import { studentservices } from '../student/student.servive';

const createdepartment = asynccatch(async (req: Request, res: Response) => {
  const department = req.body;
  const name = req.body.name;

  const result = await departmentservice.createdepartmentintodb(
    department,
    name,
  );
  res.status(status.OK).send({
    success: true,
    message: 'created department successfully',
    department: result,
  });
});

const getalldepartment = asynccatch(async (req: Request, res: Response) => {
  const result = await department_model.find().populate('academic_faculty');
  res.status(status.OK).send({
    success: true,
    message: 'all department are retrived successfully',
    departments: result,
  });
});

const getasingledepartment = asynccatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await departmentservice.getsingledepartment(id);
  res.status(status.OK).send({
    success: true,
    message: `${id} department is retrived sucesfully`,
    department: result,
  });
});

const updatedepartment =asynccatch( async (req:Request,res:Response)=>{
    const id = req.params.id
    const payload =req.body
    const result =  await departmentservice.updateasingledepartment(id,payload)
    res.status(status.OK).send({
        success: true,
        message: `${id} department is updated sucesfully`,
        department: result,
      });
    
})

export const departmentcontroller = {
  createdepartment,
  getalldepartment,getasingledepartment,updatedepartment
};
