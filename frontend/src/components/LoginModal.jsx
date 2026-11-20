import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Briefcase,
  Users
} from 'lucide-react';
import ResolviaLogo from './ResolviaLogo';
import { MOCK_USERS } from '../data/mockData';

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [selectedRole, setSelectedRole] = useState('supervisor'); // 'manager' | 'supervisor' | 'field_executive' | 'customer'
  const [username, setUsername] = useState('elena.vance@resolvia.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === 'manager') {
      setUsername('marcus.sterling@resolvia.com');
    } else if (role === 'supervisor') {
      setUsername('elena.vance@resolvia.com');
    } else if (role === 'field_executive') {
      setUsername('vikram.singh@resolvia.com');
    } else {
      setUsername('customer@example.com');
    }
  };

  const handleFastDemoLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      if (role === 'manager') {
        onLoginSuccess(MOCK_USERS.manager, 'manager');
      } else if (role === 'supervisor') {
        onLoginSuccess(MOCK_USERS.supervisor, 'supervisor');
      } else if (role === 'field_executive') {
        onLoginSuccess(MOCK_USERS.field_executive_1, 'field_executive');
      } else {
        onLoginSuccess(MOCK_USERS.customer, 'customer');
      }
      setIsLoading(false);
      onClose();
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (selectedRole === 'manager') {
        onLoginSuccess(MOCK_USERS.manager, 'manager');
      } else if (selectedRole === 'supervisor') {
        onLoginSuccess(MOCK_USERS.supervisor, 'supervisor');
      } else if (selectedRole === 'field_executive') {
        if (username.toLowerCase().includes('ananya')) {
          onLoginSuccess(MOCK_USERS.field_executive_2, 'field_executive');
        } else {
          onLoginSuccess(MOCK_USERS.field_executive_1, 'field_executive');
        }
      } else {
        onLoginSuccess(MOCK_USERS.customer, 'customer');
      }
      setIsLoading(false);
      onClose();
    }, 300);
  };

  return (
    <div className="modal-backdrop-clean" onClick={onClose}>
      <div
        className="modal-card-clean"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2.5">
            <ResolviaLogo size={32} />
            <div>
              <h4 className="fw-semibold text-dark mb-0" style={{ letterSpacing: '-0.02em' }}>
                Sign In to Resolvia
              </h4>
              <small className="text-muted" style={{ fontSize: '0.82rem' }}>
                Select your role to access your authorized workspace.
              </small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-light border-0 rounded-circle p-1 text-muted"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Clean Segmented Role Controller */}
        <div className="mb-4">
          <label className="form-label-clean d-block mb-1.5 text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}>
            SELECT ACCESS ROLE
          </label>
          <div className="segmented-control">
            <button
              type="button"
              onClick={() => handleRoleChange('supervisor')}
              className={`segmented-btn ${selectedRole === 'supervisor' ? 'active' : ''}`}
            >
              Supervisor
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('manager')}
              className={`segmented-btn ${selectedRole === 'manager' ? 'active' : ''}`}
            >
              Manager
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('field_executive')}
              className={`segmented-btn ${selectedRole === 'field_executive' ? 'active' : ''}`}
            >
              Field Tech
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('customer')}
              className={`segmented-btn ${selectedRole === 'customer' ? 'active' : ''}`}
            >
              Customer
            </button>
          </div>
        </div>

        {/* Selected Role Context Notice */}
        <div className="p-3 bg-light rounded-2 border mb-4 d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-semibold text-dark small">
              {selectedRole === 'supervisor' && 'Field Supervisor (Elena Vance)'}
              {selectedRole === 'manager' && 'Operations Manager (Marcus Sterling)'}
              {selectedRole === 'field_executive' && 'Field Executive (Vikram Singh)'}
              {selectedRole === 'customer' && 'Customer Self-Service Portal'}
            </div>
            <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>
              {selectedRole === 'supervisor' && 'Dispatches tickets, reviews field reports & closes issues.'}
              {selectedRole === 'manager' && 'Monitors SLA adherence, team metrics & operational audits.'}
              {selectedRole === 'field_executive' && 'Mobile task queue, live site GPS & work report submission.'}
              {selectedRole === 'customer' && 'One-page query raising & real-time progress tracking.'}
            </small>
          </div>

          <button
            type="button"
            onClick={() => handleFastDemoLogin(selectedRole)}
            disabled={isLoading}
            className="btn btn-sm btn-outline-dark py-1 px-2.5 rounded-2 fw-medium text-nowrap"
            style={{ fontSize: '0.75rem' }}
          >
            Demo Sign In
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label-clean">Email or Username</label>
            <input
              type="text"
              className="form-control-clean"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label-clean">Password</label>
            <input
              type="password"
              className="form-control-clean"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <small className="text-muted d-block mt-1" style={{ fontSize: '0.72rem' }}>
              Mock authentication enabled. Any password is accepted.
            </small>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-agency-primary w-100 py-2.5 justify-content-center"
          >
            {isLoading ? (
              <span>Redirecting...</span>
            ) : (
              <>
                <span>
                  Sign In to {selectedRole === 'manager' ? 'Manager Dashboard' : selectedRole === 'supervisor' ? 'Supervisor Dashboard' : selectedRole === 'field_executive' ? 'Field Portal' : 'Customer Desk'}
                </span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
