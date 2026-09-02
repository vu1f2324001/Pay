export default function AnalysisResultCard({ analysis, transactionId }) {
      if (!analysis) return null;

        const riskBadgeClass = {
            Low: 'bg-success',
                Medium: 'bg-warning text-dark',
                    High: 'bg-danger',
                      }[analysis.riskLevel] || 'bg-secondary';

                        return (
                            <div className="card shadow-sm border-0 border-top border-danger border-4 mb-4">
                                  <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                                          <h5 className="mb-0 text-danger fw-bold">❌ Payment Failed: {analysis.reason}</h5>
                                                  <span className={`badge ${riskBadgeClass} px-3 py-2`}>
                                                            Risk Level: {analysis.riskLevel}
                                                                    </span>
                                                                          </div>
                                                                                <div className="card-body">
                                                                                        <div className="mb-3">
                                                                                                  <span className="text-muted small fw-bold text-uppercase d-block">Transaction Reference</span>
                                                                                                            <code className="text-dark fw-bold">{transactionId}</code>
                                                                                                                    </div>

                                                                                                                            <div className="mb-3">
                                                                                                                                      <span className="text-muted small fw-bold text-uppercase d-block">What happened?</span>
                                                                                                                                                <p className="card-text text-secondary mt-1">{analysis.explanation}</p>
                                                                                                                                                        </div>

                                                                                                                                                                <div className="mb-3">
                                                                                                                                                                          <span className="text-muted small fw-bold text-uppercase d-block">Recommended Action</span>
                                                                                                                                                                                    <p className="card-text text-dark fw-semibold mt-1">{analysis.recommendedAction}</p>
                                                                                                                                                                                            </div>

                                                                                                                                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                                                                                                                                              <span className="text-muted small fw-bold text-uppercase">Retry Permitted:</span>
                                                                                                                                                                                                                        {analysis.retry ? (
                                                                                                                                                                                                                                    <span className="badge bg-success-subtle text-success border border-success px-2 py-1">
                                                                                                                                                                                                                                                  Yes, Safe to Retry
                                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                                                        ) : (
                                                                                                                                                                                                                                                                                    <span className="badge bg-danger-subtle text-danger border border-danger px-2 py-1">
                                                                                                                                                                                                                                                                                                  No, Do Not Retry Immediately
                                                                                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                            
}