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

  const errorsources: TerrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorsources,
    error: err,
  });
};
export default globalErrorHandler;
