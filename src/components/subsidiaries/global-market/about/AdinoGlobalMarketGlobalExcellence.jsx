import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AdinoGlobalMarketGlobalExcellence = ({ globalExcellenceData }) => {
  if (!globalExcellenceData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, description, icon } = globalExcellenceData || {};

  return (
    <section className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16">
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
          <div className="flex items-center gap-6 w-full">
            <div className="relative w-full max-w-[520px] h-[320px] sm:h-[380px] md:h-[520px] rounded-[18px] overflow-hidden">
              <Image
                src={getStrapiMedia(icon) || "https://placehold.co/580x780"}
                alt={title || "Global excellence image"}
                fill
                className="object-contain"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="inline-flex items-center justify-center rounded-full bg-[#E9F7EE] px-4 py-1 w-fit">
            <p className="font-lato font-medium text-xs leading-5 text-primary uppercase">
              Global Excellence
            </p>
          </div>

          <h2 className="w-full md:w-[80%] mt-4 md:mt-5 mb-5 font-sequel-normal text-[#181818] text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tighter max-w-[560px]">
            {title || ""}
          </h2>

          <div className="max-w-[620px] text-[#666666] text-base md:text-lg leading-[25px] md:leading-[30px] font-lato font-medium">
            {description || ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdinoGlobalMarketGlobalExcellence;
