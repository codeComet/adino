"use client";

import qs from "qs";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const query = qs.stringify(
  {
    populate: {
      content: {
        populate: {
          social_links: {
            populate: "*",
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

const getSubsidiaryNewsletter = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subsidiary-newsletter?${query}`
  );
  const data = await res.json();
  return data;
};

const SubsidiaryNewsletter = () => {
  const {
    data: subsidiaryNewsletter,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subsidiaryNewsletter"],
    queryFn: getSubsidiaryNewsletter,
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

  const { title, description, heading, social_links } =
    subsidiaryNewsletter?.data?.content;
  return (
    <div className="bg-[#F7F7F7] py-12 sm:py-16 md:py-20 lg:py-[104px]">
      <div className="w-wrapper mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-[94px] justify-between items-center px-4 md:px-0">
        <div className="bg-white rounded-2xl py-6 md:py-[37px] px-6 md:px-12 w-full shadow-sm mx-auto md:w-1/2">
          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter mb-[34px]">
            Start Growing Your Wealth Today!
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-base w-full"
            />
            <input
              type="email"
              placeholder="Email address"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-base w-full"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-base w-full"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-base w-full"
            />
            <textarea
              placeholder="Message"
              rows={3}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-base resize-none w-full"
            />
            <button
              type="submit"
              className="bg-green-800 text-white rounded-full py-3 mt-2 text-base font-medium hover:bg-green-900 transition w-full"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 w-full md:w-1/2">
          <h5 className="font-lato text-xs sm:text-sm uppercase text-black font-medium bg-white rounded-full py-1 px-3 sm:px-4 w-fit">
            {title}
          </h5>
          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
            {heading}
          </h2>
          <p className="font-lato font-medium text-base sm:text-lg leading-7 sm:leading-7.5 text-[#333333] max-w-full md:max-w-[350px]">
            {description}
          </p>

          {/* Social Links */}
          <div className="mt-5 md:mt-[120px] flex flex-col gap-6">
            {social_links.map((item, index) => (
              <a
                key={index}
                href={item.icon_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <Image
                  src={`${item?.icon_image?.url}`}
                  alt="icons"
                  width={35}
                  height={35}
                  className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"
                />
                <p className="font-lato font-normal text-sm md:text-base leading-6 text-[#0C1E21] tracking-tight">
                  {item?.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsidiaryNewsletter;
