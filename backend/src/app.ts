import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas serão registradas aqui conforme forem criadas
// app.use('/api/eventos', eventosRoutes);

app.use(errorHandler);

export default app;