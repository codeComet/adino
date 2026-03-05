import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AdinoCaptialIndustry = ({ industryValues }) => {
  if (!industryValues) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    industryTitle,
    industryHeading,
    industryImg,
    industryItems,
    industryDescription,
  } = industryValues || {};

  const mediaUrl = industryImg?.url
    ? getStrapiMedia(industryImg.url)
    : "https://placehold.co/600x400";

  return (
    <div className="w-wrapper mx-auto py-10 md:py-20">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[500px] rounded-[32px] overflow-hidden">
          <Image
            src={mediaUrl}
            alt={industryHeading || "Industry Image"}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Right Column - Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h5 className="font-lato text-sm uppercase text-primary font-medium bg-white rounded-full py-1 px-4 w-fit border border-primary">
              {industryTitle}
            </h5>
            <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] tracking-tighter text-primary">
              {industryHeading}
            </h2>
            <p className="font-lato text-base leading-relaxed text-[#616161]">
              {industryDescription}
            </p>
          </div>

          {/* Industry Items List */}
          {industryItems && industryItems.length > 0 && (
            <div className="flex flex-col mt-4">
              {industryItems.map((item, index) => (
                <div
                  key={index}
                  className="py-4 border-b border-gray-200 last:border-b-0"
                >
                  <p className="font-lato text-base md:text-lg leading-relaxed font-medium text-[#181818]">
                    {typeof item === "string" ? item : item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdinoCaptialIndustry;
