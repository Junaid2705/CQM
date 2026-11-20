// Resolvia Customer Query Management System Data & Configuration

export const QUERY_STATUSES = [
  'New Query',
  'Under Review',
  'Assigned',
  'In Progress',
  'Visit Required',
  'Work Completed',
  'Submitted for Review',
  'Approved',
  'Closed'
];

export const STATUS_COLORS = {
  'New Query': { bg: 'bg-primary-subtle', text: 'text-primary', border: 'border-primary-subtle', badge: 'bg-primary' },
  'Under Review': { bg: 'bg-info-subtle', text: 'text-info-emphasis', border: 'border-info-subtle', badge: 'bg-info' },
  'Assigned': { bg: 'bg-warning-subtle', text: 'text-warning-emphasis', border: 'border-warning-subtle', badge: 'bg-warning' },
  'In Progress': { bg: 'bg-indigo-subtle', text: 'text-indigo', border: 'border-indigo-subtle', badge: 'bg-indigo' },
  'Visit Required': { bg: 'bg-danger-subtle', text: 'text-danger', border: 'border-danger-subtle', badge: 'bg-danger' },
  'Work Completed': { bg: 'bg-teal-subtle', text: 'text-teal', border: 'border-teal-subtle', badge: 'bg-teal' },
  'Submitted for Review': { bg: 'bg-purple-subtle', text: 'text-purple', border: 'border-purple-subtle', badge: 'bg-purple' },
  'Approved': { bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-subtle', badge: 'bg-success' },
  'Closed': { bg: 'bg-secondary-subtle', text: 'text-secondary', border: 'border-secondary-subtle', badge: 'bg-secondary' }
};

export const SERVICES_LIST = [
  {
    id: 'broadband',
    name: 'High-Speed Broadband & Optical Fiber',
    icon: 'Wifi',
    sla: '< 2 Hours',
    description: 'Rapid restoration of FTTH optical drop cables, fusion splicing, GPON ONT diagnostics, and low-latency backbone routing.',
    badge: 'Critical Infrastructure',
    activeTickets: 4
  },
  {
    id: 'power',
    name: 'Smart Electricals & Commercial Power Grid',
    icon: 'Zap',
    sla: '< 1.5 Hours',
    description: 'Three-phase commercial line stabilization, capacitor bank balancing, automated ATS failure mitigation, and surge protection.',
    badge: 'Emergency Response',
    activeTickets: 3
  },
  {
    id: 'metering',
    name: 'Smart Ultrasonic Water & Gas Metering',
    icon: 'Droplets',
    sla: '< 4 Hours',
    description: 'Automated AMR/AMI telemetry diagnostics, ultrasonic flow sensor calibration, differential pressure alarm triage, and valve actuators.',
    badge: 'IoT Utility',
    activeTickets: 2
  },
  {
    id: 'ev_charging',
    name: 'EV High-Capacity Charging Infrastructure',
    icon: 'BatteryCharging',
    sla: '< 2 Hours',
    description: 'DC fast-charging dispenser servicing, CCS2/CHAdeMO plug latch mechanism repair, liquid-cooled cable diagnostics, and OCPP server link.',
    badge: 'Clean Energy',
    activeTickets: 2
  },
  {
    id: 'telecom',
    name: 'Enterprise VoIP & Carrier PBX Hardware',
    icon: 'PhoneCall',
    sla: '< 3 Hours',
    description: 'SIP trunk packet jitter resolution, Session Border Controller QoS enforcement, PRI gateway failover, and hardware codec replacement.',
    badge: 'Business Communications',
    activeTickets: 1
  },
  {
    id: 'iot_sensors',
    name: 'Smart City IoT & Environmental Sensor Arrays',
    icon: 'Cpu',
    sla: '< 4 Hours',
    description: 'LoRaWAN gateway synchronization, optical particulate matter sensors, smart street-lighting mesh network nodes, and RTU telemetry.',
    badge: 'Municipal IoT',
    activeTickets: 1
  }
];

export const SERVICE_CATEGORIES = SERVICES_LIST;


export const PLATFORM_FEATURES = [
  {
    title: 'Strict 9-Phase Lifecycle Engine',
    desc: 'Transparent end-to-end audit tracking across 9 distinct status milestones with timestamped state verification.',
    icon: 'GitFork',
    tag: 'Compliance'
  },
  {
    title: 'Role-Based Dashboards',
    desc: 'Distinct customized workspaces tailored for Operations Managers, Field Supervisors, and On-Site Field Executives.',
    icon: 'ShieldCheck',
    tag: 'Security & Access'
  },
  {
    title: 'Live Field GPS Telemetry',
    desc: 'Real-time technician location broadcast, geo-tagged work reports, and customer premises proximity verification.',
    icon: 'MapPin',
    tag: 'Field Ops'
  },
  {
    title: 'Zero-Friction Query Logging',
    desc: 'One-page customer portal with automated GPS tag detection, instant Query ID generation, and real-time tracking.',
    icon: 'Zap',
    tag: 'Customer Experience'
  },
  {
    title: '1-Click Dispatch & Assignment',
    desc: 'Instant supervisory allocation based on technician specialization, active workload, and proximity to incident.',
    icon: 'Send',
    tag: 'Automation'
  },
  {
    title: 'Mobile-Optimized Touch Actions',
    desc: 'High-contrast, bold mobile action buttons and direct click-to-call links designed for on-site field technicians.',
    icon: 'Smartphone',
    tag: 'Field Tech Ergonomics'
  }
];

export const MOCK_USERS = {
  manager: {
    id: 'USR-MGR-01',
    username: 'manager',
    role: 'manager',
    roleLabel: 'Operations Manager',
    name: 'Marcus Sterling',
    title: 'General Manager - Field & SLA Governance',
    email: 'marcus.sterling@resolvia.com',
    phone: '+91 99000 11000',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    department: 'Central Operations Directorate'
  },
  supervisor: {
    id: 'USR-SUP-01',
    username: 'supervisor',
    role: 'supervisor',
    roleLabel: 'Field Supervisor',
    name: 'Elena Vance',
    title: 'Senior Technical Dispatcher',
    email: 'elena.vance@resolvia.com',
    phone: '+91 98111 55667',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Central Dispatch Command'
  },
  field_executive_1: {
    id: 'FE-101',
    username: 'vikram',
    role: 'field_executive',
    roleLabel: 'Field Executive',
    name: 'Vikram Singh',
    title: 'Senior Field Technician (FE-101)',
    email: 'vikram.singh@resolvia.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    specialization: 'Fiber Optics & Grid Power',
    status: 'In Field',
    currentLocation: 'Sector 62 IT Park, Noida',
    coordinates: '28.6280° N, 77.3649° E',
    rating: 4.9,
    activeTasksCount: 2
  },
  field_executive_2: {
    id: 'FE-102',
    username: 'ananya',
    role: 'field_executive',
    roleLabel: 'Field Executive',
    name: 'Ananya Deshmukh',
    title: 'IoT & Telecom Field Tech (FE-102)',
    email: 'ananya.deshmukh@resolvia.com',
    phone: '+91 98220 11234',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    specialization: 'Smart Metering & IoT Sensors',
    status: 'Available',
    currentLocation: 'Cyber City Phase 2, Gurugram',
    coordinates: '28.4950° N, 77.0895° E',
    rating: 4.8,
    activeTasksCount: 1
  },
  customer: {
    id: 'CUST-101',
    username: 'customer',
    role: 'customer',
    roleLabel: 'Verified Customer',
    name: 'Amit Sharma',
    title: 'Enterprise Account Holder',
    email: 'amit.sharma@gmail.com',
    phone: '+91 98111 22334',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    address: 'Flat 402, Lotus Boulevard, Sector 100, Noida'
  }
};

export const FIELD_EXECUTIVES = [
  MOCK_USERS.field_executive_1,
  MOCK_USERS.field_executive_2,
  {
    id: 'FE-103',
    username: 'karan',
    role: 'field_executive',
    roleLabel: 'Field Executive',
    name: 'Karan Mehra',
    title: 'EV Infrastructure Specialist (FE-103)',
    email: 'karan.mehra@resolvia.com',
    phone: '+91 99112 56789',
    specialization: 'EV Fast Chargers & Power Converters',
    status: 'In Field',
    currentLocation: 'Bandra Kurla Complex, Mumbai',
    coordinates: '19.0657° N, 72.8687° E',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.7,
    activeTasksCount: 1
  },
  {
    id: 'FE-104',
    username: 'sunil',
    role: 'field_executive',
    roleLabel: 'Field Executive',
    name: 'Sunil Rao',
    title: 'Network Operations Tech (FE-104)',
    email: 'sunil.rao@resolvia.com',
    phone: '+91 97401 88990',
    specialization: 'VoIP PBX & Router Gateways',
    status: 'Available',
    currentLocation: 'Indiranagar 100ft Rd, Bengaluru',
    coordinates: '12.9784° N, 77.6408° E',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    activeTasksCount: 0
  }
];

export const INITIAL_QUERIES = [
  {
    id: 'CQ-9821',
    type: 'Complaint',
    customerName: 'Amit Sharma',
    customerEmail: 'amit.sharma@gmail.com',
    customerPhone: '+91 98111 22334',
    category: 'High-Speed Broadband & Optical Fiber',
    priority: 'High',
    subject: 'Red Optical LOS Light Flashing on Main GPON Gateway',
    description: 'Optical fiber GPON modem blinking red on LOS LED since 10 AM. Cannot connect to enterprise VPN. No visible indoor wire damage.',
    location: {
      address: 'Flat 402, Tower B, Lotus Boulevard, Sector 100',
      city: 'Noida',
      landmark: 'Near Pathways School',
      pincode: '201304',
      coordinates: '28.5355° N, 77.3712° E'
    },
    status: 'New Query',
    createdAt: '2026-11-04 09:30 AM',
    updatedAt: '2026-11-04 09:30 AM',
    assignedTo: null,
    assignedExecutiveName: null,
    history: [
      {
        status: 'New Query',
        timestamp: '2026-11-04 09:30 AM',
        updatedBy: 'Customer (Amit Sharma)',
        note: 'Ticket registered via Customer Self-Service Portal.'
      }
    ],
    fieldReport: null,
    supervisorRemarks: null
  },
  {
    id: 'CQ-9820',
    type: 'Complaint',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@outlook.com',
    customerPhone: '+91 97234 56781',
    category: 'Smart Ultrasonic Water & Gas Metering',
    priority: 'Medium',
    subject: 'Digital Water Meter Display Error ERR-04 & Pressure Alarm',
    description: 'Ultrasonic smart water meter is beeping continuously with high-pressure alert. Water flow is normal, but AMR usage readings are erratic.',
    location: {
      address: 'Villa 18, Palm Meadows, Ramagondanahalli, Whitefield',
      city: 'Bengaluru',
      landmark: 'Opposite Shell Fuel Station',
      pincode: '560066',
      coordinates: '12.9698° N, 77.7499° E'
    },
    status: 'Under Review',
    createdAt: '2026-11-04 08:45 AM',
    updatedAt: '2026-11-04 10:15 AM',
    assignedTo: null,
    assignedExecutiveName: null,
    history: [
      {
        status: 'New Query',
        timestamp: '2026-11-04 08:45 AM',
        updatedBy: 'Customer (Priya Patel)',
        note: 'Complaint submitted with error photograph.'
      },
      {
        status: 'Under Review',
        timestamp: '2026-11-04 10:15 AM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Auditing remote telemetry logs before dispatching field engineer.'
      }
    ],
    fieldReport: null,
    supervisorRemarks: 'Remote telemetry indicates transducer sensor drift. Ready for IoT specialist assignment.'
  },
  {
    id: 'CQ-9819',
    type: 'Complaint',
    customerName: 'Rajesh Verma',
    customerEmail: 'rajesh.verma@techsolutions.in',
    customerPhone: '+91 99100 44556',
    category: 'Smart Electricals & Commercial Power Grid',
    priority: 'Urgent',
    subject: 'Three-Phase Industrial Voltage Drop & Main Breaker Tripping',
    description: 'Phase 2 voltage dropping below 165V intermittently in our manufacturing bay. Urgent on-site inspection requested to protect CNC motors.',
    location: {
      address: 'Shed C-14, Phase II, Okhla Industrial Area',
      city: 'New Delhi',
      landmark: 'Near Crown Plaza Hotel',
      pincode: '110020',
      coordinates: '28.5302° N, 77.2711° E'
    },
    status: 'Assigned',
    createdAt: '2026-11-04 08:00 AM',
    updatedAt: '2026-11-04 09:10 AM',
    assignedTo: 'FE-101',
    assignedExecutiveName: 'Vikram Singh',
    history: [
      {
        status: 'New Query',
        timestamp: '2026-11-04 08:00 AM',
        updatedBy: 'Customer (Rajesh Verma)',
        note: 'Urgent ticket created.'
      },
      {
        status: 'Under Review',
        timestamp: '2026-11-04 08:30 AM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Classified urgent due to commercial equipment risk.'
      },
      {
        status: 'Assigned',
        timestamp: '2026-11-04 09:10 AM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Assigned to Senior Field Technician Vikram Singh with high-voltage testing rig.'
      }
    ],
    fieldReport: null,
    supervisorRemarks: 'Emergency dispatch. Measure neutral-to-ground potential immediately.'
  },
  {
    id: 'CQ-9818',
    type: 'Complaint',
    customerName: 'Sunita Rao',
    customerEmail: 'sunita.rao@greenenergy.org',
    customerPhone: '+91 98450 77881',
    category: 'EV High-Capacity Charging Infrastructure',
    priority: 'High',
    subject: 'Solar Inverter Grid-Tie Synchronization Failure',
    description: '10kW commercial inverter fails to synchronize with AC distribution panel after morning grid reboot. Displays code ISO-FAULT.',
    location: {
      address: 'Plot 88, Road No. 12, Banjara Hills',
      city: 'Hyderabad',
      landmark: 'Near Taj Krishna',
      pincode: '500034',
      coordinates: '17.4156° N, 78.4357° E'
    },
    status: 'In Progress',
    createdAt: '2026-11-04 07:30 AM',
    updatedAt: '2026-11-04 11:00 AM',
    assignedTo: 'FE-101',
    assignedExecutiveName: 'Vikram Singh',
    history: [
      {
        status: 'New Query',
        timestamp: '2026-11-04 07:30 AM',
        updatedBy: 'Customer (Sunita Rao)',
        note: 'Customer logged inverter issue.'
      },
      {
        status: 'Assigned',
        timestamp: '2026-11-04 08:15 AM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Assigned to Vikram Singh.'
      },
      {
        status: 'In Progress',
        timestamp: '2026-11-04 11:00 AM',
        updatedBy: 'Field Executive (Vikram Singh)',
        note: 'Arrived at site. Testing DC string isolation and AC grid phase angle.'
      }
    ],
    fieldReport: null,
    supervisorRemarks: null
  },
  {
    id: 'CQ-9817',
    type: 'Complaint',
    customerName: 'Rohan Joshi',
    customerEmail: 'rohan.joshi@techcorp.com',
    customerPhone: '+91 99887 66554',
    category: 'High-Speed Broadband & Optical Fiber',
    priority: 'Urgent',
    subject: 'Main 96-Core Underground Fiber Conduit Cut by Road Works',
    description: 'Civic excavation team damaged underground optical duct. Corporate campus secondary trunk down. Fusion splicing team required immediately.',
    location: {
      address: 'Tower 4, DLF Cyber City, Sector 24',
      city: 'Gurugram',
      landmark: 'Building 10 Metro Gate 2',
      pincode: '122002',
      coordinates: '28.4952° N, 77.0890° E'
    },
    status: 'Visit Required',
    createdAt: '2026-11-03 04:00 PM',
    updatedAt: '2026-11-04 09:40 AM',
    assignedTo: 'FE-102',
    assignedExecutiveName: 'Ananya Deshmukh',
    history: [
      {
        status: 'New Query',
        timestamp: '2026-11-03 04:00 PM',
        updatedBy: 'Customer (Rohan Joshi)',
        note: 'Disaster management ticket created.'
      },
      {
        status: 'In Progress',
        timestamp: '2026-11-03 05:30 PM',
        updatedBy: 'Field Executive (Ananya Deshmukh)',
        note: 'OTDR loopback confirmed physical break at 420m from distribution cabinet.'
      },
      {
        status: 'Visit Required',
        timestamp: '2026-11-04 09:40 AM',
        updatedBy: 'Field Executive (Ananya Deshmukh)',
        note: 'Physical trenching and mobile fusion splicer vehicle required.'
      }
    ],
    fieldReport: null,
    supervisorRemarks: 'Mobile splicing unit vehicle dispatched.'
  },
  {
    id: 'CQ-9816',
    type: 'Complaint',
    customerName: 'Deepak Nair',
    customerEmail: 'deepak.nair@fleetmobility.com',
    customerPhone: '+91 98200 33441',
    category: 'EV High-Capacity Charging Infrastructure',
    priority: 'Medium',
    subject: 'CCS2 Fast Charger Dispenser 03 Mechanical Gun Latch Jammed',
    description: 'Pneumatic gun latch stuck inside connector receptacle. Safe release performed via emergency pull-cord, but solenoid needs lubrication and replacement.',
    location: {
      address: 'Station 2, EcoHub EV Hub, G Block, BKC',
      city: 'Mumbai',
      landmark: 'Near Jio World Garden',
      pincode: '400051',
      coordinates: '19.0655° N, 72.8680° E'
    },
    status: 'Work Completed',
    createdAt: '2026-11-03 11:30 AM',
    updatedAt: '2026-11-04 12:15 PM',
    assignedTo: 'FE-103',
    assignedExecutiveName: 'Karan Mehra',
    history: [
      {
        status: 'Assigned',
        timestamp: '2026-11-03 01:00 PM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Assigned to Karan Mehra.'
      },
      {
        status: 'In Progress',
        timestamp: '2026-11-04 10:00 AM',
        updatedBy: 'Field Executive (Karan Mehra)',
        note: 'Replaced microswitch and serviced locking pin.'
      },
      {
        status: 'Work Completed',
        timestamp: '2026-11-04 12:15 PM',
        updatedBy: 'Field Executive (Karan Mehra)',
        note: 'Tested 5 successful plug-and-charge cycles with test vehicle. Latch engages smoothly.'
      }
    ],
    fieldReport: null,
    supervisorRemarks: null
  },
  {
    id: 'CQ-9815',
    type: 'Query',
    customerName: 'Kavita Menon',
    customerEmail: 'kavita.m@biotechlabs.in',
    customerPhone: '+91 97111 65432',
    category: 'Smart Ultrasonic Water & Gas Metering',
    priority: 'High',
    subject: 'Cleanroom Gas Manifold Pressure Transducer Calibration Inquiry',
    description: 'Requesting clarification and calibration procedure for drifted cleanroom gas manifold pressure gauge. Sensor drifted by 0.6 bar.',
    location: {
      address: 'BioTech Park, Phase 1, Electronic City',
      city: 'Bengaluru',
      landmark: 'Near Wipro Gate 5',
      pincode: '560100',
      coordinates: '12.8452° N, 77.6602° E'
    },
    status: 'Submitted for Review',
    createdAt: '2026-11-02 02:15 PM',
    updatedAt: '2026-11-04 01:30 PM',
    assignedTo: 'FE-102',
    assignedExecutiveName: 'Ananya Deshmukh',
    history: [
      {
        status: 'New Query',
        timestamp: '2026-11-02 02:15 PM',
        updatedBy: 'Customer (Kavita Menon)',
        note: 'Cleanroom technical query raised.'
      },
      {
        status: 'Assigned',
        timestamp: '2026-11-02 03:00 PM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Assigned to Ananya Deshmukh.'
      },
      {
        status: 'Work Completed',
        timestamp: '2026-11-04 11:00 AM',
        updatedBy: 'Field Executive (Ananya Deshmukh)',
        note: 'Swapped piezoresistive transducer unit. 45 min leak test passed.'
      },
      {
        status: 'Submitted for Review',
        timestamp: '2026-11-04 01:30 PM',
        updatedBy: 'Field Executive (Ananya Deshmukh)',
        note: 'Formal work report submitted with GPS stamp and lab supervisor electronic signoff.'
      }
    ],
    fieldReport: {
      executiveId: 'FE-102',
      executiveName: 'Ananya Deshmukh',
      summary: 'Replaced OEM piezoresistive pressure transducer with certified unit SN#TR-9042. Zeroed baseline and validated against Fluke reference gauge at 4.0, 5.0, and 6.0 bar. Leak check passed with zero pressure drop over 45 minutes.',
      partsUsed: 'Transducer Unit Model TR-9042, Nitrile High-Pressure O-Ring kit',
      locationSubmitted: 'BioTech Park Cleanroom B-2, Electronic City, Bengaluru (GPS: 12.8452° N, 77.6602° E)',
      timestamp: '2026-11-04 01:25 PM',
      customerSignature: 'Signed by Lab Operations Manager Dr. S. Rao',
      workDurationHours: '2.5 hrs'
    },
    supervisorRemarks: 'Report received. Awaiting supervisor audit and signoff.'
  },
  {
    id: 'CQ-9814',
    type: 'Complaint',
    customerName: 'Sanjay Guha',
    customerEmail: 'sanjay.guha@fintechcorp.com',
    customerPhone: '+91 98300 12890',
    category: 'Enterprise VoIP & Carrier PBX Hardware',
    priority: 'Medium',
    subject: 'SIP Trunk Voice Audio Jitter & Call Drops on Channel 02',
    description: 'Call center desk experiencing 1-way audio and jitter on outbound trunks during peak hours.',
    location: {
      address: 'Level 8, Infinity Tower, Sector V, Salt Lake',
      city: 'Kolkata',
      landmark: 'Opposite RDB Cinema',
      pincode: '700091',
      coordinates: '22.5804° N, 88.4312° E'
    },
    status: 'Approved',
    createdAt: '2026-11-01 10:00 AM',
    updatedAt: '2026-11-04 02:00 PM',
    assignedTo: 'FE-101',
    assignedExecutiveName: 'Vikram Singh',
    history: [
      {
        status: 'Assigned',
        timestamp: '2026-11-01 11:30 AM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Assigned to Vikram Singh.'
      },
      {
        status: 'Work Completed',
        timestamp: '2026-11-03 04:00 PM',
        updatedBy: 'Field Executive (Vikram Singh)',
        note: 'DSCP EF prioritization reconfigured.'
      },
      {
        status: 'Submitted for Review',
        timestamp: '2026-11-04 11:30 AM',
        updatedBy: 'Field Executive (Vikram Singh)',
        note: 'Traffic traces showed zero jitter over 24h window.'
      },
      {
        status: 'Approved',
        timestamp: '2026-11-04 02:00 PM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Telemetry and client signoff verified. Ready to close.'
      }
    ],
    fieldReport: {
      executiveId: 'FE-101',
      executiveName: 'Vikram Singh',
      summary: 'Configured EF (DSCP 46) on edge routers and updated SIP SBC firmware. 24h load test confirmed zero dropped packets under 100 concurrent channels.',
      partsUsed: 'Firmware patch v4.8.2, Cat6A patch cord',
      locationSubmitted: 'Infinity Tower, Sector V, Salt Lake, Kolkata',
      timestamp: '2026-11-04 11:20 AM',
      customerSignature: 'Customer IT Lead signed electronically',
      workDurationHours: '3.0 hrs'
    },
    supervisorRemarks: 'QoS telemetry verified. Approved by Elena Vance. Ready for closure.'
  },
  {
    id: 'CQ-9812',
    type: 'Query',
    customerName: 'Naveen Kumar',
    customerEmail: 'naveen.k@autotech.co.in',
    customerPhone: '+91 99001 23456',
    category: 'Smart Electricals & Commercial Power Grid',
    priority: 'High',
    subject: 'Substation Transformer Bushing Replacement & Dielectric Breakdown Test',
    description: 'Scheduled preventive servicing and oil dielectric breakdown testing inquiry for 500kVA substation unit.',
    location: {
      address: 'Plot 42, 4th Cross, Peenya 2nd Stage',
      city: 'Bengaluru',
      landmark: 'Near Peenya Metro Depot',
      pincode: '560058',
      coordinates: '13.0298° N, 77.5180° E'
    },
    status: 'Closed',
    createdAt: '2026-10-30 09:00 AM',
    updatedAt: '2026-11-03 05:00 PM',
    assignedTo: 'FE-101',
    assignedExecutiveName: 'Vikram Singh',
    history: [
      {
        status: 'Assigned',
        timestamp: '2026-10-30 10:00 AM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Preventive maintenance order.'
      },
      {
        status: 'Approved',
        timestamp: '2026-11-03 03:30 PM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Oil test report 68kV verified.'
      },
      {
        status: 'Closed',
        timestamp: '2026-11-03 05:00 PM',
        updatedBy: 'Supervisor (Elena Vance)',
        note: 'Job closed. Customer rated 5/5.'
      }
    ],
    fieldReport: {
      executiveId: 'FE-101',
      executiveName: 'Vikram Singh',
      summary: 'Replaced HT porcelain bushings and filtered transformer oil. BDV test yielded 68kV breakdown voltage.',
      partsUsed: 'Porcelain Bushings x3, Gasket kit, 50L Shell Diala oil',
      locationSubmitted: 'Peenya Industrial Area, Bengaluru',
      timestamp: '2026-11-03 02:00 PM',
      customerSignature: 'Plant Manager signed',
      workDurationHours: '5.0 hrs'
    },
    supervisorRemarks: 'Archived and closed. Preventive SLA 100% achieved.'
  }
];
