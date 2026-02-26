import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AboutAssetManagementHero = ({ hero }) => {
  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    heading_text,
    hero_bg,
    hero_bottom_text: rawBottomText,
  } = hero?.data?.hero || {};
  const hero_bottom_text = rawBottomText?.[0]?.children?.[0]?.text || "";


  return (
    <div className="py-30 pb-10 w-wrapper mx-auto">
      <div className="flex items-center gap-4 mb-10 md:mb-20">
        <h4 className="uppercase w-[150px] md:w-[100px] text-[14px] font-lato font-normal text-[#666666]">
          our story
        </h4>
        <div className="h-[1px] w-full bg-[#DCDCDC]"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:items-center gap-10 md:gap-0 px-0">
        <div className="flex flex-col flex-1/2">
          <h1 className="font-sequel-normal text-3xl md:text-5xl leading-[45px] md:leading-[60px] text-[#181818] max-w-full md:max-w-[70%] tracking-tighter">
            {heading_text}
          </h1>
        </div>
        <div className="flex flex-col gap-4 px-0">
          <p className="font-lato font-normal text-base md:text-lg leading-[24px] md:leading-[35px] text-[#555555] max-w-full md:max-w-[742px] mx-auto">
            {hero_bottom_text}
          </p>
        </div>
      </div>
      {/* img */}
      <div className="flex justify-center mt-8 md:mt-10 flex-1 px-4 md:px-0">
        <Image
          src={getStrapiMedia(hero_bg?.url)}
          alt="about hero image"
          width={1000}
          height={720}
          className="rounded-md w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AboutAssetManagementHero;
