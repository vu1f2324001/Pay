export default function MetricsDashboard({ stats }) {
      return (
          <div className="row g-3 mb-4">
                <div className="col-md-3">
                        <div className="card shadow-sm border-0 border-start border-primary border-4 p-3">
                                  <span className="text-muted small text-uppercase fw-semibold">Total Payments</span>
                                            <h3 className="fw-bold mt-1 text-dark">{stats?.totalTransactions ?? 0}</h3>
                                                    </div>
                                                          </div>
                                                                <div className="col-md-3">
                                                                        <div className="card shadow-sm border-0 border-start border-success border-4 p-3">
                                                                                  <span className="text-muted small text-uppercase fw-semibold">Successful</span>
                                                                                            <h3 className="fw-bold mt-1 text-success">{stats?.successfulPayments ?? 0}</h3>
                                                                                                    </div>
                                                                                                          </div>
                                                                                                                <div className="col-md-3">
                                                                                                                        <div className="card shadow-sm border-0 border-start border-danger border-4 p-3">
                                                                                                                                  <span className="text-muted small text-uppercase fw-semibold">Failed</span>
                                                                                                                                            <h3 className="fw-bold mt-1 text-danger">{stats?.failedPayments ?? 0}</h3>
                                                                                                                                                    </div>
                                                                                                                                                          </div>
                                                                                                                                                                <div className="col-md-3">
                                                                                                                                                                        <div className="card shadow-sm border-0 border-start border-warning border-4 p-3">
                                                                                                                                                                                  <span className="text-muted small text-uppercase fw-semibold">Success Rate</span>
                                                                                                                                                                                            <h3 className="fw-bold mt-1 text-dark">{stats?.successRate ?? 0}%</h3>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                );
                                                                                                                                                                                                                }
                                                                                                                                                                                                                
}