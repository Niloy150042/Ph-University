/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { globalerrorhandler } from './app/config/modules/utils/globalerrohandler';

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/config/modules/utils/globalerrohandler';
import notfound from './app/config/modules/utils/notfound';
import router from './app/config/Routes/routes';


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1',router)

app.get('/test', async(req:Request,res:Response)=>{

  // const a = 10
  // res.send(`${a}`)
})

app.get('/',(req,res)=>{
  res.send('hello dev niloy ')
})
app.use(
  globalErrorHandler as (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => void,
);

app.use(notfound as (req: express.Request, res: express.Response) =>void);

export default app;
