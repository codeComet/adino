import React from "react";
import Image from "next/image";
import { getStrapiMedia, renderDescriptionFromEditor } from "@/lib/utils";

const AdinoPartnersServiceFocus = ({ focusData }) => {
  if (!focusData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    focusAreaHeading,
    focusAreaDescription,
    focusAreaImage,
    focusAreaItems,
  } = focusData || {};

  const imageUrl =
    getStrapiMedia(focusAreaImage) || "https://placehold.co/900x650";
  const imageAlt =
    focusAreaImage?.name ||
    focusAreaHeading ||
    "Focus area image";

  const rawItems = Array.isArray(focusAreaItems)
    ? focusAreaItems
    : Array.isArray(focusAreaItems?.data)
      ? focusAreaItems.data
      : [];

  const items = rawItems
    .map((item) => {
      if (typeof item === "string") return item;
      return (
        item?.title ||
        item?.name ||
        item?.label ||
        item?.value
      );
    })
    .filter(Boolean);

  const descriptionNode = Array.isArray(focusAreaDescription) ? (
    renderDescriptionFromEditor(focusAreaDescription, {
      pClassName:
        "w-full md:w-[60%] mx-auto mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px] text-center mb-0 font-lato",
    })
  ) : (
    <p className="w-full md:w-[60%] mx-auto mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px] text-center font-lato">
      {focusAreaDescription}
    </p>
  );

  return (
    <div className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-0">
      <h2 className="font-sequel-normal text-[#181818] text-center text-3xl leading-12 md:text-5xl md:leading-15 tracking-tighter">
        {focusAreaHeading}
      </h2>
      {descriptionNode}

      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 mt-10 md:mt-16">
        <div className="flex-1 w-full">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={900}
              height={650}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex-1 w-full">
          <ol className="flex flex-col gap-5 md:gap-7">
            {items.map((text, index) => (
              <li key={`${index}-${text}`} className="flex items-start gap-3">
                <span className="font-lato font-normal text-lg md:text-[32px] leading-7 md:leading-12 text-[#181818]">
                  {index + 1}.
                </span>
                <span className="font-lato font-normal text-lg md:text-[32px] leading-7 md:leading-12 text-[#181818]">
                  {text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdinoPartnersServiceFocus;
