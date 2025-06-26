"use client";

import { useState } from "react";
import Image from "next/image";
import qs from "qs";
import { useQuery } from '@tanstack/react-query';
import arrow from "../../../public/assets/img/arrow.svg"

const query = qs.stringify(
  {
    populate: [
      "sections",
      "sections.specializeItems.feature_image",
    ],
  },
  { encodeValuesOnly: true }
);

const getSpecializeData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?${query}`
  );
  const data = await res.json();
  return data;
};


const HomeSpecialize = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const { data: specializeData, isLoading, isError } = useQuery({
    queryKey: ["specialize"],
    queryFn: getSpecializeData,
    staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour
    cacheTime: 60 * 60 * 1000, // Cache persists for 1 hour
  });

  if (isLoading) {
    return (
      <section className="w-wrapper mx-auto bg-green-900 text-white rounded-3xl p-6 md:py-[90px] md:px-[80px] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-lato uppercase tracking-wide text-green-100 mb-4">
            Loading...
          </h3>
        </div>
        <div className="relative rounded-2xl overflow-hidden bg-green-800 min-h-[300px]"></div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  let specializeHeading = specializeData?.data?.sections[2]?.specializeHeading ?? 'Specialize';
  let specializeItems = specializeData?.data?.sections[2]?.specializeItems ?? [];


  return (
    <section
      className="w-wrapper mx-auto text-white rounded-3xl p-4 sm:p-6 md:py-[90px] md:px-[80px] flex flex-col md:flex-row justify-between gap-8 md:gap-5"
      style={{
        backgroundImage:
          'url("https://supportive-creativity-cd56af8fec.media.strapiapp.com/1094_C460_0_C6_B_43_EF_AE_11_AE_7_B19912112_b1b41f4ce2.png ")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-4 md:py-0 w-full md:w-auto">
        <h3 className="text-base sm:text-lg font-lato uppercase tracking-wide text-green-100 mb-2 sm:mb-4">
          {specializeHeading}
        </h3>
        <ul className="space-y-4 sm:space-y-8">
          {specializeItems &&
            specializeItems.map((item, index) => (
              <li
                key={item.id}
                className="relative font-sequel-light text-xl sm:text-3xl md:text-5xl lg:text-6xl font-light cursor-pointer group flex items-center gap-2 sm:gap-4 hover:translate-y-2 sm:hover:translate-y-4 hover:translate-x-2 sm:hover:translate-x-5 transition-transform"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                {item.name}
                <Image 
                  src={arrow} 
                  width={30} 
                  height={30}
                  className={`w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] md:w-[60px] md:h-[60px] transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  alt="arrow" 
                />
              </li>
            ))}
        </ul>
      </div>

      {/* Image Panel */}
      <div className="relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[300px] md:min-h-[400px] w-full md:w-1/3">
        {specializeItems &&
          specializeItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                hoveredIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={item?.feature_image?.url}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default HomeSpecialize;