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

  const formatTitle = (value) => {
    const raw = (value || "").trim();
    if (!raw) return "";
    const upper = raw.toUpperCase();
    return upper.endsWith(":") ? upper : `${upper}:`;
  };

  const renderIcon = (item, { className = "" } = {}) => {
    const iconUrl = getStrapiMedia(item?.icon?.url);
    const alt =
      item?.icon?.alternativeText ||
      item?.icon?.caption ||
      item?.title ||
      "icon";

    return (
      <div className={`w-10 h-10 shrink-0 ${className}`.trim()}>
        <Image
          src={iconUrl || "https://placehold.co/40x40"}
          alt={alt}
          width={item?.icon?.width || 40}
          height={item?.icon?.height || 40}
          className="w-10 h-10 object-contain"
        />
      </div>
    );
  };

  const featured = items[0];
  const stacked = items.slice(1, 3);
  const rest = items.slice(3);

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

      <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-6 gap-6 md:gap-8">
        {featured ? (
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl bg-primary text-white p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col">
              <div className="absolute -right-16 top-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-start justify-between gap-6">
                {renderIcon(featured, { className: "" })}
              </div>
              <div className="relative mt-6">
                <h3 className="font-sequel-normal text-white text-xl md:text-2xl leading-tight tracking-tight">
                  {formatTitle(featured?.title)}
                </h3>
              </div>
              <div className="relative mt-auto pt-10">
                <p className="font-lato font-normal text-white/90 text-sm md:text-base leading-[24px] md:leading-[28px] max-w-md">
                  {featured?.description || ""}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {stacked.length ? (
          <div className="lg:col-span-3 flex flex-col gap-6 md:gap-8">
            {stacked.map((item, idx) => (
              <div
                key={item?.id ?? `stacked-${idx}`}
                className="rounded-2xl bg-[#F5F4F2] border border-black/5 p-6 md:p-8 flex items-start gap-4"
              >
                {renderIcon(item)}
                <div className="flex flex-col">
                  <h3 className="font-sequel-normal text-[#0C0C0D] text-base md:text-lg leading-tight tracking-tight">
                    {formatTitle(item?.title)}
                  </h3>
                  <p className="mt-3 font-lato font-normal text-[#666666] text-sm md:text-base leading-[24px] md:leading-[28px]">
                    {item?.description || ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {rest.map((item, idx) => {
          const isGold = idx === Math.min(rest.length - 1, 2);
          const cardClassName = isGold
            ? "bg-[#B08D57] text-white border-transparent"
            : "bg-[#F5F4F2] text-[#0C0C0D] border-black/5";
          const descriptionClassName = isGold
            ? "text-white/90"
            : "text-[#666666]";

          return (
            <div key={item?.id ?? `rest-${idx}`} className="lg:col-span-2">
              <div
                className={`rounded-2xl border p-6 md:p-8 min-h-[220px] md:min-h-[260px] flex flex-col ${cardClassName}`}
              >
                {renderIcon(item)}
                <h3 className="mt-6 font-sequel-normal text-base md:text-lg leading-tight tracking-tight">
                  {formatTitle(item?.title)}
                </h3>
                <p
                  className={`mt-auto pt-10 font-lato font-normal text-sm md:text-base leading-[24px] md:leading-[28px] ${descriptionClassName}`}
                >
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
