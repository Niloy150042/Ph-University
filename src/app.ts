import express, { Application, Request, Response } from 'express';
import router from '../src/app/config/modules/student/student.route'
import cors from 'cors';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students',router)

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});


export default app;
