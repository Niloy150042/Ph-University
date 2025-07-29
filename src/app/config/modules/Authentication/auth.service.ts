import { user } from '../user.model';
import { Tloginuser } from './auth.interface';
import bcrypt from'bcrypt'

const loginuser = async (payload: Tloginuser) => {
  const isuserexist = await user
    .findOne({ id: payload?.id })
    .select(
      '_id id password needpasswordchange isdeleted role status createdAt updatedAt',
    );
  console.log(isuserexist);

  if (!isuserexist) {
    throw new Error('this user is not found');
  }

 // cheching if the user is blocked 

 if(isuserexist?.status == 'blocked'){
    throw new Error('this user is blocked')
 }
 // password comparison 
 const ispasswordmatched = await bcrypt.compare(payload?.password,isuserexist?.password)
 console.log(ispasswordmatched);
 return {};
};

export const authservice = {
  loginuser,
};
