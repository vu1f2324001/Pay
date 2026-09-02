import express from 'express';
import cors from 'cors';
import path from 'path';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', paymentRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Render root directory paywise-ai pasun frontend/dist cha exact path
const frontendDistPath = path.resolve(process.cwd(), 'frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

export default app;
