"use client";

import { useState } from "react";
import Image from "next/image";
import fb from "../../../public/assets/img/fb-1.svg";
import link from "../../../public/assets/img/link.svg";
import x from "../../../public/assets/img/x.svg";
import ln from "../../../public/assets/img/ln-1.svg";
import FormNotification from "@/components/ui/FormNotification";

const BlogNewsletter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) { setEmailError("Email is required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

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
        message: "Thank you! You will receive the latest blog posts directly in your inbox.",
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

      <div className="w-full p-6 bg-white rounded-xl shadow border flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl md:leading-10 font-semibold mb-1">
            Subscribe to newsletter
          </h2>
          <p className="text-[#53535C] text-sm md:text-base md:leading-6">
            Subscribe to receive the latest blog posts to your inbox every week.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              placeholder="Enter your email"
              className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-700 ${
                emailError ? "border-red-400 bg-red-50" : ""
              }`}
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white cursor-pointer py-2 font-medium hover:bg-[#AE9056] disabled:opacity-60 disabled:cursor-not-allowed transition rounded-full"
          >
            {loading ? "Subscribing..." : "Submit"}
          </button>
        </form>
        <p className="text-xs md:text-sm md:leading-6 text-[#707079]">
          By subscribing you agree to with our{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
        <hr />
        <div>
          <span className="text-xs text-gray-500">SHARE THIS POST</span>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Copy link" className="rounded-full border hover:bg-gray-100">
              <Image src={link} alt="link" width={32} height={32} />
            </a>
            <a href="#" aria-label="Share on Facebook" className="rounded-full border hover:bg-gray-100">
              <Image src={fb} alt="fb" width={32} height={32} />
            </a>
            <a href="#" aria-label="Share on X" className="rounded-full border hover:bg-gray-100">
              <Image src={x} alt="x" width={32} height={32} />
            </a>
            <a href="#" aria-label="Share on LinkedIn" className="rounded-full border hover:bg-gray-100">
              <Image src={ln} alt="ln" width={32} height={32} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogNewsletter;
