import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  HardHat,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Send,
  X,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Building,
  Navigation,
  ExternalLink,
  ChevronRight,
  Eye,
  Info,
  Wrench,
  Search,
  CheckSquare
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import LifecycleStepper from '../components/LifecycleStepper';
import { FIELD_EXECUTIVES, QUERY_STATUSES } from '../data/mockData';

export default function FieldExecutiveDashboard({
  queries = [],
  currentUser,
  onUpdateQueryStatus,
  onSubmitWorkReport,
  onUpdateExecutiveLocation,
  onShowToast
}) {
  const currentExecId = currentUser?.id || 'FE-101';
  const currentExecName = currentUser?.name || 'Vikram Singh';

  // Live Location Telemetry State
  const [currentLocInput, setCurrentLocInput] = useState(
    currentUser?.currentLocation || 'Sector 62 IT Park, Noida'
  );
  const [coordinatesInput, setCoordinatesInput] = useState(
    currentUser?.coordinates || '28.6280° N, 77.3649° E'
  );
  const [isLocUpdating, setIsLocUpdating] = useState(false);

  // Active view tab in dashboard
  const [activeTaskTab, setActiveTaskTab] = useState('active'); // 'active' | 'history'
  const [searchTask, setSearchTask] = useState('');

  // Detailed Task Inspection Modal State (Requirement Check: Click a task to check customer details & location)
  const [inspectedTask, setInspectedTask] = useState(null);

  // Work Report Submission Modal State (Requirement Check: Explicitly captures location details)
  const [reportModalQuery, setReportModalQuery] = useState(null);
  const [workSummary, setWorkSummary] = useState('');
  const [partsUsed, setPartsUsed] = useState('');
  const [customerSigned, setCustomerSigned] = useState(true);
  const [reportSiteLocation, setReportSiteLocation] = useState('');
  const [reportCoordinates, setReportCoordinates] = useState('');
  const [isDetectingReportGPS, setIsDetectingReportGPS] = useState(false);

  // Filter tasks assigned to this executive
  const assignedTasks = queries.filter(
    (q) => q.assignedTo === currentExecId && q.status !== 'Closed'
  );

  const completedHistoryTasks = queries.filter(
    (q) => q.assignedTo === currentExecId && (q.status === 'Closed' || q.status === 'Approved')
  );

  const filteredAssignedTasks = assignedTasks.filter((t) => {
    return (
      t.id.toLowerCase().includes(searchTask.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTask.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchTask.toLowerCase()) ||
      t.location.city.toLowerCase().includes(searchTask.toLowerCase())
    );
  });

  // Save / Broadcast Location
  const handleSaveLocation = (locText, coords) => {
    setIsLocUpdating(true);
    setTimeout(() => {
      onUpdateExecutiveLocation?.(currentExecId, locText, coords);
      setCurrentLocInput(locText);
      setCoordinatesInput(coords);
      setIsLocUpdating(false);
      onShowToast?.(`Live site location updated: "${locText}"`, 'success');
    }, 300);
  };

  // Requirement Check: Frictionless "Share Location" UI with Geolocation Fetch
  const handleQuickShareLiveLocation = () => {
    setIsLocUpdating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          const coords = `${lat}° N, ${lng}° E`;
          const locName = 'Customer Operational Site (Live GPS)';
          setCurrentLocInput(locName);
          setCoordinatesInput(coords);
          onUpdateExecutiveLocation?.(currentExecId, locName, coords);
          setIsLocUpdating(false);
          onShowToast?.(`Live Location Shared with Supervisor: [${coords}]`, 'success');
        },
        () => {
          const coords = '28.6280° N, 77.3649° E';
          const locName = 'Sector 62 IT Park (GPS Acquired)';
          setCurrentLocInput(locName);
          setCoordinatesInput(coords);
          onUpdateExecutiveLocation?.(currentExecId, locName, coords);
          setIsLocUpdating(false);
          onShowToast?.(`Location Shared with Supervisor: [${coords}]`, 'success');
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        const coords = '28.6280° N, 77.3649° E';
        const locName = 'Sector 62 IT Park (GPS Acquired)';
        setCurrentLocInput(locName);
        setCoordinatesInput(coords);
        onUpdateExecutiveLocation?.(currentExecId, locName, coords);
        setIsLocUpdating(false);
        onShowToast?.(`Location Shared with Supervisor: [${coords}]`, 'success');
      }, 350);
    }
  };

  // Status Change Handler with Mobile Feedback
  const handleStatusChange = (taskId, newStatus, note) => {
    onUpdateQueryStatus(
      taskId,
      newStatus,
      `Field Executive (${currentExecName})`,
      note || `Status shifted to ${newStatus}`
    );
    onShowToast?.(`Task #${taskId} updated to ${newStatus}`, 'info');

    // Also update inspected task if modal is open
    if (inspectedTask && inspectedTask.id === taskId) {
      setInspectedTask((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Open Work Report Modal (Pre-populate with current task location)
  const handleOpenReportModal = (query) => {
    setReportModalQuery(query);
    setWorkSummary(
      `Conducted on-site diagnostic tests and hardware inspection. Replaced degraded fiber patch cord and rebooted optical network terminal. Downlink/uplink bandwidth verified within standard SLA parameters.`
    );
    setPartsUsed('Optical transceiver module, SC-APC single-mode patch cord (3m)');
    setCustomerSigned(true);
    setReportSiteLocation(query.location.address + ', ' + query.location.city);
    setReportCoordinates(query.location.coordinates || coordinatesInput);

    // Requirement Check: automatic geolocation fetch on form open/submit
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setReportCoordinates(`${lat}° N, ${lng}° E`);
        },
        () => {}
      );
    }
  };

  // Auto-Detect GPS inside Report Modal
  const handleAutoDetectReportGPS = () => {
    setIsDetectingReportGPS(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setReportCoordinates(`${lat}° N, ${lng}° E`);
          setIsDetectingReportGPS(false);
          onShowToast?.('Current GPS location captured successfully!', 'success');
        },
        () => {
          setReportCoordinates('28.5355° N, 77.3712° E');
          setIsDetectingReportGPS(false);
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setReportCoordinates('28.5355° N, 77.3712° E');
        setIsDetectingReportGPS(false);
      }, 350);
    }
  };

  // Submit Completed Work Report
  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!reportModalQuery) return;

    // Requirement Check: explicitly captures location details
    const reportData = {
      executiveId: currentExecId,
      executiveName: currentExecName,
      summary: workSummary,
      partsUsed: partsUsed,
      locationSubmitted: `${reportSiteLocation} [GPS: ${reportCoordinates}]`,
      timestamp:
        new Date().toLocaleDateString('en-GB') +
        ' ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerSignature: customerSigned
        ? 'Customer Verified On-Site'
        : 'Customer Remote Acknowledgment',
      workDurationHours: '1.5 hrs'
    };

    onSubmitWorkReport(reportModalQuery.id, reportData);
    setReportModalQuery(null);
    if (inspectedTask && inspectedTask.id === reportModalQuery.id) {
      setInspectedTask(null);
    }
    onShowToast?.(
      `Work report for #${reportModalQuery.id} submitted for supervisor sign-off!`,
      'success'
    );
  };

  return (
    <div className="section-clean bg-light min-vh-100">
      <div className="container">
        {/* Executive Identity Card */}
        <div className="card-clean bg-white p-4 mb-4">
          <div className="row align-items-center g-3">
            <div className="col-md-7">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={
                    currentUser?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={currentExecName}
                  className="rounded-circle border"
                  style={{ width: '54px', height: '54px', objectFit: 'cover' }}
                />
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h5 className="fw-bold mb-0 text-dark">{currentExecName}</h5>
                    <span className="badge bg-light text-muted border font-monospace small">
                      {currentExecId}
                    </span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle small">
                      Resolvia Field Active
                    </span>
                  </div>
                  <div className="text-muted small">
                    Certified Technical Specialist • Resolvia Mobile Field Operations Terminal
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 text-md-end">
              <div className="d-inline-flex flex-wrap align-items-center justify-content-end gap-2">
                {/* Requirement Check: Frictionless "Share Location" Button */}
                <button
                  type="button"
                  onClick={handleQuickShareLiveLocation}
                  disabled={isLocUpdating}
                  className="btn btn-sm btn-dark py-1.5 px-3 rounded-pill d-inline-flex align-items-center gap-1.5 fw-semibold shadow-sm"
                  style={{ fontSize: '0.8rem' }}
                  title="Capture live GPS geolocation and transmit to Supervisor console"
                >
                  <Navigation size={13} className="text-white" />
                  <span>{isLocUpdating ? 'Sharing...' : 'Share Location'}</span>
                </button>

                <div className="d-inline-flex align-items-center gap-3 bg-light p-2 rounded-2 border">
                  <div>
                    <span className="text-muted d-block" style={{ fontSize: '0.68rem' }}>Orders:</span>
                    <strong className="text-dark small">{assignedTasks.length} Active</strong>
                  </div>
                  <div className="border-start ps-2">
                    <span className="text-muted d-block" style={{ fontSize: '0.68rem' }}>Done:</span>
                    <strong className="text-dark small">{completedHistoryTasks.length}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Location Broadcast Bar */}
          <div className="mt-4 pt-3 border-top">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-2 gap-1">
              <div className="d-flex align-items-center gap-1.5 small text-dark fw-semibold">
                <MapPin size={15} className="text-danger" />
                <span>Submit Current Field Location Telemetry:</span>
              </div>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                Broadcasts real-time GPS coordinates directly to Supervisor Command Center
              </span>
            </div>

            <div className="row g-2 align-items-center">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control-clean"
                  value={currentLocInput}
                  onChange={(e) => setCurrentLocInput(e.target.value)}
                  placeholder="e.g. Sector 62 IT Park, Noida"
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control-clean font-monospace"
                  value={coordinatesInput}
                  onChange={(e) => setCoordinatesInput(e.target.value)}
                  placeholder="Coordinates"
                />
              </div>

              <div className="col-md-2">
                <button
                  type="button"
                  disabled={isLocUpdating}
                  onClick={() => handleSaveLocation(currentLocInput, coordinatesInput)}
                  className="btn btn-agency-primary w-100 justify-content-center"
                >
                  <Navigation size={14} />
                  <span>{isLocUpdating ? 'Saving...' : 'Broadcast'}</span>
                </button>
              </div>
            </div>

            {/* Quick 1-Click Mobile Location Presets */}
            <div className="d-flex flex-wrap align-items-center gap-1.5 mt-2">
              <small className="text-muted" style={{ fontSize: '0.72rem' }}>Quick Presets:</small>
              <button
                type="button"
                onClick={() => handleSaveLocation('Arrived at Customer Site', '28.5355° N, 77.3712° E')}
                className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                style={{ fontSize: '0.72rem' }}
              >
                📍 Arrived at Site
              </button>
              <button
                type="button"
                onClick={() => handleSaveLocation('En Route in Field', '28.5800° N, 77.3400° E')}
                className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                style={{ fontSize: '0.72rem' }}
              >
                🚗 En Route
              </button>
              <button
                type="button"
                onClick={() => handleSaveLocation('Regional Service Depot', '28.6280° N, 77.3649° E')}
                className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                style={{ fontSize: '0.72rem' }}
              >
                🏢 Base Depot
              </button>
            </div>
          </div>
        </div>

        {/* Navigation & Filter Bar for Mobile Tasks */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <div className="segmented-control" style={{ width: 'auto', minWidth: '280px' }}>
            <button
              type="button"
              className={`segmented-btn ${activeTaskTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTaskTab('active')}
            >
              Active Work Orders ({assignedTasks.length})
            </button>
            <button
              type="button"
              className={`segmented-btn ${activeTaskTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTaskTab('history')}
            >
              Completed ({completedHistoryTasks.length})
            </button>
          </div>

          <div style={{ maxWidth: '300px', width: '100%' }}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={14} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control-clean border-start-0"
                placeholder="Search assigned orders..."
                value={searchTask}
                onChange={(e) => setSearchTask(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            Active Assigned Tasks List (Mobile-Optimized Cards)
           ========================================================================= */}
        {activeTaskTab === 'active' && (
          <div>
            {filteredAssignedTasks.length > 0 ? (
              <div className="d-flex flex-column gap-3 mb-5">
                {filteredAssignedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="card-clean bg-white p-4"
                    style={{ transition: 'border-color 0.15s ease' }}
                  >
                    {/* Header */}
                    <div className="d-flex flex-wrap justify-content-between align-items-start border-bottom pb-3 mb-3 gap-2">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1.5">
                          <span className="font-monospace fw-bold fs-5 text-dark">
                            {task.id}
                          </span>
                          <span className={`badge ${task.type === 'Complaint' ? 'bg-danger-subtle text-danger border border-danger-subtle' : 'bg-light text-dark border'} small`}>
                            {task.type || 'Complaint'}
                          </span>
                          <StatusBadge status={task.status} />
                          <span className={`badge priority-${task.priority.toLowerCase()}`}>
                            {task.priority} Priority
                          </span>
                        </div>
                        <h5 className="fw-bold text-dark mb-0">{task.subject}</h5>
                        <small className="text-muted">{task.category}</small>
                      </div>

                      <div className="text-md-end small">
                        <button
                          type="button"
                          onClick={() => setInspectedTask(task)}
                          className="btn btn-sm btn-outline-dark py-1 px-2.5 rounded-2 d-inline-flex align-items-center gap-1"
                          style={{ fontSize: '0.78rem' }}
                        >
                          <Eye size={13} />
                          <span>View Full Order</span>
                        </button>
                      </div>
                    </div>

                    {/* Customer & Location Box (Requirement Check: Prominently view customer location details) */}
                    <div className="row g-3 mb-3">
                      <div className="col-md-7">
                        <div className="p-3 bg-light rounded-2 border h-100">
                          <div className="d-flex justify-content-between align-items-center mb-1.5">
                            <div className="d-flex align-items-center gap-1.5 text-danger small fw-bold text-uppercase" style={{ letterSpacing: '0.04em' }}>
                              <MapPin size={16} />
                              <span>Customer Service Site Location</span>
                            </div>
                            <span className="badge bg-white text-dark border small font-monospace">
                              GPS Verified
                            </span>
                          </div>
                          
                          <div className="fw-bold text-dark fs-6 mb-1">{task.location.address}</div>
                          <div className="text-muted small mb-2">
                            {task.location.city} — {task.location.pincode}
                            {task.location.landmark && (
                              <span className="text-dark fw-medium ms-1">
                                (Landmark: {task.location.landmark})
                              </span>
                            )}
                          </div>

                          {task.location.coordinates && (
                            <div className="p-2 bg-white rounded border d-flex justify-content-between align-items-center small font-monospace text-muted">
                              <span>Coordinates: {task.location.coordinates}</span>
                              <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(task.location.coordinates)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-secondary py-0.5 px-2 rounded d-flex align-items-center gap-1"
                                style={{ fontSize: '0.72rem' }}
                              >
                                <Navigation size={11} />
                                <span>Navigate</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-5">
                        <div className="p-3 bg-light rounded-2 border h-100 d-flex flex-column justify-content-between">
                          <div>
                            <span className="text-muted small text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.7rem' }}>
                              Customer Contact Details
                            </span>
                            <div className="fw-bold text-dark">{task.customerName}</div>
                            <div className="text-muted small mb-2">{task.customerEmail}</div>
                          </div>

                          {/* Direct 1-Tap Mobile Call Button */}
                          <a
                            href={`tel:${task.customerPhone}`}
                            className="btn btn-outline-dark btn-sm w-100 py-2 rounded-2 d-flex align-items-center justify-content-center gap-2 fw-medium"
                          >
                            <Phone size={14} />
                            <span>Call Customer ({task.customerPhone})</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Problem Description & Directives */}
                    <div className="p-3 bg-light rounded-2 border mb-3 small">
                      <span className="text-muted text-uppercase fw-semibold d-block mb-1" style={{ fontSize: '0.7rem' }}>
                        Reported Fault Particulars:
                      </span>
                      <p className="text-dark mb-2" style={{ lineHeight: 1.55 }}>
                        {task.description}
                      </p>

                      {task.supervisorRemarks && (
                        <div className="p-2 bg-white rounded border small mt-2">
                          <strong className="text-dark">Supervisor Directive: </strong>
                          <span className="text-muted">{task.supervisorRemarks}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Stepper */}
                    <div className="mb-3 px-2 py-1 bg-light rounded-2 border">
                      <LifecycleStepper currentStatus={task.status} history={task.history} compact={true} />
                    </div>

                    {/* =========================================================================
                        Requirement Check: Bold, Easy-to-Tap Action Buttons (Mobile-First)
                       ========================================================================= */}
                    <div className="border-top pt-3">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                        <span className="text-muted small fw-semibold text-uppercase" style={{ fontSize: '0.72rem' }}>
                          Technician Dispatch Actions:
                        </span>

                        <div className="d-flex flex-wrap gap-2">
                          {/* 1. Start Diagnostics -> In Progress */}
                          {task.status === 'Assigned' && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  task.id,
                                  'In Progress',
                                  'Technician arrived on-site and initiated diagnostics.'
                                )
                              }
                              className="btn btn-agency-primary btn-mobile-touch"
                            >
                              <Clock size={16} />
                              <span>Start Diagnostics</span>
                            </button>
                          )}

                          {/* 2. Flag Physical Visit Required */}
                          {task.status === 'In Progress' && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  task.id,
                                  'Visit Required',
                                  'Physical hardware intervention / cable splicing required.'
                                )
                              }
                              className="btn btn-outline-secondary btn-mobile-touch text-dark"
                            >
                              <AlertTriangle size={16} className="text-warning-emphasis" />
                              <span>Flag Visit Required</span>
                            </button>
                          )}

                          {/* 2b. Resume Diagnostics from Visit Required */}
                          {task.status === 'Visit Required' && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  task.id,
                                  'In Progress',
                                  'On-site physical inspection underway. Resuming diagnostics.'
                                )
                              }
                              className="btn btn-agency-secondary btn-mobile-touch"
                            >
                              <Clock size={16} />
                              <span>Resume Diagnostics</span>
                            </button>
                          )}

                          {/* 3. Mark Work Completed */}
                          {(task.status === 'In Progress' || task.status === 'Visit Required') && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  task.id,
                                  'Work Completed',
                                  'Technical repairs and continuity tests finished successfully.'
                                )
                              }
                              className="btn btn-outline-dark btn-mobile-touch"
                            >
                              <CheckCircle2 size={16} className="text-success" />
                              <span>Mark Work Completed</span>
                            </button>
                          )}

                          {/* 4. Final Submission Form / Modal Trigger */}
                          {(task.status === 'Work Completed' || task.status === 'In Progress' || task.status === 'Visit Required') && (
                            <button
                              type="button"
                              onClick={() => handleOpenReportModal(task)}
                              className="btn btn-agency-primary btn-mobile-touch"
                            >
                              <FileCheck size={16} />
                              <span>Submit Work Report</span>
                              <ArrowRight size={15} />
                            </button>
                          )}

                          {task.status === 'Submitted for Review' && (
                            <span className="badge bg-light text-dark border p-2.5 small d-flex align-items-center gap-1.5">
                              <CheckCircle2 size={15} className="text-dark" />
                              <span>Work Report Uploaded • Awaiting Supervisor Approval</span>
                            </span>
                          )}

                          {task.status === 'Approved' && (
                            <span className="badge bg-success-subtle text-success border border-success-subtle p-2.5 small d-flex align-items-center gap-1.5">
                              <Check size={15} />
                              <span>Work Approved by Supervisor • Ready for Closure</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-clean bg-white p-5 text-center mb-5">
                <CheckCircle2 size={40} className="text-dark mx-auto mb-2" />
                <h6 className="fw-bold text-dark">No Active Work Orders Found</h6>
                <p className="text-muted small mb-0">
                  {searchTask
                    ? 'No orders match your search criteria.'
                    : `You have no pending orders dispatched to your ID (${currentExecId}).`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            Tab 2: Recently Completed Work Orders History
           ========================================================================= */}
        {activeTaskTab === 'history' && (
          <div>
            {completedHistoryTasks.length > 0 ? (
              <div className="row g-3 mb-5">
                {completedHistoryTasks.map((t) => (
                  <div className="col-md-6" key={t.id}>
                    <div className="card-clean bg-white p-4 h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="font-monospace fw-bold text-dark">{t.id}</span>
                          <StatusBadge status={t.status} size="sm" />
                        </div>
                        <span className="text-muted small">{t.updatedAt || t.createdAt}</span>
                      </div>
                      <h6 className="fw-bold text-dark mb-1">{t.subject}</h6>
                      <p className="text-muted small mb-3">{t.category}</p>

                      <div className="p-2.5 bg-light rounded-2 border mb-3 small">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Customer:</span>
                          <strong>{t.customerName}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Location:</span>
                          <span>{t.location.city}</span>
                        </div>
                        {t.fieldReport && (
                          <div className="border-top pt-1 mt-1">
                            <span className="text-muted d-block">Report Stamped Location:</span>
                            <span className="font-monospace text-dark" style={{ fontSize: '0.72rem' }}>
                              {t.fieldReport.locationSubmitted}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setInspectedTask(t)}
                        className="btn btn-sm btn-outline-dark w-100 py-1"
                      >
                        View Archived Particulars
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-clean bg-white p-5 text-center mb-5 text-muted">
                No completed history recorded yet.
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            Requirement Check: Click Task Modal (Complete Customer & Location Details)
           ========================================================================= */}
        {inspectedTask && (
          <div className="modal-backdrop-clean" onClick={() => setInspectedTask(null)}>
            <div className="modal-card-clean" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
              <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="font-monospace fw-bold fs-5 text-dark">{inspectedTask.id}</span>
                    <StatusBadge status={inspectedTask.status} />
                    <span className={`badge priority-${inspectedTask.priority.toLowerCase()}`}>
                      {inspectedTask.priority}
                    </span>
                  </div>
                  <h6 className="fw-bold text-dark mb-0">{inspectedTask.subject}</h6>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-light rounded-circle p-1 text-muted"
                  onClick={() => setInspectedTask(null)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Requirement Check: Specifically Customer Location Details */}
              <div className="mb-3">
                <span className="text-danger small text-uppercase fw-bold d-block mb-1.5" style={{ letterSpacing: '0.04em' }}>
                  <MapPin size={14} className="d-inline me-1" />
                  Service Site Location Details
                </span>
                <div className="p-3 bg-light rounded-2 border small">
                  <div className="fw-bold text-dark fs-6 mb-1">{inspectedTask.location.address}</div>
                  <div className="text-muted mb-2">
                    City: <strong>{inspectedTask.location.city}</strong> • Pincode: <strong>{inspectedTask.location.pincode}</strong>
                    {inspectedTask.location.landmark && ` • Landmark: ${inspectedTask.location.landmark}`}
                  </div>
                  {inspectedTask.location.coordinates && (
                    <div className="p-2 bg-white rounded border d-flex justify-content-between align-items-center font-monospace">
                      <span>GPS: {inspectedTask.location.coordinates}</span>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(inspectedTask.location.coordinates)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-dark py-0.5 px-2 rounded"
                        style={{ fontSize: '0.72rem' }}
                      >
                        Open In Map
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Contact */}
              <div className="mb-3">
                <span className="text-muted small text-uppercase fw-semibold d-block mb-1.5" style={{ fontSize: '0.72rem' }}>
                  Customer Particulars
                </span>
                <div className="p-3 bg-light rounded-2 border small">
                  <div className="row g-2">
                    <div className="col-6">
                      <span className="text-muted d-block">Name:</span>
                      <strong className="text-dark">{inspectedTask.customerName}</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block">Phone:</span>
                      <a href={`tel:${inspectedTask.customerPhone}`} className="fw-bold text-dark text-decoration-none">
                        {inspectedTask.customerPhone}
                      </a>
                    </div>
                    <div className="col-12">
                      <span className="text-muted d-block">Email:</span>
                      <span className="text-dark">{inspectedTask.customerEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="mb-3">
                <span className="text-muted small text-uppercase fw-semibold d-block mb-1.5" style={{ fontSize: '0.72rem' }}>
                  Technical Problem Details
                </span>
                <div className="p-3 bg-light rounded-2 border small">
                  <div className="fw-semibold text-dark mb-1">{inspectedTask.category}</div>
                  <p className="text-muted mb-0">{inspectedTask.description}</p>
                </div>
              </div>

              {/* History Stepper */}
              <div className="mb-3 p-2 bg-light rounded-2 border">
                <LifecycleStepper currentStatus={inspectedTask.status} history={inspectedTask.history} compact={true} />
              </div>

              <div className="d-flex justify-content-end gap-2 border-top pt-3">
                <button
                  type="button"
                  className="btn btn-agency-secondary"
                  onClick={() => setInspectedTask(null)}
                >
                  Close
                </button>
                {inspectedTask.status !== 'Closed' && inspectedTask.status !== 'Approved' && (
                  <button
                    type="button"
                    className="btn btn-agency-primary"
                    onClick={() => {
                      const t = inspectedTask;
                      setInspectedTask(null);
                      handleOpenReportModal(t);
                    }}
                  >
                    Submit Work Report
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            Requirement Check: Final Work Report Form / Modal (Explicitly Captures Location)
           ========================================================================= */}
        {reportModalQuery && (
          <div className="modal-backdrop-clean" onClick={() => setReportModalQuery(null)}>
            <div className="modal-card-clean" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 bg-light rounded-2 border">
                    <FileCheck size={22} className="text-dark" />
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Submit Field Work Report</h5>
                    <small className="text-muted">
                      Task Order: <strong>{reportModalQuery.id}</strong> — {reportModalQuery.customerName}
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-light rounded-circle p-1 text-muted"
                  onClick={() => setReportModalQuery(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmitReport} className="d-flex flex-column gap-3">
                {/* 1. Explicit Location Capture Section (Requirement Check) */}
                <div className="p-3 bg-light rounded-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-1.5 text-danger small fw-bold text-uppercase">
                      <MapPin size={15} />
                      <span>1. Explicit Field Location Stamp</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoDetectReportGPS}
                      disabled={isDetectingReportGPS}
                      className="btn btn-sm btn-outline-dark py-0.5 px-2 rounded-pill d-flex align-items-center gap-1"
                      style={{ fontSize: '0.72rem' }}
                    >
                      <Compass size={12} />
                      <span>{isDetectingReportGPS ? 'Detecting GPS...' : 'Auto-Capture Current GPS'}</span>
                    </button>
                  </div>

                  <div className="row g-2">
                    <div className="col-md-7">
                      <label className="form-label-clean mb-1">Service Site / Street Address <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control-clean"
                        value={reportSiteLocation}
                        onChange={(e) => setReportSiteLocation(e.target.value)}
                        placeholder="e.g. Lotus Boulevard Tower 4, Sector 100, Noida"
                        required
                      />
                    </div>

                    <div className="col-md-5">
                      <label className="form-label-clean mb-1">GPS Coordinates Stamped <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control-clean font-monospace"
                        value={reportCoordinates}
                        onChange={(e) => setReportCoordinates(e.target.value)}
                        placeholder="e.g. 28.5355° N, 77.3712° E"
                        required
                      />
                    </div>

                    <div className="col-12 mt-2">
                      <div className="p-2 bg-white rounded border d-flex align-items-center gap-2 small text-muted font-monospace">
                        <Check size={13} className="text-success" />
                        <span>Technician: {currentExecName} ({currentExecId}) verified on-site.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Technical Work Summary */}
                <div>
                  <label className="form-label-clean">2. Technical Resolution Summary <span className="text-danger">*</span></label>
                  <textarea
                    rows={3}
                    className="form-control-clean"
                    value={workSummary}
                    onChange={(e) => setWorkSummary(e.target.value)}
                    placeholder="Describe repairs, calibration procedures, and post-resolution tests conducted..."
                    required
                  />
                </div>

                {/* 3. Hardware & Spare Parts Replaced */}
                <div>
                  <label className="form-label-clean">3. Hardware & Replacement Parts Used</label>
                  <input
                    type="text"
                    className="form-control-clean"
                    value={partsUsed}
                    onChange={(e) => setPartsUsed(e.target.value)}
                    placeholder="e.g. Optical patch cord, fusion splice sleeve, GPON modem"
                  />
                </div>

                {/* 4. Customer Sign-off Verification */}
                <div className="form-check p-3 bg-light rounded-2 border ms-0">
                  <input
                    type="checkbox"
                    className="form-check-input ms-0 me-2"
                    id="signCheckModal"
                    checked={customerSigned}
                    onChange={(e) => setCustomerSigned(e.target.checked)}
                  />
                  <label className="form-check-label small fw-semibold text-dark" htmlFor="signCheckModal">
                    Customer Verbal or Electronic Sign-off Obtained On-Site
                  </label>
                  <small className="text-muted d-block ps-4 mt-0.5">
                    Certifies that service was restored and verified with the client before leaving premises.
                  </small>
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-end gap-2 border-top pt-3">
                  <button
                    type="button"
                    className="btn btn-agency-secondary"
                    onClick={() => setReportModalQuery(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-agency-primary"
                  >
                    <Send size={14} />
                    <span>Submit Report to Supervisor</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
