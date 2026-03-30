import { getStrapiMedia } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const Header = ({ data }) => {
  const { title, heading, description, hero_bg, cta, stats } = data;

  const headingText = heading ?? title ?? "";
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
  const ctaText = cta?.[0]?.cta_btn_text ?? "";
  const ctaUrl = cta?.[0]?.cta_btn_url ?? "";

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

      <div className="w-wrapper mx-auto flex flex-col gap-3 relative z-10 px-4 md:px-6">
        <h5 className="font-lato text-base md:text-xl uppercase text-white font-medium">
          {title || "Adino"}
        </h5>

        <h1
          className="font-sequel-normal text-2xl sm:text-3xl md:text-[64px] md:leading-[76px] text-white font-medium tracking-tighter max-w-2xl"
          dangerouslySetInnerHTML={{ __html: headingText }}
        />

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
              href={ctaUrl}
              rel="noopener noreferrer"
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

        {Array.isArray(stats) && stats.length ? (
          <div className="flex gap-4 md:gap-[93px] flex-wrap mt-8">
            {stats.map((item, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <h3 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[30px] md:text-[56px] md:leading-16 text-white font-sequel-normal font-normal tracking-tighter">
                  {item?.stat_number}
                </h3>
                <p className="text-xs sm:text-sm leading-5 text-white/80 font-lato font-medium">
                  {item?.stat_desc}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Header;
