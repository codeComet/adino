import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AdinoPartnersServiceIndustry = ({ industryData }) => {
  if (!industryData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, description, icon } = industryData || {};

  return (
    <div className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="font-sequel-normal text-[#181818] text-3xl leading-12 md:text-5xl md:leading-15 tracking-tighter">
            {title || ""}
          </h2>
          <p className="font-sequel-normal text-[#666666] text-lg leading-[30px] tracking-tighter">
            {description || ""}
          </p>
        </div>

        <div className="flex-1">
          <div className="flex-1 w-full">
            <div className="relative w-full rounded-2xl overflow-hidden">
              <Image
                src={
                  getStrapiMedia(icon?.url) || "https://placehold.co/900x650"
                }
                alt={title || ""}
                width={900}
                height={650}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdinoPartnersServiceIndustry;
