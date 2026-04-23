"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FormNotification from "@/components/ui/FormNotification";

const getNewsletterData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsletter`);
  const data = await res.json();
  return data;
};

const Newsletter = () => {
  const { data: newsletterData, isLoading } = useQuery({
    queryKey: ["newsletter"],
    queryFn: getNewsletterData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const validate = (val) => {
    if (!val.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(email);
    if (err) { setEmailError(err); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/forms/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed.");

      setEmail("");
      setEmailError("");
      setNotification({
        type: "success",
        title: "You're subscribed!",
        message: "Thank you for subscribing. Expect the latest updates and insights in your inbox.",
      });
    } catch (err) {
      setNotification({
        type: "error",
        title: "Subscription Failed",
        message: err.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { heading, description } = newsletterData?.data;

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

      <section className="bg-gray-100 py-16 px-4 sm:py-20 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-sequel-normal text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17171A] mb-6 tracking-tighter">
            {heading}
          </h2>

          <p className="text-[#53535C] text-base sm:text-lg font-lato font-normal mb-8 leading-relaxed px-4">
            {description[0]?.children[0]?.text}
          </p>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 ${
                    emailError ? "border-red-400 bg-red-50" : "border-gray-300"
                  }`}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500 text-left">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-white font-medium py-3 px-6 rounded-[20px] transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {loading ? "Subscribing..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
