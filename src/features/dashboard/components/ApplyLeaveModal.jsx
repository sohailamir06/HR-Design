import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Search,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/cn.js';
import {
  employeeLeaveSummary,
  juneDeductions,
  juneLeaves,
  leaveToday,
  pendingRequests,
} from '../../../data/dashboard.js';

const leaveTypes = ['Casual Leave', 'Sick Leave', 'Floating Leave', 'Extra Work', 'Work From Home', 'Comp Off'];
const dayTypes = ['Full Day', 'Half Day'];
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const employeeConfigurations = {
  'Amit Singh': { casual: 6, sick: 3, floating: 1, compOff: 1, department: 'Engineering' },
  'Sunil Kumar': { casual: 4, sick: 5, floating: 1, compOff: 0, department: 'Operations' },
  'Sunil Kumar Singh': { casual: 4, sick: 5, floating: 1, compOff: 0, department: 'Operations' },
  'Mohd Faisal': { casual: 5, sick: 2, floating: 2, compOff: 2, department: 'Accounts' },
  'Neha Gupta': { casual: 7, sick: 4, floating: 1, compOff: 0, department: 'People Ops' },
  'Samyama': { casual: 5, sick: 3, floating: 2, compOff: 1, department: 'Design' },
  'Nagma Ansari': { casual: 4, sick: 2, floating: 1, compOff: 1, department: 'Support' },
  'Md Aamir Raza': { casual: 6, sick: 2, floating: 2, compOff: 0, department: 'Engineering' },
  'Tasneem sababn': { casual: 5, sick: 4, floating: 1, compOff: 0, department: 'Admin' },
  'neha savita': { casual: 4, sick: 3, floating: 1, compOff: 0, department: 'Recruitment' },
};

function buildEmployeeOptions() {
  const names = new Set([
    ...leaveToday.map(({ name }) => name),
    ...pendingRequests.map(({ name }) => name),
    ...juneLeaves.map(({ employee }) => employee),
    ...juneDeductions.map(({ employee }) => employee),
    ...employeeLeaveSummary.map(({ employee }) => employee),
  ]);

  return [...names]
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({
      name,
      config: employeeConfigurations[name] ?? {
        casual: 5,
        sick: 3,
        floating: 1,
        compOff: 0,
        department: 'General',
      },
    }));
}

function getMonthStart(dateString) {
  if (!dateString) {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  const parsedDate = new Date(dateString);
  return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString) {
  if (!dateString) {
    return '';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

function CalendarField({
  error,
  isOpen,
  label,
  maxDate,
  minDate,
  monthDate,
  onMonthChange,
  onOpen,
  onSelect,
  value,
}) {
  const currentMonthLabel = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const firstDayIndex = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay();
  const totalDays = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const leadingDays = Array.from({ length: firstDayIndex }, (_, index) => ({ key: `empty-${index}` }));
  const selectedIso = value || '';

  return (
    <div className="relative">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <button
        aria-expanded={isOpen}
        className={cn(
          'focus-ring flex w-full items-center justify-between rounded-2xl border bg-white/85 px-4 py-3 text-left text-sm shadow-sm transition',
          error ? 'border-accent-rose' : 'border-line/80 hover:border-brand-200',
        )}
        onClick={onOpen}
        type="button"
      >
        <span className="flex items-center gap-3">
          <CalendarDays className="size-4 text-muted" />
          <span className={value ? 'text-ink' : 'text-muted'}>{value ? formatDisplayDate(value) : `Select ${label.toLowerCase()}`}</span>
        </span>
        <ChevronDown className={cn('size-4 text-muted transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 rounded-[24px] border border-line/80 bg-white p-4 shadow-[0_24px_60px_rgba(73,23,104,0.18)]">
          <div className="mb-4 flex items-center justify-between">
            <button
              className="focus-ring rounded-full border border-line/80 p-2 text-muted transition hover:border-brand-200 hover:text-ink"
              onClick={() => onMonthChange(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}
              type="button"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-sm font-semibold text-ink">{currentMonthLabel}</p>
            <button
              className="focus-ring rounded-full border border-line/80 p-2 text-muted transition hover:border-brand-200 hover:text-ink"
              onClick={() => onMonthChange(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}
              type="button"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {leadingDays.map(({ key }) => (
              <span className="h-10" key={key} />
            ))}

            {Array.from({ length: totalDays }, (_, index) => {
              const dayNumber = index + 1;
              const dayDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), dayNumber);
              const isoDate = formatIsoDate(dayDate);
              const isDisabled = (minDate && isoDate < minDate) || (maxDate && isoDate > maxDate);
              const isSelected = isoDate === selectedIso;

              return (
                <button
                  className={cn(
                    'focus-ring h-10 rounded-xl text-sm font-medium transition',
                    isSelected && 'bg-brand-600 text-white shadow-sm shadow-brand-200/70',
                    !isSelected && !isDisabled && 'bg-surface/70 text-ink hover:bg-brand-50',
                    isDisabled && 'cursor-not-allowed bg-slate-100 text-slate-300',
                  )}
                  disabled={isDisabled}
                  key={isoDate}
                  onClick={() => onSelect(isoDate)}
                  type="button"
                >
                  {dayNumber}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {error ? <span className="mt-2 block text-xs font-medium text-accent-rose">{error}</span> : null}
    </div>
  );
}

const employeeOptions = buildEmployeeOptions();

const initialForm = {
  employee: '',
  leaveType: '',
  startDate: '',
  startDayType: '',
  endDate: '',
  endDayType: '',
  phoneNumber: '',
  justification: '',
};

export function ApplyLeaveModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [employeeQuery, setEmployeeQuery] = useState('');
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(getMonthStart());

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setErrors({});
      setEmployeeQuery('');
      setIsEmployeeListOpen(false);
      setActiveCalendar(null);
      setCalendarMonth(getMonthStart());
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (activeCalendar) {
          setActiveCalendar(null);
          return;
        }

        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCalendar, isOpen, onClose]);

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = employeeQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return employeeOptions;
    }

    return employeeOptions.filter(({ name }) => name.toLowerCase().includes(normalizedQuery));
  }, [employeeQuery]);

  const selectedEmployee = useMemo(
    () => employeeOptions.find(({ name }) => name === form.employee) ?? null,
    [form.employee],
  );

  if (!isOpen) {
    return null;
  }

  const setFieldValue = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleEmployeeSelect = (employeeName) => {
    setFieldValue('employee', employeeName);
    setEmployeeQuery(employeeName);
    setIsEmployeeListOpen(false);
  };

  const openCalendar = (field) => {
    setActiveCalendar(field);
    setCalendarMonth(getMonthStart(form[field]));
    setIsEmployeeListOpen(false);
  };

  const handleDateSelect = (field, value) => {
    if (field === 'startDate') {
      const nextForm = {
        ...form,
        startDate: value,
        startDayType: form.startDayType || 'Full Day',
      };

      if (form.endDate && form.endDate < value) {
        nextForm.endDate = '';
        nextForm.endDayType = '';
      }

      setForm(nextForm);
      setErrors((current) => ({ ...current, startDate: undefined, endDate: undefined }));
    } else {
      setForm((current) => ({
        ...current,
        endDate: value,
        endDayType: current.endDayType || 'Full Day',
      }));
      setErrors((current) => ({ ...current, endDate: undefined }));
    }

    setActiveCalendar(null);
  };

  const validateForm = () => {
    const nextErrors = {};
    const numericPhone = form.phoneNumber.replace(/\D/g, '');

    if (!form.employee) {
      nextErrors.employee = 'Select an employee to continue.';
    }

    if (!form.leaveType) {
      nextErrors.leaveType = 'Choose a leave type.';
    }

    if (!form.startDate) {
      nextErrors.startDate = 'Select a start date.';
    }

    if (!form.endDate) {
      nextErrors.endDate = 'Select an end date.';
    }

    if (form.startDate && !form.startDayType) {
      nextErrors.startDayType = 'Choose half day or full day.';
    }

    if (form.endDate && !form.endDayType) {
      nextErrors.endDayType = 'Choose half day or full day.';
    }

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      nextErrors.endDate = 'End date must be on or after the start date.';
    }

    if (!numericPhone) {
      nextErrors.phoneNumber = 'Enter a phone number.';
    } else if (numericPhone.length !== 10) {
      nextErrors.phoneNumber = 'Phone number must contain 10 digits.';
    }

    if (!form.justification.trim()) {
      nextErrors.justification = 'Add a brief justification.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onClose();
  };

  const employeeConfig = selectedEmployee?.config;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-[#16071f]/45 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <section
        aria-modal="true"
        aria-labelledby="apply-leave-modal-title"
        className="modal-enter relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,240,255,0.98))] shadow-[0_32px_80px_rgba(93,35,127,0.22)]"
        role="dialog"
      >
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,_rgba(182,77,224,0.20),_transparent_58%),radial-gradient(circle_at_top_right,_rgba(14,167,132,0.18),_transparent_42%)]" />

        <div className="relative flex items-start justify-between gap-4 border-b border-line/70 px-5 py-5 sm:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 shadow-sm">
              <Sparkles className="size-3.5" />
              Leave Workspace
            </div>
            <h2 className="text-2xl font-bold text-ink" id="apply-leave-modal-title">
              Apply Leave
            </h2>
            <p className="mt-1 text-sm text-muted">Create a leave request with employee details, dates, contact number, and justification.</p>
          </div>

          <button
            aria-label="Close apply leave modal"
            className="focus-ring rounded-full border border-line/80 bg-white/80 p-2 text-muted transition hover:border-brand-200 hover:text-ink"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <form className="grid gap-6 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7 lg:grid-cols-[1.15fr_0.85fr]" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Employee</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  aria-expanded={isEmployeeListOpen}
                  aria-invalid={Boolean(errors.employee)}
                  className={cn(
                    'focus-ring w-full rounded-2xl border bg-white/85 py-3 pl-11 pr-11 text-sm text-ink shadow-sm transition placeholder:text-muted/70',
                    errors.employee ? 'border-accent-rose' : 'border-line/80 hover:border-brand-200',
                  )}
                  onChange={(event) => {
                    setEmployeeQuery(event.target.value);
                    setFieldValue('employee', '');
                    setIsEmployeeListOpen(true);
                    setActiveCalendar(null);
                  }}
                  onFocus={() => setIsEmployeeListOpen(true)}
                  placeholder="Search employee by name"
                  type="text"
                  value={employeeQuery}
                />
                <ChevronDown
                  className={cn(
                    'pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted transition-transform',
                    isEmployeeListOpen && 'rotate-180',
                  )}
                />

                {isEmployeeListOpen ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-2xl border border-line/80 bg-white shadow-[0_20px_50px_rgba(73,23,104,0.14)]">
                    <div className="max-h-60 overflow-y-auto p-2">
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(({ name, config }) => (
                          <button
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-brand-50"
                            key={name}
                            onClick={() => handleEmployeeSelect(name)}
                            type="button"
                          >
                            <span>
                              <span className="block text-sm font-semibold text-ink">{name}</span>
                              <span className="block text-xs text-muted">{config.department}</span>
                            </span>
                            {form.employee === name ? <Check className="size-4 text-brand-600" /> : null}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-5 text-sm text-muted">No employees match this search.</div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              {errors.employee ? <span className="mt-2 block text-xs font-medium text-accent-rose">{errors.employee}</span> : null}
            </label>

            <div className={cn('grid gap-5 transition-all duration-300 md:grid-cols-2', !selectedEmployee && 'md:grid-cols-1')}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">Leave Type</span>
                <div className="relative">
                  <select
                    aria-invalid={Boolean(errors.leaveType)}
                    className={cn(
                      'focus-ring w-full appearance-none rounded-2xl border bg-white/85 px-4 py-3 pr-10 text-sm text-ink shadow-sm transition',
                      errors.leaveType ? 'border-accent-rose' : 'border-line/80 hover:border-brand-200',
                    )}
                    onChange={(event) => setFieldValue('leaveType', event.target.value)}
                    value={form.leaveType}
                  >
                    <option value="">Select leave type</option>
                    {leaveTypes.map((leaveType) => (
                      <option key={leaveType} value={leaveType}>
                        {leaveType}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                </div>
                {errors.leaveType ? <span className="mt-2 block text-xs font-medium text-accent-rose">{errors.leaveType}</span> : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">Phone Number</span>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                  <input
                    aria-invalid={Boolean(errors.phoneNumber)}
                    className={cn(
                      'focus-ring w-full rounded-2xl border bg-white/85 py-3 pl-11 pr-4 text-sm text-ink shadow-sm transition placeholder:text-muted/70',
                      errors.phoneNumber ? 'border-accent-rose' : 'border-line/80 hover:border-brand-200',
                    )}
                    inputMode="numeric"
                    maxLength={10}
                    onChange={(event) => setFieldValue('phoneNumber', event.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit phone number"
                    type="text"
                    value={form.phoneNumber}
                  />
                </div>
                {errors.phoneNumber ? <span className="mt-2 block text-xs font-medium text-accent-rose">{errors.phoneNumber}</span> : null}
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-4">
                <CalendarField
                  error={errors.startDate}
                  isOpen={activeCalendar === 'startDate'}
                  label="Start Date"
                  maxDate={form.endDate || ''}
                  monthDate={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  onOpen={() => openCalendar('startDate')}
                  onSelect={(value) => handleDateSelect('startDate', value)}
                  value={form.startDate}
                />

                {form.startDate ? (
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink">Start Day Type</span>
                    <div className="relative">
                      <select
                        aria-invalid={Boolean(errors.startDayType)}
                        className={cn(
                          'focus-ring w-full appearance-none rounded-2xl border bg-white/85 px-4 py-3 pr-10 text-sm text-ink shadow-sm transition',
                          errors.startDayType ? 'border-accent-rose' : 'border-line/80 hover:border-brand-200',
                        )}
                        onChange={(event) => setFieldValue('startDayType', event.target.value)}
                        value={form.startDayType}
                      >
                        <option value="">Select day type</option>
                        {dayTypes.map((dayType) => (
                          <option key={dayType} value={dayType}>
                            {dayType}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                    </div>
                    {errors.startDayType ? <span className="mt-2 block text-xs font-medium text-accent-rose">{errors.startDayType}</span> : null}
                  </label>
                ) : null}
              </div>

              <div className="space-y-4">
                <CalendarField
                  error={errors.endDate}
                  isOpen={activeCalendar === 'endDate'}
                  label="End Date"
                  minDate={form.startDate || ''}
                  monthDate={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  onOpen={() => openCalendar('endDate')}
                  onSelect={(value) => handleDateSelect('endDate', value)}
                  value={form.endDate}
                />

                {form.endDate ? (
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink">End Day Type</span>
                    <div className="relative">
                      <select
                        aria-invalid={Boolean(errors.endDayType)}
                        className={cn(
                          'focus-ring w-full appearance-none rounded-2xl border bg-white/85 px-4 py-3 pr-10 text-sm text-ink shadow-sm transition',
                          errors.endDayType ? 'border-accent-rose' : 'border-line/80 hover:border-brand-200',
                        )}
                        onChange={(event) => setFieldValue('endDayType', event.target.value)}
                        value={form.endDayType}
                      >
                        <option value="">Select day type</option>
                        {dayTypes.map((dayType) => (
                          <option key={dayType} value={dayType}>
                            {dayType}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                    </div>
                    {errors.endDayType ? <span className="mt-2 block text-xs font-medium text-accent-rose">{errors.endDayType}</span> : null}
                  </label>
                ) : null}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Justification</span>
              <textarea
                aria-invalid={Boolean(errors.justification)}
                className={cn(
                  'focus-ring min-h-36 w-full rounded-[22px] border bg-white/85 px-4 py-3 text-sm text-ink shadow-sm transition placeholder:text-muted/70',
                  errors.justification ? 'border-accent-rose' : 'border-line/80 hover:border-brand-200',
                )}
                onChange={(event) => setFieldValue('justification', event.target.value)}
                placeholder="Describe the reason, coverage plan, or any supporting context."
                value={form.justification}
              />
              {errors.justification ? (
                <span className="mt-2 block text-xs font-medium text-accent-rose">{errors.justification}</span>
              ) : null}
            </label>

            <div className="flex flex-col-reverse gap-3 border-t border-line/70 pt-5 sm:flex-row sm:justify-end">
              <Button className="rounded-xl px-6 py-3" onClick={onClose} type="button" variant="ghost">
                Cancel
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 text-white shadow-lg shadow-brand-200/70 hover:from-brand-700 hover:to-brand-700" type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-line/70 bg-white/80 p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <UserRound className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">Leave Configuration</h3>
                  <p className="text-sm text-muted">
                    {selectedEmployee ? 'Current balances and employee metadata.' : 'Select an employee to preview current leave availability.'}
                  </p>
                </div>
              </div>

              {selectedEmployee && employeeConfig ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                    <p className="text-lg font-bold text-ink">{selectedEmployee.name}</p>
                    <p className="mt-1 text-sm text-muted">{employeeConfig.department}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Casual', value: employeeConfig.casual },
                      { label: 'Sick', value: employeeConfig.sick },
                      { label: 'Floating', value: employeeConfig.floating },
                      { label: 'Comp Off', value: employeeConfig.compOff },
                    ].map(({ label, value }) => (
                      <div className="rounded-2xl border border-line/70 bg-[#fffdfd] p-4" key={label}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
                        <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-dashed border-line bg-surface/60 p-4 text-sm text-muted">
                    The custom calendar keeps date selection inside the modal, while day-type and phone validation are checked before submit.
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-line bg-surface/60 p-5 text-sm text-muted">
                  Employee-specific leave details will appear here once a selection is made.
                </div>
              )}
            </div>
          </aside>
        </form>
      </section>
    </div>
  );
}
