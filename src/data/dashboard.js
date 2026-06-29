import {
  Calendar,
  Clipboard,
  Download,
  IndianRupee,
  Plane,
  Search,
  TrendingUp,
  User,
  UserCheck,
  Users,
} from 'lucide-react';

export const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const pageActions = [
  { label: 'View Holidays', icon: Calendar },
  { label: 'Download CSV', icon: Download },
];

export const summaryCards = [
  {
    label: 'Total Employees',
    value: '9',
    helper: 'All registered',
    icon: Users,
    tone: 'indigo',
  },
  {
    label: 'Active Employees',
    value: '8',
    helper: '88.9% of total',
    icon: UserCheck,
    helperIcon: TrendingUp,
    tone: 'green',
    helperTone: 'text-accent-mint',
  },
  {
    label: 'On Leave Today',
    value: '2',
    helper: '22.2% of total',
    icon: Plane,
    helperIcon: TrendingUp,
    tone: 'orange',
    helperTone: 'text-accent-mint',
  },
  {
    label: 'Pending Requests',
    value: '3',
    helper: 'Awaiting approval',
    icon: Clipboard,
    tone: 'blue',
  },
  {
    label: 'Total Deductions',
    value: '₹2,500',
    helper: 'This month',
    icon: IndianRupee,
    tone: 'red',
  },
];

export const leaveToday = [
  { name: 'Amit Singh', type: 'Casual Leave', duration: '1 Day', initials: 'AS', tone: 'blue' },
  { name: 'Sunil Kumar', type: 'Sick Leave', duration: '1 Day', initials: 'SK', tone: 'orange' },
];

export const pendingRequests = [
  { name: 'Amit Singh', type: 'Casual Leave', duration: '2 Days' },
  { name: 'Sunil Kumar', type: 'Sick Leave', duration: '1 Day' },
  { name: 'Mohd Faisal', type: 'Casual Leave', duration: '1 Day' },
];

export const calendarDays = [
  { day: 31, muted: true },
  ...Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    hasLeave: index + 1 === 9,
    holiday: index + 1 === 14,
    selected: index + 1 === 19,
  })),
  ...[1, 2, 3, 4].map((day) => ({ day, muted: true })),
];

export const dailyEvents = [
  { title: 'Tasin na ks kans today', meta: 'All day', action: null, tone: 'blue' },
  { title: 'Sunil kumar singh', meta: 'Sick Leave • 1 Day', action: 'Cancel Leave' },
  { title: 'Nagma Ansari', meta: '1st Half • 0.5', action: 'Cancel Leave', tone: 'blue' },
];

export const juneLeaves = [
  { employee: 'Sunil kumar singh', leave: '2.5', deduction: '0' },
  { employee: 'Samyama', leave: '3', deduction: '0' },
  { employee: 'neha savita', leave: '1', deduction: '0' },
  { employee: 'Nagma Ansari', leave: '1', deduction: '0' },
  { employee: 'Amit Singh', leave: '0', deduction: '0' },
  { employee: 'Md Aamir Raza', leave: '0', deduction: '0' },
  { employee: 'Mohd Faisal', leave: '0', deduction: '0' },
  { employee: 'Tasneem sababn', leave: '0', deduction: '0' },
];

export const juneDeductions = [
  { employee: 'Mohd Faisal', deduction: '0.5' },
  { employee: 'Neha Gupta', deduction: '0.5' },
  { employee: 'Amit Singh', deduction: '0' },
  { employee: 'Sunil Kumar Singh', deduction: '0' },
  { employee: 'Nagma Ansari', deduction: '0' },
  { employee: 'Samyama', deduction: '0' },
  { employee: 'Amit Shahid', deduction: '0' },
  { employee: 'Tasneem sababn', deduction: '0' },
];

const futureMonths = Array.from({ length: 6 }, () => ({ leave: '-', deduction: '-' }));

export const employeeLeaveSummary = [
  {
    employee: 'Amit Singh',
    months: [
      { leave: '2', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '0', deduction: '0' },
      { leave: '1', deduction: '0' },
      ...futureMonths,
    ],
    totalLeave: '6',
    totalDeduction: '0',
  },
  {
    employee: 'Sunil Kumar',
    months: [
      { leave: '0', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '0', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '0', deduction: '0' },
      { leave: '0', deduction: '0' },
      ...futureMonths,
    ],
    totalLeave: '2',
    totalDeduction: '0',
  },
  {
    employee: 'Mohd Faisal',
    months: [
      { leave: '2', deduction: '0.5' },
      { leave: '1', deduction: '0' },
      { leave: '0', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '1', deduction: '2.0' },
      ...futureMonths,
    ],
    totalLeave: '6',
    totalDeduction: '2.5',
  },
  {
    employee: 'Neha Gupta',
    months: [
      { leave: '1', deduction: '0' },
      { leave: '1', deduction: '0' },
      { leave: '1', deduction: '0.5' },
      { leave: '0', deduction: '0' },
      { leave: '0', deduction: '0' },
      { leave: '0', deduction: '0' },
      ...futureMonths,
    ],
    totalLeave: '3',
    totalDeduction: '0.5',
  },
];

export const filters = [
  { label: 'Year', options: ['Year 2026'] },
  { label: 'Month', options: ['All Months'] },
  { label: 'Department', options: ['All Departments'] },
];

export const tableIcons = {
  download: Download,
  file: Clipboard,
  search: Search,
  user: User,
};
