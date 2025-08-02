import jwt from 'jsonwebtoken'
export const createtoken = (jwtpayload: {
  id: string;
  userstatus: string;
  role: string;
}, access_secret_key:string , time) => {
    
 return jwt.sign(
    {
      data:jwtpayload,
    },
    access_secret_key ,
   
    { expiresIn:time } ,
  );
};
