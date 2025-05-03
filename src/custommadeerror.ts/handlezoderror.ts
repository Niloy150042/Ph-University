import { ZodError } from "zod";

 export const zoderrorhandler = (err: ZodError) => {
    const errorsources = err.issues.map(issue => {
      return {
        path: issue?.path[issue.path.length-1],
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