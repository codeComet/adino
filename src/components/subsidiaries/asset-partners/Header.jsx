import { Button } from "@/components/ui/button";

const Header = ({ data }) => {
  const { heading_text, hero_bg, hero_bottom_text, hero_cta } = data;

  return (
    <div className="min-h-screen flex items-center justify-start bg relative">
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
            src={`${hero_bg?.url}`}
            type={`video/${hero_bg?.url.split(".").pop()}`}
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${hero_bg?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 w-[300px] md:w-[800px] bg-gradient-to-r from-[#166636] via-[rgba(3,32,33,0.7)] to-transparent"></div>

      <div className="w-wrapper mx-auto flex flex-col gap-4 sm:gap-6 relative z-10">
        <h1 className="font-sequel-normal mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-[64px] md:leading-[74px] text-white font-medium tracking-tighter">
          {heading_text}
        </h1>

        <div className="max-w-full sm:max-w-[600px] md:max-w-[750px]">
          <p className="text-white font-lato font-medium text-base sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-7.5">
            {hero_bottom_text?.[0]?.children?.[0]?.text}
          </p>
        </div>
        <div className="mt-4 sm:mt-6">
          <Button className="w-full sm:w-auto rounded-full font-lato font-normal text-sm sm:text-base leading-6 sm:leading-7 bg-white text-primary cursor-pointer hover:text-white py-3 sm:py-5 px-6 sm:px-8">
            {hero_cta?.cta_btn_text}{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Header;
