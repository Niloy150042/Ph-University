import { user } from '../user.model';
import { Tloginuser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

  const accesstoken = jwt.sign(
    {
      data: jwtpayload,
    },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: '10d' },
  );

  return {
    accesstoken,
    Needpasswordchange: User?.needpasswordchange,
  };
};
const changepassword =async(userdata:JwtPayload,payload:{oldpassword:string,newpassword:string}) => {
  const result = await user.findOneAndUpdate({
  id :userdata.id,
  role:userdata.role
  })

 
};

export const authservice = {
  loginuser,
  changepassword,
};
