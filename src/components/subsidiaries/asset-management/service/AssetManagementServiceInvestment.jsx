import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { renderDescription } from "@/lib/utils";

const AssetManagementServiceInvestment = ({ investmentData }) => {
  if (!investmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { investmentApproach } = investmentData || {};

  if (!investmentApproach) return null;

  const { title, description, icon } = investmentApproach;

  return (
    <div className="w-wrapper mx-auto py-16 md:py-24 px-0 relative">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-20">
        {/* Left Column: Content */}
        <div className="flex-1 order-2 lg:order-1">
          <h2 className="font-sequel-normal text-3xl md:text-5xl leading-tight text-[#181818] mb-8 tracking-tighter">
            {title}
          </h2>
          <div className="flex flex-col gap-4">
            {renderDescription(description)}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex-1 w-full order-1 lg:order-2">
          <div className="relative w-full rounded-2xl overflow-hidden">
            {icon && (
              <Image
                src={getStrapiMedia(icon)}
                alt={title || "Investment Approach"}
                width={icon.width || 800}
                height={icon.height || 800}
                className="w-full h-auto object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManagementServiceInvestment;
