import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import paymentRoutes from './routes/paymentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', paymentRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

const frontendDistPath = path.resolve(__dirname, '../../../frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

export default app;
