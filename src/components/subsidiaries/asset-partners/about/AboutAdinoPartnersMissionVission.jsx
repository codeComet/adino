import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AboutAdinoPartnersMissionVission = ({ missionData }) => {
  const items = Array.isArray(missionData)
    ? missionData
    : Array.isArray(missionData?.data)
      ? missionData.data
      : [];

  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {items.map((item) => {
          const iconUrl = getStrapiMedia(item?.icon?.url);

          return (
            <div
              key={item?.id}
              className="bg-[#EEF7EF] rounded-[32px] px-6 sm:px-10 py-12 flex flex-col items-center text-center"
            >
              <Image
                src={iconUrl || "https://placehold.co/115x114"}
                alt={
                  item?.icon?.alternativeText ||
                  item?.icon?.caption ||
                  item?.title ||
                  ""
                }
                width={item?.icon?.width || 115}
                height={item?.icon?.height || 114}
                className="w-[72px] h-[72px] object-contain"
              />
              <h3 className="font-sequel-normal text-primary text-2xl md:text-3xl leading-tight mt-8">
                {item?.title || ""}
              </h3>
              <p className="font-lato font-normal text-[#666666] text-base md:text-lg leading-[28px] md:leading-[32px] mt-5 max-w-[520px]">
                {item?.description || ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutAdinoPartnersMissionVission;
