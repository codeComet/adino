'use client';

import React, { useState } from 'react';
import FormNotification from '@/components/ui/FormNotification';

const INITIAL = { name: "", phone: "", email: "", date: "", message: "" };

const validate = ({ name, email, message }) => {
  if (!name.trim()) return "Name is required.";
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Valid email address is required.";
  if (!message.trim()) return "Message is required.";
  return null;
};

const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const getFieldError = (field) => {
    if (field === "name" && !formData.name.trim()) return "Name is required.";
    if (field === "email") {
      if (!formData.email.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        return "Enter a valid email.";
    }
    if (field === "message" && !formData.message.trim())
      return "Message is required.";
    return null;
  };

  const handleBlur = (e) => {
    const err = getFieldError(e.target.name);
    if (err) setErrors((prev) => ({ ...prev, [e.target.name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate(formData);
    if (error) {
      const fieldErrors = {};
      if (!formData.name.trim()) fieldErrors.name = "Name is required.";
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        fieldErrors.email = "Valid email is required.";
      if (!formData.message.trim()) fieldErrors.message = "Message is required.";
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed.");

      setFormData(INITIAL);
      setErrors({});
      setNotification({
        type: "success",
        title: "Message Sent!",
        message: "Thank you for reaching out. We will get back to you as soon as possible.",
      });
    } catch (err) {
      setNotification({
        type: "error",
        title: "Submission Failed",
        message: err.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-300"
    }`;

  return (
    <>
      {notification && (
        <FormNotification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div>
        <div className="bg-white p-5 md:px-8.5 md:py-10.5 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name and Phone Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Jane Smith"
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456 789"
                  className={inputClass("phone")}
                />
              </div>
            </div>

            {/* Email and Date Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="test@gmail.com"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
                >
                  Select date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={inputClass("date")}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Write your idea"
                className={`${inputClass("message")} resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-[#AD9056] disabled:opacity-60 disabled:cursor-not-allowed text-white font-lato text-base leading-7 font-medium py-2.5 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
