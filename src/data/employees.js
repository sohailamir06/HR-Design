import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';

export const employeeHeroStats = [
  { label: 'Total Headcount', value: '128', meta: '+12 this quarter', icon: Users, tone: 'sky' },
  { label: 'Active Today', value: '118', meta: '92.1% availability', icon: BadgeCheck, tone: 'mint' },
  { label: 'New Joiners', value: '09', meta: 'Last 30 days', icon: Star, tone: 'amber' },
  { label: 'HR Compliance', value: '98%', meta: 'Docs verified', icon: ShieldCheck, tone: 'brand' },
];

export const employeeFilters = {
  departments: ['All Departments', 'Engineering', 'People Ops', 'Design', 'Finance', 'Operations', 'Support'],
  statuses: ['All Statuses', 'Active', 'Probation', 'Remote', 'On Leave'],
};

export const employeeRecords = [
  {
    id: 'EMP-1001',
    name: 'Amit Singh',
    initials: 'AS',
    email: 'amit.singh@leaffirst.com',
    phone: '+91 98765 43210',
    department: 'Engineering',
    designation: 'Software Engineer',
    status: 'Active',
    location: 'Noida',
    doj: '12 Feb 2024',
  },
  {
    id: 'EMP-1002',
    name: 'Neha Gupta',
    initials: 'NG',
    email: 'neha.gupta@leaffirst.com',
    phone: '+91 98670 21456',
    department: 'People Ops',
    designation: 'HR Executive',
    status: 'Active',
    location: 'Delhi',
    doj: '03 Apr 2023',
  },
  {
    id: 'EMP-1003',
    name: 'Mohd Faisal',
    initials: 'MF',
    email: 'mohd.faisal@leaffirst.com',
    phone: '+91 98221 55781',
    department: 'Finance',
    designation: 'Accountant',
    status: 'Probation',
    location: 'Lucknow',
    doj: '22 May 2025',
  },
  {
    id: 'EMP-1004',
    name: 'Samyama',
    initials: 'SA',
    email: 'samyama@leaffirst.com',
    phone: '+91 99011 22145',
    department: 'Design',
    designation: 'UI Designer',
    status: 'Remote',
    location: 'Bengaluru',
    doj: '17 Jan 2024',
  },
  {
    id: 'EMP-1005',
    name: 'Sunil Kumar Singh',
    initials: 'SK',
    email: 'sunil.kumar@leaffirst.com',
    phone: '+91 98989 33456',
    department: 'Operations',
    designation: 'Operations Manager',
    status: 'On Leave',
    location: 'Jaipur',
    doj: '09 Sep 2022',
  },
  {
    id: 'EMP-1006',
    name: 'Nagma Ansari',
    initials: 'NA',
    email: 'nagma.ansari@leaffirst.com',
    phone: '+91 98114 78621',
    department: 'Support',
    designation: 'Team Lead',
    status: 'Active',
    location: 'Pune',
    doj: '14 Nov 2023',
  },
];

export const employeeHighlights = [
  {
    title: 'Department Mix',
    icon: Building2,
    items: [
      { label: 'Engineering', value: '34 employees' },
      { label: 'Operations', value: '22 employees' },
      { label: 'People Ops', value: '11 employees' },
    ],
  },
  {
    title: 'Role Coverage',
    icon: BriefcaseBusiness,
    items: [
      { label: 'Managers', value: '14 total' },
      { label: 'Individual Contributors', value: '89 total' },
      { label: 'Support Staff', value: '25 total' },
    ],
  },
  {
    title: 'Today',
    icon: Clock3,
    items: [
      { label: 'Clocked In', value: '102 employees' },
      { label: 'Remote', value: '18 employees' },
      { label: 'Pending Docs', value: '4 employees' },
    ],
  },
];

export const employeeContactChannels = [
  { label: 'Primary Email', value: 'hr@leaffirst.com', icon: Mail },
  { label: 'HR Desk', value: '+91 98100 11223', icon: Phone },
];
