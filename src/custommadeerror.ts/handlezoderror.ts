import { ZodError } from "zod";
import { TGerrorresponse } from "../app/config/modules/utils/errortype";

 export const zoderrorhandler = (err: ZodError):TGerrorresponse => {
    const errorsource = err.issues.map(issue => {
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
      errorsource,
     
    };
  };