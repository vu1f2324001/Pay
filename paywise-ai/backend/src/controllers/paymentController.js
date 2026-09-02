import { Transaction } from '../models/Transaction.js';
import { analyzePaymentFailure } from '../services/geminiService.js';

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { transactionId, amount, paymentMethod, status, errorCode, errorMessage } = req.body;

    if (!transactionId || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const newTx = await Transaction.create({
      transactionId,
      amount,
      paymentMethod,
      status: status || 'FAILED',
      errorCode,
      errorMessage,
    });

    res.status(201).json({ success: true, data: newTx });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const analyzePayment = async (req, res) => {
  try {
    const { transactionId, amount, paymentMethod, errorCode, errorMessage } = req.body;

    if (!transactionId || !amount || !paymentMethod || !errorCode || !errorMessage) {
      return res.status(400).json({
        success: false,
        message: 'All fields (transactionId, amount, paymentMethod, errorCode, errorMessage) are required.',
      });
    }

    const aiOutput = await analyzePaymentFailure({
      transactionId,
      amount,
      paymentMethod,
      errorCode,
      errorMessage,
    });

    const savedRecord = await Transaction.findOneAndUpdate(
      { transactionId },
      {
        transactionId,
        amount,
        paymentMethod,
        status: 'FAILED',
        errorCode,
        errorMessage,
        aiAnalysis: aiOutput,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: savedRecord, analysis: aiOutput });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();
    const successfulPayments = await Transaction.countDocuments({ status: 'SUCCESS' });
    const failedPayments = await Transaction.countDocuments({ status: 'FAILED' });
    const successRate = totalTransactions === 0 ? 0 : ((successfulPayments / totalTransactions) * 100).toFixed(1);

    const recentFailures = await Transaction.find({ status: 'FAILED' })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalTransactions,
        successfulPayments,
        failedPayments,
        successRate,
      },
      recentFailures,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
