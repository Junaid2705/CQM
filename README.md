# Resolvia — Customer Query Management Web Application

**Resolvia** is an enterprise-grade Customer Query & Field Operations Management full-stack web application built for mission-critical infrastructure domains (Fiber Broadband, Smart Grids, Water/Gas Telemetry, EV Charging, Industrial Automation, and VoIP PBX).

---

## 🏗️ Project Architecture

The project is organized into an industry-standard full-stack separation:

```
CQM/
├── backend/                  # Java 21 + Spring Boot 3 + Spring Data JPA + MySQL
│   ├── src/main/java/        # Entities, Repositories, Services, Security, Controllers
│   ├── src/main/resources/   # application.properties, schema-seed.sql
│   └── pom.xml               # Maven dependencies and build configuration
├── frontend/                 # React 18 + Vite + Bootstrap 5 + Lucide React
│   ├── src/                  # Components, Pages, Data, Theme Styles
│   ├── index.html            # Vite HTML entry point
│   ├── package.json          # Node dependencies and scripts
│   ├── vite.config.js        # Vite build configuration
│   └── node_modules/         # Frontend dependencies (git-ignored)
├── .gitignore                # Global gitignore covering node, build, and Java artifacts
└── README.md                 # Full-stack documentation
```

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
- **Enterprise Security & Persistence**:
  - Spring Security 6 with stateless JWT Bearer token authentication.
  - Role-based authorization (`@PreAuthorize`) across `CUSTOMER`, `SUPERVISOR`, `FIELD_EXECUTIVE`, `MANAGER`.
  - Spring Data JPA with MySQL 8.0 auto-updating schema and HikariCP connection pooling.

---

## 🛠️ Tech Stack

- **Backend**: Java 21, Spring Boot 3.3.5, Spring Security 6, Spring Data JPA, MySQL Connector/J, JJWT 0.12.6, Maven
- **Frontend**: React 18, Vite 6, Bootstrap 5, Lucide React
- **Database**: MySQL 8.0

---

## 🚀 Getting Started

### Prerequisites

- Java 21 LTS
- Node.js (v18 or higher recommended)
- MySQL Server 8.0 running on port 3306

---

### 1. Backend Setup

```bash
cd backend
mvn spring-boot:run
```
*(The backend runs on `http://localhost:8080`, and will auto-generate the `resolvia_db` schema in MySQL)*

---

### 2. Frontend Setup

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```
*(The frontend runs on `http://localhost:3000`)*

---

### 3. Production Build

```bash
# Frontend Build
cd frontend
npm run build

# Backend Build
cd ../backend
mvn clean package
```

---

## 👥 Demo User Credentials

Use the **Sign In** modal in the frontend header to switch between pre-configured enterprise personas:

| Role | Name | Demo Email | Password |
| :--- | :--- | :--- | :--- |
| **Customer** | Amit Sharma | `amit.sharma@gmail.com` | `customer123` |
| **Supervisor** | Elena Vance | `elena.vance@resolvia.com` | `super123` |
| **Field Executive** | Vikram Singh | `vikram.singh@resolvia.com` | `field123` |
| **Operations Manager** | Marcus Sterling | `marcus.sterling@resolvia.com` | `admin123` |

---

## 📄 License

Proprietary — Resolvia Platform 2026. All rights reserved.
