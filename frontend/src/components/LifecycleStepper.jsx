import React from 'react';
import { Check } from 'lucide-react';
import { QUERY_STATUSES } from '../data/mockData';

export default function LifecycleStepper({ currentStatus, history = [], compact = false }) {
  const currentIndex = QUERY_STATUSES.indexOf(currentStatus);

  const historyMap = {};
  if (Array.isArray(history)) {
    history.forEach((h) => {
      if (h.status && !historyMap[h.status]) {
        historyMap[h.status] = h;
      }
    });
  }

  if (compact) {
    return (
      <div className="d-flex align-items-center gap-1 overflow-x-auto py-1">
        {QUERY_STATUSES.map((status, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div
              key={status}
              className="d-flex align-items-center"
              title={`${status} ${historyMap[status] ? `(${historyMap[status].timestamp})` : ''}`}
            >
              <div
                style={{
                  width: isCurrent ? '22px' : '16px',
                  height: isCurrent ? '22px' : '16px',
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? '#0f172a' : isDone ? '#334155' : '#f1f5f9',
                  border: isCurrent ? '2px solid #0f172a' : isDone ? '1px solid #334155' : '1px solid #cbd5e1',
                  color: isCurrent || isDone ? '#ffffff' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.62rem',
                  fontWeight: '600'
                }}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              {idx < QUERY_STATUSES.length - 1 && (
                <div
                  style={{
                    width: '16px',
                    height: '2px',
                    backgroundColor: idx < currentIndex ? '#334155' : '#e2e8f0',
                    margin: '0 2px'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="d-flex align-items-start justify-content-between position-relative overflow-x-auto pb-2">
        {QUERY_STATUSES.map((status, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const historyEntry = historyMap[status];

          return (
            <React.Fragment key={status}>
              <div
                className="d-flex flex-column align-items-center text-center"
                style={{ minWidth: '78px', flex: 1, zIndex: 2 }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isCurrent ? '#0f172a' : isDone ? '#1e293b' : '#ffffff',
                    border: isCurrent ? '2px solid #0f172a' : isDone ? '2px solid #1e293b' : '2px solid #e2e8f0',
                    color: isCurrent || isDone ? '#ffffff' : '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    marginBottom: '0.4rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isDone ? <Check size={14} strokeWidth={2.5} /> : index + 1}
                </div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: isCurrent ? '600' : '500',
                    color: isCurrent ? '#0f172a' : '#64748b',
                    lineHeight: 1.25,
                    maxWidth: '85px'
                  }}
                >
                  {status}
                </div>
                {historyEntry && (
                  <div className="text-muted text-nowrap mt-0.5" style={{ fontSize: '0.65rem' }}>
                    {historyEntry.timestamp ? historyEntry.timestamp.split(' ')[1] : ''}
                  </div>
                )}
              </div>
              {index < QUERY_STATUSES.length - 1 && (
                <div
                  style={{
                    flex: '1',
                    height: '2px',
                    backgroundColor: index < currentIndex ? '#1e293b' : '#e2e8f0',
                    minWidth: '16px',
                    marginTop: '13px',
                    zIndex: 1
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
