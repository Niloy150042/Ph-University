/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Request, Response } from 'express';
import status from 'http-status';

const notfound = (req: Request, res: Response) => {
  return res.status(status.NOT_FOUND).send({
    success: false,
    message: 'API not found',
  });
};

export default notfound;
