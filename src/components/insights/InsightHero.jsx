"use client";

import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Image from "next/image";
import Ln from "../../../public/assets/img/ln.svg"
import Link from "next/link";

const query = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true }
);

const getInsightData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/insight?${query}`
  );
  const data = await res.json();
  return data;
};

const InsightHero = () => {
  const {
    data: insightData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["insights"],
    queryFn: getInsightData,
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
  const { title, heading, cta } = insightData?.data;

  return (
    <div className="w-wrapper mx-auto pt-30 md:pt-40 pb-10 md:pb-20 px-4 md:px-0">
      <div className="flex flex-col gap-4 md:gap-6 justify-center items-center">
        <h4 className="text-xs md:text-sm text-center font-lato font-medium uppercase text-[#181818]">
          {title}
        </h4>
        <h1 className="w-full md:w-[1100px] text-center font-sequel-normal font-normal text-3xl md:text-[64px] leading-tight md:leading-[76px] text-black tracking-tighter">
          {heading}
        </h1>
        <div className="mt-4 md:mt-6 w-full md:w-auto">
          <Link href={cta?.cta_btn_link ? cta?.cta_btn_link : "/"} className="block w-full md:w-auto">
            <Button
              size="lg"
              className="w-full md:w-auto rounded-full bg-primary text-sm md:text-base md:leading-[28px] backdrop-blur-[70px] py-2.5 md:py-[10px] px-4 md:px-[17px] font-lato font-medium text-white cursor-pointer"
            >
              {cta?.cta_btn_text ? cta?.cta_btn_text : "View all updates"}
              <span className="ml-2">
                <Image src={Ln} alt="down arrow" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InsightHero;
