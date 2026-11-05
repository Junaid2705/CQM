import React, { useState } from 'react';
import {
  Send,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Sparkles,
  Phone,
  Mail,
  User,
  AlertCircle,
  FileText,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  ListFilter,
  HardHat,
  FileCheck,
  Layers,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  X,
  Filter
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import LifecycleStepper from '../components/LifecycleStepper';
import { SERVICES_LIST, QUERY_STATUSES } from '../data/mockData';

export default function CustomerPortal({
  queries = [],
  currentUser,
  onSubmitQuery,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('raise'); // 'raise' | 'tracking'

  // Query & Complaint Form State (Requirement 1)
  const [formType, setFormType] = useState('Complaint'); // 'Query' | 'Complaint'
  const [formData, setFormData] = useState({
    customerName: currentUser?.name || 'Amit Sharma',
    customerEmail: currentUser?.email || 'amit.sharma@gmail.com',
    customerPhone: currentUser?.phone || '+91 98111 22334',
    category: 'High-Speed Broadband & Optical Fiber',
    priority: 'High',
    subject: '',
    description: '',
    address: currentUser?.address || 'Flat 402, Lotus Boulevard, Sector 100',
    city: 'Noida',
    landmark: 'Near Pathways School',
    pincode: '201304',
    coordinates: '28.5355° N, 77.3712° E'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedSuccessQuery, setGeneratedSuccessQuery] = useState(null); // Success Modal State (Requirement 2)
  const [copied, setCopied] = useState(false);
  const [locationDetecting, setLocationDetecting] = useState(false);

  // Tracking View State (Requirement 3)
  const [selectedTrackingId, setSelectedTrackingId] = useState(queries[0]?.id || 'CQ-9821');
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL'); // 'ALL' | 'Query' | 'Complaint'
  const [statusFilter, setStatusFilter] = useState('ALL');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1-Click Fast Autofill Helpers for QA testing
  const handleAutofillComplaint = () => {
    setFormType('Complaint');
    setFormData({
      customerName: currentUser?.name || 'Amit Sharma',
      customerEmail: currentUser?.email || 'amit.sharma@gmail.com',
      customerPhone: currentUser?.phone || '+91 98111 22334',
      category: 'High-Speed Broadband & Optical Fiber',
      priority: 'High',
      subject: 'Red Optical LOS Warning Light Flashing on Main GPON Gateway',
      description: 'The fiber optic GPON modem has been flashing red on the LOS LED indicator since 9:30 AM. Optical patch cord checked with no visible bending or breakage. Urgent technician dispatch required for enterprise workstation connectivity.',
      address: 'Flat 402, Lotus Boulevard, Sector 100',
      city: 'Noida',
      landmark: 'Near Pathways School',
      pincode: '201304',
      coordinates: '28.5355° N, 77.3712° E'
    });
  };

  const handleAutofillQuery = () => {
    setFormType('Query');
    setFormData({
      customerName: currentUser?.name || 'Amit Sharma',
      customerEmail: currentUser?.email || 'amit.sharma@gmail.com',
      customerPhone: currentUser?.phone || '+91 98111 22334',
      category: 'Smart Ultrasonic Water & Gas Metering',
      priority: 'Medium',
      subject: 'Ultrasonic Flow Sensor Recalibration Procedure & Schedule Inquiry',
      description: 'Requesting confirmation on whether preventive calibration for the ultrasonic digital water meter in building tower B is scheduled for this quarter. Seeking technician procedure document and AMR meter telemetry guidelines.',
      address: 'Flat 402, Lotus Boulevard, Sector 100',
      city: 'Noida',
      landmark: 'Sector 100 Commercial Gate',
      pincode: '201304',
      coordinates: '28.5355° N, 77.3712° E'
    });
  };

  // Location Auto-Detect Simulator
  const handleDetectLocation = () => {
    setLocationDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setFormData((prev) => ({
            ...prev,
            coordinates: `${lat}° N, ${lng}° E`,
            landmark: prev.landmark || 'Auto-detected GPS Location'
          }));
          setLocationDetecting(false);
        },
        () => {
          setFormData((prev) => ({
            ...prev,
            coordinates: '28.5355° N, 77.3712° E',
            city: 'Noida',
            landmark: 'Sector 62 (Simulated GPS)'
          }));
          setLocationDetecting(false);
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          coordinates: '28.5355° N, 77.3712° E',
          city: 'Noida',
          landmark: 'Sector 62 (Simulated GPS)'
        }));
        setLocationDetecting(false);
      }, 400);
    }
  };

  // Form Submission with Unique Query ID Generation (Requirement 2)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Mock logic in React to automatically generate a "Unique Query ID" (QRY-2026-XXXX)
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const generatedUniqueId = `QRY-2026-${randomCode}`;

      const now = new Date();
      const formattedDate =
        now.toLocaleDateString('en-GB') +
        ' ' +
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newQueryItem = {
        id: generatedUniqueId,
        type: formType, // "Query" or "Complaint" (Requirement 1)
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        category: formData.category,
        priority: formData.priority,
        subject: formData.subject,
        description: formData.description,
        location: {
          address: formData.address,
          city: formData.city,
          landmark: formData.landmark,
          pincode: formData.pincode,
          coordinates: formData.coordinates
        },
        status: 'New Query', // Exact workflow terminology (Requirement 3)
        createdAt: formattedDate,
        updatedAt: formattedDate,
        assignedTo: null,
        assignedExecutiveName: null,
        history: [
          {
            status: 'New Query',
            timestamp: formattedDate,
            updatedBy: `Customer (${formData.customerName})`,
            note: `${formType} submitted via Customer Portal.`
          }
        ],
        fieldReport: null,
        supervisorRemarks: null
      };

      onSubmitQuery(newQueryItem);
      setGeneratedSuccessQuery(newQueryItem);
      setSelectedTrackingId(newQueryItem.id);
      setIsSubmitting(false);
    }, 450);
  };

  const handleCopyId = () => {
    if (generatedSuccessQuery) {
      navigator.clipboard.writeText(generatedSuccessQuery.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Filter queries in Tracking View
  const filteredTrackingQueries = queries.filter((q) => {
    const matchesSearch =
      q.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
      q.location.city.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesType = typeFilter === 'ALL' || (q.type || 'Complaint') === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const activeTrackingQuery = queries.find(
    (q) => q.id.toLowerCase() === selectedTrackingId.trim().toLowerCase()
  ) || filteredTrackingQueries[0] || queries[0];

  return (
    <div className="section-clean bg-light min-vh-100">
      <div className="container">
        {/* Customer Portal Top Bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-dark text-white px-2 py-0.5 rounded-pill small">
                RESOLVIA CUSTOMER SERVICES
              </span>
              <span className="text-muted small">
                • Logged in as: <strong>{currentUser?.name || 'Amit Sharma'}</strong>
              </span>
            </div>
            <h2 className="section-title mb-0">Resolvia Customer Query & Complaint Portal</h2>
            <p className="text-muted small mb-0">
              Submit technical queries and complaints with GPS location tagging, receive unique tracking IDs, and monitor live resolution progress.
            </p>
          </div>

          {/* Segmented Sub-Navigation Switcher */}
          <div className="segmented-control" style={{ width: 'auto', minWidth: '320px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('raise')}
              className={`segmented-btn ${activeTab === 'raise' ? 'active' : ''}`}
            >
              Raise Query / Complaint
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tracking')}
              className={`segmented-btn ${activeTab === 'tracking' ? 'active' : ''}`}
            >
              Tracking Dashboard ({queries.length})
            </button>
          </div>
        </div>

        {/* =========================================================================
            Tab 1: Query & Complaint Form (Requirement 1)
           ========================================================================= */}
        {activeTab === 'raise' && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Autofill Demo Testing Bar */}
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                <span className="text-muted small">Please complete all fields to submit your request:</span>
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutofillComplaint}
                    className="btn btn-sm btn-outline-danger py-1 px-2.5 rounded-2 fw-medium d-flex align-items-center gap-1.5"
                    style={{ fontSize: '0.75rem' }}
                    title="Populate sample technical complaint"
                  >
                    <AlertTriangle size={13} />
                    <span>Autofill Complaint</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAutofillQuery}
                    className="btn btn-sm btn-outline-dark py-1 px-2.5 rounded-2 fw-medium d-flex align-items-center gap-1.5"
                    style={{ fontSize: '0.75rem' }}
                    title="Populate sample service query"
                  >
                    <HelpCircle size={13} />
                    <span>Autofill Query</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                {/* 1. Request Type Selector (Requirement 1: Explicitly specify Query vs Complaint) */}
                <div className="card-clean bg-white p-4">
                  <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <FileText size={18} className="text-dark" />
                    <h6 className="fw-bold mb-0 text-dark">1. Nature of Request</h6>
                    <span className="badge bg-light text-muted border small ms-auto">Required</span>
                  </div>

                  <label className="form-label-clean d-block mb-2">
                    Specify whether this submission is a <strong>Query</strong> or a <strong>Complaint</strong>:
                  </label>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div
                        onClick={() => setFormType('Complaint')}
                        className={`p-3 rounded-3 border card-interactive h-100 ${
                          formType === 'Complaint' ? 'bg-light border-dark' : 'bg-white'
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="requestTypeRadio"
                              id="typeComplaint"
                              className="form-check-input mt-0"
                              checked={formType === 'Complaint'}
                              onChange={() => setFormType('Complaint')}
                            />
                            <label className="fw-bold text-dark small mb-0" htmlFor="typeComplaint" style={{ cursor: 'pointer' }}>
                              Complaint
                            </label>
                          </div>
                          <span className="badge bg-danger-subtle text-danger border border-danger-subtle small">
                            Service Fault
                          </span>
                        </div>
                        <p className="text-muted small mb-0 ps-4" style={{ fontSize: '0.78rem' }}>
                          Report a service outage, breakdown, faulty hardware, line cut, or operational grievance.
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        onClick={() => setFormType('Query')}
                        className={`p-3 rounded-3 border card-interactive h-100 ${
                          formType === 'Query' ? 'bg-light border-dark' : 'bg-white'
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="requestTypeRadio"
                              id="typeQuery"
                              className="form-check-input mt-0"
                              checked={formType === 'Query'}
                              onChange={() => setFormType('Query')}
                            />
                            <label className="fw-bold text-dark small mb-0" htmlFor="typeQuery" style={{ cursor: 'pointer' }}>
                              Query
                            </label>
                          </div>
                          <span className="badge bg-light text-dark border small">
                            Information
                          </span>
                        </div>
                        <p className="text-muted small mb-0 ps-4" style={{ fontSize: '0.78rem' }}>
                          Inquire about scheduled maintenance, telemetry procedures, billing questions, or SLA terms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Customer Identification (Requirement 1: Name, Phone, Email) */}
                <div className="card-clean bg-white p-4">
                  <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <User size={18} className="text-dark" />
                    <h6 className="fw-bold mb-0 text-dark">2. Customer Identification</h6>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-clean">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        className="form-control-clean"
                        placeholder="e.g. Amit Sharma"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-clean">
                        Contact Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        className="form-control-clean"
                        placeholder="e.g. +91 98111 22334"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label-clean">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        className="form-control-clean"
                        placeholder="e.g. amit.sharma@gmail.com"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Location & Address Details (Requirement 1: Location/Address) */}
                <div className="card-clean bg-white p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                      <MapPin size={18} className="text-danger" />
                      <h6 className="fw-bold mb-0 text-dark">3. Service Location & Address</h6>
                    </div>

                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={locationDetecting}
                      className="btn btn-sm btn-outline-dark py-1 px-2.5 rounded-pill d-flex align-items-center gap-1"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <Compass size={13} />
                      <span>{locationDetecting ? 'Detecting...' : 'Auto-Detect GPS'}</span>
                    </button>
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label-clean">
                        Street Address / Apartment / Facility <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control-clean"
                        placeholder="e.g. Flat 402, Lotus Boulevard, Sector 100"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-5">
                      <label className="form-label-clean">
                        City / District <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control-clean"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label-clean">Prominent Landmark</label>
                      <input
                        type="text"
                        name="landmark"
                        className="form-control-clean"
                        placeholder="e.g. Near Pathways School"
                        value={formData.landmark}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label-clean">
                        Pincode <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        className="form-control-clean"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {formData.coordinates && (
                      <div className="col-12">
                        <div className="p-2 bg-light rounded-2 border d-flex align-items-center gap-2 small text-muted font-monospace">
                          <Compass size={14} className="text-dark" />
                          <span>Coordinates Tagged:</span>
                          <strong className="text-dark">{formData.coordinates}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Query / Complaint Particulars (Requirement 1: Detailed Description) */}
                <div className="card-clean bg-white p-4">
                  <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <HelpCircle size={18} className="text-dark" />
                    <h6 className="fw-bold mb-0 text-dark">4. Problem Particulars</h6>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-7">
                      <label className="form-label-clean">Service Domain</label>
                      <select
                        name="category"
                        className="form-control-clean"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        {SERVICES_LIST.map((srv) => (
                          <option key={srv.id} value={srv.name}>
                            {srv.name} ({srv.sla} SLA)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-5">
                      <label className="form-label-clean">Urgency Priority</label>
                      <select
                        name="priority"
                        className="form-control-clean"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                      >
                        <option value="Low">Low — General inquiry</option>
                        <option value="Medium">Medium — Partial degradation</option>
                        <option value="High">High — Complete outage</option>
                        <option value="Urgent">Urgent — Safety hazard / Emergency</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label-clean">
                        Headline / Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control-clean"
                        placeholder="e.g. Red Optical LOS Light Flashing on Main Modem"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label-clean">
                        Detailed {formType} Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        className="form-control-clean"
                        placeholder={`Please describe the ${formType.toLowerCase()} in detail, including equipment error codes, physical signs, or when it started...`}
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <small className="text-muted">
                    Unique Query ID (e.g. QRY-2026-XXXX) will be generated automatically.
                  </small>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-agency-primary px-4 py-2.5"
                  >
                    {isSubmitting ? (
                      <span>Generating Query ID...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit {formType}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            Tab 2: Query Status Tracking Dashboard (Requirement 3)
           ========================================================================= */}
        {activeTab === 'tracking' && (
          <div>
            {/* Filter and Search Bar for Tracking */}
            <div className="card-clean bg-white p-3 mb-4">
              <div className="row g-2 align-items-center">
                <div className="col-md-5">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <Search size={14} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control-clean border-start-0"
                      placeholder="Search by Query ID (e.g. QRY-2026-8492 or CQ-9821)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <select
                    className="form-control-clean"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="ALL">All Types (Queries & Complaints)</option>
                    <option value="Query">Queries Only</option>
                    <option value="Complaint">Complaints Only</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-control-clean"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="ALL">All Statuses ({queries.length})</option>
                    {QUERY_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Split Layout: Query Table & Detailed Status Panel */}
            <div className="row g-4">
              {/* Left Column: Queries Data Table (Requirement 3: Clean modern table) */}
              <div className="col-lg-6">
                <div className="card-clean bg-white p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0 text-dark small text-uppercase" style={{ letterSpacing: '0.04em' }}>
                      Submitted Queries & Complaints ({filteredTrackingQueries.length})
                    </h6>
                    <button
                      type="button"
                      onClick={() => setActiveTab('raise')}
                      className="btn btn-sm btn-outline-dark py-0.5 px-2 rounded-2"
                      style={{ fontSize: '0.72rem' }}
                    >
                      + Raise New
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light small text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>
                        <tr>
                          <th>Query ID</th>
                          <th>Type</th>
                          <th>Subject</th>
                          <th>Status</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTrackingQueries.length > 0 ? (
                          filteredTrackingQueries.map((q) => {
                            const isSelected = q.id === activeTrackingQuery?.id;
                            return (
                              <tr
                                key={q.id}
                                className={isSelected ? 'table-active' : ''}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setSelectedTrackingId(q.id)}
                              >
                                <td>
                                  <span className="font-monospace fw-bold text-dark small">
                                    {q.id}
                                  </span>
                                  <small className="d-block text-muted" style={{ fontSize: '0.68rem' }}>
                                    {q.createdAt.split(' ')[0]}
                                  </small>
                                </td>
                                <td>
                                  <span className={`badge ${q.type === 'Complaint' ? 'bg-danger-subtle text-danger border border-danger-subtle' : 'bg-light text-dark border'} small`} style={{ fontSize: '0.68rem' }}>
                                    {q.type || 'Complaint'}
                                  </span>
                                </td>
                                <td>
                                  <div className="fw-medium text-dark small text-truncate" style={{ maxWidth: '180px' }} title={q.subject}>
                                    {q.subject}
                                  </div>
                                  <small className="text-muted d-block text-truncate" style={{ maxWidth: '180px' }}>
                                    {q.category}
                                  </small>
                                </td>
                                <td>
                                  {/* Requirement 3: Statuses strictly match document terminology */}
                                  <StatusBadge status={q.status} size="sm" />
                                </td>
                                <td className="text-end">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedTrackingId(q.id);
                                    }}
                                    className="btn btn-sm btn-outline-dark py-0.5 px-2 rounded-2"
                                    style={{ fontSize: '0.72rem' }}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-4 text-muted small">
                              No queries matched your search criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Status Tracking Detail View (Requirement 3: Check status at a glance) */}
              <div className="col-lg-6">
                {activeTrackingQuery ? (
                  <div className="card-clean bg-white p-4">
                    {/* Top Bar */}
                    <div className="d-flex flex-wrap justify-content-between align-items-start pb-3 mb-3 border-bottom gap-2">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="font-monospace fw-bold fs-5 text-dark">
                            {activeTrackingQuery.id}
                          </span>
                          <span className={`badge ${activeTrackingQuery.type === 'Complaint' ? 'bg-danger-subtle text-danger border border-danger-subtle' : 'bg-light text-dark border'} small`}>
                            {activeTrackingQuery.type || 'Complaint'}
                          </span>
                          <StatusBadge status={activeTrackingQuery.status} />
                        </div>
                        <h6 className="fw-bold text-dark mb-0">{activeTrackingQuery.subject}</h6>
                      </div>

                      <span className={`badge priority-${activeTrackingQuery.priority.toLowerCase()} small`}>
                        {activeTrackingQuery.priority} Priority
                      </span>
                    </div>

                    {/* Visual 9-Phase Lifecycle Progress Stepper (Requirement 3) */}
                    <div className="p-3 bg-light rounded-2 border mb-3">
                      <span className="text-uppercase text-muted fw-semibold small d-block mb-1" style={{ fontSize: '0.7rem' }}>
                        Lifecycle Status Progress
                      </span>
                      <LifecycleStepper
                        currentStatus={activeTrackingQuery.status}
                        history={activeTrackingQuery.history}
                        compact={true}
                      />
                    </div>

                    {/* Customer & Location Box */}
                    <div className="row g-2 mb-3 small">
                      <div className="col-6">
                        <div className="p-2.5 bg-light rounded-2 border h-100">
                          <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Customer</span>
                          <strong className="text-dark">{activeTrackingQuery.customerName}</strong>
                          <div className="text-muted">{activeTrackingQuery.customerPhone}</div>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="p-2.5 bg-light rounded-2 border h-100">
                          <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Location</span>
                          <div className="text-dark fw-medium text-truncate">{activeTrackingQuery.location.address}</div>
                          <div className="text-muted">{activeTrackingQuery.location.city}</div>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Technician */}
                    <div className="p-2.5 bg-light rounded-2 border mb-3 small">
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.7rem' }}>Field Technician Assignment:</span>
                      {activeTrackingQuery.assignedExecutiveName ? (
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <strong className="text-dark">{activeTrackingQuery.assignedExecutiveName}</strong>
                            <span className="text-muted ms-1">({activeTrackingQuery.assignedTo})</span>
                          </div>
                          <span className="badge bg-white text-dark border">Dispatched</span>
                        </div>
                      ) : (
                        <span className="text-muted">Awaiting supervisor technician assignment.</span>
                      )}
                    </div>

                    {/* Detailed Issue Description */}
                    <div className="p-2.5 bg-light rounded-2 border mb-3 small">
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.7rem' }}>Problem Description:</span>
                      <p className="text-dark mb-0" style={{ lineHeight: 1.55 }}>
                        {activeTrackingQuery.description}
                      </p>
                    </div>

                    {/* Field Report if Submitted */}
                    {activeTrackingQuery.fieldReport && (
                      <div className="p-3 bg-light rounded-2 border mb-3 small">
                        <strong className="text-dark d-block mb-1">Field Work Report:</strong>
                        <p className="text-dark mb-1">{activeTrackingQuery.fieldReport.summary}</p>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                          Parts: {activeTrackingQuery.fieldReport.partsUsed} • GPS Site: {activeTrackingQuery.fieldReport.locationSubmitted}
                        </div>
                      </div>
                    )}

                    {/* Event Audit Trail */}
                    <div>
                      <span className="text-muted small text-uppercase fw-semibold d-block mb-2" style={{ fontSize: '0.7rem' }}>
                        Chronological History Log
                      </span>
                      <div className="ps-2 border-start border-2 border-dark d-flex flex-column gap-1.5 small">
                        {activeTrackingQuery.history.map((h, i) => (
                          <div key={i}>
                            <div className="d-flex align-items-center gap-1.5">
                              <strong className="text-dark">{h.status}</strong>
                              <span className="text-muted" style={{ fontSize: '0.68rem' }}>• {h.timestamp}</span>
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.72rem' }}>{h.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card-clean bg-white p-5 text-center text-muted">
                    Select a query from the table to view real-time tracking details.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            Success Modal with Unique Query ID (Requirement 2)
           ========================================================================= */}
        {generatedSuccessQuery && (
          <div className="modal-backdrop-clean" onClick={() => setGeneratedSuccessQuery(null)}>
            <div className="modal-card-clean" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
              <div className="text-center mb-3">
                <div
                  className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center p-2.5 mb-2 border"
                  style={{ width: '56px', height: '56px' }}
                >
                  <CheckCircle2 size={32} className="text-dark" />
                </div>
                <h4 className="fw-bold text-dark mb-1">
                  {generatedSuccessQuery.type} Registered Successfully
                </h4>
                <p className="text-muted small mb-0">
                  Your ticket has entered the supervisor queue. Save your Unique Query ID below:
                </p>
              </div>

              {/* Highly Visible Generated Query ID (Requirement 2: QRY-2026-XXXX format) */}
              <div className="p-3 bg-light rounded-3 border text-center my-3">
                <span className="text-uppercase text-muted fw-semibold small d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                  Unique Tracking Query ID
                </span>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                  <span className="fs-3 font-monospace fw-extrabold text-dark">
                    {generatedSuccessQuery.id}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="btn btn-sm btn-outline-dark py-1 px-2.5 rounded-2 d-flex align-items-center gap-1"
                    style={{ fontSize: '0.78rem' }}
                    title="Copy Unique Query ID to Clipboard"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  Use this ID to check real-time resolution updates anytime.
                </small>
              </div>

              {/* Ticket Details Recap */}
              <div className="p-3 bg-light rounded-2 border mb-4 small">
                <div className="row g-2">
                  <div className="col-6">
                    <span className="text-muted d-block">Type:</span>
                    <strong className="text-dark">{generatedSuccessQuery.type}</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-muted d-block">Status:</span>
                    <StatusBadge status={generatedSuccessQuery.status} size="sm" />
                  </div>
                  <div className="col-6">
                    <span className="text-muted d-block">Customer:</span>
                    <span className="text-dark">{generatedSuccessQuery.customerName}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted d-block">Location:</span>
                    <span className="text-dark">{generatedSuccessQuery.location.city}</span>
                  </div>
                  <div className="col-12 border-top pt-1 mt-1">
                    <span className="text-muted d-block">Headline:</span>
                    <span className="text-dark fw-medium text-truncate d-block">{generatedSuccessQuery.subject}</span>
                  </div>
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-agency-secondary"
                  onClick={() => setGeneratedSuccessQuery(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-agency-primary"
                  onClick={() => {
                    setSelectedTrackingId(generatedSuccessQuery.id);
                    setGeneratedSuccessQuery(null);
                    setActiveTab('tracking'); // Seamless transition to tracking dashboard
                  }}
                >
                  <span>Track Status in Dashboard</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
