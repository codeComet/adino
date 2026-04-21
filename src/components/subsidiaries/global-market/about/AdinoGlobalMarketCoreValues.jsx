import React from "react";
import { getStrapiMedia } from "@/lib/utils";

const AdinoGlobalMarketCoreValues = ({ coreValuesData }) => {
  if (!coreValuesData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    coreValuesTitle,
    coreValueHeading,
    coreValueDescription,
    coreValueItems,
    coreValueBgImg,
  } = coreValuesData || {};

  const itemsRaw = coreValueItems;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw
    : Array.isArray(itemsRaw?.data)
      ? itemsRaw.data
      : [];

  if (!coreValueHeading && !coreValueDescription && !items.length) return null;

  const backgroundInput = coreValueBgImg?.url ?? coreValueBgImg ?? "";
  const backgroundUrl = getStrapiMedia(backgroundInput);

  return (
    <section className="relative w-full">
      <div
        className="absolute inset-0 bg-black"
        style={
          backgroundUrl
            ? {
                backgroundImage: `url(${backgroundUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-wrapper mx-auto py-16 md:py-24 md:pb-0! px-4 md:px-0">
        <div className="grid grid-cols-1 gap-12 items-start">
          <div className="max-w-xl">
            <h2 className="mt-3 font-sequel-normal text-white text-4xl md:text-5xl leading-[1.05] tracking-tighter">
              {coreValueHeading || "Our Core Values"}
            </h2>

            {coreValueDescription ? (
              <div className="mt-5 max-w-[560px]">
                <p className="text-white text-justify font-lato font-normal text-base md:text-lg leading-[24px] md:leading-[30px]">
                  {coreValueDescription}
                </p>
              </div>
            ) : null}
          </div>

          {items.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:mt-10 md:max-w-[800px] mx-auto mb-[-100px]"> 
              {items.map((item, index) => {
                return (
                  <div
                    key={item?.id || index}
                    className="bg-[#B08F54] px-7 py-8 md:px-8 md:py-15"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 85%, 91% 100%, 0 100%)",
                    }}
                  >
                    <p className="font-lato font-semibold text-base md:text-[20px] leading-4 uppercase tracking-[0.18em] text-white md:mb-9">
                      {item?.title || ""}
                    </p>
                    <p className="mt-4  font-lato font-normal text-white text-base md:text-lg leading-[22px] md:leading-[28px] max-w-[320px]">
                      {item?.description || ""}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AdinoGlobalMarketCoreValues;
