"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import Image from "next/image";

const query = qs.stringify(
  {
    populate: {
      aboutHero: {
        populate: ["aboutHeroImg", "companyInfo"],
      },
      aboutCompany: {
        populate: ["image"],
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

// get data from strapi
const getAboutHeroData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?${query}`
  );
  const data = await res.json();
  return data;
};

const AboutHero = () => {
  const { data: aboutHeroData, isLoading } = useQuery({
    queryKey: ["aboutHero"],
    queryFn: getAboutHeroData,
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

  const { heading, aboutHeroImg, companyInfo } = aboutHeroData?.data?.aboutHero;
  const { title, description } = aboutHeroData?.data?.aboutCompany;
  
  return (
    <div className="py-30 md:py-40 w-wrapper mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0 px-4 md:px-0">
        <div className="flex flex-col flex-1/2">
          <h1 className="font-sequel-normal text-3xl md:text-5xl leading-[45px] md:leading-[60px] text-[#181818] max-w-full md:max-w-[90%] tracking-tighter">
            {heading}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-end">
          {companyInfo.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2.5">
              <h2 className="font-sequel-light text-[12px] leading-[18px] text-[#53535C] uppercase">
                {item.title}
              </h2>
              <p className="font-lato font-medium text-sm md:text-base leading-[24px] md:leading-[26px] text-[#17171A]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* img */}
      <div className="flex justify-center mt-8 md:mt-10 flex-1 px-4 md:px-0">
        <Image
          src={aboutHeroImg?.url}
          alt="about hero image"
          width={1000}
          height={720}
          className="rounded-md w-full h-auto"
        />
      </div>

      {/* about company */}
      <div className="flex flex-col gap-4 pt-16 md:pt-28 px-4 md:px-0">
        <h2 className="font-lato font-medium text-[14px] leading-3.5 text-[#181818] text-center uppercase">
          {title}
        </h2>
        <p className="font-lato font-normal text-xl md:text-2xl leading-[30px] md:leading-[35px] text-[#666666] text-center max-w-full md:max-w-[742px] mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutHero;
