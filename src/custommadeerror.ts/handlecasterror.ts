import { TerrorSource } from "../app/config/modules/utils/errortype";

export const handlecasterror = err => {
  const errorsource :TerrorSource = [
   {
    path: err.path,
    message: err.message,
   }
  ];
  const message = 'validation error ';
  const statuscode = 400;
  return {
    message,
    statuscode,
    errorsource,
  };
};
