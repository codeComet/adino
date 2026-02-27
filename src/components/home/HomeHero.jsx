"use client";

import { ArrowDown } from "lucide-react";
import React from "react";
import { getStrapiMedia } from "@/lib/utils";
import { useHomePageData } from "@/lib/homePage";

const HomeHero = () => {
  const { data: heroData, isLoading, isError } = useHomePageData();

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

  const sections = heroData?.data?.sections ?? [];
  const heroSection =
    sections.find(
      (section) => section.__component === "home-page.home-hero-section",
    ) ?? {};


  let heroHeading =
    heroSection?.heading_text ??
    "Create Assets, Optimize Liabilities, Maximize Wealth.";
  let heroBg = heroSection?.hero_bg?.url
    ? getStrapiMedia(heroSection?.hero_bg?.url)
    : "https://placehold.co/1920x1080";
  let heroCta = heroSection?.hero_cta?.cta_btn_text ?? "Discover Adino";
  let heroCtaUrl = heroSection?.hero_cta?.cta_btn_url ?? "#";
  let heroBottomText =
    heroSection?.hero_bottom_text?.[0]?.children?.[0]?.text ??
    "Empowering Growth, Enhancing Value in Emerging Markets";

  return (
    <div className="min-h-screen flex items-end justify-start px-4 sm:px-10 pb-10 bg relative">
      {heroBg.endsWith(".mp4") ||
      heroBg.endsWith(".webm") ||
      heroBg.endsWith(".mov") ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroBg} type={`video/${heroBg.split(".").pop()}`} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="text-left max-w-5xl relative z-10 mb-10 sm:mb-20 ml-0 sm:ml-10">
        <h1 className="font-sequel-normal mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[64px] lg:leading-[1.1] text-white font-medium tracking-tighter mb-6">
          {heroHeading}
        </h1>
        <p className="text-white text-[18px] sm:text-[22px] font-lato leading-tight mb-8 max-w-2xl">
          {heroBottomText}
        </p>
        <div className="flex items-center justify-start gap-4">
          <a href={heroCtaUrl} className="rounded-full h-[50px] bg-[#1B5E39] hover:bg-[#154a2d] text-[16px] px-8 font-lato font-medium text-white cursor-pointer transition-colors flex items-center gap-3">
            {heroCta}
            <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
              <ArrowDown size={14} className="text-[#1B5E39]" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default HomeHero;
