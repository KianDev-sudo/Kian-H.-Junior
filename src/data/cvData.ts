import {
  ProfileData,
  EducationItem,
  AttachmentExperience,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  SchoolActivity,
  SoftSkillItem,
  RefereeItem
} from '../types';
import profilePhoto from '../assets/images/brighton_profile_photo_1788092810612.jpg';

export const profileData: ProfileData = {
  name: 'Brighton Omondi Umira',
  tagline: 'ICT Student | Full-Stack Developer | IT Support & Networking Specialist',
  profileImage: profilePhoto,
  roleTitles: [
    'Full-Stack Developer',
    'IT Support & Network Engineer',
    'ICT Diploma Graduate',
    'Android & Python Developer'
  ],
  location: 'Kisumu, Kenya',
  phone: '+254 757 812 731',
  email: 'brightonomondiumira@gmail.com',
  whatsapp: '+254757812731',
  githubUrl: 'https://github.com/brightonomondi',
  linkedinUrl: 'https://linkedin.com/in/brighton-omondi-umira',
  status: 'Available for Immediate Hire / Internship',
  statusDescription: 'Completed all Diploma ICT coursework at The Kisumu National Polytechnic; seeking internship or entry-level ICT roles.',
  careerObjective:
    'Diploma in Information Communication Technology student (Level 6) at The Kisumu National Polytechnic, having completed all coursework and awaiting graduation, with hands-on industrial attachment experience at the Communications Authority of Kenya and Kenya Power and Lighting Company. Skilled in computer programming, networking, ICT maintenance, full-stack web development, and end-user support. Seeking an internship or entry-level ICT role to apply classroom knowledge and attachment experience while continuing to build practical, real-world skills.',
  summaryPillars: [
    {
      title: 'Industrial Attachment Experience',
      description: 'Hands-on exposure at Communications Authority of Kenya (CA) & Kenya Power (KPLC) in network monitoring, licensing compliance, and IT support.',
      icon: 'Briefcase'
    },
    {
      title: 'Full-Stack & Systems Development',
      description: 'Practical engineering in Python, React, Node.js, Express, MySQL, PostgreSQL, PHP, and Android (Kotlin & Java).',
      icon: 'Code2'
    },
    {
      title: 'Networking & Hardware Infrastructure',
      description: 'Certified Cisco NetAcad background in TCP/IP, LAN/WAN configurations, Packet Tracer, RJ45 crimping, and PC diagnostics.',
      icon: 'Network'
    },
    {
      title: 'Academic Excellence (Level 6)',
      description: 'Completed coursework at The Kisumu National Polytechnic with peer study leadership & inter-polytechnic competition honors.',
      icon: 'GraduationCap'
    }
  ]
};

export const educationData: EducationItem[] = [
  {
    degree: 'Diploma in Information, Communication Technology',
    level: 'Level 6 — Computing and Informatics Department',
    institution: 'The Kisumu National Polytechnic',
    location: 'Kisumu, Kenya',
    admissionNo: '',
    period: '2023 – 2027 (Expected Graduation)',
    expectedGraduation: '2027 (Coursework completed July 31, 2026)',
    status: 'Completed all coursework; awaiting results and graduation',
    coursework: [
      'Computer Programming (Python, C/C++, Java)',
      'Networking & Internetworking (TCP/IP, Subnetting, Routing)',
      'ICT Maintenance & Repair',
      'ICT End User Support & Helpdesk',
      'Database Management Systems (MySQL, PostgreSQL, Access)',
      'Microsoft Office Suite Applications',
      'Entrepreneurship & Project Management'
    ],
    notes: 'Academic transcripts and industrial attachment appraisal reports available on request.'
  }
];

export const experienceData: AttachmentExperience[] = [
  {
    id: 'ca-kenya',
    role: 'ICT Attaché',
    organization: 'Communications Authority of Kenya (CA)',
    department: 'Nyanza Regional Office — Licensing and Compliance Department',
    location: 'Kisumu, Kenya',
    period: 'Industrial Attachment',
    badge: 'Regulatory & Broadcast Systems',
    highlights: [
      'Supported licensing and compliance operations, including documentation and record-keeping for frequency and broadcast licensees across the Nyanza Region.',
      'Participated in rigorous field inspections of broadcast studios and transmission sites, verifying broadcast equipment specs and regulatory compliance conditions.',
      'Maintained and updated databases for Fixed Wireless Links (Safaricom, Airtel, Telkom) and FM/TV frequency licensees.',
      'Prepared structured inspection and compliance reports following the Authority’s strict official reporting standards.',
      'Gained deep exposure to Kenya’s telecommunications regulatory landscape and interdepartmental coordination within a premier public regulatory body.'
    ],
    technologies: [
      'Spectrum Management Databases',
      'Fixed Wireless Link Records',
      'Broadcast Studio Audit Tools',
      'Compliance Documentation',
      'MS Office Suite',
      'Regulatory Reporting'
    ],
    expandedDetails: {
      scope: 'Managed critical regulatory data records for national telecommunications operators (Safaricom, Airtel, Telkom) and local commercial FM/TV broadcast stations.',
      impact: 'Ensured high-accuracy licensing compliance documentation and contributed to field safety and spectrum alignment audits.',
      keyLearnings: [
        'RF frequency licensing procedures and transmission site verification protocols',
        'Multi-carrier fixed wireless link coordination and database hygiene',
        'Institutional confidentiality and public service report drafting'
      ]
    }
  },
  {
    id: 'kplc-kenya',
    role: 'ICT Attaché',
    organization: 'Kenya Power and Lighting Company (KPLC)',
    department: 'ICT Department',
    location: 'Kisumu / Western Region, Kenya',
    period: 'Industrial Attachment',
    badge: 'Enterprise IT & Infrastructure',
    highlights: [
      'Provided end-user technical support for corporate ICT systems, troubleshooting hardware, operating systems, software, and network issues.',
      'Assisted with maintenance and real-time monitoring of corporate ICT infrastructure to support reliable 24/7 day-to-day power utility operations.',
      'Worked within a structured corporate ICT environment, following established ITIL-aligned support ticketing and escalation procedures.',
      'Performed preventive hardware maintenance on desktop computers, printers, network switches, and peripheral devices.'
    ],
    technologies: [
      'Enterprise LAN/WAN Support',
      'Hardware Diagnostics & Repair',
      'Windows OS Deployment',
      'Helpdesk Ticketing',
      'Network Cabling',
      'Printer & Peripheral Maintenance'
    ],
    expandedDetails: {
      scope: 'Served on the frontlines of IT helpdesk and infrastructure maintenance for a national critical infrastructure energy corporation.',
      impact: 'Minimized staff downtime through rapid hardware fault resolution, OS reconfiguration, and proactive preventive equipment servicing.',
      keyLearnings: [
        'Corporate SLA adherence and escalation hierarchies',
        'Enterprise network fault isolation and patch panel management',
        'System imaging, driver updates, and data backup workflows'
      ]
    }
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: 'Terminal',
    description: 'Core languages utilized for system scripts, algorithms, and application backends.',
    skills: [
      { name: 'Python', level: 'Advanced', percentage: 90, tags: ['OOP', 'Automation', 'MySQL Connector', 'Tkinter'] },
      { name: 'JavaScript (ES6+)', level: 'Advanced', percentage: 88, tags: ['Async/Await', 'DOM', 'Modules'] },
      { name: 'Java', level: 'Proficient', percentage: 80, tags: ['Core Java', 'OOP', 'Android SDK'] },
      { name: 'C / C++', level: 'Proficient', percentage: 75, tags: ['Data Structures', 'Pointers', 'Algorithms'] },
      { name: 'HTML5 / CSS3', level: 'Advanced', percentage: 95, tags: ['Flexbox', 'Grid', 'Semantic HTML', 'Animations'] }
    ]
  },
  {
    category: 'Web & Backend Development',
    icon: 'Globe',
    description: 'Full-stack application engineering from interactive clients to scalable RESTful APIs.',
    skills: [
      { name: 'React.js', level: 'Proficient', percentage: 85, tags: ['Hooks', 'Context', 'State Management', 'Tailwind'] },
      { name: 'Node.js & Express', level: 'Proficient', percentage: 82, tags: ['REST APIs', 'Middleware', 'Routing'] },
      { name: 'PHP (Basics)', level: 'Familiar', percentage: 70, tags: ['CRUD', 'Session Handling', 'PDO'] },
      { name: 'Tailwind CSS', level: 'Advanced', percentage: 92, tags: ['Responsive UI', 'Dark Mode', 'Design Systems'] }
    ]
  },
  {
    category: 'Databases & Data Management',
    icon: 'Database',
    description: 'Relational database schema design, indexing, querying, and reporting.',
    skills: [
      { name: 'MySQL', level: 'Advanced', percentage: 88, tags: ['Complex Queries', 'Foreign Keys', 'Joins', 'Stored Procedures'] },
      { name: 'PostgreSQL', level: 'Proficient', percentage: 78, tags: ['Relational Schemas', 'Indexing', 'SQL'] },
      { name: 'Microsoft Access', level: 'Advanced', percentage: 90, tags: ['Forms', 'Reports', 'Queries', 'VBA Basics'] }
    ]
  },
  {
    category: 'Networking & IT Infrastructure',
    icon: 'Network',
    description: 'Network engineering, simulation, protocol configuration, and hardware repair.',
    skills: [
      { name: 'TCP/IP & Subnetting', level: 'Advanced', percentage: 90, tags: ['IPv4', 'CIDR', 'DHCP', 'DNS', 'VLANs'] },
      { name: 'LAN / WAN Architecture', level: 'Advanced', percentage: 88, tags: ['Switches', 'Routers', 'Access Points'] },
      { name: 'Cisco Packet Tracer', level: 'Advanced', percentage: 88, tags: ['Topology Simulation', 'Routing Protocols'] },
      { name: 'Network Cabling & RJ45', level: 'Advanced', percentage: 95, tags: ['T568A/B', 'Crimping', 'Cable Testing'] },
      { name: 'Hardware Diagnostics & Repair', level: 'Advanced', percentage: 92, tags: ['PC Assembly', 'PSU/RAM/Motherboard Testing'] },
      { name: 'ICT Maintenance & Support', level: 'Advanced', percentage: 90, tags: ['Preventive Care', 'Printer Servicing', 'Troubleshooting'] }
    ]
  },
  {
    category: 'Mobile Development',
    icon: 'Smartphone',
    description: 'Android application creation with robust local databases and networking.',
    skills: [
      { name: 'Android Studio', level: 'Proficient', percentage: 80, tags: ['UI Layouts', 'XML', 'Material Design'] },
      { name: 'Kotlin & Java for Android', level: 'Proficient', percentage: 78, tags: ['Activity Lifecycle', 'Services'] },
      { name: 'Room Database', level: 'Proficient', percentage: 75, tags: ['Local SQLite', 'DAOs', 'Entities'] },
      { name: 'Retrofit & REST', level: 'Proficient', percentage: 75, tags: ['HTTP Client', 'JSON Parsing', 'API Sync'] }
    ]
  },
  {
    category: 'Tools, Platforms & OS',
    icon: 'Cpu',
    description: 'Development environments, productivity suites, and operating systems.',
    skills: [
      { name: 'Git & GitHub', level: 'Proficient', percentage: 85, tags: ['Version Control', 'Branches', 'Commits'] },
      { name: 'Microsoft Office Suite', level: 'Advanced', percentage: 95, tags: ['Word', 'Excel (VLOOKUP, Pivots)', 'PowerPoint', 'Access'] },
      { name: 'Windows OS Administration', level: 'Advanced', percentage: 92, tags: ['Registry', 'Group Policy', 'Device Manager'] },
      { name: 'Linux (Basics)', level: 'Familiar', percentage: 72, tags: ['Bash CLI', 'Permissions', 'Package Managers'] },
      { name: 'VS Code & PyCharm', level: 'Advanced', percentage: 90, tags: ['Extensions', 'Debugging', 'Linting'] }
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'student-records',
    title: 'Student Record Management System',
    category: 'Desktop & Systems',
    summary: 'A desktop application built with Python & MySQL for managing student registrations, attendance, grade tracking, and automated PDF/printed report generation.',
    fullDescription:
      'Developed a comprehensive desktop database solution addressing administrative bottlenecks in student record keeping. Featuring a clean graphical user interface (GUI), secure user authentication, complete CRUD operations for student files, automated GPA/grade calculation, and instant transcript/report card export.',
    technologies: ['Python', 'MySQL', 'Tkinter GUI', 'ReportLab / PDF Gen', 'SQL Queries'],
    highlights: [
      'Full CRUD architecture for student admissions, course enrollments, and academic scores.',
      'Automated grade computation and dynamic PDF generation for student transcripts.',
      'Relational database integration with normalized tables, preventing redundant data entry.',
      'Search and filter functionality by Admission Number, Name, Course, and Academic Year.'
    ],
    type: 'Academic',
    demoType: 'crud-simulator',
    codeSnippet: {
      language: 'python',
      filename: 'student_manager.py',
      code: `import mysql.connector
from tkinter import messagebox

class StudentRecordSystem:
    def __init__(self, db_host="localhost", db_user="root", db_pass=""):
        self.conn = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            database="tknp_records"
        )
        self.cursor = self.conn.cursor(dictionary=True)
        print(" Connected to TKNP Student Database")

    def register_student(self, adm_no, full_name, course, email):
        query = "INSERT INTO students (adm_no, name, course, email) VALUES (%s, %s, %s, %s)"
        self.cursor.execute(query, (adm_no, full_name, course, email))
        self.conn.commit()
        return f"Student {adm_no} registered successfully."

    def search_student(self, adm_no):
        query = "SELECT * FROM students WHERE adm_no = %s"
        self.cursor.execute(query, (adm_no,))
        return self.cursor.fetchone()
`
    },
    metrics: [
      { label: 'Database Operations', value: 'Instant CRUD' },
      { label: 'Report Generation', value: '< 2 Seconds' },
      { label: 'Data Integrity', value: '100% Normalized' }
    ]
  },
  {
    id: 'cisco-network-lan',
    title: 'Small Office / Branch LAN Setup & Simulation',
    category: 'Networking & Infrastructure',
    summary: 'Designed and simulated a multi-department small office Local Area Network using Cisco Packet Tracer, configuring routers, switches, DHCP, VLANs, and physical RJ45 termination.',
    fullDescription:
      'Engineered an end-to-end Local Area Network topology designed for enterprise branch offices. Implemented hierarchical network design with Core/Distribution/Access layers, static and dynamic IP addressing (DHCP), inter-VLAN routing, network security access-control lists (ACLs), and validated physical cabling using T568B standard RJ45 termination.',
    technologies: ['Cisco Packet Tracer', 'TCP/IP', 'VLANs', 'DHCP / DNS', 'Subnetting (VLSM)', 'RJ45 / T568B'],
    highlights: [
      'Configured Cisco 2960 switches with VLAN segmentation (Admin, Staff, Guest WiFi).',
      'Configured Cisco 2911 router for inter-VLAN routing and NAT for internet routing.',
      'Implemented Variable Length Subnet Masking (VLSM) optimizing IPv4 address space allocation.',
      'Hands-on physical UTP Cat6 cabling with RJ45 crimping, patch panels, and cable continuity testing.'
    ],
    type: 'Academic',
    demoType: 'network-topology',
    codeSnippet: {
      language: 'bash',
      filename: 'cisco_switch_config.ios',
      code: `! Cisco 2960 Switch - Departmental VLAN Configuration
Switch> enable
Switch# configure terminal
Switch(config)# hostname TKNP-SW-CORE

! Creating VLANs for Departments
Switch(config)# vlan 10
Switch(config-vlan)# name Administration
Switch(config)# vlan 20
Switch(config-vlan)# name ICT_Support
Switch(config)# vlan 30
Switch(config-vlan)# name Student_Lab

! Configuring Trunk Port to Router
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# no shutdown
`
    },
    metrics: [
      { label: 'Topology Uptime', value: '99.9% Simulated' },
      { label: 'VLAN Segments', value: '4 Isolated Zones' },
      { label: 'Cabling Standard', value: 'TIA/EIA-568-B' }
    ]
  },
  {
    id: 'hardware-maintenance-lab',
    title: 'ICT Hardware Maintenance & Fault Diagnostics Lab',
    category: 'Hardware & Maintenance',
    summary: 'Comprehensive hands-on PC assembly/disassembly, motherboard component testing, hardware fault diagnosis, OS deployment, and preventive maintenance on desktops & laser printers.',
    fullDescription:
      'Conducted extensive practical hardware diagnostics and maintenance within laboratory and institutional environments. Mastered end-to-end computer teardown and assembly, thermal paste re-application, RAM/Storage/PSU voltage troubleshooting using multimeters and POST beep codes, and automated Windows OS installation and driver configurations.',
    technologies: ['PC Hardware Assembly', 'POST Beep Codes', 'Multimeter Testing', 'Windows Deployment', 'Printer Servicing'],
    highlights: [
      'Systematic fault diagnosis identifying bad power supplies, faulty RAM slots, and corrupted boot sectors.',
      'Preventive maintenance routines: dust cleaning, thermal paste replacement, and fan lubrication.',
      'Laser and inkjet printer maintenance: paper jam resolution, roller cleaning, and network setup.',
      'Deployment of clean Windows OS images with partition management and driver updates.'
    ],
    type: 'Academic',
    demoType: 'hardware-diagnostic',
    codeSnippet: {
      language: 'markdown',
      filename: 'diagnostic_checklist.txt',
      code: `[ICT Hardware Troubleshooting Standard Procedure]
1. Power Check: Verify PSU 24-pin ATX voltage (Orange: 3.3V, Red: 5V, Yellow: 12V).
2. POST Check: Listen for BIOS beep sequence (1 Short = Normal, 3 Long = RAM failure).
3. Memory Reseating: Clean DDR4 gold contact pins with isopropyl alcohol & test dual-channel slots.
4. Thermal Management: Clean CPU heat-sink fins, reapply Arctic Silver thermal paste.
5. Disk Health: Run CHKDSK /f /r and S.M.A.R.T attribute verification.
`
    },
    metrics: [
      { label: 'Hardware Units Repaired', value: '50+ PCs/Printers' },
      { label: 'Diagnosis Accuracy', value: '98%' },
      { label: 'Turnaround Time', value: '< 1 Hour' }
    ]
  },
  {
    id: 'fullstack-ict-portal',
    title: 'Full-Stack ICT Helpdesk & Asset Management Portal',
    category: 'Full-Stack & Web',
    summary: 'A modern web application with React, Node.js, Express, and PostgreSQL/MySQL for logging ICT support tickets, tracking institutional hardware inventory, and managing technician assignments.',
    fullDescription:
      'Designed to solve IT support bottlenecks encountered during industrial attachments at public and corporate enterprises. Features a responsive dashboard, ticket priority queuing (Low/Medium/High/Critical), equipment lifecycle tracking, and real-time status updates.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL / PostgreSQL', 'Tailwind CSS', 'REST API'],
    highlights: [
      'Interactive ticket lifecycle manager (New -> Assigned -> In Progress -> Resolved -> Closed).',
      'Hardware asset registry tracking serial numbers, departmental assignees, and warranty status.',
      'Responsive design supporting mobile technicians in field inspections and office staff.'
    ],
    type: 'Personal',
    demoType: 'general',
    codeSnippet: {
      language: 'javascript',
      filename: 'ticketController.js',
      code: `// Express API: Ticket Creation & Auto-Assignment
export async function createTicket(req, res) {
  const { title, description, priority, department, reportedBy } = req.body;
  
  const query = \`
    INSERT INTO tickets (title, description, priority, department, reported_by, status, created_at)
    VALUES ($1, $2, $3, $4, $5, 'OPEN', NOW())
    RETURNING *;
  \`;
  
  const result = await db.query(query, [title, description, priority, department, reportedBy]);
  return res.status(201).json({ success: true, ticket: result.rows[0] });
}
`
    },
    metrics: [
      { label: 'Response Speed', value: '< 100ms API' },
      { label: 'Interface', value: 'Mobile + Desktop' }
    ]
  },
  {
    id: 'android-inventory-app',
    title: 'Android Equipment Inventory & Scan App',
    category: 'Mobile',
    summary: 'Native Android application built in Kotlin with Room Local Database and Retrofit for offline-first equipment barcode logging and field inspection reporting.',
    fullDescription:
      'Created a mobile companion app for field ICT technicians and inspection officers. Allows scanning equipment labels, recording technical inspection notes, taking photo proofs, and synchronizing data when internet connectivity is re-established.',
    technologies: ['Android', 'Kotlin', 'Room DB', 'Retrofit', 'Material Design', 'CameraX'],
    highlights: [
      'Offline-first architecture with SQLite Room database and background data synchronization.',
      'Intuitive Material Design 3 user interface with dark mode and quick search.'
    ],
    type: 'Personal',
    demoType: 'general',
    metrics: [
      { label: 'Architecture', value: 'MVVM + Room' },
      { label: 'Offline Support', value: '100% Local Cache' }
    ]
  }
];

export const certificationsData: CertificationItem[] = [
  {
    title: 'Introduction to Computer Networks',
    issuer: 'Cisco Networking Academy (NetAcad)',
    year: 'Certified',
    badgeType: 'Networking',
    description: 'Comprehensive network architecture, IP addressing, OSI model layers, Ethernet, router and switch configuration.',
    verified: true
  },
  {
    title: 'Data Science and Analytics',
    issuer: 'HP LIFE (Global Online Learning)',
    year: '2024',
    badgeType: 'Data & Analytics',
    description: 'Data-driven decision making, quantitative analytics, data visualization fundamentals, and business insight derivation.',
    verified: true
  },
  {
    title: 'Cybersecurity Awareness',
    issuer: 'HP LIFE (Global Online Learning)',
    year: '2024',
    badgeType: 'Security',
    description: 'Threat identification, social engineering defense, network security hygiene, data privacy, and institutional compliance.',
    verified: true
  },
  {
    title: 'Microsoft Office Specialist',
    issuer: 'The Kisumu National Polytechnic Curriculum',
    year: 'Certified',
    badgeType: 'Productivity',
    description: 'Advanced proficiency in Microsoft Word, Excel (formulas, pivot tables), PowerPoint, and Access database applications.',
    verified: true
  }
];

export const schoolActivitiesData: SchoolActivity[] = [
  {
    title: 'Active Club Member & Contributor',
    organization: 'Computing and Informatics Department Student Club',
    roleDescription: 'Actively participating in coding hackathons, peer tech talks, system architecture debates, and practical lab tutoring.',
    icon: 'Users'
  },
  {
    title: 'Inter-Polytechnic ICT Skills Representative',
    organization: 'The Kisumu National Polytechnic (TKNP)',
    roleDescription: 'Selected to represent TKNP in inter-polytechnic technical skills challenges showcasing rapid network setup and software troubleshooting.',
    icon: 'Trophy'
  },
  {
    title: 'Peer Study Group Leader',
    organization: 'TKNP Practical Lab Sessions',
    roleDescription: 'Guided fellow classmates through hands-on networking labs, cable crimping practice, and programming logic debugging in Python/C++.',
    icon: 'BookOpen'
  },
  {
    title: 'Workshop & Seminar Attendee',
    organization: 'TKNP & Industry Seminars',
    roleDescription: 'Attended specialized entrepreneurship workshops and advanced Microsoft Office skills seminars organized by TKNP.',
    icon: 'Award'
  }
];

export const softSkillsData: SoftSkillItem[] = [
  {
    name: 'Communication & Active Listening',
    category: 'Interpersonal',
    description: 'Clear technical communication with both non-technical end users and executive engineering stakeholders.'
  },
  {
    name: 'Teamwork & Collaboration',
    category: 'Workplace',
    description: 'Proven track record of constructive collaboration in multidisciplinary teams at CA and KPLC.'
  },
  {
    name: 'Problem-Solving & Critical Thinking',
    category: 'Analytical',
    description: 'Methodical root-cause analysis when diagnosing network outages, database anomalies, or hardware faults.'
  },
  {
    name: 'Adaptability & Quick Learning',
    category: 'Growth',
    description: 'Rapidly learning new frameworks, networking protocols, and proprietary regulatory management tools.'
  },
  {
    name: 'Time Management & Organization',
    category: 'Execution',
    description: 'Punctual task delivery, structured documentation upkeep, and adherence to maintenance schedules.'
  },
  {
    name: 'Professional Conduct & Confidentiality',
    category: 'Ethics',
    description: 'Strict adherence to institutional protocols, government data sensitivity, and public service integrity.'
  }
];

export const refereesData: RefereeItem[] = [
  {
    name: 'Mr. James Olando',
    title: 'Industrial Liaison Officer',
    institution: 'The Kisumu National Polytechnic',
    phone: '(057) 2020071 / 2024523',
    address: 'P.O. Box 143-40100, Kisumu, Kenya'
  },
  {
    name: 'Head of Department',
    title: 'Computing and Informatics Department',
    institution: 'The Kisumu National Polytechnic',
    address: 'P.O. Box 143-40100, Kisumu, Kenya',
    phone: '(057) 2020071 / 2024523'
  }
];
