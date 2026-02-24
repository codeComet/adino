"use client";

import qs from "qs";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/utils";

const query = qs.stringify(
  {
    populate: {
      testimonials: {
        populate: {
          testimonials: {
            populate: ["image"],
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

const getTestimonials = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subsidiary-testimonial?${query}`
  );
  const data = await res.json();
  return data;
};

const TestimonialSlider = ({ showHeading = true }) => {
  const {
    data: testimonial,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testimonial"],
    queryFn: getTestimonials,
    staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour
    cacheTime: 60 * 60 * 1000, // Cache persists for 1 hour
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  const { testimonials, title, heading } = testimonial?.data?.testimonials;

  return (
    <div className="w-wrapper mx-auto py-12 sm:py-16 md:py-20 lg:py-[104px]">
      {showHeading && (
        <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
          <h5 className="font-lato text-sm uppercase text-black font-medium bg-[#E4EDF4] rounded-full py-1 px-4 w-fit">
            {title}
          </h5>
          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {heading}
          </h2>
        </div>
      )}

      {/* Testimonial Slider */}

      {testimonials.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full overflow-x-hidden"
        >
          {/* Move navigation buttons to top right */}
          <div className="flex justify-end mb-6 px-2">
            <CarouselPrevious className="relative translate-y-0 translate-x-0 md:translate-x-8 h-10 w-10 rounded-full border-gray-200 hover:bg-gray-50" />
            <CarouselNext className="relative translate-y-0 translate-x-[-50px] md:translate-x-[-50px] h-10 w-10 rounded-full border-gray-200 hover:bg-gray-50" />
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-2 md:pl-4 min-w-0 basis-full md:basis-[45%] lg:basis-[32%]"
              >
                <Card className="h-full bg-gray-50 border-0 shadow-sm">
                  <CardContent className="p-4 md:p-6 flex flex-col justify-between h-full min-h-[280px]">
                    <div className="mb-6">
                      <p className="text-[#333333] text-base md:text-lg leading-7 font-lato font-normal">
                        {testimonial.description?.[0]?.children?.[0]?.text}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={getStrapiMedia(testimonial?.image?.url)}
                          alt={testimonial?.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-sequel-normal font-normal text-black text-base leading-6 truncate">
                          {testimonial?.name}
                        </h4>
                        <p className="text-[#333333] text-xs leading-6 truncate">
                          {testimonial?.location_designation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="mt-8 text-center">
          <p className="text-[#333333]">No testimonials available.</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;
