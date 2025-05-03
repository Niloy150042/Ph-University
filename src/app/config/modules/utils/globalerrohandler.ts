/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TerrorSource } from './errortype';

// Correctly extending the built-in Error object
interface IError extends Error {
  statusCode?: number;
  stack?: string;
}

const globalErrorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorsources: TerrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const zoderrorhandler = (err: ZodError) => {
    const errorsources = err.issues.map(issue => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;
    const message = 'validation error';

    return {
      statusCode,
      message,
      errorsources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiederror = zoderrorhandler(err);
    (statusCode = simplifiederror?.statusCode),
      (message = simplifiederror?.message),
      (errorsources = simplifiederror?.errorsources);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorsources,
    stack:process.env.NODE_ENV=="development"?err.stack:null 
  });
};
export default globalErrorHandler;
