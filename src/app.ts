/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { globalerrorhandler } from './app/config/modules/utils/globalerrohandler';

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userrouter from './app/config/modules/user/user.route';
import studentrouter from './app/config/modules/student/student.route';
import globalErrorHandler from './app/config/modules/utils/globalerrohandler';
import notfound from './app/config/modules/utils/notfound';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userrouter);
app.use('/api/v1/student', studentrouter);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.use(
  globalErrorHandler as (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => void,
);

app.use(notfound as (req: express.Request,
  res: express.Response)=>void)

export default app;
