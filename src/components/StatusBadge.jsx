import React from 'react';

// Refined Minimalist Palette for 9 Status Milestones
const STATUS_STYLES = {
  'New Query': { bg: '#f1f5f9', color: '#0f172a', border: '#cbd5e1', dot: '#2563eb' },
  'Under Review': { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd', dot: '#0284c7' },
  'Assigned': { bg: '#fefce8', color: '#854d0e', border: '#fef08a', dot: '#eab308' },
  'In Progress': { bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe', dot: '#7c3aed' },
  'Visit Required': { bg: '#fff1f2', color: '#be123c', border: '#fecdd3', dot: '#e11d48' },
  'Work Completed': { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0', dot: '#16a34a' },
  'Submitted for Review': { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff', dot: '#9333ea' },
  'Approved': { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0', dot: '#059669' },
  'Closed': { bg: '#f8fafc', color: '#475569', border: '#e2e8f0', dot: '#94a3b8' }
};

export default function StatusBadge({ status, size = 'normal' }) {
  const style = STATUS_STYLES[status] || {
    bg: '#f8fafc',
    color: '#475569',
    border: '#e2e8f0',
    dot: '#94a3b8'
  };

  const isSmall = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: isSmall ? '0.72rem' : '0.78rem',
        fontWeight: '500',
        padding: isSmall ? '0.2rem 0.55rem' : '0.3rem 0.7rem',
        borderRadius: '9999px',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        lineHeight: 1.2,
        whiteSpace: 'nowrap'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: style.dot,
          flexShrink: 0
        }}
      />
      <span>{status}</span>
    </span>
  );
}
