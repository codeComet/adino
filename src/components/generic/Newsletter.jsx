"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

// get data from strapi
const getNewsletterData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsletter`
  );
  const data = await res.json();
  return data;
};


const Newsletter = () => {
    const { data: newsletterData, isLoading } = useQuery({
      queryKey: ["newsletter"],
      queryFn: getNewsletterData,
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
    });

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg relative">
          <p>Loading...</p>
        </div>
      );
    }

    console.log(newsletterData)

    const {heading, description} = newsletterData?.data;
  return (
    <section className="bg-gray-100 py-16 px-4 sm:py-20 lg:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-sequel-normal text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17171A] mb-6">
          {heading}
        </h2>

        <p className="text-[#53535C] text-base sm:text-lg font-lato font-normal mb-8 leading-relaxed px-4">
          {description[0]?.children[0]?.text}
        </p>

        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#166636] hover:bg-green-700 cursor-pointer text-white font-medium py-3 px-6 rounded-[20px] transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
