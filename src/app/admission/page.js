"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

// Simple Toast without heavy animations
function Toast({ message, type, onClose, index }) {
  const bgColors = {
    success: "bg-emerald-500",
    info: "bg-[var(--color-accent)]",
    warning: "bg-amber-500",
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };

  return (
    <div
      className={`fixed right-4 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white transition-all duration-300 ${bgColors[type]}`}
      style={{ top: `${80 + index * 70}px`, animation: "slideIn 0.3s ease-out" }}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium pr-4">{message}</p>
      <button
        onClick={onClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Toast Hook
function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ToastContainer = () => (
    <>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          index={index}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );

  return { showToast, ToastContainer };
}

// Progress Stepper - CSS only
function ProgressStepper({ steps, currentStep }) {
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 rounded-full -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-[var(--color-accent)] to-emerald-400 rounded-full -translate-y-1/2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-white text-gray-400 border-2 border-gray-200"
                } ${isCurrent ? "ring-4 ring-[var(--color-accent)]/20 scale-110" : ""}`}
              >
                {isActive && index < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center max-w-[80px] transition-colors duration-300 ${
                  isActive ? "text-[var(--color-ink)]" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Input Field Component
function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onTab,
  required = false,
  error,
  icon,
  inputRef,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      onTab?.();
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full px-4 ${icon ? "pl-12" : ""} py-3 rounded-xl border-2 bg-white
            transition-all duration-200 outline-none
            ${error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
            }`}
        />
      </div>
      {error && <p className="text-sm text-red-500 flex items-center gap-1">{error}</p>}
    </div>
  );
}

// Select Component
function FormSelect({
  label,
  name,
  options,
  value,
  onChange,
  onTab,
  required = false,
  error,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      onTab?.();
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-3 rounded-xl border-2 bg-white appearance-none
            transition-all duration-200 outline-none cursor-pointer
            ${error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-[var(--color-accent)]"
            }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Textarea Component
function FormTextarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[var(--color-ink)]">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white
          transition-all duration-200 outline-none resize-none
          focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
      />
    </div>
  );
}

// Main Component
export default function AdmissionPage() {
  const { showToast, ToastContainer } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const formRefs = useRef({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    grade: "",
    previousSchool: "",
    academicYear: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const steps = useMemo(() => [
    { id: "personal", label: "Personal" },
    { id: "academic", label: "Academic" },
    { id: "address", label: "Address" },
    { id: "parent", label: "Parent" },
    { id: "review", label: "Review" },
  ], []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const focusNextField = useCallback((fieldName) => {
    const nextField = formRefs.current[fieldName];
    if (nextField) {
      nextField.focus();
      showToast(`Moved to ${fieldName.replace(/([A-Z])/g, " $1").toLowerCase()}`, "info");
    }
  }, [showToast]);

  const validateStep = useCallback((step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = "Required";
      if (!formData.lastName.trim()) newErrors.lastName = "Required";
      if (!formData.email.trim()) {
        newErrors.email = "Required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email";
      }
      if (!formData.phone.trim()) newErrors.phone = "Required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Required";
      if (!formData.gender) newErrors.gender = "Required";
    }

    if (step === 1) {
      if (!formData.grade) newErrors.grade = "Required";
      if (!formData.academicYear) newErrors.academicYear = "Required";
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Required";
      if (!formData.city.trim()) newErrors.city = "Required";
      if (!formData.state.trim()) newErrors.state = "Required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "Required";
    }

    if (step === 3) {
      if (!formData.parentName.trim()) newErrors.parentName = "Required";
      if (!formData.parentPhone.trim()) newErrors.parentPhone = "Required";
      if (!formData.relationship) newErrors.relationship = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        showToast(`Step ${currentStep + 2}: ${steps[currentStep + 1].label}`, "success");
      }
    } else {
      showToast("Please fill required fields", "warning");
    }
  }, [currentStep, steps, validateStep, showToast]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      showToast("Submitting...", "info");

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setReferenceNumber(`ADM-${Date.now().toString().slice(-8)}`);
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Application submitted!", "success");
    }
  }, [currentStep, validateStep, showToast]);

  const gradeOptions = [
    { value: "nursery", label: "Nursery" },
    { value: "kg", label: "Kindergarten" },
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7" },
    { value: "8", label: "Grade 8" },
    { value: "9", label: "Grade 9" },
    { value: "10", label: "Grade 10" },
    { value: "11", label: "Grade 11" },
    { value: "12", label: "Grade 12" },
  ];

  const yearOptions = [
    { value: "2025-26", label: "2025-26" },
    { value: "2026-27", label: "2026-27" },
    { value: "2027-28", label: "2027-28" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const relationshipOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "guardian", label: "Guardian" },
    { value: "other", label: "Other" },
  ];

  if (isSuccess) {
    return (
      <section className="section-spacing px-4 min-h-screen flex items-center">
        <ToastContainer />
        <div className="section-shell max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="display-title text-3xl font-bold text-[var(--color-ink)] mb-4">Application Submitted!</h1>
          <p className="text-lg text-[var(--color-muted)] mb-8">
            Thank you for applying. Our admissions team will contact you within 3-5 business days.
          </p>
          <div className="bg-[var(--color-accent-soft)]/50 rounded-xl p-6 mb-8">
            <p className="text-sm text-[var(--color-muted)]">Reference Number</p>
            <p className="text-xl font-bold text-[var(--color-ink)] font-mono">{referenceNumber}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button href="/" className="bg-[var(--color-accent)] text-white">Return to Home</Button>
          </div>
        </div>
      </section>
    );
  }

  const renderStepContent = () => {
    const containerClass = "space-y-5 animate-fadeIn";

    switch (currentStep) {
      case 0:
        return (
          <div className={containerClass}>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                onTab={() => focusNextField("lastName")}
                required
                error={errors.firstName}
              />
              <FormInput
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                onTab={() => focusNextField("email")}
                inputRef={(el) => (formRefs.current.lastName = el)}
                required
                error={errors.lastName}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChange}
                onTab={() => focusNextField("phone")}
                inputRef={(el) => (formRefs.current.email = el)}
                required
                error={errors.email}
              />
              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                onTab={() => focusNextField("dateOfBirth")}
                inputRef={(el) => (formRefs.current.phone = el)}
                required
                error={errors.phone}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onTab={() => focusNextField("gender")}
                inputRef={(el) => (formRefs.current.dateOfBirth = el)}
                required
                error={errors.dateOfBirth}
              />
              <FormSelect
                label="Gender"
                name="gender"
                options={genderOptions}
                value={formData.gender}
                onChange={handleChange}
                required
                error={errors.gender}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className={containerClass}>
            <div className="grid md:grid-cols-2 gap-5">
              <FormSelect
                label="Grade Applying For"
                name="grade"
                options={gradeOptions}
                value={formData.grade}
                onChange={handleChange}
                required
                error={errors.grade}
              />
              <FormSelect
                label="Academic Year"
                name="academicYear"
                options={yearOptions}
                value={formData.academicYear}
                onChange={handleChange}
                required
                error={errors.academicYear}
              />
            </div>
            <FormInput
              label="Previous School (if any)"
              name="previousSchool"
              placeholder="Enter previous school name"
              value={formData.previousSchool}
              onChange={handleChange}
            />
          </div>
        );

      case 2:
        return (
          <div className={containerClass}>
            <FormInput
              label="Street Address"
              name="address"
              placeholder="Enter your street address"
              value={formData.address}
              onChange={handleChange}
              onTab={() => focusNextField("city")}
              required
              error={errors.address}
            />
            <div className="grid md:grid-cols-3 gap-5">
              <FormInput
                label="City"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                onTab={() => focusNextField("state")}
                inputRef={(el) => (formRefs.current.city = el)}
                required
                error={errors.city}
              />
              <FormInput
                label="State"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                onTab={() => focusNextField("zipCode")}
                inputRef={(el) => (formRefs.current.state = el)}
                required
                error={errors.state}
              />
              <FormInput
                label="ZIP Code"
                name="zipCode"
                placeholder="00000"
                value={formData.zipCode}
                onChange={handleChange}
                inputRef={(el) => (formRefs.current.zipCode = el)}
                required
                error={errors.zipCode}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={containerClass}>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                label="Parent/Guardian Name"
                name="parentName"
                placeholder="Enter parent/guardian name"
                value={formData.parentName}
                onChange={handleChange}
                required
                error={errors.parentName}
              />
              <FormSelect
                label="Relationship"
                name="relationship"
                options={relationshipOptions}
                value={formData.relationship}
                onChange={handleChange}
                required
                error={errors.relationship}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                label="Parent Email"
                name="parentEmail"
                type="email"
                placeholder="parent@example.com"
                value={formData.parentEmail}
                onChange={handleChange}
              />
              <FormInput
                label="Parent Phone"
                name="parentPhone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.parentPhone}
                onChange={handleChange}
                required
                error={errors.parentPhone}
              />
            </div>
            <FormTextarea
              label="Additional Message (Optional)"
              name="message"
              placeholder="Any additional information..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {[
              {
                title: "Personal Information",
                icon: "👤",
                data: [
                  { label: "Name", value: `${formData.firstName} ${formData.lastName}` },
                  { label: "Email", value: formData.email },
                  { label: "Phone", value: formData.phone },
                  { label: "Date of Birth", value: formData.dateOfBirth },
                ],
              },
              {
                title: "Academic Details",
                icon: "🎓",
                data: [
                  { label: "Grade", value: gradeOptions.find(g => g.value === formData.grade)?.label },
                  { label: "Academic Year", value: formData.academicYear },
                  { label: "Previous School", value: formData.previousSchool || "N/A" },
                ],
              },
              {
                title: "Address",
                icon: "📍",
                data: [
                  { label: "Address", value: formData.address },
                  { label: "City", value: formData.city },
                  { label: "State", value: formData.state },
                  { label: "ZIP", value: formData.zipCode },
                ],
              },
              {
                title: "Parent Information",
                icon: "👨‍👩‍👧",
                data: [
                  { label: "Name", value: formData.parentName },
                  { label: "Relationship", value: formData.relationship },
                  { label: "Email", value: formData.parentEmail || "N/A" },
                  { label: "Phone", value: formData.parentPhone },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                  <span>{section.icon}</span> {section.title}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {section.data.map((item) => (
                    <div key={item.label}>
                      <span className="text-gray-500">{item.label}: </span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-emerald-800">I confirm all information is accurate.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="section-spacing px-4">
      <ToastContainer />
      <div className="section-shell max-w-4xl">
        <Reveal>
          <SectionTitle
            eyebrow="Online Admission"
            title="Apply for Admission"
            description="Complete the form below. Fields marked with * are required."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="mt-8 bg-white p-6 md:p-8">
            <ProgressStepper steps={steps} currentStep={currentStep} />

            <div className="min-h-[300px]">{renderStepContent()}</div>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-[var(--color-ink)] hover:bg-gray-200"
                }`}
              >
                Previous
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[var(--color-accent)] text-white rounded-xl font-medium
                    hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[var(--color-accent)] text-white rounded-xl font-medium
                    hover:bg-emerald-700 transition-colors"
                >
                  Next Step
                </button>
              )}
            </div>
          </Card>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </section>
  );
}
