// auth middleware
import { NextFunction, Request, Response } from 'express';
import asynccatch from './catchasync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Tuserrole } from '../user/user.interface';


const auth = (...requiredroles:Tuserrole[]) => {
  return asynccatch(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Authorization is not granted');
    }
   // if someone send the wrong token then justify
    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string, // jwt access tai hocche signature
      function (err, decoded) {
        if (err) {
          throw new Error('wrong token');
        }
        const role = (decoded as JwtPayload).data.role;
        // console.log(decoded);
        // console.log(role);
        if (requiredroles && !requiredroles?.includes(role)) {
          throw new Error('you are not authorizedd ');
        }

        req.user = decoded as JwtPayload;

        next();
      },
    );
  });
};

export default auth;
