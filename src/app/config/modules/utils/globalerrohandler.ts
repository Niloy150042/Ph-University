
import { NextFunction, Request, Response } from 'express';

// Optional: Custom error type if you want strong typing
interface IError {
  statusCode?: number;
  message: string;
  stack?: string;
}

// Global error handler middleware
const globalErrorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
};

export default globalErrorHandler;
