/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { globalerrorhandler } from './app/config/modules/utils/globalerrohandler';

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/config/modules/utils/globalerrohandler';
import notfound from './app/config/modules/utils/notfound';
import router from './app/config/Routes/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5000'] }));
app.use(cookieParser());

app.use('/api/v1', router);

app.get('/test', async (req: Request, res: Response) => {
  // const a = 10
  // res.send(`${a}`)
});

app.get('/', (req, res) => {
  res.send('hello  backend-dev niloy .. ! welcome to the ph-universtiy backend application');
});
app.use(
  globalErrorHandler as (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => void,
);

app.use(notfound as (req: express.Request, res: express.Response) => void);

export default app;
