import React from "react";
import Image from "next/image";
import { getStrapiMedia, renderDescriptionFromEditor } from "@/lib/utils";

const AdinoPartnersServiceCore = ({ coreStrategyData }) => {
  if (!coreStrategyData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const data =
    coreStrategyData?.data?.attributes ||
    coreStrategyData?.data ||
    coreStrategyData?.attributes ||
    coreStrategyData;

  const heading = data?.coreStrategyHeading || "";
  const description = data?.coreStrategyDescription || "";

  const itemsRaw = data?.coreStrategyItems;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw
    : Array.isArray(itemsRaw?.data)
      ? itemsRaw.data
      : [];

  if (!heading && !description && !items.length) return null;

  const descriptionNode = Array.isArray(description) ? (
    renderDescriptionFromEditor(description, {
      pClassName:
        "w-full md:w-[60%] mx-auto mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px] text-center mb-0 font-lato",
    })
  ) : (
    <p className="w-full md:w-[60%] mx-auto mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px] text-center font-lato">
      {description}
    </p>
  );

  return (
    <section className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-0">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sequel-normal text-[#181818] text-3xl leading-12 md:text-5xl md:leading-15 tracking-tighter">
          {heading}
        </h2>
        {descriptionNode}
      </div>

      <div className="mt-10 md:mt-16 max-w-5xl mx-auto">
        <div className="h-px w-full bg-[#E6E6E6]" />

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {items.map((item, index) => {
            const iconUrl = getStrapiMedia(item?.icon?.url);
            const alt =
              item?.icon?.alternativeText ||
              item?.icon?.caption ||
              item?.title ||
              "icon";

            return (
              <div
                key={item?.id ?? `${index}-${item?.title ?? "item"}`}
                className={[
                  "rounded-2xl border border-primary/50 bg-white p-6 md:p-8",
                  index === 0 ? "md:col-span-2" : "",
                ].join(" ")}
              >
                <div className="flex flex-col items-start gap-4 md:gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Image
                      src={iconUrl || "https://placehold.co/48x48"}
                      alt={alt}
                      width={48}
                      height={48}
                      className="w-6 h-6 md:w-7 md:h-7 object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-sequel-normal text-[#181818] text-lg md:text-2xl leading-tight tracking-tighter">
                      {item?.title || ""}
                    </h3>
                    <p className="mt-3 font-lato font-normal text-[#666666] text-sm md:text-base leading-[24px] md:leading-[28px] max-w-[720px]">
                      {item?.description || ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdinoPartnersServiceCore;
