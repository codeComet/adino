import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getStrapiMedia,
  renderDescription,
  renderDescriptionFromEditor,
} from "@/lib/utils";

const Body = ({ heading, description, box, cta }) => {
  if (!heading && !description && !box && !cta)
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );

  const boxData = Array.isArray(box) ? box[0] : box;
  const ctaData = Array.isArray(cta) ? cta[0] : cta;
  const boxImageUrl = boxData?.image?.url
    ? getStrapiMedia(boxData?.image?.url)
    : "";
  const ctaHref = ctaData?.cta_btn_url || "#";
  const ctaText = ctaData?.cta_btn_text || "Explore";
  const isExternal = !!ctaData?.isExternal;

  const renderBodyDescription = (value) => {
    if (!value) return null;

    const textClassName =
      "font-lato font-medium text-base md:text-xl leading-6 md:leading-[35px] text-[#666666]";

    if (typeof value === "string") {
      return (
        <div className="mt-6">
          {renderDescription(value, {
            pClassName: textClassName,
          })}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="mt-6">
          {renderDescriptionFromEditor(value, {
            pClassName: textClassName,
            liClassName: textClassName,
            listClassName: "pl-5 mb-6 last:mb-0",
          })}
        </div>
      );
    }

    if (typeof value === "object" && value?.type && value?.children) {
      return (
        <div className="mt-6">
          {renderDescriptionFromEditor([value], {
            pClassName: textClassName,
            liClassName: textClassName,
            listClassName: "pl-5 mb-6 last:mb-0",
          })}
        </div>
      );
    }

    return <p className={`mt-6 ${textClassName}`}>{String(value)}</p>;
  };

  const renderBoxDescription = (value) => {
    if (!value) return null;

    const textClassName =
      "font-lato font-medium text-base md:text-xl leading-6 md:leading-[35px] text-black";

    if (typeof value === "string") {
      return <p className={textClassName}>{value}</p>;
    }

    if (Array.isArray(value)) {
      return (
        <div>
          {renderDescriptionFromEditor(value, {
            pClassName: textClassName,
            liClassName: textClassName,
            listClassName: "pl-5",
          })}
        </div>
      );
    }

    if (typeof value === "object" && value?.type && value?.children) {
      return (
        <div>
          {renderDescriptionFromEditor([value], {
            pClassName: textClassName,
            liClassName: textClassName,
            listClassName: "pl-5",
          })}
        </div>
      );
    }

    return <p className={textClassName}>{String(value)}</p>;
  };

  return (
    <section className="w-wrapper mx-auto py-20 md:py-20 px-4 md:px-0">
      <div className="max-w-5xl">
        {heading ? (
          <h2 className="font-sequel-normal text-[#181818] text-3xl md:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {heading}
          </h2>
        ) : null}
        {renderBodyDescription(description)}
      </div>

      <div className="mt-12 md:mt-20">
        <div className="flex flex-col md:flex-row-reverse items-stretch md:items-center">
          <div className="relative w-full md:w-3/5 min-h-[260px] md:min-h-[560px] bg-[#F4F4F5] overflow-hidden z-0">
            {boxImageUrl ? (
              <Image
                src={boxImageUrl}
                alt={boxData?.heading || "CSR image"}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-[#E7EEE9]" />
            )}
          </div>

          <div className="relative z-10 w-full md:w-2/5 md:-ml-16 bg-white border border-[#D8CBB2] shadow-sm px-6 py-10 md:px-14 md:py-[72px] flex flex-col justify-between">
            <div className="flex flex-col gap-4 md:gap-6">
              {boxData?.heading ? (
                <h3 className="font-sequel-normal text-[#0C0C0D] text-2xl md:text-5xl leading-[1.15] tracking-tighter">
                  {boxData?.heading}
                </h3>
              ) : null}

              {boxData?.description
                ? renderBoxDescription(boxData?.description)
                : null}
            </div>

            <div className="mt-10 md:mt-12 flex justify-center">
              <Link
                href={ctaHref}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="w-full md:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full md:w-[240px] rounded-full bg-primary hover:bg-green-700 cursor-pointer text-white font-medium py-6"
                >
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
