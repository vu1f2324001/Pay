import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Transaction } from '../models/Transaction.js';

dotenv.config();

const sampleTransactions = [
  {
    transactionId: 'txn_rzp_001',
    amount: 1499,
    paymentMethod: 'UPI',
    status: 'SUCCESS',
  },
  {
    transactionId: 'txn_rzp_002',
    amount: 5200,
    paymentMethod: 'Card',
    status: 'FAILED',
    errorCode: 'GATEWAY_ERROR',
    errorMessage: 'Bank server unreachable during debit confirmation.',
    aiAnalysis: {
      reason: 'Issuer Bank Downtime',
      explanation: 'The card issuer bank could not verify the transaction due to high network latency.',
      recommendedAction: 'Wait 15 minutes before retrying or use UPI to complete the payment.',
      retry: true,
      riskLevel: 'Low',
    },
  },
  {
    transactionId: 'txn_rzp_003',
    amount: 320,
    paymentMethod: 'UPI',
    status: 'SUCCESS',
  },
  {
    transactionId: 'txn_rzp_004',
    amount: 18900,
    paymentMethod: 'Card',
    status: 'FAILED',
    errorCode: 'PAYMENT_RISK_CHECK_FAILED',
    errorMessage: 'International card transaction blocked by automatic rule engine.',
    aiAnalysis: {
      reason: 'International Security Rule Triggered',
      explanation: 'Card origin triggered an automated geographic risk protocol.',
      recommendedAction: 'Ask customer to authorize cross-border usage or use a domestic card.',
      retry: false,
      riskLevel: 'High',
    },
  },
  {
    transactionId: 'txn_rzp_005',
    amount: 750,
    paymentMethod: 'NetBanking',
    status: 'SUCCESS',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/paywise');
    await Transaction.deleteMany({});
    await Transaction.insertMany(sampleTransactions);
    console.log('Seed data successfully inserted');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
};

seedDB();
