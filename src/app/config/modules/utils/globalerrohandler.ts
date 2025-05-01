import { NextFunction, Request, Response } from 'express';

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
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      message: err.message,
    },
  });
};

export default globalErrorHandler;
