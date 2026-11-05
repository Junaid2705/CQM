# Resolvia — Customer Query Management Web Application

**Resolvia** is an enterprise-grade Customer Query & Field Operations Management web application prototype built for mission-critical infrastructure domains (Fiber Broadband, Smart Grids, Water/Gas Telemetry, EV Charging, Industrial Automation, and VoIP PBX).

---

## 🌟 Key Features

- **End-to-End 9-Phase Lifecycle**:
  `New Query` ➔ `Under Review` ➔ `Assigned` ➔ `In Progress` ➔ `Visit Required` ➔ `Work Completed` ➔ `Submitted for Review` ➔ `Approved` ➔ `Closed`.
- **Customer Self-Service Portal**:
  - Distinguish between **Query** and **Complaint**.
  - Capture customer details, location address, and GPS coordinates with 1-click Auto-Detect.
  - Automatically generates unique tracking IDs (`QRY-2026-XXXX`) with 1-click clipboard copy.
- **Supervisor Monitoring & Dispatch Console**:
  - Live query dispatch pipeline with priority filtering and SLA tracking.
  - Executive allocation dropdown with technician status and specialization tags.
  - Slide-out query inspection drawer with dual location telemetry (Customer Reported Site vs Field Executive Live GPS).
  - Field report auditing with **1-Click Approve & Close**, **Approve Only**, and **Reject & Rework** workflows.
  - Real-time field activity feed and fleet monitoring.
- **Field Executive Operations Terminal**:
  - Mobile-optimized interface with accessible touch targets ($\ge 46\text{px}$).
  - Live location broadcasting with HTML5 geolocation capture.
  - Fast status transitions (`Start Diagnostics`, `Flag Visit Required`, `Resume Diagnostics`, `Mark Work Completed`).
  - Formal work report modal capturing GPS stamps, work summary, replacement parts, and customer electronic verification.
- **Operations Manager SLA Governance**:
  - High-level KPIs, mean dispatch times, domain ticket distributions, and SLA audit export.
- **Public Query Status Tracking**:
  - Interactive 9-phase visual stepper with step numbers, timestamps, and technician dossiers.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Bundler & Dev Server**: Vite
- **Styling**: Bootstrap 5 + Custom Modern Agency Design System
- **Icons**: Lucide React
- **State Management**: Reactive React state synced with `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd CQM

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 👥 Demo User Credentials

Use the **Sign In** modal in the header to switch between pre-configured enterprise personas:

| Role | Name | Demo Email | Password |
| :--- | :--- | :--- | :--- |
| **Customer** | Amit Sharma | `amit.sharma@gmail.com` | `customer123` |
| **Supervisor** | Elena Vance | `elena.vance@resolvia.com` | `super123` |
| **Field Executive** | Vikram Singh | `vikram.singh@resolvia.com` | `field123` |
| **Operations Manager** | Marcus Sterling | `marcus.sterling@resolvia.com` | `admin123` |

---

## 📄 License

Proprietary — Resolvia Platform 2026. All rights reserved.
