import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root path (.env) ani backend (.env) donhi load karto
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`PayWise AI running on port ${PORT}`);
  });
});
