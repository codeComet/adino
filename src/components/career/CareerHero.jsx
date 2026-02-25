import RightArrow from "../../../public/assets/img/arrow-right.svg";
import { Button } from "../ui/button";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

const CareerHero = (data) => {
  //load data from props
  let careerHeroData = data?.data;
  if (!careerHeroData || !careerHeroData.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>No data available</p>
      </div>
    );
  }

  const { cta, description, heading, title, hero_img } =
    careerHeroData?.data?.career?.[0] || {};

  return (
    <section className="w-full relative overflow-hidden py-[60px] md:py-[120px] bg-white">
      <div className="w-wrapper mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[115px] items-center relative z-10">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start justify-center max-w-[600px]">
          <h5 className="font-lato text-sm uppercase text-[#666666] font-medium mb-10">
            {title}
          </h5>

          <h1 className="font-sequel-normal text-[32px] text-[#181818] md:text-[64px] leading-[1.2] md:leading-[76px] tracking-tighter">
            {heading}
          </h1>

          <p className="text-[#666666] text-base md:text-[20px] leading-[26px] md:leading-[30px] font-lato font-medium my-5 md:mt-6 md:mb-10">
            {description}
          </p>

          <Button
            size="lg"
            className="rounded-full bg-primary text-[16px] md:text-[18px] py-3 md:py-[15px] px-4 md:pl-6 md:pr-2.5 font-lato font-medium text-white"
          >
            {cta?.cta_btn_text}
            <span className="ml-2">
              <Image src={RightArrow} alt="arrow" width={24} height={24} />
            </span>
          </Button>
        </div>

        {/* RIGHT CAROUSEL (matches screenshot) */}
        <div className="relative w-full">
          {/* White fade overlay (make sure it sits ON TOP) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[70px] md:w-[220px] z-20 bg-gradient-to-r from-white via-white/80 to-transparent" />

          {/* Give the carousel area an explicit height so Image fill works */}
          <div className="relative w-full h-[280px] sm:h-[320px] md:h-[520px]">
            <Carousel
              className="w-full h-full"
              opts={{ loop: true, align: "start" }}
              plugins={[
                AutoScroll({
                  speed: 1,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false,
                  stopOnFocusIn: false,
                }),
              ]}
            >
              <CarouselContent className="-ml-4 h-full">
                {hero_img?.map((img, index) => {
                  const src = getStrapiMedia(img?.url);
                  return (
                    <CarouselItem
                      key={img?.id || index}
                      className="pl-4 h-full basis-[85%] md:basis-[60%]"
                    >
                      {/* Rounded corners like screenshot */}
                      <div className="relative h-full w-full overflow-hidden rounded-[22px]">
                        <Image
                          src={src}
                          alt={`Career Hero Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, 55vw"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
