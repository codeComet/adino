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
    <div className="w-full relative overflow-hidden py-[60px] md:py-[120px]">
      <div className="w-wrapper mx-auto flex flex-col md:flex-row gap-10 md:gap-[115px] relative">
        <div className="flex flex-col items-start justify-center max-w-[600px] z-10 w-full md:w-1/2">
          <h5 className="font-lato text-sm uppercase text-[#666666] font-medium mb-10">
            {title}
          </h5>
          <h1 className="font-sequel-normal text-[32px] text-[#181818] md:text-[64px] leading-[1.2] md:leading-[76px] tracking-tighter">
            {heading}
          </h1>
          <p className="text-[#666666] text-base md:text-[20px] leading-[26px] md:leading-[30px] max-w-[100%] md:max-w-[778px] font-lato font-medium px-0 my-5 md:mt-6 md:mb-10">
            {description}
          </p>
          <div className="flex items-center justify-start">
            <Button
              size="lg"
              className="rounded-full bg-primary text-[16px] md:text-[18px] backdrop-blur-[70px] py-3 md:py-[15px] px-4 md:pl-6 md:pr-2.5 font-lato font-medium text-white cursor-pointer"
            >
              {cta?.cta_btn_text}{" "}
              <span className="ml-2">
                <Image
                  src={RightArrow}
                  alt="down arrow"
                  width={24}
                  height={24}
                />
              </span>
            </Button>
          </div>
        </div>

        <div className="relative w-full md:absolute md:top-0 md:right-0 md:bottom-0 md:w-[50vw] h-[300px] md:h-auto">
          <div className="absolute top-0 left-0 w-[50px] md:w-[200px] h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
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
              {Array.isArray(hero_img) ? (
                hero_img.map((img, index) => (
                  <CarouselItem
                    key={img.id || index}
                    className="basis-[80%] md:basis-[60%] pl-4 h-full"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <Image
                        src={getStrapiMedia(img?.url)}
                        alt={`Career Hero Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="basis-full pl-4 h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Image
                      src={getStrapiMedia(hero_img?.url)}
                      alt="Career Hero Image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CareerHero;
