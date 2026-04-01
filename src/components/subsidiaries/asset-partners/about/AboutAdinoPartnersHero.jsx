import React from "react";
import { getStrapiMedia } from "@/lib/utils";

const AboutAdinoPartnersHero = ({ hero }) => {
  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const headingText = hero?.heading_text ?? "";
  const heroBottomText = hero?.hero_bottom_text?.[0]?.children?.[0]?.text ?? "";
  const heroBgUrl = hero?.hero_bg?.url
    ? getStrapiMedia(hero.hero_bg.url)
    : "https://placehold.co/1920x1080";
  const isVideo =
    heroBgUrl.endsWith(".mp4") ||
    heroBgUrl.endsWith(".webm") ||
    heroBgUrl.endsWith(".mov");

  const cta_btn = hero?.hero_cta ?? {};
  const normalizedHeading = headingText.replace(/[\u2028\u2029]/g, "\n");

  return (
    <div className="min-h-screen flex items-end justify-start bg relative pb-20">
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={heroBgUrl}
            type={`video/${heroBgUrl.split(".").pop()}`}
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 w-[320px] sm:w-[520px] md:w-[800px] bg-gradient-to-r from-[#166636] via-[rgba(3,32,33,0.7)] to-transparent" />

      <div className="w-wrapper mx-auto flex flex-col gap-4 sm:gap-6 relative z-10 justify-end px-4 md:px-6">
        <h1 className="font-sequel-normal mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-[64px] md:leading-[74px] text-white font-medium tracking-tighter max-w-xl whitespace-pre-line">
          {normalizedHeading}
        </h1>

        <div className="max-w-full sm:max-w-[600px] md:max-w-[750px]">
          <p className="text-white font-lato font-medium text-base sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-7.5">
            {heroBottomText}
          </p>
        </div>

        {cta_btn?.cta_btn_text && (
          <div className="mt-4 sm:mt-6 flex gap-8">
            <a
              href={cta_btn?.cta_btn_url || "#"}
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full font-lato font-normal text-sm sm:text-base leading-6 sm:leading-7 bg-[#AD9056] text-white cursor-pointer hover:text-white py-2 sm:py-3 px-6 sm:px-8"
            >
              {cta_btn?.cta_btn_text}{" "}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutAdinoPartnersHero;
