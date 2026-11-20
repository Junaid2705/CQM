import React from 'react';
import {
  PlusCircle,
  Search,
  LogIn,
  LogOut,
  ArrowRight,
  User,
  LayoutDashboard
} from 'lucide-react';
import ResolviaLogo from './ResolviaLogo';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  currentRole,
  onOpenLoginModal,
  onLogout
}) {
  return (
    <header className="sticky-top agency-navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Brand Mark: Resolvia Logo & Bold Brand Name (No Tagline) */}
          <button
            type="button"
            className="brand-mark border-0 bg-transparent p-0 d-flex align-items-center gap-2.5 text-decoration-none"
            onClick={() => setActiveTab('home')}
            style={{ cursor: 'pointer' }}
          >
            <ResolviaLogo size={36} />
            <span className="brand-name fs-5 fw-bold text-dark mb-0" style={{ letterSpacing: '-0.02em' }}>
              Resolvia
            </span>
          </button>

          {/* Simple Navigation Links */}
          <nav className="d-none d-md-flex align-items-center gap-1">
            <button
              type="button"
              className={`nav-link-clean btn btn-link border-0 ${
                activeTab === 'home' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('home')}
            >
              Overview
            </button>

            <a
              className="nav-link-clean btn btn-link border-0"
              href="#services"
              onClick={() => {
                if (activeTab !== 'home') setActiveTab('home');
              }}
            >
              Services
            </a>

            <a
              className="nav-link-clean btn btn-link border-0"
              href="#features"
              onClick={() => {
                if (activeTab !== 'home') setActiveTab('home');
              }}
            >
              Features
            </a>

            <a
              className="nav-link-clean btn btn-link border-0"
              href="#workflow"
              onClick={() => {
                if (activeTab !== 'home') setActiveTab('home');
              }}
            >
              Workflow
            </a>

            <button
              type="button"
              className={`nav-link-clean btn btn-link border-0 ${
                activeTab === 'customer_portal' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('customer_portal')}
            >
              Raise Query
            </button>

            <button
              type="button"
              className={`nav-link-clean btn btn-link border-0 ${
                activeTab === 'track_query' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('track_query')}
            >
              Track Status
            </button>
          </nav>

          {/* Right Action: ONLY ONE Unified Login Button or Authenticated Profile */}
          <div className="d-flex align-items-center gap-2">
            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (currentRole === 'manager') setActiveTab('manager');
                    else if (currentRole === 'supervisor') setActiveTab('supervisor');
                    else if (currentRole === 'field_executive') setActiveTab('executive');
                    else setActiveTab('customer_portal');
                  }}
                  className="btn btn-sm btn-agency-primary py-1 px-3"
                  style={{ fontSize: '0.82rem' }}
                >
                  <LayoutDashboard size={14} />
                  <span>{currentRole === 'customer' ? 'My Portal' : 'Dashboard'}</span>
                </button>
                <div className="d-none d-sm-flex align-items-center gap-1.5 px-2 py-1 text-muted small">
                  <span className="fw-medium text-dark">{currentUser.name ? currentUser.name.split(' ')[0] : 'User'}</span>
                  <span className="text-secondary text-capitalize" style={{ fontSize: '0.75rem' }}>
                    ({currentRole === 'manager' ? 'Manager' : currentRole === 'supervisor' ? 'Supervisor' : currentRole === 'field_executive' ? 'Tech' : 'Customer'})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="btn btn-sm btn-outline-secondary py-1 px-2 border-0 text-muted"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              /* Single Unified Login Button (No multiple role buttons on navbar) */
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="btn-unified-login"
                title="Sign In to Portal"
              >
                <LogIn size={15} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
