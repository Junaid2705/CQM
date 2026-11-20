import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import HomePage from './pages/HomePage';
import CustomerPortal from './pages/CustomerPortal';
import TrackQueryPage from './pages/TrackQueryPage';
import SupervisorDashboard from './pages/SupervisorDashboard';
import FieldExecutiveDashboard from './pages/FieldExecutiveDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import {
  INITIAL_QUERIES,
  FIELD_EXECUTIVES,
  MOCK_USERS,
  QUERY_STATUSES
} from './data/mockData';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function App() {
  // Queries state initialized from sample data
  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem('resolvia_queries') || localStorage.getItem('resolviq_queries');
    return saved ? JSON.parse(saved) : INITIAL_QUERIES;
  });

  // Field executives fleet state
  const [fieldExecutives, setFieldExecutives] = useState(() => {
    const saved = localStorage.getItem('resolvia_executives') || localStorage.getItem('resolviq_executives');
    return saved ? JSON.parse(saved) : FIELD_EXECUTIVES;
  });

  // Authentication & Active Persona state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('resolvia_user') || localStorage.getItem('resolviq_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('resolvia_role') || localStorage.getItem('resolviq_role');
    return saved ? saved : 'guest'; // 'guest' | 'manager' | 'supervisor' | 'field_executive'
  });

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'customer_portal' | 'track_query' | 'manager' | 'supervisor' | 'executive'
  const [trackedQueryId, setTrackedQueryId] = useState('');
  
  // Login modal controls
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalRole, setLoginModalRole] = useState('supervisor');
  
  const [toasts, setToasts] = useState([]);

  // Persist queries and user session
  useEffect(() => {
    localStorage.setItem('resolvia_queries', JSON.stringify(queries));
  }, [queries]);

  useEffect(() => {
    localStorage.setItem('resolvia_executives', JSON.stringify(fieldExecutives));
  }, [fieldExecutives]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('resolvia_user', JSON.stringify(currentUser));
      localStorage.setItem('resolvia_role', currentRole);
    } else {
      localStorage.removeItem('resolvia_user');
      localStorage.removeItem('resolviq_user');
      localStorage.setItem('resolvia_role', 'guest');
    }
  }, [currentUser, currentRole]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper for generating current timestamp
  const getTimestamp = () => {
    const now = new Date();
    return (
      now.toLocaleDateString('en-GB') +
      ' ' +
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  // 1. Submit New Customer Query
  const handleSubmitNewQuery = (newQuery) => {
    setQueries((prev) => [newQuery, ...prev]);
    showToast(`Query #${newQuery.id} raised successfully!`, 'success');
  };

  // 2. Transition Query Status
  const handleUpdateQueryStatus = (queryId, newStatus, updatedBy, note) => {
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === queryId) {
          const timestamp = getTimestamp();
          return {
            ...q,
            status: newStatus,
            updatedAt: timestamp,
            history: [
              ...q.history,
              {
                status: newStatus,
                timestamp,
                updatedBy: updatedBy || 'Operations Lead',
                note: note || `Status updated to ${newStatus}`
              }
            ]
          };
        }
        return q;
      })
    );
  };

  // 3. Supervisor Assigns Query to Field Executive
  const handleAssignQuery = (queryId, executiveId, executiveName, supervisorNote) => {
    const timestamp = getTimestamp();
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === queryId) {
          return {
            ...q,
            status: 'Assigned',
            assignedTo: executiveId,
            assignedExecutiveName: executiveName,
            supervisorRemarks: supervisorNote || q.supervisorRemarks,
            updatedAt: timestamp,
            history: [
              ...q.history,
              {
                status: 'Assigned',
                timestamp,
                updatedBy: 'Supervisor (Elena Vance)',
                note: `Assigned to ${executiveName} (${executiveId}). ${supervisorNote || ''}`
              }
            ]
          };
        }
        return q;
      })
    );
  };

  // 4. Field Executive Submits Work Report
  const handleSubmitWorkReport = (queryId, reportData) => {
    const timestamp = getTimestamp();
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === queryId) {
          return {
            ...q,
            status: 'Submitted for Review',
            fieldReport: reportData,
            updatedAt: timestamp,
            history: [
              ...q.history,
              {
                status: 'Submitted for Review',
                timestamp,
                updatedBy: `Field Executive (${reportData.executiveName})`,
                note: `Field report submitted: "${reportData.summary.slice(0, 75)}..."`
              }
            ]
          };
        }
        return q;
      })
    );
  };

  // 5. Supervisor Approves Completed Work Report
  const handleApproveReport = (queryId, remarks) => {
    const timestamp = getTimestamp();
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === queryId) {
          return {
            ...q,
            status: 'Approved',
            supervisorRemarks: remarks,
            updatedAt: timestamp,
            history: [
              ...q.history,
              {
                status: 'Approved',
                timestamp,
                updatedBy: 'Supervisor (Elena Vance)',
                note: remarks || 'Field work report audited and approved.'
              }
            ]
          };
        }
        return q;
      })
    );
  };

  // 6. Supervisor Rejects Work Report (Requests rework)
  const handleRejectReport = (queryId, remarks) => {
    const timestamp = getTimestamp();
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === queryId) {
          return {
            ...q,
            status: 'Visit Required',
            supervisorRemarks: remarks,
            updatedAt: timestamp,
            history: [
              ...q.history,
              {
                status: 'Visit Required',
                timestamp,
                updatedBy: 'Supervisor (Elena Vance)',
                note: remarks || 'Work report rejected. Re-inspection required.'
              }
            ]
          };
        }
        return q;
      })
    );
  };

  // 7. Supervisor Marks Query as Closed
  const handleCloseQuery = (queryId, remarks) => {
    const timestamp = getTimestamp();
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === queryId) {
          return {
            ...q,
            status: 'Closed',
            supervisorRemarks: remarks,
            updatedAt: timestamp,
            history: [
              ...q.history,
              {
                status: 'Closed',
                timestamp,
                updatedBy: 'Supervisor (Elena Vance)',
                note: remarks || 'Customer query resolved and archived.'
              }
            ]
          };
        }
        return q;
      })
    );
  };

  // 8. Field Executive Broadcasts Live Location
  const handleUpdateExecutiveLocation = (executiveId, locText, coords) => {
    setFieldExecutives((prev) =>
      prev.map((fe) => {
        if (fe.id === executiveId) {
          return {
            ...fe,
            currentLocation: locText,
            coordinates: coords
          };
        }
        return fe;
      })
    );
  };

  // 9. Reset Demo Data
  const handleResetData = () => {
    setQueries(INITIAL_QUERIES);
    setFieldExecutives(FIELD_EXECUTIVES);
    localStorage.removeItem('resolvia_queries');
    localStorage.removeItem('resolvia_executives');
    localStorage.removeItem('resolviq_queries');
    localStorage.removeItem('resolviq_executives');
    showToast('Resolvia demo data successfully reset to initial states!', 'info');
  };

  // Authentication Handlers with Immediate Role-Based Redirection (Requirement 1 & 2)
  const handleLoginSuccess = (user, role) => {
    setCurrentUser(user);
    setCurrentRole(role);
    setIsLoginModalOpen(false);

    if (role === 'manager') {
      setActiveTab('manager');
      showToast(`Welcome back, Operations Manager ${user?.name || ''}!`, 'success');
    } else if (role === 'supervisor') {
      setActiveTab('supervisor');
      showToast(`Welcome back, Field Supervisor ${user?.name || ''}!`, 'success');
    } else if (role === 'field_executive') {
      setActiveTab('executive');
      showToast(`Welcome back, Field Executive ${user?.name || ''}!`, 'success');
    } else if (role === 'customer') {
      setActiveTab('customer_portal');
      showToast(`Welcome to your Customer Portal, ${user?.name || 'Customer'}!`, 'success');
    }
  };

  const handleOpenLoginModal = (targetRole = 'supervisor') => {
    setLoginModalRole(targetRole);
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
    setActiveTab('home');
    showToast('Signed out successfully.', 'info');
  };

  // Quick Persona Switcher in Top Bar
  const handleQuickRoleSwitch = (user, role) => {
    setCurrentUser(user);
    setCurrentRole(role);

    if (role === 'manager') {
      setActiveTab('manager');
      showToast(`Switched persona to Manager (Marcus Sterling)`, 'info');
    } else if (role === 'supervisor') {
      setActiveTab('supervisor');
      showToast(`Switched persona to Supervisor (Elena Vance)`, 'info');
    } else if (role === 'field_executive') {
      setActiveTab('executive');
      showToast(`Switched persona to Field Executive (${user.name})`, 'info');
    } else {
      setActiveTab('home');
      showToast(`Switched persona to Customer (Public)`, 'info');
    }
  };

  // Navigate to Track Query directly with ID
  const handleTrackQueryFromPortal = (queryId) => {
    setTrackedQueryId(queryId);
    setActiveTab('track_query');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation with Prominent Manager and Supervisor Login Buttons */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        currentRole={currentRole}
        onOpenLoginModal={handleOpenLoginModal}
        onLogout={handleLogout}
        onQuickRoleSwitch={handleQuickRoleSwitch}
        onResetData={handleResetData}
        queries={queries}
      />

      {/* Main Routed Page Content */}
      <main className="flex-grow-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={setActiveTab}
            onLoginSuccess={handleLoginSuccess}
            onOpenLoginModal={handleOpenLoginModal}
            queries={queries}
          />
        )}

        {activeTab === 'customer_portal' && (
          <CustomerPortal
            queries={queries}
            currentUser={currentUser}
            onSubmitQuery={handleSubmitNewQuery}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'track_query' && (
          <TrackQueryPage
            queries={queries}
            initialQueryId={trackedQueryId}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'manager' && (
          <ManagerDashboard
            queries={queries}
            onNavigate={setActiveTab}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'supervisor' && (
          <SupervisorDashboard
            queries={queries}
            onUpdateQueryStatus={handleUpdateQueryStatus}
            onAssignQuery={handleAssignQuery}
            onApproveReport={handleApproveReport}
            onRejectReport={handleRejectReport}
            onCloseQuery={handleCloseQuery}
            fieldExecutives={fieldExecutives}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'executive' && (
          <FieldExecutiveDashboard
            queries={queries}
            currentUser={currentUser || MOCK_USERS.field_executive_1}
            onUpdateQueryStatus={handleUpdateQueryStatus}
            onSubmitWorkReport={handleSubmitWorkReport}
            onUpdateExecutiveLocation={handleUpdateExecutiveLocation}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Role-Based Login Modal specifically accommodating Managers, Supervisors, and Field Executives */}
      <LoginModal
        isOpen={isLoginModalOpen}
        initialRole={loginModalRole}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Toast Notifications */}
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1100, pointerEvents: 'none' }}
      >
        <div className="d-flex flex-column gap-2" style={{ pointerEvents: 'auto' }}>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast show align-items-center text-white border-0 shadow-lg ${
                toast.type === 'success'
                  ? 'bg-success'
                  : toast.type === 'warning'
                  ? 'bg-warning text-dark'
                  : 'bg-primary'
              }`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              style={{ borderRadius: '12px', minWidth: '300px' }}
            >
              <div className="d-flex p-2.5">
                <div className="me-2 d-flex align-items-center">
                  {toast.type === 'success' ? (
                    <CheckCircle2 size={18} />
                  ) : toast.type === 'warning' ? (
                    <AlertCircle size={18} />
                  ) : (
                    <Info size={18} />
                  )}
                </div>
                <div className="toast-body p-0 flex-grow-1 small fw-semibold">
                  {toast.message}
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-1 m-auto"
                  onClick={() => removeToast(toast.id)}
                  aria-label="Close"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
