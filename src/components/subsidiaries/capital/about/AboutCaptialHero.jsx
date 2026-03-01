import React from 'react'
import { getStrapiMedia } from "@/lib/utils";
import Image from 'next/image';

const AboutAdinoCaptialHero = ({ hero }) => {
    if (!hero) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg relative">
          <p>Loading...</p>
        </div>
      );
    }

  const {
    title,
    heading,
    description,
    hero_bg,
    cta
  } = hero || {};

    const mediaUrl = hero_bg?.url ? getStrapiMedia(hero_bg.url) : "https://placehold.co/1280x720";
    const isVideo =
      !!hero_bg?.url &&
      (hero_bg.url.endsWith(".mp4") ||
        hero_bg.url.endsWith(".webm") ||
        hero_bg.url.endsWith(".mov"));
  return (
    <div className="w-wrapper mx-auto py-10 pt-30 md:py-30 flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-stretch px-4 md:px-6 md:min-h-[900px]">
      {/* Left */}
      <div className="flex flex-col justify-between gap-4 md:gap-6 w-full md:w-1/2 bg-[#F0FDF4] rounded-4xl py-5 md:py-10 px-6">
        <div className="flex flex-col gap-5">
          <h5 className="font-lato text-sm uppercase text-[#666666] font-medium">
            {title}
          </h5>

          <h1
            className="font-sequel-normal text-[28px] sm:text-[32px] text-primary md:text-[64px] leading-[1.2] md:leading-[76px] tracking-tighter"
            dangerouslySetInnerHTML={{ __html: heading || "" }}
          />

          <p className="text-primary text-sm sm:text-base md:text-[20px] leading-[24px] sm:leading-[26px] md:leading-[30px] max-w-[100%] md:max-w-[778px] font-lato font-medium italic">
            {description?.[0]?.children?.[0]?.text ?? ""}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 md:mt-7.5 mb-0">
          {cta && cta[0]?.cta_btn_text !== "" && (
          <a
            href={cta[0]?.cta_btn_url ?? "#"}
            className="flex-1/2 rounded-full bg-primary text-sm sm:text-base leading-7 backdrop-blur-[70px] py-2.5 sm:py-3 md:py-[15px] px-4 font-lato font-medium text-center text-white cursor-pointer"
          >
            {cta[0]?.cta_btn_text ?? "Start"}
          </a>
          )}
          {cta && cta[1]?.cta_btn_text !== "" && (
          <a
            href={cta[1]?.cta_btn_url ?? "#"}
            className="flex-1/2 rounded-full bg-transparent text-sm sm:text-base leading-7 backdrop-blur-[70px] py-2.5 sm:py-3 md:py-[15px] px-4 font-lato font-medium text-center text-primary cursor-pointer border-primary border-1"
          >
            {cta[1]?.cta_btn_text ?? "Start"}
          </a>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex h-[400px] md:h-auto">
        <div className="relative w-full h-full rounded-4xl overflow-hidden">
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              {mediaUrl ? (
                <source
                  src={mediaUrl ?? 'https://placehold.co/1280x720'}
                  type={`video/${mediaUrl.split(".").pop()}`}
                />
              ) : null}
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={mediaUrl ?? 'https://placehold.co/1280x720'}
              alt="Hero Image"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              unoptimized={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutAdinoCaptialHero;