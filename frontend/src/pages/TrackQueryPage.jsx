import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  User,
  Phone,
  HardHat,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import LifecycleStepper from '../components/LifecycleStepper';

export default function TrackQueryPage({
  queries = [],
  initialQueryId = '',
  onNavigate
}) {
  const [searchId, setSearchId] = useState(initialQueryId || 'CQ-9821');
  const [activeQueryId, setActiveQueryId] = useState(initialQueryId || 'CQ-9821');

  const selectedQuery = queries.find(
    (q) => q.id.toLowerCase() === activeQueryId.trim().toLowerCase()
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      setActiveQueryId(searchId.trim());
    }
  };

  const handleSelectQuickId = (id) => {
    setSearchId(id);
    setActiveQueryId(id);
  };

  return (
    <div className="section-clean bg-light min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-4">
          <div className="section-label">Resolvia Real-Time Lookup</div>
          <h2 className="section-title">Resolvia Query Status Tracking</h2>
          <p className="text-muted small">
            Enter your unique Query ID or select a sample ticket below to monitor its 9-phase resolution progress.
          </p>

          {/* Clean Search Box */}
          <form onSubmit={handleSearch} className="mt-3">
            <div className="d-flex mx-auto gap-2" style={{ maxWidth: '440px' }}>
              <input
                type="text"
                className="form-control-clean font-monospace fw-semibold"
                placeholder="Query ID (e.g. CQ-9821)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button type="submit" className="btn btn-agency-primary px-3 text-nowrap">
                Track
              </button>
            </div>
          </form>

          {/* Quick Demo Chips */}
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-1.5 mt-3">
            <small className="text-muted me-1">Quick Select:</small>
            {queries.slice(0, 6).map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSelectQuickId(q.id)}
                className={`btn btn-sm py-0.5 px-2 rounded-2 font-monospace ${
                  activeQueryId.toUpperCase() === q.id.toUpperCase()
                    ? 'btn-dark'
                    : 'btn-outline-secondary'
                }`}
                style={{ fontSize: '0.74rem' }}
              >
                {q.id} ({q.status})
              </button>
            ))}
          </div>
        </div>

        {/* Selected Query Details */}
        {selectedQuery ? (
          <div className="card-clean bg-white p-4 p-md-5">
            {/* Top Bar */}
            <div className="d-flex flex-wrap justify-content-between align-items-start border-bottom pb-4 mb-4 gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="display-6 fw-bold text-dark font-monospace">
                    {selectedQuery.id}
                  </span>
                  <StatusBadge status={selectedQuery.status} />
                  <span className={`badge priority-${selectedQuery.priority.toLowerCase()} px-2.5 py-1`}>
                    {selectedQuery.priority} Priority
                  </span>
                </div>
                <h4 className="fw-bold text-dark mb-1">{selectedQuery.subject}</h4>
                <div className="text-muted small">
                  Domain: <strong>{selectedQuery.category}</strong> • Logged: {selectedQuery.createdAt}
                </div>
              </div>

              <div className="text-md-end">
                <small className="text-muted d-block">Current Milestone</small>
                <strong className="text-dark fs-5">{selectedQuery.status}</strong>
              </div>
            </div>

            {/* Stepper */}
            <div className="mb-4 p-3 bg-light rounded-3 border">
              <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                <span className="small fw-semibold text-uppercase text-muted" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  9-Stage Resolution Progress
                </span>
                <span className="badge bg-white text-dark border small">Audit Verified</span>
              </div>
              <LifecycleStepper currentStatus={selectedQuery.status} history={selectedQuery.history} />
            </div>

            {/* 3 Detail Columns */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="p-3 bg-light rounded-2 border h-100 small">
                  <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.7rem' }}>
                    Customer Details
                  </span>
                  <div className="fw-semibold text-dark">{selectedQuery.customerName}</div>
                  <div className="text-muted">{selectedQuery.customerPhone}</div>
                  <div className="text-muted">{selectedQuery.customerEmail}</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-light rounded-2 border h-100 small">
                  <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.7rem' }}>
                    Service Location
                  </span>
                  <div className="fw-medium text-dark">{selectedQuery.location.address}</div>
                  <div className="text-muted">{selectedQuery.location.city} - {selectedQuery.location.pincode}</div>
                  {selectedQuery.location.coordinates && (
                    <div className="text-muted font-monospace mt-1" style={{ fontSize: '0.7rem' }}>
                      GPS: {selectedQuery.location.coordinates}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-light rounded-2 border h-100 small">
                  <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.7rem' }}>
                    Assigned Field Executive
                  </span>
                  {selectedQuery.assignedExecutiveName ? (
                    <div>
                      <div className="fw-semibold text-dark">{selectedQuery.assignedExecutiveName}</div>
                      <span className="badge bg-white text-dark border mt-1">
                        {selectedQuery.assignedTo} • Dispatched
                      </span>
                    </div>
                  ) : (
                    <div className="text-muted">
                      Pending supervisor dispatch allocation.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="p-3 bg-light rounded-2 border mb-4">
              <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.7rem' }}>
                Complaint Description
              </span>
              <p className="text-dark small mb-0" style={{ lineHeight: 1.6 }}>
                {selectedQuery.description}
              </p>
            </div>

            {/* Field Report If Submitted */}
            {selectedQuery.fieldReport && (
              <div className="p-3.5 bg-light rounded-2 border mb-4 small">
                <div className="d-flex align-items-center gap-1.5 mb-2">
                  <FileCheck size={16} className="text-dark" />
                  <strong className="text-dark text-uppercase">Submitted Field Work Report</strong>
                </div>
                <p className="text-dark mb-2">
                  <strong>Resolution:</strong> {selectedQuery.fieldReport.summary}
                </p>
                <div className="row g-2 text-muted">
                  <div className="col-md-6"><strong>Parts:</strong> {selectedQuery.fieldReport.partsUsed || 'Standard equipment'}</div>
                  <div className="col-md-6"><strong>Timestamp:</strong> {selectedQuery.fieldReport.timestamp}</div>
                  <div className="col-md-6"><strong>Site Location:</strong> {selectedQuery.fieldReport.locationSubmitted}</div>
                  <div className="col-md-6"><strong>Signoff:</strong> {selectedQuery.fieldReport.customerSignature}</div>
                </div>
              </div>
            )}

            {/* Supervisor Remarks */}
            {selectedQuery.supervisorRemarks && (
              <div className="p-3 bg-light rounded-2 border mb-4 small">
                <strong className="text-dark d-block mb-1">Supervisor Remarks:</strong>
                <span className="text-muted">{selectedQuery.supervisorRemarks}</span>
              </div>
            )}

            {/* Event Audit Log */}
            <div>
              <span className="text-muted small text-uppercase fw-semibold d-block mb-3" style={{ fontSize: '0.72rem' }}>
                Chronological Event Audit Trail
              </span>
              <div className="d-flex flex-column gap-2 ps-3 border-start border-2 border-dark">
                {selectedQuery.history.map((event, idx) => (
                  <div key={idx} className="small">
                    <div className="d-flex align-items-center gap-2">
                      <StatusBadge status={event.status} size="sm" />
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>{event.timestamp}</span>
                      <strong className="text-dark">{event.updatedBy}</strong>
                    </div>
                    {event.note && (
                      <div className="text-muted ps-1 mt-0.5">{event.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-clean bg-white p-5 text-center">
            <AlertCircle size={36} className="text-muted mx-auto mb-2" />
            <h6 className="fw-bold text-dark">No Query Found for "{searchId}"</h6>
            <p className="text-muted small mb-3">
              Verify the Query ID format or raise a new query.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('customer_portal')}
              className="btn btn-agency-primary"
            >
              Raise a New Query
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
