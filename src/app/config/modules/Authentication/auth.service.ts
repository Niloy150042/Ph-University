import { user } from '../user.model';
import { Tloginuser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
  const ispasswordmatched = await bcrypt.compare(
    payload?.password,
    User?.password,
  );
  if (!ispasswordmatched) {
    throw new Error('password does not matched ');
  }

  const jwtpayload ={
    id:User.id,
    userstatus :User.status

  }
  
jwt.sign({
  data: jwtpayload
}, 'secret', { expiresIn: 60 * 60 });

  return {};
};

export const authservice = {
  loginuser,
};
