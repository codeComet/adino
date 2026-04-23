"use client";

import qs from "qs";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStrapiMedia } from "@/lib/utils";
import FormNotification from "@/components/ui/FormNotification";

const query = qs.stringify(
  {
    populate: {
      content: {
        populate: {
          social_links: {
            populate: "*",
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

const getSubsidiaryNewsletter = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subsidiary-newsletter?${query}`
  );
  const data = await res.json();
  return data;
};

const INITIAL = { name: "", email: "", phone: "", subject: "", message: "" };

const SubsidiaryNewsletter = () => {
  const {
    data: subsidiaryNewsletter,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subsidiaryNewsletter"],
    queryFn: getSubsidiaryNewsletter,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let err = null;
    if (name === "name" && !value.trim()) err = "Full name is required.";
    if (name === "email") {
      if (!value.trim()) err = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = "Enter a valid email.";
    }
    if (name === "message" && !value.trim()) err = "Message is required.";
    if (err) setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = {};
    if (!formData.name.trim()) fieldErrors.name = "Full name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      fieldErrors.email = "Valid email is required.";
    if (!formData.message.trim()) fieldErrors.message = "Message is required.";

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/forms/subsidiary", {
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
        title: "Enquiry Sent!",
        message: "Thank you for reaching out. Our team will be in touch with you shortly.",
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
    `border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-base w-full transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-300"
    }`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  const { title, description, heading, social_links } =
    subsidiaryNewsletter?.data?.content;

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

      <div className="bg-[#F7F7F7] py-12 sm:py-16 md:py-20 lg:py-[104px]">
        <div className="w-wrapper mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-[94px] justify-between items-center px-4 md:px-0">
          <div className="bg-white rounded-2xl py-6 md:py-[37px] px-6 md:px-12 w-full shadow-sm mx-auto md:w-1/2">
            <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter mb-[34px]">
              Start Growing Your Wealth Today!
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full name *"
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email address *"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={inputClass("phone")}
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={inputClass("subject")}
              />
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Message *"
                  rows={3}
                  className={`${inputClass("message")} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-800 text-white rounded-full py-3 mt-2 text-base font-medium hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed transition w-full cursor-pointer"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 w-full md:w-1/2">
            <h5 className="font-lato text-xs sm:text-sm uppercase text-black font-medium bg-white rounded-full py-1 px-3 sm:px-4 w-fit">
              {title}
            </h5>
            <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
              {heading}
            </h2>
            <p className="font-lato font-medium text-base sm:text-lg leading-7 sm:leading-7.5 text-[#333333] max-w-full md:max-w-[350px]">
              {description}
            </p>

            <div className="mt-5 md:mt-[120px] flex flex-col gap-6">
              {social_links.map((item, index) => (
                <a
                  key={index}
                  href={item.icon_url}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <Image
                    src={getStrapiMedia(item?.icon_image?.url)}
                    alt="icons"
                    width={35}
                    height={35}
                    className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"
                  />
                  <p className="font-lato font-normal text-sm md:text-base leading-6 text-[#0C1E21] tracking-tight">
                    {item?.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubsidiaryNewsletter;
