import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/config/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students',router)

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});


export default app;
