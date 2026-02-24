"use client";

import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { useHomePageData } from "@/lib/homePage";

const HomePartner = () => {
  const { data: partnerData, isLoading, isError } = useHomePageData();

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

  const sections = partnerData?.data?.sections ?? [];
  const partnerSection =
    sections.find(
      (section) => section.__component === "home-page.home-partner-section",
    ) ?? {};

  const partnerTitle =
    partnerSection?.partnerTitle ??
    "Why Partner with Adino Investment Limited?";
  const partnerSubtitle =
    partnerSection?.partnerSubtitle ??
    "The qualities that set us apart in Nigeria's financial services landscape.";
  const iconBoxes = partnerSection?.iconBox ?? [];

  return (
    <section className="w-wrapper mx-auto py-12 md:py-20">
      <div className="flex flex-col items-center text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-[40px] lg:text-[48px] leading-tight md:leading-[1.1] font-sequel-normal tracking-tighter text-[#181818] md:w-[40%]">
          {partnerTitle}
        </h2>
        <p className="mt-4 max-w-2xl md:max-w-3xl text-sm md:text-base text-[#6B7280] font-lato">
          {partnerSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-20">
        {iconBoxes?.map((item) => (
          <div key={item.id} className="flex flex-col items-start gap-4">
            {item?.icon?.url && (
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E6F4EF] flex items-center justify-center">
                <Image
                  src={getStrapiMedia(item.icon.url)}
                  alt={item.title || "icon"}
                  width={32}
                  height={32}
                  className="w-6 h-6 md:w-7 md:h-7 object-contain"
                />
              </div>
            )}
            <div>
              <h3 className="text-base md:text-lg font-sequel-normal text-[#181818] mb-1 font-semibold">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-[#4B5563] font-lato">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomePartner;
