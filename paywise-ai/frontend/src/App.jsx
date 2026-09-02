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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transactionId: formData.transactionId,
          amount: Number(formData.amount),
          paymentMethod: formData.paymentMethod,
          errorCode: formData.errorCode,
          errorMessage: formData.errorMessage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to analyze payment failure');
      }

      const analysisData = data.analysis || data;
      setResult({
        reason: analysisData.reason,
        explanation: analysisData.explanation,
        recommendedAction: analysisData.recommendedAction,
        retry: Boolean(analysisData.retry),
        riskLevel: analysisData.riskLevel || 'Low'
      });
    } catch (err) {
      setError(err.message || 'Something went wrong while connecting to Gemini AI');
    } finally {
      setLoading(false);
    }
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
              <button 
                className="btn btn-primary mt-3 w-100 fw-semibold" 
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? 'Analyzing with Gemini AI...' : 'Run AI Diagnosis'}
              </button>
              {error && <div className="alert alert-danger mt-3 py-2 small">{error}</div>}
            </div>
          </div>

          <div className="col-md-5">
            {result ? (
              <div className="card border-0 shadow-sm border-top border-danger border-4 p-4">
                <h5 className="text-danger fw-bold">❌ {result.reason}</h5>
                <span className={`badge ${result.riskLevel === 'High' ? 'bg-danger' : result.riskLevel === 'Medium' ? 'bg-warning text-dark' : 'bg-success'} w-25 mb-3`}>
                  Risk: {result.riskLevel}
                </span>
                <p className="text-secondary small mb-2">{result.explanation}</p>
                <div className="alert alert-light border small mb-2">
                  <strong>Recommended Action:</strong> {result.recommendedAction}
                </div>
                <span className={`badge ${result.retry ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'}`}>
                  Retry: {result.retry ? 'Yes' : 'No'}
                </span>
              </div>
            ) : (
              <div className="card border-0 shadow-sm p-4 text-center text-muted h-75 d-flex justify-content-center align-items-center">
                {loading ? 'Consulting Gemini AI diagnostics...' : 'Click "Run AI Diagnosis" to analyze failure reasons.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
