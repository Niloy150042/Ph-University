import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userrouter from './app/config/modules/user/user.route';
import studentrouter from './app/config/modules/student/student.route';


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',userrouter)
app.use('/api/v1/student',studentrouter)

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});


export default app;
