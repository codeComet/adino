"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getStrapiMedia, renderDescriptionFromEditor } from "@/lib/utils";

const normalizeItems = (raw) => {
  const base = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
      ? raw.data
      : [];
  return base.filter(Boolean);
};

const AdinoGlobalMarketApproach = ({ approachData, data }) => {
  const source = approachData ?? data ?? null;

  const {
    approachTitle,
    approachHeading,
    approachDescription,
    approachItems,
    approachImage,
  } = source || {};

  const items = normalizeItems(approachItems);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!source) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  if (!approachHeading && !approachDescription && !items.length) return null;

  const currentIndex = items.length
    ? Math.min(activeIndex, items.length - 1)
    : 0;
  const activeItem = items[currentIndex] || {};
  const imageUrl =
    getStrapiMedia(approachImage[0]) || "https://placehold.co/900x650";
  const imageAlt =
     approachHeading || "Strategic approach image";

  const itemTitle =
    activeItem?.title || "";
  const itemDescription =
    activeItem?.description ||
    "";

  const sectionDescriptionNode = Array.isArray(approachDescription) ? (
    <div className="mt-4 text-[#666666]">
      {renderDescriptionFromEditor(approachDescription, {
        pClassName:
          "font-lato font-normal text-sm sm:text-base md:text-lg leading-[24px] md:leading-[30px] text-[#666666] mb-3 last:mb-0",
      })}
    </div>
  ) : approachDescription ? (
    <p className="mt-4 font-lato font-normal text-sm sm:text-base md:text-lg leading-[24px] md:leading-[30px] text-[#666666] max-w-[680px]">
      {approachDescription}
    </p>
  ) : null;

  const itemDescriptionNode = Array.isArray(itemDescription) ? (
    <div className="mt-5 text-[#474B64]">
      {renderDescriptionFromEditor(itemDescription, {
        pClassName:
          "font-lato font-normal text-sm sm:text-base md:text-lg leading-[24px] md:leading-[30px] text-[#474B64] mb-3 last:mb-0",
      })}
    </div>
  ) : itemDescription ? (
    <p className="mt-5 font-lato font-normal text-sm sm:text-base md:text-lg leading-[24px] md:leading-[30px] text-[#666666]">
      {itemDescription}
    </p>
  ) : null;

  const canNavigate = items.length > 1;
  const goPrev = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => {
      const base = Math.min(prev, items.length - 1);
      return (base - 1 + items.length) % items.length;
    });
  };
  const goNext = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => {
      const base = Math.min(prev, items.length - 1);
      return (base + 1) % items.length;
    });
  };

  return (
    <section className="w-wrapper mx-auto py-12 md:py-24 px-4 md:px-0">
      <div className="max-w-3xl">
        <div className="inline-flex items-center justify-center rounded-full bg-[#E9F7EE] px-4 py-1 w-fit">
          <p className="font-lato font-medium text-xs leading-5 text-primary uppercase">
            {approachTitle || "Approach"}
          </p>
        </div>

        <h2 className="mt-4 font-sequel-normal text-[#0B1B3F] text-4xl md:text-5xl leading-[1.05] tracking-tighter max-w-[560px]">
          {approachHeading || ""}
        </h2>

        {sectionDescriptionNode}
      </div>

      {items.length ? (
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-stretch">
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] rounded-[28px] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={currentIndex === 0}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="flex flex-col gap-2">
                <p className="font-sequel-normal text-[#0B1B3F] text-5xl md:text-6xl leading-none tracking-tighter">
                  {String(currentIndex + 1).padStart(2, "0")}
                </p>

                {itemTitle ? (
                  <h3 className="font-sequel-normal font-semibold mt-4 text-[#0E1435] text-xl md:text-2xl leading-[1.2] tracking-tight">
                    {itemTitle}
                  </h3>
                ) : null}
              </div>

              {itemDescriptionNode}

              <div className="mt-8 inline-flex items-center rounded-full border border-[#E5E7EB] overflow-hidden w-fit">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canNavigate}
                  aria-label="Previous approach item"
                  className="h-11 w-11 grid place-items-center text-[#0B1B3F] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="h-11 w-px bg-[#E5E7EB]" />
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canNavigate}
                  aria-label="Next approach item"
                  className="h-11 w-11 grid place-items-center text-[#0B1B3F] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default AdinoGlobalMarketApproach;
