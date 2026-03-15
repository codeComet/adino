import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AdinoGlobalMarketAboutHero = ({ heroData }) => {
  if (!heroData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, description, hero_bg } = heroData || {};
  const headingText =
    heroData?.heading ??
    heroData?.heading_text ??
    heroData?.title_heading ??
    title ??
    "";
  const descriptionText =
    typeof description === "string"
      ? description
      : (description?.[0]?.children?.[0]?.text ?? "");

  return (
    <section className="w-full bg-linear-to-b from-[#FFF7F0] to-white">
      <div className="w-wrapper mx-auto pt-30 md:pt-40 pb-16 md:pb-24 px-4 md:px-0">
        <div className="flex flex-col items-center text-center gap-4 md:gap-6">
          {title ? (
            <div className="inline-flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-black/10 px-4 py-1">
              <p className="font-lato font-medium text-xs leading-5 text-[#181818]">
                {title}
              </p>
            </div>
          ) : null}

          <h1 className="font-sequel-normal font-normal text-[28px] sm:text-[32px] md:text-[56px] leading-[1.15] md:leading-[1.05] tracking-tighter text-black max-w-[980px]">
            {headingText}
          </h1>

          {descriptionText ? (
            <p className="font-lato font-normal text-sm sm:text-base md:text-lg leading-[24px] md:leading-[30px] text-[#666666] max-w-[760px]">
              {descriptionText}
            </p>
          ) : null}
        </div>

        <div className="relative mt-12 md:mt-16 flex items-center justify-center h-[200px] md:h-[650px]">
          <Image
            src={getStrapiMedia(hero_bg) || "https://placehold.co/900x650"}
            alt="About image"
            fill
            sizes="(min-width: 768px) 380px, 250px"
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};

export default AdinoGlobalMarketAboutHero;
