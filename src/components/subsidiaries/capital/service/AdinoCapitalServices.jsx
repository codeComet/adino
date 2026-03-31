import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const AdinoCapitalServices = ({ serviceItems = [] }) => {
  if (!Array.isArray(serviceItems) || serviceItems.length === 0) return null;

  const firstRowItems = serviceItems.slice(0, 2);
  const remainingItems = serviceItems.slice(2);

  const remainingColsClass =
    remainingItems.length === 1
      ? "md:grid-cols-1"
      : remainingItems.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  const renderCard = (item, index, minHeightClassName) => {
    const rawIcon = item?.icon?.url ?? item?.icon;
    const iconUrl = getStrapiMedia(rawIcon);
    const heading = item?.title;
    const description = item?.description;

    return (
      <div
        key={`${heading ?? "service"}-${index}`}
        className={`bg-[#1C693C] px-6 py-10 md:px-10 md:py-14 flex flex-col gap-4 md:gap-6 ${minHeightClassName}`}
      >
        {rawIcon ? (
          <div className="w-6 h-6 md:w-7 md:h-7 relative">
            {isNonEmptyString(iconUrl) ? (
              <Image
                src={iconUrl}
                alt={isNonEmptyString(heading) ? heading : "Service"}
                fill
                sizes="28px"
                className="object-contain brightness-0 invert"
              />
            ) : (
              rawIcon
            )}
          </div>
        ) : null}

        {heading ? (
          <h3 className="font-sequel-normal text-white tracking-tighter text-[24px] md:text-[28px] leading-[1.15] max-w-[320px]">
            {heading}
          </h3>
        ) : null}

        {description ? (
          <p className="font-lato font-medium text-white/70 text-sm md:text-base leading-[22px] md:leading-[26px] max-w-[560px]">
            {description}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <section className="bg-primary py-10 md:py-20">
      <div className="w-wrapper mx-auto px-4 md:px-0">
        <div className="flex flex-col gap-4 md:gap-6">
          {firstRowItems.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {firstRowItems.map((item, index) =>
                renderCard(item, index, "min-h-[220px] md:min-h-[280px]"),
              )}
            </div>
          ) : null}

          {remainingItems.length ? (
            <div
              className={`grid grid-cols-1 ${remainingColsClass} gap-4 md:gap-6`}
            >
              {remainingItems.map((item, index) =>
                renderCard(
                  item,
                  index + firstRowItems.length,
                  "min-h-[200px] md:min-h-[240px]",
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AdinoCapitalServices;
