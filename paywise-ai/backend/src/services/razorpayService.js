/**
 * Isolated service placeholder for Razorpay API integration.
 * In a production or live test setup, configure razorpay SDK here.
 */
export const fetchRazorpayPaymentDetails = async (paymentId) => {
  return {
    simulated: true,
    paymentId,
    status: 'failed',
    error_code: 'BAD_REQUEST_ERROR',
    error_description: 'Payment was declined by the issuing bank due to daily limit.',
  };
};
