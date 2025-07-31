// auth middleware
import { NextFunction, Request, Response } from 'express';
import asynccatch from './catchasync';

const auth = () =>{
  return asynccatch(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('Authorization is not granted ');
    }
    next();
  });
};

export default auth;
