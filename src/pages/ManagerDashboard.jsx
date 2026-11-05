import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HardHat,
  Users,
  Download,
  Filter,
  BarChart3,
  PieChart,
  ArrowUpRight,
  Activity,
  Layers,
  Search,
  Eye,
  Check,
  FileSpreadsheet
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { SERVICES_LIST, FIELD_EXECUTIVES, QUERY_STATUSES } from '../data/mockData';

export default function ManagerDashboard({
  queries = [],
  onNavigate,
  onShowToast
}) {
  const totalQueries = queries.length;
  const activeQueries = queries.filter((q) => q.status !== 'Closed').length;
  const closedQueries = queries.filter((q) => q.status === 'Closed').length;
  const urgentQueries = queries.filter((q) => q.priority === 'Urgent').length;

  const handleExportReport = () => {
    onShowToast?.('SLA Governance & Operations Audit Report downloaded', 'success');
  };

  return (
    <div className="section-clean bg-light min-vh-100">
      <div className="container-fluid px-3 px-lg-4">
        {/* Header Strip */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-dark text-white px-2 py-0.5 rounded-pill small">
                RESOLVIA EXECUTIVE OVERSIGHT
              </span>
              <span className="text-muted small">• Operations Manager: Marcus Sterling</span>
            </div>
            <h2 className="section-title mb-0">Resolvia Enterprise SLA Governance & Analytics</h2>
            <p className="text-muted small mb-0">
              High-level operational performance, technician utilization, domain ticket distribution, and escalation queues.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={handleExportReport}
              className="btn btn-agency-secondary"
            >
              <Download size={14} />
              <span>Export SLA Audit</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('supervisor')}
              className="btn btn-agency-primary"
            >
              <Activity size={14} />
              <span>Open Dispatch Queue</span>
            </button>
          </div>
        </div>

        {/* Strategic Metric Cards */}
        <div className="row g-3 mb-4">
          <div className="col-xl-3 col-md-6">
            <div className="card-clean bg-white p-4 h-100">
              <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.72rem' }}>
                Overall SLA Adherence
              </span>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <span className="display-6 fw-bold text-dark">98.7%</span>
                <span className="badge bg-light text-success border small">+1.4% Target</span>
              </div>
              <div className="progress" style={{ height: '5px' }}>
                <div className="progress-bar bg-dark" style={{ width: '98.7%' }} />
              </div>
              <small className="text-muted mt-2 d-block" style={{ fontSize: '0.72rem' }}>
                Target standard: 97.5% across all regions.
              </small>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card-clean bg-white p-4 h-100">
              <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.72rem' }}>
                Mean Time to Dispatch
              </span>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <span className="display-6 fw-bold text-dark">34 min</span>
                <span className="badge bg-light text-muted border small">&lt; 45m Target</span>
              </div>
              <div className="progress" style={{ height: '5px' }}>
                <div className="progress-bar bg-dark" style={{ width: '75%' }} />
              </div>
              <small className="text-muted mt-2 d-block" style={{ fontSize: '0.72rem' }}>
                Supervisor triage automation reduces wait times.
              </small>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card-clean bg-white p-4 h-100">
              <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.72rem' }}>
                Critical Escalations
              </span>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <span className="display-6 fw-bold text-dark">{urgentQueries}</span>
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle small">Urgent Priority</span>
              </div>
              <div className="progress" style={{ height: '5px' }}>
                <div className="progress-bar bg-danger" style={{ width: '25%' }} />
              </div>
              <small className="text-muted mt-2 d-block" style={{ fontSize: '0.72rem' }}>
                Commercial grid & severed fiber under emergency handling.
              </small>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card-clean bg-white p-4 h-100">
              <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.72rem' }}>
                Fleet Utilization
              </span>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <span className="display-6 fw-bold text-dark">84%</span>
                <span className="badge bg-light text-muted border small">{FIELD_EXECUTIVES.length} Certified Techs</span>
              </div>
              <div className="progress" style={{ height: '5px' }}>
                <div className="progress-bar bg-dark" style={{ width: '84%' }} />
              </div>
              <small className="text-muted mt-2 d-block" style={{ fontSize: '0.72rem' }}>
                Technician field rotation currently optimal.
              </small>
            </div>
          </div>
        </div>

        {/* Volume by Domain & Fleet Scorecards */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div className="card-clean bg-white p-4 h-100">
              <h6 className="fw-bold text-dark mb-1">Ticket Volume by Domain</h6>
              <p className="text-muted small mb-3">Breakdown of customer tickets by service category:</p>

              <div className="d-flex flex-column gap-3">
                {SERVICES_LIST.map((srv) => {
                  const count = queries.filter((q) => q.category.includes(srv.name.split(' ')[0])).length;
                  const percent = Math.round((count / (queries.length || 1)) * 100);

                  return (
                    <div key={srv.id}>
                      <div className="d-flex justify-content-between align-items-center mb-1 small">
                        <span className="fw-medium text-dark">{srv.name}</span>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-light text-muted border">{srv.sla} SLA</span>
                          <strong className="text-dark">{count} ({percent}%)</strong>
                        </div>
                      </div>
                      <div className="progress" style={{ height: '5px' }}>
                        <div className="progress-bar bg-dark" style={{ width: `${Math.max(percent, 8)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card-clean bg-white p-4 h-100">
              <h6 className="fw-bold text-dark mb-1">Field Executive Performance Scorecards</h6>
              <p className="text-muted small mb-3">Active ratings and completion metrics:</p>

              <div className="d-flex flex-column gap-3">
                {FIELD_EXECUTIVES.map((fe) => {
                  const activeTasks = queries.filter((q) => q.assignedTo === fe.id && q.status !== 'Closed').length;
                  const completedTasks = queries.filter((q) => q.assignedTo === fe.id && (q.status === 'Closed' || q.status === 'Approved')).length;

                  return (
                    <div key={fe.id} className="p-3 bg-light rounded-2 border">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2.5">
                          <img
                            src={fe.avatar}
                            alt={fe.name}
                            className="rounded-circle border"
                            style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                          />
                          <div>
                            <div className="fw-semibold text-dark small">{fe.name} ({fe.id})</div>
                            <small className="text-muted d-block">{fe.specialization}</small>
                          </div>
                        </div>

                        <span className="badge bg-white text-dark border small">
                          {fe.status}
                        </span>
                      </div>

                      <div className="row g-2 text-center pt-2 border-top small">
                        <div className="col-4">
                          <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Active</span>
                          <strong className="text-dark">{activeTasks}</strong>
                        </div>
                        <div className="col-4">
                          <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Completed</span>
                          <strong className="text-dark">{completedTasks}</strong>
                        </div>
                        <div className="col-4">
                          <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>CSAT</span>
                          <strong className="text-dark">⭐ {fe.rating}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Governance Audit Table */}
        <div className="card-clean bg-white p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="fw-bold text-dark mb-0">Management Audit Queue</h6>
              <small className="text-muted">Tickets requiring high-level SLA awareness or pending sign-off</small>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('supervisor')}
              className="btn btn-agency-secondary py-1 px-3"
              style={{ fontSize: '0.78rem' }}
            >
              Open Dispatch Pipeline
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small text-muted text-uppercase">
                <tr>
                  <th>Query ID</th>
                  <th>Customer & Location</th>
                  <th>Service Domain</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Tech</th>
                  <th className="text-end">Audit</th>
                </tr>
              </thead>
              <tbody>
                {queries.slice(0, 5).map((q) => (
                  <tr key={q.id}>
                    <td>
                      <span className="font-monospace fw-bold text-dark">{q.id}</span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark small">{q.customerName}</div>
                      <small className="text-muted">{q.location.city}</small>
                    </td>
                    <td>
                      <small className="text-dark fw-medium">{q.category}</small>
                    </td>
                    <td>
                      <span className={`badge priority-${q.priority.toLowerCase()}`}>
                        {q.priority}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={q.status} size="sm" />
                    </td>
                    <td>
                      <small className="text-dark fw-medium">{q.assignedExecutiveName || 'Unassigned'}</small>
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        onClick={() => onShowToast?.(`Audit bookmark set for #${q.id}`, 'info')}
                        className="btn btn-sm btn-outline-dark py-0.5 px-2 rounded-2"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Audit Log
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
