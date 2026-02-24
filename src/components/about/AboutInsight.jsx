"use client";

import React from "react";
import { useAboutPageData } from "@/lib/aboutPage";

const AboutInsight = () => {
  const { data: aboutInsightData, isLoading } = useAboutPageData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const aboutSections =
    aboutInsightData?.data?.aboutSections ||
    aboutInsightData?.data?.attributes?.aboutSections;
  const insightSection = aboutSections?.find(
    (section) => section.__component === "about.about-insight",
  );

  if (!insightSection) return null;

  const { title, heading, insight_desc, stats } = insightSection;

  return (
    <div className="w-full mx-auto py-20 md:py-30 px-4 md:px-0 bg-primary">
      <div className="w-wrapper mx-auto flex flex-col mb-6 md:mb-[37px] gap-6 md:gap-20">
        <div className="flex flex-col gap-6 md:gap-6">
          <h4 className="text-[14px] text-left font-lato font-medium uppercase text-[#F0FDF4]">
            {title}
          </h4>
          <h2 className="text-2xl md:text-5xl font-normal text-left font-sequel-normal leading-tight md:leading-[60px] text-white md:max-w-[45%] tracking-tighter">
            {heading}
          </h2>
        </div>

        {/* stats */}
        <div className="flex flex-wrap md:flex-row justify-between items-start gap-6 md:gap-20">
          {stats.map((stat) => (
            <div
              className="flex flex-col gap-2.5 border-t-[1px] border-[#F0FDF4] w-full md:w-1/4 pt-4 md:pt-10"
              key={stat.id}
            >
              <h2 className="text-3xl lg:text-[36px] font-normal text-left font-sequel-normal leading-tight  text-[#AD9056] tracking-tighter">
                {stat.stat_number}
              </h2>
              <p className="text-[14px] md:text-[18px] leading-normal font-lato font-normal text-left text-[#F0FDF4]">
                {stat.stat_desc}
              </p>
            </div>
          ))}
        </div>

        {/* Desc */}
        <div className="flex justify-between items-center">
          <div className="w-3/5 hidden md:block"></div>
          <div className="w-full md:w-2/5">
            <p className="text-[14px] md:text-[18px] font-lato font-normal text-left text-[#F0FDF4]">
              {insight_desc[0]?.children[0]?.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutInsight;
