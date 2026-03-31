import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AdinoCapitalSustainibility = ({ sustainabilityValues }) => {
  if (!sustainabilityValues) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }


  const {
    sustainibilityHeading,
    sustainibilityImage,
    sustainibilityItems,
    sustainibilityDesc,
  } = sustainabilityValues || {};


  const mediaUrl = sustainibilityImage?.url
    ? getStrapiMedia(sustainibilityImage.url)
    : "https://placehold.co/600x400";

  return (
    <div className="w-full py-10 md:py-20 bg-[#F0FDF4]">
      <div className="w-wrapper mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Left Column - Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] tracking-tighter text-primary">
              {sustainibilityHeading}
            </h2>
            {sustainibilityDesc?.map((item, index) => {
              if (item.type === "paragraph") {
                return (
                  <p
                    key={index}
                    className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-primary"
                  >
                    {item.children.map((child) => child.text).join("")}
                  </p>
                );
              }
              if (item.type === "list") {
                const ListTag = item.format === "ordered" ? "ol" : "ul";
                return (
                  <ListTag
                    key={index}
                    className={`pl-5 ${item.format === "ordered" ? "list-decimal" : "list-disc"}`}
                  >
                    {item.children.map((listItem, liIndex) => (
                      <li
                        key={liIndex}
                        className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-primary"
                      >
                        {listItem.children.map((child) => child.text).join("")}
                      </li>
                    ))}
                  </ListTag>
                );
              }
              return null;
            })}
          </div>

          {/* Sustainability Items List */}
          {sustainibilityItems && sustainibilityItems.length > 0 && (
            <div className="flex flex-col mt-4">
              {sustainibilityItems.map((item, index) => (
                <div
                  key={index}
                  className="py-4 border-b border-gray-200 last:border-b-0"
                >
                  <p className="font-lato text-base md:text-lg leading-relaxed font-medium text-[#181818]">
                    {typeof item === "string" ? item : item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right Column - Image */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[500px] rounded-[32px] overflow-hidden">
          <Image
            src={mediaUrl}
            alt={sustainibilityHeading || "Sustainibility Image"}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
};

export default AdinoCapitalSustainibility;
