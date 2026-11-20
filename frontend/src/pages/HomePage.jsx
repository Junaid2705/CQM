import React from 'react';
import {
  ArrowRight,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Cpu,
  Wifi,
  Zap,
  Droplets,
  BatteryCharging,
  PhoneCall,
  Activity,
  Send,
  Lock,
  User,
  ShieldCheck,
  Smartphone,
  GitFork,
  ChevronDown
} from 'lucide-react';
import {
  SERVICES_LIST,
  PLATFORM_FEATURES,
  QUERY_STATUSES
} from '../data/mockData';

export default function HomePage({
  onNavigate,
  onOpenLoginModal
}) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Wifi': return <Wifi size={22} className="text-dark" />;
      case 'Zap': return <Zap size={22} className="text-dark" />;
      case 'Droplets': return <Droplets size={22} className="text-dark" />;
      case 'BatteryCharging': return <BatteryCharging size={22} className="text-dark" />;
      case 'PhoneCall': return <PhoneCall size={22} className="text-dark" />;
      case 'Cpu': return <Cpu size={22} className="text-dark" />;
      default: return <Activity size={22} className="text-dark" />;
    }
  };

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'GitFork': return <GitFork size={20} className="text-dark" />;
      case 'ShieldCheck': return <ShieldCheck size={20} className="text-dark" />;
      case 'MapPin': return <MapPin size={20} className="text-dark" />;
      case 'Zap': return <Zap size={20} className="text-dark" />;
      case 'Send': return <Send size={20} className="text-dark" />;
      case 'Smartphone': return <Smartphone size={20} className="text-dark" />;
      default: return <Activity size={20} className="text-dark" />;
    }
  };

  return (
    <div className="agency-homepage">
      {/* 1. Hero Section (Clean, Spacious, No Login Forms or Buttons) */}
      <section className="agency-hero">
        <div className="container">
          <div className="max-w-800">
            <div className="hero-pill-badge mb-4">
              <span className="badge bg-dark text-white px-2 py-0.5 rounded-pill" style={{ fontSize: '0.68rem' }}>
                ENTERPRISE
              </span>
              <span>Field Service & Customer Query Infrastructure</span>
            </div>

            <h1 className="agency-hero-title">
              Customer Query Management, <br className="d-none d-md-inline" />
              Engineered for Direct Action.
            </h1>

            <p className="agency-hero-subtitle">
              A unified operating system bridging customer complaints, supervisory technician dispatch, and on-site field engineering through an auditable 9-phase resolution lifecycle.
            </p>

            {/* Simple, Clean CTAs (Track Your Query, Raise Query, Learn More) */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('customer_portal')}
                className="btn-agency-primary"
              >
                <span>Raise a Query</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('track_query')}
                className="btn-agency-secondary"
              >
                <Search size={16} />
                <span>Track Your Query</span>
              </button>

              <a
                href="#services"
                className="btn btn-link text-muted text-decoration-none px-2 small fw-medium"
              >
                Learn More ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar (Quiet, Minimalist) */}
      <section className="py-4 border-bottom bg-light">
        <div className="container">
          <div className="row g-4 text-center text-md-start">
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-dark">98.7%</div>
              <div className="text-muted small">SLA Resolution Rate</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-dark">&lt; 34 min</div>
              <div className="text-muted small">Mean Dispatch Time</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-dark">9 Phases</div>
              <div className="text-muted small">Auditable State Lifecycle</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-3 fw-bold text-dark">100% Verified</div>
              <div className="text-muted small">On-Site GPS Telemetry</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section (Clean, Quiet Cards) */}
      <section id="services" className="section-clean border-bottom">
        <div className="container">
          <div className="mb-5">
            <div className="section-label">Supported Domains</div>
            <h2 className="section-title">Critical Infrastructure Services</h2>
            <p className="section-subtitle">
              Standardized dispatch workflows and certified technical SLAs across utility and telecommunication domains.
            </p>
          </div>

          <div className="row g-4">
            {SERVICES_LIST.map((srv) => (
              <div className="col-lg-4 col-md-6" key={srv.id}>
                <div className="card-clean h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="p-2 bg-light rounded-2 border">
                        {getServiceIcon(srv.icon)}
                      </div>
                      <span className="badge bg-light text-dark border small fw-medium">
                        {srv.sla} SLA
                      </span>
                    </div>

                    <h5 className="fw-semibold text-dark mb-2" style={{ fontSize: '1.05rem' }}>
                      {srv.name}
                    </h5>
                    <p className="text-muted small mb-4" style={{ lineHeight: 1.6 }}>
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{srv.badge}</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('customer_portal')}
                      className="btn btn-link btn-sm text-dark p-0 fw-semibold text-decoration-none d-flex align-items-center gap-1"
                    >
                      <span>Raise Query</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features Section (Minimalist Layout) */}
      <section id="features" className="section-clean border-bottom bg-light">
        <div className="container">
          <div className="mb-5">
            <div className="section-label">Capabilities</div>
            <h2 className="section-title">Designed for Zero Friction</h2>
            <p className="section-subtitle">
              Built to replace cumbersome multi-step ticketing systems with direct supervisory allocation and on-site technical sign-off.
            </p>
          </div>

          <div className="row g-4">
            {PLATFORM_FEATURES.map((feat) => (
              <div className="col-lg-4 col-md-6" key={feat.title}>
                <div className="card-clean h-100 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="p-2 bg-light rounded-2 border">
                      {getFeatureIcon(feat.icon)}
                    </div>
                    <span className="badge bg-light text-muted border small">
                      {feat.tag}
                    </span>
                  </div>

                  <h5 className="fw-semibold text-dark mb-2" style={{ fontSize: '1.05rem' }}>
                    {feat.title}
                  </h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Workflow Information Section (4-Stage Pipeline & 9 Statuses) */}
      <section id="workflow" className="section-clean border-bottom">
        <div className="container">
          <div className="mb-5">
            <div className="section-label">Incident Pipeline</div>
            <h2 className="section-title">4-Stage Resolution Journey</h2>
            <p className="section-subtitle">
              Every complaint adheres to a transparent, auditable sequence from customer ingestion to supervisor sign-off.
            </p>
          </div>

          <div className="row g-4 mb-5">
            {[
              {
                step: '01',
                title: 'Query Ingestion',
                desc: 'One-page web form captures contact info, issue particulars, and automatically detects GPS coordinates.',
                badge: 'Public'
              },
              {
                step: '02',
                title: 'Supervisory Dispatch',
                desc: 'Supervisor verifies urgency and assigns the nearest certified field technician with a single click.',
                badge: 'Supervisor'
              },
              {
                step: '03',
                title: 'On-Site Execution',
                desc: 'Technician updates live site coordinates, diagnoses root cause, executes repairs, and submits a work report.',
                badge: 'Field Tech'
              },
              {
                step: '04',
                title: 'Audit & Closure',
                desc: 'Supervisor reviews telemetry evidence, validates customer confirmation, approves fix, and marks ticket Closed.',
                badge: 'Governance'
              }
            ].map((st) => (
              <div className="col-lg-3 col-md-6" key={st.step}>
                <div className="card-clean h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="font-monospace fw-bold text-dark fs-5">{st.step}</span>
                    <span className="badge bg-light text-secondary border small">{st.badge}</span>
                  </div>
                  <h5 className="fw-semibold text-dark mb-2" style={{ fontSize: '1.05rem' }}>
                    {st.title}
                  </h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 9 Status Milestones */}
          <div className="p-4 bg-light rounded-3 border">
            <div className="fw-semibold text-dark mb-2 small text-uppercase" style={{ letterSpacing: '0.04em' }}>
              The 9 Auditable State Milestones
            </div>
            <div className="d-flex flex-wrap gap-2">
              {QUERY_STATUSES.map((status, idx) => (
                <span
                  key={status}
                  className="badge bg-white text-dark border px-3 py-1.5 fw-medium small"
                >
                  <span className="text-muted me-1">{idx + 1}.</span> {status}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Operations Desk & Help Information Banner */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="card-clean bg-light p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <span className="badge bg-dark text-white px-2 py-0.5 rounded-pill mb-2 small">
                  24/7 SUPPORT DESK
                </span>
                <h4 className="fw-bold text-dark mb-2">Have an Urgent Technical Emergency?</h4>
                <p className="text-muted small mb-3">
                  For severed fiber cables, high-voltage power fluctuations, or commercial cleanroom telemetry alarms, our emergency dispatch units respond within 45 minutes.
                </p>
                <div className="d-flex flex-wrap gap-4 text-dark small fw-medium">
                  <div>📞 Hotline: 1800-737-6584</div>
                  <div>✉️ Dispatch: dispatch@resolvia.com</div>
                  <div>🏢 Center: Sector 62, Noida NCR</div>
                </div>
              </div>

              <div className="col-lg-4 text-lg-end">
                <button
                  type="button"
                  onClick={() => onNavigate('customer_portal')}
                  className="btn-agency-primary"
                >
                  Raise Emergency Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
