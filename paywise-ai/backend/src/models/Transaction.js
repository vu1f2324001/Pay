import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['UPI', 'Card', 'NetBanking', 'Wallet'],
    },
    status: {
      type: String,
      required: true,
      enum: ['SUCCESS', 'FAILED'],
      default: 'FAILED',
    },
    errorCode: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    aiAnalysis: {
      reason: { type: String, default: null },
      explanation: { type: String, default: null },
      recommendedAction: { type: String, default: null },
      retry: { type: Boolean, default: false },
      riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', null],
        default: null,
      },
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
