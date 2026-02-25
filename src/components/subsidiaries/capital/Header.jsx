import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const Header = ({ data }) => {
  const { title, heading, description, hero_bg, cta, stats } = data;

  const mediaUrl = hero_bg?.url ? getStrapiMedia(hero_bg.url) : "";
  const isVideo =
    !!hero_bg?.url &&
    (hero_bg.url.endsWith(".mp4") ||
      hero_bg.url.endsWith(".webm") ||
      hero_bg.url.endsWith(".mov"));

  return (
    <div className="w-wrapper mx-auto pt-30 flex flex-col md:flex-row gap-3 md:gap-20 justify-between items-stretch px-4 md:px-6 md:min-h-[800px]">
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
        <div className="flex gap-4 md:gap-[93px] flex-wrap">
          {stats.length
            ? stats.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <h3 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[30px] md:text-[56px] md:leading-16 text-primary font-sequel-normal font-normal tracking-tighter">
                    {item?.stat_number}
                  </h3>
                  <p className="text-xs sm:text-sm leading-5 text-primary font-lato font-medium">
                    {item?.stat_desc}
                  </p>
                </div>
              ))
            : null}
        </div>

        <div className="flex items-center justify-start mt-4 md:mt-7.5 mb-8 md:mb-14.5">
          <Button
            size="lg"
            className="w-full rounded-full bg-primary text-sm sm:text-base leading-7 backdrop-blur-[70px] py-2.5 sm:py-3 md:py-[15px] px-4 font-lato font-medium text-white cursor-pointer"
          >
            {cta?.cta_btn_text ?? "Start"}
          </Button>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex">
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
                  src={mediaUrl}
                  type={`video/${mediaUrl.split(".").pop()}`}
                />
              ) : null}
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={mediaUrl}
              alt="Hero Image"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
