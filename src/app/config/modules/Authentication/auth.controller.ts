import status from 'http-status';
import asynccatch from '../utils/catchasync';
import sendresponse from '../utils/sendresponse';
import { authservice } from './auth.service';

const loginguser = asynccatch(async (req, res) => {
  const result = await authservice.loginuser(req.body);
  sendresponse(res, {
    statuscode: status.OK,
    success: true,
    message: 'user loged in successfully',
    data: result,
  });
});

const changepassword = asynccatch(async (req, res) => {
  const {...passworddata} = req.body
  const userdata =req.user
   await authservice.changepassword(userdata,passworddata);
   sendresponse(res, {
    statuscode: status.OK,
    success: true,
    message: 'password updated successfully',
    data: null,
  });
});

export const Authcontroller = {
  loginguser,
  changepassword,
};
