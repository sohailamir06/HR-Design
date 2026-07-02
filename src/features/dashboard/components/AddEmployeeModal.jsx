import { useEffect, useState } from 'react';
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  Phone,
  Sparkles,
  UserRound,
  VenusAndMars,
  X,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/cn.js';

const genders = ['Male', 'Female', 'Other'];
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const departments = ['Engineering', 'People Ops', 'Design', 'Finance', 'Operations', 'Support', 'Administration'];
const designations = ['Software Engineer', 'HR Executive', 'UI Designer', 'Accountant', 'Team Lead', 'Operations Manager'];
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  maritalStatus: '',
  department: '',
  designation: '',
  dob: '',
  doj: '',
};

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
          'focus-ring flex w-full items-center justify-between rounded-2xl border bg-white/90 px-4 py-3 text-left text-sm shadow-sm transition',
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
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 rounded-[24px] border border-line/80 bg-white p-4 shadow-[0_24px_60px_rgba(26,53,86,0.18)]">
          <div className="mb-4 flex items-center justify-between">
            <button
              className="focus-ring rounded-full border border-line/80 p-2 text-muted transition hover:border-sky-200 hover:text-ink"
              onClick={() => onMonthChange(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}
              type="button"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-sm font-semibold text-ink">{currentMonthLabel}</p>
            <button
              className="focus-ring rounded-full border border-line/80 p-2 text-muted transition hover:border-sky-200 hover:text-ink"
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
                    isSelected && 'bg-sky-600 text-white shadow-sm shadow-sky-200/70',
                    !isSelected && !isDisabled && 'bg-slate-50 text-ink hover:bg-sky-50',
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

function InputField({ error, icon: Icon, label, onChange, placeholder, type = 'text', value, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" /> : null}
        <input
          className={cn(
            'focus-ring w-full rounded-2xl border bg-white/90 py-3 text-sm text-ink shadow-sm transition placeholder:text-muted/70',
            Icon ? 'pl-11 pr-4' : 'px-4',
            error ? 'border-accent-rose' : 'border-line/80 hover:border-sky-200',
          )}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          {...props}
        />
      </div>
      {error ? <span className="mt-2 block text-xs font-medium text-accent-rose">{error}</span> : null}
    </label>
  );
}

function SelectField({ error, icon: Icon, label, onChange, options, placeholder, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" /> : null}
        <select
          className={cn(
            'focus-ring w-full appearance-none rounded-2xl border bg-white/90 py-3 text-sm text-ink shadow-sm transition',
            Icon ? 'pl-11 pr-10' : 'px-4 pr-10',
            error ? 'border-accent-rose' : 'border-line/80 hover:border-sky-200',
          )}
          onChange={onChange}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
      {error ? <span className="mt-2 block text-xs font-medium text-accent-rose">{error}</span> : null}
    </label>
  );
}

export function AddEmployeeModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(getMonthStart());

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setErrors({});
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

  if (!isOpen) {
    return null;
  }

  const setFieldValue = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const openCalendar = (field) => {
    setActiveCalendar(field);
    setCalendarMonth(getMonthStart(form[field]));
  };

  const validateForm = () => {
    const nextErrors = {};
    const numericPhone = form.phone.replace(/\D/g, '');

    if (!form.firstName.trim()) {
      nextErrors.firstName = 'First name is required.';
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!numericPhone) {
      nextErrors.phone = 'Phone number is required.';
    } else if (numericPhone.length !== 10) {
      nextErrors.phone = 'Phone number must contain 10 digits.';
    }

    if (!form.gender) {
      nextErrors.gender = 'Select a gender.';
    }

    if (!form.maritalStatus) {
      nextErrors.maritalStatus = 'Select marital status.';
    }

    if (!form.department) {
      nextErrors.department = 'Select a department.';
    }

    if (!form.designation) {
      nextErrors.designation = 'Select a designation.';
    }

    if (!form.dob) {
      nextErrors.dob = 'Select date of birth.';
    }

    if (!form.doj) {
      nextErrors.doj = 'Select date of joining.';
    }

    if (form.dob && form.doj && form.doj < form.dob) {
      nextErrors.doj = 'Date of joining cannot be before date of birth.';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-[#09111f]/45 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <section
        aria-labelledby="add-employee-modal-title"
        aria-modal="true"
        className="modal-enter relative z-10 max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.98))] shadow-[0_36px_90px_rgba(31,75,124,0.24)]"
        role="dialog"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,_rgba(22,135,184,0.18),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(14,167,132,0.14),_transparent_44%)]" />

        <div className="relative flex items-start justify-between gap-4 border-b border-[#d9e7f3] px-5 py-5 sm:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent-sky shadow-sm">
              <Sparkles className="size-3.5" />
              Employee Workspace
            </div>
            <h2 className="text-[1.9rem] font-bold tracking-tight text-ink" id="add-employee-modal-title">
              Add New Employee
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              Capture employee profile details with polished form controls, premium spacing, and HRMS-grade visual hierarchy.
            </p>
          </div>

          <button
            aria-label="Close add employee modal"
            className="focus-ring rounded-full border border-[#d9e7f3] bg-white/90 p-2 text-muted transition hover:border-sky-200 hover:text-ink"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <form className="grid gap-6 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7 xl:grid-cols-[1.2fr_0.8fr]" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:gap-5">
              <InputField
                error={errors.firstName}
                icon={UserRound}
                label="First Name"
                onChange={(event) => setFieldValue('firstName', event.target.value)}
                placeholder="Enter first name"
                value={form.firstName}
              />
              <InputField
                error={errors.lastName}
                icon={UserRound}
                label="Last Name"
                onChange={(event) => setFieldValue('lastName', event.target.value)}
                placeholder="Enter last name"
                value={form.lastName}
              />
              <InputField
                error={errors.email}
                icon={Mail}
                label="Email"
                onChange={(event) => setFieldValue('email', event.target.value)}
                placeholder="name@company.com"
                type="email"
                value={form.email}
              />
              <InputField
                error={errors.phone}
                icon={Phone}
                inputMode="numeric"
                label="Phone"
                maxLength={10}
                onChange={(event) => setFieldValue('phone', event.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit mobile number"
                value={form.phone}
              />
              <SelectField
                error={errors.gender}
                icon={VenusAndMars}
                label="Gender"
                onChange={(event) => setFieldValue('gender', event.target.value)}
                options={genders}
                placeholder="Select gender"
                value={form.gender}
              />
              <SelectField
                error={errors.maritalStatus}
                icon={Heart}
                label="Marital Status"
                onChange={(event) => setFieldValue('maritalStatus', event.target.value)}
                options={maritalStatuses}
                placeholder="Select marital status"
                value={form.maritalStatus}
              />
              <SelectField
                error={errors.department}
                icon={Building2}
                label="Department"
                onChange={(event) => setFieldValue('department', event.target.value)}
                options={departments}
                placeholder="Select department"
                value={form.department}
              />
              <SelectField
                error={errors.designation}
                icon={BriefcaseBusiness}
                label="Designation"
                onChange={(event) => setFieldValue('designation', event.target.value)}
                options={designations}
                placeholder="Select designation"
                value={form.designation}
              />
              <CalendarField
                error={errors.dob}
                isOpen={activeCalendar === 'dob'}
                label="DOB"
                maxDate={form.doj || ''}
                monthDate={calendarMonth}
                onMonthChange={setCalendarMonth}
                onOpen={() => openCalendar('dob')}
                onSelect={(value) => {
                  setFieldValue('dob', value);
                  setActiveCalendar(null);
                }}
                value={form.dob}
              />
              <CalendarField
                error={errors.doj}
                isOpen={activeCalendar === 'doj'}
                label="DOJ"
                minDate={form.dob || ''}
                monthDate={calendarMonth}
                onMonthChange={setCalendarMonth}
                onOpen={() => openCalendar('doj')}
                onSelect={(value) => {
                  setFieldValue('doj', value);
                  setActiveCalendar(null);
                }}
                value={form.doj}
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#d9e7f3] pt-5 sm:flex-row sm:justify-end">
              <Button className="rounded-xl px-6 py-3 text-muted hover:bg-slate-100 hover:text-ink" onClick={onClose} type="button" variant="ghost">
                Cancel
              </Button>
              <Button className="rounded-xl border-transparent bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-3 text-white shadow-[0_18px_35px_rgba(22,135,184,0.28)] hover:from-sky-700 hover:to-sky-700" type="submit" variant="primary">
                Save Employee
              </Button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-[#d9e7f3] bg-white/88 p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-accent-sky">
                  <UserRound className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">Profile Preview</h3>
                  <p className="text-sm text-muted">A clean overview of the employee record being created.</p>
                </div>
              </div>

              <div className="rounded-[24px] border border-sky-100 bg-[linear-gradient(180deg,rgba(240,249,255,0.9),rgba(255,255,255,0.96))] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-sky">Candidate</p>
                <p className="mt-3 text-2xl font-bold text-ink">
                  {[form.firstName, form.lastName].filter(Boolean).join(' ') || 'New Employee'}
                </p>
                <p className="mt-2 text-sm text-muted">{form.designation || 'Designation will appear here'}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Department', value: form.department || 'Not set' },
                    { label: 'Gender', value: form.gender || 'Not set' },
                    { label: 'Email', value: form.email || 'Not set' },
                    { label: 'DOJ', value: form.doj ? formatDisplayDate(form.doj) : 'Not set' },
                  ].map(({ label, value }) => (
                    <div className="rounded-2xl border border-white/80 bg-white/90 p-3" key={label}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
                      <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-[#d9e7f3] bg-slate-50/80 p-4 text-sm leading-6 text-muted">
                Keep fields crisp and complete to streamline onboarding, payroll mapping, and department allocation from the first save.
              </div>
            </div>
          </aside>
        </form>
      </section>
    </div>
  );
}
