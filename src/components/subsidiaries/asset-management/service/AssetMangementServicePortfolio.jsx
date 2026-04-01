import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";

const AssetMangementServicePortfolio = ({ portfolioData }) => {
  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    portFolioItems,
    portFolioSecondHeading,
    portfolioTitle,
    portFolioDescription,
    portfolioImage,
  } = portfolioData;

  // Helper to safely get text from potentially rich text fields
  const getText = (content) => {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content[0]?.children?.[0]?.text || "";
    }
    return "";
  };

  const description = getText(portFolioDescription);

  return (
    <div className="w-wrapper mx-auto py-10 md:py-20 px-0 relative">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-20">
        <h2 className="font-sequel-normal text-3xl md:text-5xl leading-tight tracking-tighter text-[#181818] mb-6">
          {portfolioTitle}
        </h2>
        <p className="font-lato font-normal text-base md:text-lg leading-[28px] text-[#666666] max-w-3xl">
          {description}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left Column: Image */}
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {portfolioImage && (
            <Image
              src={getStrapiMedia(portfolioImage)}
              alt={portfolioTitle || "Portfolio Image"}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col">
          {portFolioSecondHeading && (
            <h3 className="font-sequel-normal text-2xl md:text-[32px] leading-tight tracking-tighter text-[#181818] mb-8 tracking-tighter">
              {portFolioSecondHeading}
            </h3>
          )}

          <div className="flex flex-col gap-8">
            {portFolioItems?.map((item, index) => {
              const itemTitle = item.title || item.heading || "";
              const itemDesc = getText(item.description);

              return (
                <div
                  key={index}
                  className="bg-[#EDF4F2] p-8 md:p-10 rounded-sm"
                >
                  <h4 className="font-sequel-normal text-xl md:text-[24px] font-medium text-[#181818] mb-4 tracking-tighter">
                    {itemTitle}
                  </h4>
                  <p className="font-lato text-base leading-[26px] text-[#666666] mb-8">
                    {itemDesc}
                  </p>
                  <Link
                    href={item.link || "#"}
                    className="inline-block bg-primary text-white px-8 py-3 rounded text-base font-medium hover:bg-[#14452a] transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMangementServicePortfolio;
