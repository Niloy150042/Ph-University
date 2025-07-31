// auth middleware
import { NextFunction, Request, Response } from 'express';
import asynccatch from './catchasync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = () => {
  return asynccatch(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Authorization is not granted ');
    }

    // if someone send the wrong token then justify
    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string, // jwt access tai hocche signature
      function (err, decoded) {
        if (err) {
          throw new Error('wrong token ');
        }
     
      req.user= decoded  as JwtPayload
      },
    );

   
    next();
  });
};

export default auth;
