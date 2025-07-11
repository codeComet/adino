'use client';

import RightArrow from "../../../public/assets/img/arrow-right.svg";
import { Button } from "../ui/button";
import Image from "next/image";
import qs from "qs";
import HeroStatCard from "../ui/cards/HeroStatCard";
import { useQuery } from '@tanstack/react-query';

const query = qs.stringify(
  {
    populate: [
      "sections",
      "sections.about_stat_cards",
      "sections.about_stat_cards.stat_bg_img",
      "sections.hero_bg",
      "sections.hero_cta",
      "sections.hero_features",
      "sections.about_cta",
    ],
  },
  { encodeValuesOnly: true }
);

const getAboutData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?${query}`
  );
  const data = await res.json();
  return data;
};

const HomeAbout = () => {
  const { data: aboutData, isLoading, isError } = useQuery({
    queryKey: ['about'],
    queryFn: getAboutData,
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

  // Safely access nested data with fallback values
  const aboutHeading = aboutData?.data?.sections?.[1]?.about_heading ?? 'About Us';
  const aboutDesc = aboutData?.data?.sections?.[1]?.about_description?.[0]?.children?.[0]?.text ?? 'Description coming soon';
  const aboutCta = aboutData?.data?.sections?.[1]?.about_cta?.cta_btn_text ?? 'Learn More';
  const statCards = aboutData?.data?.sections?.[1]?.about_stat_cards ?? [];
  

  return (
    <div className="py-10 md:py-20">
      <div className="w-[90%] md:w-wrapper mx-auto flex flex-col items-center justify-center">
        <h4 className="text-base md:text-lg font-semibold text-center uppercase mb-0 font-lato">
          About Us
        </h4>
        <h2 className="text-[32px] md:text-[64px] leading-[1.2] md:leading-[51px] text-center my-4 md:my-6 font-sequel-normal tracking-tighter">
          {aboutHeading}
        </h2>
        <p className="text-center text-[#666666] text-base md:text-lg leading-[26px] md:leading-[30px] max-w-[100%] md:max-w-[778px] font-lato px-4 md:px-0">
          {aboutDesc}
        </p>
        <div className="mt-8 md:mt-12 flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-primary text-base leading-7 backdrop-blur-[70px] py-3 md:py-[22px] px-4 md:px-[17px] font-lato font-medium text-white cursor-pointer"
          >
            {aboutCta}{" "}
            <span className="ml-2">
              <Image src={RightArrow} alt="down arrow" width={24} height={24} />
            </span>
          </Button>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-3 flex-wrap w-full justify-center mt-16 md:mt-28">
          {statCards.map((card, index) => (
            <HeroStatCard
              key={index}
              num={card?.stat_number}
              desc={card?.stat_desc}
              img={card?.stat_bg_img?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
