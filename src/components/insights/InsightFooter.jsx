"use client";

import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Image from "next/image";
import Ln from "../../../public/assets/img/ln.svg";
import Link from "next/link";

const query = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true }
);

const getInsightFooterData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/insight?${query}`
  );
  const data = await res.json();
  return data;
};

const InsightFooter = () => {
  const {
    data: insightFooterData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["insightFooter"],
    queryFn: getInsightFooterData,
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
  console.log(insightFooterData);

  const { footer_text, footer_bg, cta } = insightFooterData?.data;
  return (
    <div
      className="w-wrapper mx-auto flex flex-col justify-center items-center gap-9 py-30 mt-10 mb-30 rounded-[30px]"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${footer_bg?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
    >
      <h2 className="w-full md:max-w-[45%] mx-auto text-xl font-medium text-center leading-8 font-lato text-white uppercase">
        {footer_text}
      </h2>
      <div className="w-full mx-auto md:w-auto">
        <Link
          href={cta?.cta_btn_link ? cta?.cta_btn_link : "/"}
          className="block w-full text-center md:w-auto"
        >
          <Button
            size="lg"
            className="w-auto rounded-full bg-white hover:bg-white text-sm md:text-base md:leading-[28px] backdrop-blur-[70px] py-2.5 md:py-[10px] px-4 md:px-[17px] font-lato font-medium text-primary cursor-pointer"
          >
            {cta?.cta_btn_text ? cta?.cta_btn_text : "View all updates"}
            <span className="ml-2">
              <Image
                src={Ln}
                alt="down arrow"
                width={20}
                height={20}
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InsightFooter;
