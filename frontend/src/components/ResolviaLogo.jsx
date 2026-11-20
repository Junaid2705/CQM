import React from 'react';

/**
 * ResolviaLogo Component
 * A clean, modern SVG logo mimicking the brand identity:
 * A tech/circuit-like design utilizing orange and black elements
 * inside a rounded white square shape.
 */
export default function ResolviaLogo({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
      aria-label="Resolvia Logo"
    >
      {/* 1. Rounded White Square Base with Subtle Crisp Border */}
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        rx="22"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="2.5"
      />

      {/* 2. Circuit Matrix & Tech Traces (Black & Orange) */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Primary Black Circuit Framework (Stylized Tech 'R') */}
        <path
          d="M28 74V34C28 29.58 31.58 26 36 26H52C60.84 26 68 33.16 68 42C68 49.2 63.24 55.3 56.6 57.2L69 74"
          stroke="#0F172A"
          strokeWidth="6.5"
        />
        <path
          d="M28 48H52C55.31 48 58 45.31 58 42C58 38.69 55.31 36 52 36H36"
          stroke="#0F172A"
          strokeWidth="4.5"
        />

        {/* Black Secondary Circuit Tracks & Connector Pads */}
        <path d="M22 42H28" stroke="#0F172A" strokeWidth="3" />
        <circle cx="19" cy="42" r="3" fill="#0F172A" />

        <path d="M28 62H20" stroke="#0F172A" strokeWidth="3" />
        <circle cx="17" cy="62" r="2.5" fill="#0F172A" />

        {/* Vibrant Orange Circuit Lines & Micro-Nodes (#FF6600 / #EA580C) */}
        {/* Top-Center Trace */}
        <path d="M48 26V18" stroke="#FF6600" strokeWidth="3.5" />
        <circle cx="48" cy="16" r="3.5" fill="#FF6600" />

        {/* Top-Right Circuit Elbow */}
        <path d="M63 34L71 26H77" stroke="#FF6600" strokeWidth="3.5" />
        <circle cx="79" cy="26" r="3.5" fill="#FF6600" />

        {/* Mid-Right Bus Track */}
        <path d="M68 48H76L82 54" stroke="#FF6600" strokeWidth="3.5" />
        <circle cx="84" cy="56" r="3.5" fill="#FF6600" />

        {/* Diagonal Lower-Left Circuit Route */}
        <path d="M50 58L42 66V74" stroke="#FF6600" strokeWidth="3.5" />
        <circle cx="42" cy="76" r="3.5" fill="#FF6600" />

        {/* Lower-Right Track Extension */}
        <path d="M60 67L66 73H74" stroke="#FF6600" strokeWidth="3.5" />
        <circle cx="76" cy="73" r="3.5" fill="#FF6600" />

        {/* Core Microprocessor Telemetry Node */}
        <circle cx="50" cy="42" r="4.5" fill="#FF6600" />
        <circle cx="50" cy="42" r="2" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

