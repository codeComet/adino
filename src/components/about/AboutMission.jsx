"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import Image from "next/image";

const query = qs.stringify(
  {
    populate: {
      mission: {
        populate: ["image"],
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

// get data from strapi
const getAboutMissionData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?${query}`
  );
  const data = await res.json();
  return data;
};

const AboutMission = () => {
  const { data: aboutMission, isLoading } = useQuery({
    queryKey: ["aboutMission"],
    queryFn: getAboutMissionData,
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

  const { mission } = aboutMission.data;
  return (
    <div className="w-wrapper mx-auto flex flex-col gap-[60px] md:gap-[120px] pb-[60px] md:pb-[120px] px-4 md:px-0">
      {mission.map((item, index) => (
        <div 
          className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-[80px] 
            ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} 
          key={index}
        >
          <div className="flex flex-col gap-6 w-full md:w-2/5">
            <h2 className="font-lato font-medium text-[14px] leading-[100%] uppercase border-b border-[#181818] text-[#181818] pb-2">
              {item.title}
            </h2>

            <p className="font-lato font-normal text-[#666666] text-base md:text-lg leading-[26px] md:leading-[30px]">
              {item.description}
            </p>
          </div>
          <div className="w-full md:w-3/6">
            <Image
              src={item?.image?.url}
              width={600}
              height={300}
              alt={item.title}
              className="w-full h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutMission;
