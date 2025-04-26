import { Response } from 'express';

type Tresponse<T> = {
  statuscode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendresponse = (res: Response, data: Tresponse<T>) => {

  return res.status(data.statuscode).send({
    data_status: data.statuscode,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendresponse;
