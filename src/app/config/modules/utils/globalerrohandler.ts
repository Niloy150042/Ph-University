/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TerrorSource } from './errortype';
import { zoderrorhandler } from '../../../../custommadeerror.ts/handlezoderror';
import { handlemongooseerror } from '../../../../custommadeerror.ts/hanldemongooseerror';
import { handlecasterror } from '../../../../custommadeerror.ts/handlecasterror';
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
 // our custom made mongoose error is below 

  let errorsources: TerrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  
 // our custom made zoderror is making below 
  if (err instanceof ZodError) {
    const simplifiederror = zoderrorhandler(err);
    (statusCode = simplifiederror?.statusCode),
      (message = simplifiederror?.message),
      (errorsources = simplifiederror?.errorsource);
  }
  else if (err.name=='ValidationError'){
    const simplifiedmongooseerror = handlemongooseerror(err)
    statusCode = simplifiedmongooseerror.statusCode,
    message =simplifiedmongooseerror.message
    errorsources=simplifiedmongooseerror.errorsource
     
  }
  else if (err.name == 'CastError'){
    const simplifiedcasteror = handlecasterror(err)
    statusCode = simplifiedcasteror.statuscode
    message=simplifiedcasteror.message,
    errorsources=simplifiedcasteror.errorsource
    
  }
  return  res.status(statusCode).json({
    success: false,
    message,
    errorsources,
    stack:process.env.NODE_ENV == "development"? err.stack : null 
  });
};

export default  globalErrorHandler

