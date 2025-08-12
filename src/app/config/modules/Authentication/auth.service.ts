import { user } from '../user.model';
import { Tloginuser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createtoken } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail';

const loginuser = async (payload: Tloginuser) => {
  const User = await user
    .findOne({ id: payload?.id })
    .select(
      '_id id password needpasswordchange isdeleted role status createdAt updatedAt',
    );

  if (!User) {
    throw new Error('this user is not found');
  }

  // cheching if the user is blocked

  if (User?.status == 'blocked') {
    throw new Error('this user is blocked');
  }
  // password comparison
  // const ispasswordmatched = await bcrypt.compare(
  //   payload?.password,
  //   User?.password,
  // );
  // if (!ispasswordmatched) {
  //   throw new Error('password does not matched ');
  // }
  // creating JWT token from server to client
  const jwtpayload = {
    id: User.id,
    userstatus: User.status,
    role: User.role,
  };
  // creating access token
  const accesstoken = createtoken(
    jwtpayload,
    process.env.JWT_ACCESS_SECRET as string,
    '10d',
  );

  // creating refresh token
  const refreshtoken = createtoken(
    jwtpayload,
    process.env.JWT_ACCESS_SECRET as string,
    '10d',
  );

  return {
    accesstoken,
    refreshtoken,
    Needpasswordchange: User?.needpasswordchange,
  };
};

const changepassword = async (
  userdata: JwtPayload,
  payload: { oldpassword: string; newpassword: string },
) => {
  const userid = userdata.data.id;
  const isuserexist = await user
    .findOne({ id: userid })
    .select(
      '_id id password needpasswordchange isdeleted role status createdAt updatedAt',
    );

  if (!isuserexist) {
    throw new Error('This user is not exist in database');
  }

  const ispasswordmatched = await bcrypt.compare(
    payload?.oldpassword,
    isuserexist?.password,
  );
  if (!ispasswordmatched) {
    throw new Error('password does not matched ');
  }

  const result = await user.findOneAndUpdate(
    {
      id: userdata.id,
      role: userdata.role,
    },
    {
      password: payload.newpassword,
    },
  );
  return result;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
  const { id, userstatus, role } = decoded;

  const jwtpayload = {
    id,
    userstatus,
    role,
  };
  // creating access token
  const accesstoken = createtoken(
    jwtpayload,
    process.env.JWT_ACCESS_SECRET as string,
    '10d',
  );

  return accesstoken;
};

const forgetpasswordservice = async (userid: string) => {
  const isidexistindb = await user
    .findOne({ id: userid })
    .select(
      '_id id password email needpasswordchange isdeleted role status createdAt updatedAt',
    )
    .lean();
  const User = isidexistindb;
  if (!isidexistindb) {
    throw new Error('this user is not exists in DB');
  }
  const jwtpayload = {
    id: User.id,
    userstatus: User.status,
    role: User.role,
  };
  // creating access token
  const resettoken = createtoken(
    jwtpayload,
    process.env.JWT_ACCESS_SECRET as string,
    '10d',
  );
  const resetpasslink = `http://localhost:5000?id=${User.id}&token=${resettoken}`;
  console.log(resetpasslink);
  sendEmail(User.email, resetpasslink);
};

const resetpasswrodservice = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const saltRounds = 10;
  const { id, newPassword } = payload;

  const decoded = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET as string,
  ) as JwtPayload;

  if (id != decoded.data.id) {
    throw new Error('you are forbidden');
  }

  const newhashPassword = await bcrypt.hash(
    newPassword,
    saltRounds,
    function (err, hash) {
      // Store hash in your password DB.
    },
  );
  await user.findOneAndUpdate(
    {
      id: decoded.data.id,
      role: decoded.data.role,
    },
    {
      password: newhashPassword,
    },
  );
};
export const authservice = {
  loginuser,
  changepassword,
  refreshToken,
  forgetpasswordservice,
  resetpasswrodservice,
};
