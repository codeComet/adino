"use client";

import React from "react";
import { useAboutPageData } from "@/lib/aboutPage";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AboutValues = () => {
  const { data: aboutValuesData, isLoading } = useAboutPageData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const aboutSections =
    aboutValuesData?.data?.aboutSections ||
    aboutValuesData?.data?.attributes?.aboutSections;
  const valuesSection = aboutSections?.find(
    (section) => section.__component === "about.about-values",
  );

  if (!valuesSection) return null;

  const { title, heading, valueItems } = valuesSection;

  const colors = [
    {
      bg: "#2A343F",
      text: "#fff",
    },
    {
      bg: "#0E382B",
      text: "#CEFE85",
    },
    {
      bg: "#F0FDF4",
      text: "#17171A",
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

  return (
    <section className="py-16 px-6 lg:py-30 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-12">
          <p className="font-lato text-sm font-medium text-[#181818] uppercase tracking-normal">
            {title}
          </p>
          <h2 className="font-sequel-normal text-4xl lg:text-5xl text-[#17171A] leading-tight max-w-5xl tracking-tighter">
            {heading}
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {valueItems?.map((item, index) => (
            <div
              key={item.id || index}
              className="p-8 rounded-lg flex flex-col gap-[110px]"
              style={{
                backgroundColor: colors[index].bg,
                color: colors[index].text,
              }}
            >
              <div className="flex flex-col gap-4">
                {getStrapiMedia(item.image) && (
                  <Image
                    src={getStrapiMedia(item.image)}
                    alt={item.title}
                    width={25}
                    height={25}
                  />
                )}
                <h3 className="font-lato font-medium text-[14px] leading-[100%] uppercase">
                  {item.title}
                </h3>
              </div>
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
