import { userservice } from './user.service';
import sendresponse from '../utils/sendresponse';
import status from 'http-status';
import asynccatch from '../utils/catchasync';


// following dry principle 


const createstudent = asynccatch (async (req, res) => {
  const { student, password } = req.body;

  
    const result = await userservice.createstudentintodb(student, password);

    sendresponse(res, {
      statuscode: status.OK,
      success: true,
      message: 'student creatd successfuly',
      data: result,
    });
  
})

export const usercontroller = {
  createstudent,
};
