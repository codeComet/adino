import { Button } from "@/components/ui/button";
import { getStrapiMedia } from "@/lib/utils";

const Header = ({ data }) => {
  const { heading_text, hero_bg, hero_bottom_text, hero_cta } = data;
  const ctaText = hero_cta?.cta_btn_text ?? "";
  const ctaUrl = hero_cta?.cta_btn_url ?? "";

  return (
    <div className="min-h-screen flex items-end justify-start bg relative pb-20">
      {hero_bg?.url.endsWith(".mp4") ||
      hero_bg?.url.endsWith(".webm") ||
      hero_bg?.url.endsWith(".mov") ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={getStrapiMedia(hero_bg?.url)}
            type={`video/${getStrapiMedia(hero_bg?.url).split(".").pop()}`}
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getStrapiMedia(hero_bg?.url)})`,
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
          {heading_text}
        </h1>

        <div className="max-w-full sm:max-w-[600px] md:max-w-[750px]">
          <p className="text-white font-lato font-medium text-base sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-7.5 mt-4 border-l border-white pl-5">
            {hero_bottom_text?.[0]?.children?.[0]?.text}
          </p>
        </div>
        <div className="flex items-center justify-start gap-4 mt-4 md:mt-16">
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
    </div>
  );
};
export default Header;
