'use client';

import { Button } from "@/components/ui/button";
import DownArrow from "../../../public/assets/img/arrow-down.svg"
import Image from "next/image";
import React from "react";
import { useQuery } from '@tanstack/react-query';

// get data from strapi
const getHeroData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[sections][populate]=*`
  );
  const data = await res.json();
  return data;
};

const HomeHero = () => {
  const { data: heroData, isLoading, isError } = useQuery({
    queryKey: ['hero'],
    queryFn: getHeroData,
    staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour
    cacheTime: 60 * 60 * 1000, // Cache persists for 1 hour
  });

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

  let heroHeading = heroData?.data?.sections[0]?.heading_text ?? 'Adino';
  let heroBg =
    heroData?.data?.sections[0]?.hero_bg?.url ?? "https://placehold.co/1920x1080";
  let heroCta = heroData?.data?.sections[0]?.hero_cta?.cta_btn_text ?? 'Contact Us';
  let heroBottomText = heroData?.data?.sections[0]?.hero_bottom_text[0]?.children[0]?.text ?? 'Description coming soon';
  let heroFeatures = heroData?.data?.sections[0]?.hero_features ?? [];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg relative"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="text-center max-w-2xl relative z-10">
        <h1 className="font-sequel-normal mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl md:leading-[1.2] text-white font-medium">
          {heroHeading}
        </h1>
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4">
          <Button
            className="rounded-full h-[40px] sm:h-[50px] bg-[#FFFFFF1A] text-[16px] sm:text-[18px] backdrop-blur-[70px] py-[12px] sm:py-[15px] px-4 sm:pl-6 sm:pr-2.5 font-lato font-medium text-white cursor-pointer"
          >
            {heroCta} <span className="ml-2">
              <Image src={DownArrow} alt="down arrow" width={24} height={24} className="sm:w-[30px] sm:h-[30px]" />
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10 container mx-auto absolute bottom-8 sm:bottom-20 left-0 right-0 px-4 sm:px-0">
        <div className="w-full sm:flex-1/3">
          <p className="text-white text-[16px] sm:text-[20px] font-lato leading-[26px] sm:leading-[33px] text-center sm:text-left">{heroBottomText}</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-10 w-full sm:flex-2/3 justify-center items-end sm:justify-end">
          {heroFeatures?.map((feature, index) => (
            <span
              key={index}
              className="text-white w-full sm:w-1/3 text-center sm:text-left pt-2.5 border border-x-0 border-b-0 border-t-white text-base sm:text-lg font-lato font-medium"
            >
              {feature?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomeHero;
