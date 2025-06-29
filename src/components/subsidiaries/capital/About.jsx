"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

const About = ({ data }) => {
  const { title, heading, description_1, carousel } = data;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: 2, // increase for faster scroll
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  ]);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());

    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-8 md:gap-10 items-center justify-between py-[52px] md:py-[104px] px-4 md:px-0">
      <div className="flex flex-col gap-4 md:gap-6 justify-center items-center w-full md:w-1/2">
        <h5 className="font-lato text-sm uppercase text-primary font-medium bg-white rounded-full py-1 px-4 w-fit border border-primary">
          {title}
        </h5>
        <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter text-primary max-w-[460px] text-center">
          {heading}
        </h2>
      </div>

      {/* Embla Carousel */}
      <div className="embla overflow-hidden w-full">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex">
            {carousel?.map((item, index) => (
              <div
                key={index}
                className="embla__slide basis-[100%] md:basis-[50%] shrink-0 p-2"
              >
                <Image
                  src={`${item?.url}`}
                  alt={`Carousel Image ${index + 1}`}
                  width={900}
                  height={600}
                  className="rounded-4xl object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4 md:gap-6 justify-center items-center w-full md:w-1/2">
        <p className="text-base md:text-lg leading-[26px] md:leading-[30px] font-lato font-medium text-[#666666] text-center max-w-[530px]">
          {description_1?.[0]?.children?.[0]?.text}
        </p>
      </div>
    </div>
  );
};

export default About;
