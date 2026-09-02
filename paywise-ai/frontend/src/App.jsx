import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [formData, setFormData] = useState({
    transactionId: 'txn_test_101',
    amount: '1499',
    paymentMethod: 'UPI',
    errorCode: 'U30',
    errorMessage: 'Transaction timed out at beneficiary bank'
  });
  const [result, setResult] = useState(null);

  const handleMockAnalyze = () => {
    setResult({
      reason: 'Beneficiary Bank Latency',
      explanation: 'The customer account had funds debited or locked, but receiving bank took too long.',
      recommendedAction: 'Wait 15 mins for auto-reversal or retry via Card.',
      retry: false,
      riskLevel: 'Low'
    });
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <nav className="navbar navbar-dark bg-dark px-4 mb-4">
        <span className="navbar-brand fw-bold text-primary">
          PayWise <span className="text-white">AI</span>
        </span>
        <span className="badge bg-secondary">Internship Demo</span>
      </nav>

      <div className="container">
        <div className="row g-3 mb-4">
          <div className="col-3"><div className="card p-3 shadow-sm border-0 border-start border-primary border-4"><small className="text-muted">Total</small><h4>12</h4></div></div>
          <div className="col-3"><div className="card p-3 shadow-sm border-0 border-start border-success border-4"><small className="text-muted">Success</small><h4 className="text-success">9</h4></div></div>
          <div className="col-3"><div className="card p-3 shadow-sm border-0 border-start border-danger border-4"><small className="text-muted">Failed</small><h4 className="text-danger">3</h4></div></div>
          <div className="col-3"><div className="card p-3 shadow-sm border-0 border-start border-warning border-4"><small className="text-muted">Success Rate</small><h4>75%</h4></div></div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <div className="card border-0 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3">Analyze Payment Failure</h5>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Transaction ID</label>
                <input className="form-control" value={formData.transactionId} readOnly />
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Amount</label>
                  <input className="form-control" value={`₹${formData.amount}`} readOnly />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Method</label>
                  <input className="form-control" value={formData.paymentMethod} readOnly />
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Error Message</label>
                <input className="form-control" value={formData.errorMessage} readOnly />
              </div>
              <button className="btn btn-primary mt-3 w-100 fw-semibold" onClick={handleMockAnalyze}>
                Run AI Diagnosis
              </button>
            </div>
          </div>

          <div className="col-md-5">
            {result ? (
              <div className="card border-0 shadow-sm border-top border-danger border-4 p-4">
                <h5 className="text-danger fw-bold">❌ {result.reason}</h5>
                <span className="badge bg-success w-25 mb-3">Risk: {result.riskLevel}</span>
                <p className="text-secondary small mb-2">{result.explanation}</p>
                <div className="alert alert-light border small mb-2">
                  <strong>Recommended Action:</strong> {result.recommendedAction}
                </div>
                <span className="badge bg-danger-subtle text-danger border border-danger">Retry: No</span>
              </div>
            ) : (
              <div className="card border-0 shadow-sm p-4 text-center text-muted h-75 d-flex justify-content-center">
                Click "Run AI Diagnosis" to analyze failure reasons.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
