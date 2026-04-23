"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

/**
 * FormNotification — centered popup overlay for form submission feedback.
 *
 * Props:
 *   type        "success" | "error"
 *   title       Heading text
 *   message     Body text
 *   onClose     Called when user closes or timer expires
 *   autoClose   ms before auto-dismiss (default 5000, 0 = disabled)
 */
const FormNotification = ({
  type = "success",
  title,
  message,
  onClose,
  autoClose = 5000,
}) => {
  useEffect(() => {
    if (!autoClose) return;
    const timer = setTimeout(onClose, autoClose);
    return () => clearTimeout(timer);
  }, [autoClose, onClose]);

  const isSuccess = type === "success";

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div
          className={`mb-5 rounded-full p-4 ${
            isSuccess ? "bg-[#E8F5EE]" : "bg-red-50"
          }`}
        >
          {isSuccess ? (
            <CheckCircle size={40} className="text-primary" strokeWidth={1.5} />
          ) : (
            <AlertCircle size={40} className="text-red-500" strokeWidth={1.5} />
          )}
        </div>

        {/* Heading */}
        <h3 className="font-sequel-normal text-2xl tracking-tight text-[#17171A] mb-3">
          {title ?? (isSuccess ? "Message Sent!" : "Something went wrong")}
        </h3>

        {/* Body */}
        <p className="font-lato text-[#53535C] text-base leading-relaxed mb-7">
          {message ??
            (isSuccess
              ? "Thank you for reaching out. We will get back to you as soon as possible."
              : "Please try again later or contact us directly.")}
        </p>

        {/* CTA button */}
        <button
          onClick={onClose}
          className={`w-full py-2.5 px-6 rounded-full font-lato font-medium text-base transition-colors duration-200 cursor-pointer ${
            isSuccess
              ? "bg-primary hover:bg-[#AD9056] text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {isSuccess ? "Done" : "Close"}
        </button>
      </div>
    </div>
  );
};

export default FormNotification;
