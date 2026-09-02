import express from 'express';
import {
  getTransactions,
  createTransaction,
  analyzePayment,
  getDashboardStats,
} from '../controllers/paymentController.js';

const router = express.Router();

router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.post('/analyze-payment', analyzePayment);
router.get('/stats', getDashboardStats);

export default router;
