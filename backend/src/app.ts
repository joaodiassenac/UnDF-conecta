import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';
const cors = require('cors');
import routes from './routes';


const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'https://seu-front.vercel.app'
}));

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
