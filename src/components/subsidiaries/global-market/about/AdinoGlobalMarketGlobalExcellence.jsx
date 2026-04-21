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
      <div className="mb-6 md:mb-10">
        <h2 className="font-sequel-normal text-[#181818] text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tighter">
          Global Excellence
        </h2>
        <div className="mt-4 h-px w-full bg-[#BDBDBD]" />
      </div>

      <div className="relative w-full">
        <div className="relative w-full h-[340px] sm:h-[420px] md:h-[520px] overflow-hidden bg-[#0B2A16]">
          <Image
            src={getStrapiMedia(icon) || "https://placehold.co/1600x900"}
            alt={title || "Global excellence image"}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="relative mt-5 md:mt-0 md:absolute md:right-[33px] md:top-[43px] w-full md:w-[420px] lg:w-[480px] md:h-[520px] bg-[#B79A57] text-white flex flex-col justify-center px-6 sm:px-10 py-10 md:py-12">
          <h3 className="font-sequel-normal text-3xl sm:text-4xl md:text-[44px] leading-[1.05] tracking-tighter">
            {title || ""}
          </h3>

          <p className="mt-4 text-justify font-lato font-medium text-base md:text-lg leading-[24px] md:leading-[30px] text-white/90">
            {description || ""}
          </p>

          {/* <a
            href="#"
            className="mt-8 inline-flex w-fit items-center justify-center border border-white/70 px-8 py-3 text-sm md:text-base font-lato font-medium text-white hover:bg-white/10 transition-colors"
          >
            Learn More
          </a> */}

          <div
            className="hidden md:block absolute left-0 bottom-0 w-[40px] h-[40px] bg-white"
            style={{ clipPath: "polygon(0 0, 0 101%, 100% 101%)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default AdinoGlobalMarketGlobalExcellence;
