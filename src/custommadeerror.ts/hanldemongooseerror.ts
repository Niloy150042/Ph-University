import { TGerrorresponse } from '../app/config/modules/utils/errortype';

// Mongoose error will handle into my custom error below
export const handlemongooseerror = (err): TGerrorresponse => {
  const errorsource = err.errors.name.message;
  const statusCode = 400;
  const message = 'validation failed ';
  return {
    statusCode,
    message,
    errorsource,
  };
};
