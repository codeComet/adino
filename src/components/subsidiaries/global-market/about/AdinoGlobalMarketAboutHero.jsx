import React from "react";
import { Button } from "@/components/ui/button";
import { getStrapiMedia } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const AdinoGlobalMarketAboutHero = ({ heroData }) => {
  if (!heroData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, description, hero_bg, cta, cta_btn_text } =
    heroData || {};

  const headingText =
    heroData?.heading ??
    heroData?.heading_text ??
    heroData?.title_heading ??
    title ??
    "";
  const descriptionText =
    typeof description === "string"
      ? description
      : (description?.[0]?.children?.[0]?.text ?? "");
  const backgroundInput = hero_bg?.url ?? hero_bg ?? "";
  const backgroundUrl = getStrapiMedia(backgroundInput);
  const isVideoBackground =
    typeof backgroundInput === "string" &&
    (backgroundInput.endsWith(".mp4") ||
      backgroundInput.endsWith(".webm") ||
      backgroundInput.endsWith(".mov"));
  const ctaText = cta?.[0]?.cta_btn_text ?? cta_btn_text ?? "";

  return (
    <section className="min-h-screen flex items-end justify-start bg relative pb-20">
      {isVideoBackground && backgroundUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={backgroundUrl}
            type={`video/${backgroundUrl.split(".").pop()}`}
          />
          Your browser does not support the video tag.
        </video>
      ) : (
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
      )}

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="w-wrapper mx-auto flex flex-col gap-3 relative z-10 px-4 md:px-0">
        <h5 className="font-lato text-xs md:text-sm uppercase text-white font-medium rounded-full border border-white px-5 py-1.5 w-fit">
          {title || "Adino"}
        </h5>

        <h1 className="font-sequel-normal text-2xl sm:text-3xl md:text-5xl md:leading-[60px] text-white font-medium tracking-tighter max-w-3xl">
          {headingText}
        </h1>

        {descriptionText ? (
          <div className="max-w-full sm:max-w-[600px] md:max-w-[750px]">
            <p className="text-white font-lato font-medium text-base sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-7.5 mt-4">
              {descriptionText}
            </p>
          </div>
        ) : null}

        {ctaText ? (
          <div className="flex items-center justify-start gap-4 mt-5">
            <a
              href={cta?.[0]?.cta_btn_url ?? ""}
              className="rounded-full h-[50px] bg-[#1B5E39] hover:bg-[#154a2d] text-base md:text-lg pl-8 pr-2 font-lato font-medium text-white cursor-pointer transition-colors flex items-center gap-3 group"
            >
              {ctaText}
              <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center transition-colors group-hover:bg-[#AD9056]">
                <ArrowRight
                  size={14}
                  className="text-[#1B5E39] transition-colors group-hover:text-white"
                />
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AdinoGlobalMarketAboutHero;
