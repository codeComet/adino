import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AboutAdinoPartnersCoreSection = ({ coreData }) => {
  if (!coreData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const data =
    coreData?.data?.attributes ||
    coreData?.data ||
    coreData?.attributes ||
    coreData;

  const heading = data?.coreValueHeading || "";
  const description = data?.coreValueDescription || "";

  const itemsRaw = data?.coreValueItems;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw
    : Array.isArray(itemsRaw?.data)
      ? itemsRaw.data
      : [];

  if (!heading && !description && !items.length) return null;

  return (
    <section className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-sequel-normal text-primary text-3xl md:text-5xl leading-tight tracking-tighter">
          {heading}
        </h2>
        <p className="mt-4 font-lato font-normal text-[#666666] text-base md:text-lg leading-[28px] md:leading-[32px]">
          {description}
        </p>
      </div>

      <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 md:gap-x-20 md:gap-y-14">
        {items.map((item) => {
          const iconUrl = getStrapiMedia(item?.icon?.url);
          const alt =
            item?.icon?.alternativeText ||
            item?.icon?.caption ||
            item?.title ||
            "icon";

          return (
            <div key={item?.id} className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0">
                <Image
                  src={iconUrl || "https://placehold.co/40x40"}
                  alt={alt}
                  width={item?.icon?.width || 40}
                  height={item?.icon?.height || 40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-sequel-normal text-[#0C0C0D] text-lg md:text-xl leading-tight">
                  {item?.title || ""}
                </h3>
                <p className="mt-2 font-lato font-normal text-[#666666] text-sm md:text-base leading-[24px] md:leading-[28px] max-w-[320px]">
                  {item?.description || ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutAdinoPartnersCoreSection;
