"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

// Toast Component
function Toast({ message, type, onClose, index }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

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

  const styles = {
    success: "bg-emerald-500 text-white",
    info: "bg-[var(--color-accent)] text-white",
    warning: "bg-amber-500 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed right-4 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-sm ${styles[type]}`}
      style={{ top: `${80 + index * 80}px` }}
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
    </motion.div>
  );
}

// Toast Container Hook
function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <AnimatePresence>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          index={index}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </AnimatePresence>
  );

  return { showToast, ToastContainer };
}

// Progress Stepper Component
function ProgressStepper({ steps, currentStep }) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between relative">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2" />

        {/* Active Progress Bar */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[var(--color-accent)] to-emerald-400 rounded-full -translate-y-1/2"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white text-gray-400 border-2 border-gray-200"
                } ${isCurrent ? "ring-4 ring-[var(--color-accent)]/20 scale-110" : ""}`}
                initial={false}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isActive && index < currentStep ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <motion.span
                className={`mt-3 text-sm font-medium text-center max-w-[100px] transition-colors duration-300 ${
                  isActive ? "text-[var(--color-ink)]" : "text-gray-400"
                }`}
                initial={false}
                animate={isCurrent ? { y: [0, -3, 0] } : {}}
              >
                {step.label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Input Field Component with Tab Navigation
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
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-accent)] transition-colors">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full px-4 ${icon ? "pl-12" : ""} py-3.5 rounded-xl border-2 bg-white/80 backdrop-blur-sm
            transition-all duration-200 outline-none
            ${error
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-gray-200 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 hover:border-gray-300"
            }`}
        />
        <motion.div
          className="absolute right-3 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: value && !error ? 1 : 0, scale: value && !error ? 1 : 0 }}
        >
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </motion.p>
      )}
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
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/80 backdrop-blur-sm appearance-none
            transition-all duration-200 outline-none cursor-pointer
            ${error
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-gray-200 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 hover:border-gray-300"
            }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
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
  onTab,
  rows = 4,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      onTab?.();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--color-ink)]">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm
          transition-all duration-200 outline-none resize-none
          focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 hover:border-gray-300"
      />
    </div>
  );
}

// Main Admission Form Component
export default function AdmissionPage() {
  const { showToast, ToastContainer } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form refs for tab navigation
  const formRefs = useRef({});

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Academic Info
    grade: "",
    previousSchool: "",
    academicYear: "",

    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Parent Info
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "",

    // Additional
    message: "",
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: "personal", label: "Personal Info" },
    { id: "academic", label: "Academic" },
    { id: "address", label: "Address" },
    { id: "parent", label: "Parent Info" },
    { id: "review", label: "Review" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const focusNextField = (fieldName) => {
    const nextField = formRefs.current[fieldName];
    if (nextField) {
      nextField.focus();
      showToast(`Moved to ${fieldName.replace(/([A-Z])/g, " $1").toLowerCase()}`, "info");
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Please select gender";
    }

    if (step === 1) {
      if (!formData.grade) newErrors.grade = "Please select grade";
      if (!formData.academicYear) newErrors.academicYear = "Please select academic year";
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    }

    if (step === 3) {
      if (!formData.parentName.trim()) newErrors.parentName = "Parent/Guardian name is required";
      if (!formData.parentPhone.trim()) newErrors.parentPhone = "Parent phone is required";
      if (!formData.relationship) newErrors.relationship = "Please select relationship";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        showToast(`Step ${currentStep + 2} of ${steps.length}: ${steps[currentStep + 1].label}`, "success");
      }
    } else {
      showToast("Please fill in all required fields", "warning");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      showToast(`Back to ${steps[currentStep - 1].label}`, "info");
    }
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      showToast("Submitting your application...", "info");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Application submitted successfully!", "success");
    }
  };

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
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  const relationshipOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "guardian", label: "Guardian" },
    { value: "other", label: "Other" },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
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
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
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
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
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
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
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
                onTab={() => focusNextField("grade")}
                inputRef={(el) => (formRefs.current.gender = el)}
                required
                error={errors.gender}
              />
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <FormSelect
                label="Grade Applying For"
                name="grade"
                options={gradeOptions}
                value={formData.grade}
                onChange={handleChange}
                onTab={() => focusNextField("academicYear")}
                required
                error={errors.grade}
              />
              <FormSelect
                label="Academic Year"
                name="academicYear"
                options={yearOptions}
                value={formData.academicYear}
                onChange={handleChange}
                onTab={() => focusNextField("previousSchool")}
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
              onTab={() => focusNextField("address")}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <FormInput
              label="Street Address"
              name="address"
              placeholder="Enter your street address"
              value={formData.address}
              onChange={handleChange}
              onTab={() => focusNextField("city")}
              required
              error={errors.address}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
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
                onTab={() => focusNextField("parentName")}
                inputRef={(el) => (formRefs.current.zipCode = el)}
                required
                error={errors.zipCode}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                label="Parent/Guardian Name"
                name="parentName"
                placeholder="Enter parent/guardian name"
                value={formData.parentName}
                onChange={handleChange}
                onTab={() => focusNextField("relationship")}
                required
                error={errors.parentName}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <FormSelect
                label="Relationship"
                name="relationship"
                options={relationshipOptions}
                value={formData.relationship}
                onChange={handleChange}
                onTab={() => focusNextField("parentEmail")}
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
                onTab={() => focusNextField("parentPhone")}
                inputRef={(el) => (formRefs.current.parentEmail = el)}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <FormInput
                label="Parent Phone"
                name="parentPhone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.parentPhone}
                onChange={handleChange}
                onTab={() => focusNextField("message")}
                inputRef={(el) => (formRefs.current.parentPhone = el)}
                required
                error={errors.parentPhone}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
            </div>
            <FormTextarea
              label="Additional Message (Optional)"
              name="message"
              placeholder="Any additional information you'd like to share..."
              value={formData.message}
              onChange={handleChange}
              inputRef={(el) => (formRefs.current.message = el)}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-[var(--color-accent-soft)]/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                <div><span className="text-gray-500">Email:</span> <span className="font-medium">{formData.email}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                <div><span className="text-gray-500">Date of Birth:</span> <span className="font-medium">{formData.dateOfBirth}</span></div>
              </div>
            </div>

            <div className="bg-[var(--color-accent-soft)]/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                </svg>
                Academic Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Grade:</span> <span className="font-medium">{gradeOptions.find(g => g.value === formData.grade)?.label}</span></div>
                <div><span className="text-gray-500">Academic Year:</span> <span className="font-medium">{formData.academicYear}</span></div>
                <div className="col-span-2"><span className="text-gray-500">Previous School:</span> <span className="font-medium">{formData.previousSchool || "N/A"}</span></div>
              </div>
            </div>

            <div className="bg-[var(--color-accent-soft)]/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2"><span className="text-gray-500">Address:</span> <span className="font-medium">{formData.address}</span></div>
                <div><span className="text-gray-500">City:</span> <span className="font-medium">{formData.city}</span></div>
                <div><span className="text-gray-500">State:</span> <span className="font-medium">{formData.state}</span></div>
                <div><span className="text-gray-500">ZIP:</span> <span className="font-medium">{formData.zipCode}</span></div>
              </div>
            </div>

            <div className="bg-[var(--color-accent-soft)]/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Parent/Guardian Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium">{formData.parentName}</span></div>
                <div><span className="text-gray-500">Relationship:</span> <span className="font-medium capitalize">{formData.relationship}</span></div>
                <div><span className="text-gray-500">Email:</span> <span className="font-medium">{formData.parentEmail || "N/A"}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{formData.parentPhone}</span></div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-emerald-800">
                By submitting this application, you confirm that all information provided is accurate and complete.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <section className="section-spacing px-4 min-h-screen flex items-center">
        <ToastContainer />
        <div className="section-shell max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="display-title text-4xl font-bold text-[var(--color-ink)] mb-4">
              Application Submitted!
            </h1>
            <p className="text-lg text-[var(--color-muted)] mb-8">
              Thank you for applying to our school. Our admissions team will review your application and contact you within 3-5 business days.
            </p>
            <div className="bg-[var(--color-accent-soft)]/50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-[var(--color-muted)] mb-2">Application Reference</p>
              <p className="text-2xl font-bold text-[var(--color-ink)] font-mono">
                ADM-{Date.now().toString().slice(-8)}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button href="/" className="bg-[var(--color-accent)] text-white">
                Return to Home
              </Button>
              <Button href="/contact" className="bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)]">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing px-4">
      <ToastContainer />
      <div className="section-shell max-w-5xl">
        <Reveal>
          <SectionTitle
            eyebrow="Online Admission"
            title="Apply for Admission"
            description="Complete the form below to apply for admission. All fields marked with * are required."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="mt-10 bg-white/90 backdrop-blur-xl p-8 md:p-10">
            <ProgressStepper steps={steps} currentStep={currentStep} />

            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-[var(--color-ink)] hover:bg-gray-200 hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[var(--color-accent)] to-emerald-600 text-white rounded-xl font-medium
                    hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-[var(--color-accent)] to-emerald-600 text-white rounded-xl font-medium
                    hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  Next Step
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </Card>
        </Reveal>

        {/* Help Card */}
        <Reveal delay={0.15}>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card className="p-6 bg-white/70 hover:bg-white transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--color-ink)] mb-1">Need Help?</h3>
              <p className="text-sm text-[var(--color-muted)]">Call us at +1 (555) 123-4567</p>
            </Card>
            <Card className="p-6 bg-white/70 hover:bg-white transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--color-ink)] mb-1">Email Us</h3>
              <p className="text-sm text-[var(--color-muted)]">admissions@school.edu</p>
            </Card>
            <Card className="p-6 bg-white/70 hover:bg-white transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--color-ink)] mb-1">Office Hours</h3>
              <p className="text-sm text-[var(--color-muted)]">Mon - Fri: 8AM - 5PM</p>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
