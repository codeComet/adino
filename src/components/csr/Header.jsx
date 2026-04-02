import React from "react";
import { getStrapiMedia } from "@/lib/utils";

const Header = ({ hero }) => {
  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>No hero found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-end justify-start bg relative pb-20">
      {hero?.hero_bg?.url.endsWith(".mp4") ||
      hero?.hero_bg?.url.endsWith(".webm") ||
      hero?.hero_bg?.url.endsWith(".webm") ||
      hero?.hero_bg?.url.endsWith(".mov") ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={getStrapiMedia(hero?.hero_bg?.url)}
            type={`video/${getStrapiMedia(hero?.hero_bg?.url).split(".").pop()}`}
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getStrapiMedia(hero?.hero_bg?.url)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="w-wrapper mx-auto flex flex-col gap-3 relative z-10">
        <h1 className="font-sequel-normal text-2xl sm:text-3xl md:text-[64px] md:leading-[76px] text-white font-medium tracking-tighter md:max-w-[40%]">
          {hero?.heading}
        </h1>
      </div>
    </div>
  );
};

export default Header;
