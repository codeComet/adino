"use client";

import { useState, useEffect } from "react";
import qs from "qs";
import BlogCard from "../ui/cards/BlogCard";
import RightArrow from "../../../public/assets/img/arrow-right.svg";
import Image from "next/image";
import { Button } from "../ui/button";

const query = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true }
);

const getNewsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?${query}`
  );
  const data = await res.json();
  return data;
};

const HomeNews = () => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNewsData();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Don't render content until data is loaded
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-wrapper mx-auto py-8 md:py-30 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-[37px] gap-6 md:gap-0">
        <div className="flex flex-col gap-4 md:gap-6">
          <h4 className="text-base md:text-lg text-left font-lato font-medium uppercase text-[#181818]">
            News & Updates
          </h4>
          <h2 className="text-3xl md:text-[64px] font-normal text-left font-sequel-normal leading-tight md:leading-[72px] text-[#181818]">
            Discover Our <br className="hidden md:block" /> Latest Insights
          </h2>
        </div>
        <div className="w-full md:w-auto">
          <Button
            size="lg"
            className="w-full md:w-auto rounded-full bg-primary text-sm md:text-base backdrop-blur-[70px] py-3 md:py-[15px] px-4 md:pl-6 md:pr-2.5 font-lato font-medium text-white cursor-pointer"
          >
            View all updates
            <span className="ml-2">
              <Image src={RightArrow} alt="down arrow" width={24} height={24} />
            </span>
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {data?.map((item) => (
          <BlogCard
            key={item.id}
            title={item?.title}
            summary={item?.summary}
            image={`${item?.banner_image?.url}`}
            category={item?.category}
            url={item?.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeNews;
