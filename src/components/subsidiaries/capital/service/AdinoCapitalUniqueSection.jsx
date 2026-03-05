import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AdinoCapitalUniqueSection = ({ uniqueSectionData }) => {
  const { whyTitle, whyHeading, whyItems } = uniqueSectionData || {};

  if (!uniqueSectionData) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="w-full px-4 md:px-6 lg:w-wrapper mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          {whyTitle && (
            <div className="inline-block px-6 py-2 rounded-full border border-[#0F5132] mb-6">
              <span className="text-[#0F5132] font-lato text-sm font-medium uppercase tracking-wide">
                {whyTitle}
              </span>
            </div>
          )}

          {whyHeading && (
            <h2 className="w-full text-3xl md:text-5xl font-sequel-normal text-[#0F5132] leading-tight tracking-tight md:max-w-[300px]">
              {whyHeading}
            </h2>
          )}
        </div>

        {/* Grid */}
        {whyItems && whyItems.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {whyItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`flex flex-col items-center text-center p-8 md:p-12 border-r border-gray-100 ${index < 3 ? 'md:border-b' : ''}`}
                >
                  {/* Icon */}
                  <div className="mb-6 w-12 h-12 relative flex items-center justify-center">
                    {item.icon && (
                      <Image
                        src={getStrapiMedia(item.icon)}
                        alt={item.title || "Icon"}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-sequel-normal text-[#0F5132] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#333333] font-lato text-base leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdinoCapitalUniqueSection;
