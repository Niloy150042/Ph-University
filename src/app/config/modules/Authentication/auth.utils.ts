import jwt, { SignOptions } from 'jsonwebtoken'
export const createtoken = (jwtpayload: {
  id: string;
  userstatus: string;
  role: string;
}, access_secret_key:string , time:string|number) => {
    
 return jwt.sign(
    {
      data:jwtpayload,
    },
    access_secret_key ,
   
    { expiresIn:time }as SignOptions ,
  );
};
