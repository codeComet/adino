"use client";

import { useState } from "react";
import Image from "next/image";
import qs from "qs";
import { useQuery } from '@tanstack/react-query';

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
  
  const { data: specializeData, isLoading } = useQuery({
    queryKey: ['specialize'],
    queryFn: getSpecializeData,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
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

  let specializeHeading = specializeData?.data?.sections[2]?.specializeHeading;
  let specializeItems = specializeData?.data?.sections[2]?.specializeItems;


  return (
    <section
      className="w-wrapper mx-auto text-white rounded-3xl p-4 sm:p-6 md:py-[90px] md:px-[80px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      style={{
        backgroundImage:
          'url("https://supportive-creativity-cd56af8fec.media.strapiapp.com/1094_C460_0_C6_B_43_EF_AE_11_AE_7_B19912112_6297106bbf.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-4 md:py-0">
        <h3 className="text-base sm:text-lg font-lato uppercase tracking-wide text-green-100 mb-2 sm:mb-4">
          {specializeHeading}
        </h3>
        <ul className="space-y-4 sm:space-y-8">
          {specializeItems &&
            specializeItems.map((item, index) => (
              <li
                key={item.id}
                className="font-sequel-light text-2xl sm:text-4xl md:text-6xl font-light cursor-pointer transition-colors duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>

      {/* Image Panel */}
      <div className="relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
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
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default HomeSpecialize;