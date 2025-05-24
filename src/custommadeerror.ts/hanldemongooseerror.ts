import { TGerrorresponse } from '../app/config/modules/utils/errortype';

export const handlemongooseerror = (err): TGerrorresponse => {
  const statusCode = 400;
  const message = 'Invalid ID or Bad Request';

  // fallback error message
  let errorsource = 'Unknown Mongoose error';

  // Try to extract meaningful error
  if (err.errors) {
    const allErrors = Object.values(err.errors).map((el: any) => el.message);
    errorsource = allErrors.join('. ');
  } else if (err.message) {
    errorsource = err.message;
  }

  return {
    statusCode,
    message,
    errorsource,
  };
};
