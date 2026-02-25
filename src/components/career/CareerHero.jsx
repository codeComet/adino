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
    <div className="w-wrapper mx-auto py-[120px] flex gap-10 md:gap-[115px] flex-wrap">
      <div className="flex flex-col items-start justify-center max-w-[600px]">
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
              <Image src={RightArrow} alt="down arrow" width={24} height={24} />
            </span>
          </Button>
        </div>
      </div>
      <div className="flex justify-center w-full md:w-auto max-w-[600px] relative">
        <Carousel
          className="w-full"
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
          <CarouselContent className="-ml-4">
            {Array.isArray(hero_img) ? (
              hero_img.map((img, index) => (
                <CarouselItem
                  key={img.id || index}
                  className="basis-[50%] pl-4"
                >
                  <Image
                    src={getStrapiMedia(img?.url)}
                    alt={`Career Hero Image ${index + 1}`}
                    width={600}
                    height={400}
                    className="object-cover rounded-lg w-full h-[300px]"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                  />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="basis-full pl-4">
                <Image
                  src={getStrapiMedia(hero_img?.url)}
                  alt="Career Hero Image"
                  width={600}
                  height={400}
                  className="object-cover rounded-lg w-full h-auto"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CareerHero;
