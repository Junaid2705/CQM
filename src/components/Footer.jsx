import React from 'react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import ResolviaLogo from './ResolviaLogo';

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-auto bg-white border-top py-5 text-muted">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <ResolviaLogo size={28} />
              <span className="fs-6 fw-bold text-dark">Resolvia</span>
            </div>
            <p className="small text-muted mb-3" style={{ maxWidth: '320px' }}>
              Enterprise customer query management, supervisory dispatch, and on-site field engineering operating system.
            </p>
            <div className="d-inline-flex align-items-center gap-1.5 px-2.5 py-1 bg-light border rounded-pill small">
              <span className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }} />
              <span className="text-dark fw-medium" style={{ fontSize: '0.75rem' }}>System Health: 99.98% SLA</span>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="text-dark small text-uppercase fw-semibold mb-3" style={{ letterSpacing: '0.04em' }}>
              Platform
            </h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li>
                <button
                  type="button"
                  className="btn btn-link text-muted text-decoration-none p-0 small text-start"
                  onClick={() => onNavigate('home')}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-muted text-decoration-none p-0 small text-start"
                  onClick={() => onNavigate('customer_portal')}
                >
                  Customer Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-muted text-decoration-none p-0 small text-start"
                  onClick={() => onNavigate('track_query')}
                >
                  Track Query
                </button>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-3 col-6">
            <h6 className="text-dark small text-uppercase fw-semibold mb-3" style={{ letterSpacing: '0.04em' }}>
              Service Verticals
            </h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2 text-muted">
              <li>High-Speed Optical Broadband</li>
              <li>Power Grid & Substation Diagnostics</li>
              <li>Smart Water & Gas Metering</li>
              <li>EV Charging Station Infrastructure</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12">
            <h6 className="text-dark small text-uppercase fw-semibold mb-3" style={{ letterSpacing: '0.04em' }}>
              Operations Desk
            </h6>
            <div className="d-flex flex-column gap-2 small text-muted">
              <div className="d-flex align-items-center gap-2">
                <PhoneCall size={14} className="text-dark" />
                <span>Hotline: 1800-737-6584</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={14} className="text-dark" />
                <span>dispatch@resolvia.com</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <MapPin size={14} className="text-dark" />
                <span>Sector 62, Noida NCR</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-top d-flex flex-wrap justify-content-between align-items-center small text-muted gap-2">
          <div>
            &copy; {new Date().getFullYear()} Resolvia Platform. Enterprise Customer Query Management.
          </div>
          <div className="small">
            Clean Minimal Architecture — React + Bootstrap
          </div>
        </div>
      </div>
    </footer>
  );
}
