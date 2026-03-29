import { Button } from "@/components/ui/button";
import { getStrapiMedia } from "@/lib/utils";

const Header = ({ data }) => {
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, heading, description, hero_bg, cta, stats } = data || {};

  const headingText = heading ?? title ?? "";
  const headingIsHtml =
    typeof headingText === "string" && headingText.includes("<");
  const descriptionText =
    typeof description === "string"
      ? description
      : (description?.[0]?.children?.[0]?.text ?? "");

  const backgroundInput = hero_bg?.url ?? hero_bg ?? "";
  const backgroundUrl = backgroundInput ? getStrapiMedia(backgroundInput) : "";
  const isVideoBackground =
    typeof backgroundInput === "string" &&
    (backgroundInput.endsWith(".mp4") ||
      backgroundInput.endsWith(".webm") ||
      backgroundInput.endsWith(".mov"));

  const ctaItem = Array.isArray(cta) ? cta?.[0] : cta;
  const ctaText = ctaItem?.cta_btn_text ?? "Start";
  const ctaUrl = ctaItem?.cta_btn_url ?? "";
  const statItems = Array.isArray(stats) ? stats : [];

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

      <div className="w-wrapper mx-auto flex flex-col gap-4 relative z-10 px-4 md:px-0">
        {title ? (
          <h5 className="font-lato text-sm uppercase text-white/80 font-medium">
            {title}
          </h5>
        ) : null}

        {headingIsHtml ? (
          <h1
            className="font-sequel-normal text-3xl md:text-[64px] md:leading-[76px] text-white font-medium tracking-tighter max-w-3xl"
            dangerouslySetInnerHTML={{ __html: headingText }}
          />
        ) : (
          <h1 className="font-sequel-normal text-3xl md:text-[64px] md:leading-[76px] text-white font-medium tracking-tighter max-w-3xl">
            {headingText}
          </h1>
        )}

        {descriptionText ? (
          <div className="max-w-full sm:max-w-[600px] md:max-w-[750px]">
            <p className="text-white font-lato font-medium text-base sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-7.5 mt-4">
              {descriptionText}
            </p>
          </div>
        ) : null}

        {statItems.length ? (
          <div className="flex gap-4 md:gap-[93px] flex-wrap mt-6">
            {statItems.map((item, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <h3 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[30px] md:text-[56px] md:leading-16 text-white font-sequel-normal font-normal tracking-tighter">
                  {item?.stat_number}
                </h3>
                <p className="text-xs sm:text-sm leading-5 text-white/90 font-lato font-medium">
                  {item?.stat_desc}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-start gap-4 mt-6">
          {ctaUrl ? (
            <Button
              asChild
              className="rounded-full h-[50px] bg-[#1B5E39] hover:bg-[#154a2d] text-base md:text-lg px-8 md:py-6 md:px-8 font-lato font-medium text-white cursor-pointer transition-colors md:w-[250px] text-center"
            >
              <a href={ctaUrl}>{ctaText}</a>
            </Button>
          ) : (
            <Button className="rounded-full h-[50px] bg-[#1B5E39] hover:bg-[#154a2d] text-base md:text-lg px-6 md:p-8 font-lato font-medium text-white cursor-pointer transition-colors md:w-[250px] text-center">
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
