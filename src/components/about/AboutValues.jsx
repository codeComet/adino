"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      aboutSections: {
        on: {
          "about.about-values": {
            populate: "*",
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

// get data from strapi
const getAboutValuesData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?${query}`
  );
  const data = await res.json();
  return data;
};

const AboutValues = () => {
  const { data: aboutValuesData, isLoading } = useQuery({
    queryKey: ["aboutValues"],
    queryFn: getAboutValuesData,
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

  const colors = [
    {
      bg: "#0E382B",
      text: "#CEFE85",
    },
    {
      bg: "#F0FDF4",
      text: "#28282B",
    },
    {
      bg: "#CDF8D4",
      text: "#28282B",
    },
    {
      bg: "#1F2020",
      text: "#ffffff",
    },
    {
      bg: "#2A343F",
      text: "#ffffff",
    },
  ];

  const { title, heading, valueItems } =
    aboutValuesData?.data?.aboutSections[0];
    
  return (
    <section className="py-16 px-6 lg:py-30 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-12">
          <p className="font-lato text-sm font-medium text-gray-600 uppercase tracking-wider">
            {title}
          </p>
          <h2 className="font-sequel-normal text-4xl lg:text-5xl text-[#17171A] leading-tight max-w-xl">
            {heading}
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px]">
          {valueItems.map((item, index) => (
            <div
              key={item.id || index}
              className="p-8 rounded-lg flex flex-col gap-[60px]"
              style={{
                backgroundColor: colors[index].bg,
                color: colors[index].text,
              }}
            >
              <h3 className="font-lato font-medium text-[14px] leading-[100%] uppercase">
                {item.title}
              </h3>
              <p className="font-lato font-normal text-base leading-[25px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
