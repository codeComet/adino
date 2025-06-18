'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import RightArrow from "../../../public/assets/img/arrow-right.svg";

const getCareerData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[sections][populate]=*`
  );
  const data = await res.json();
  return data;
};

const HomeCareer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCareerData();
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

  console.log('career', data)

  const title = data?.sections[3]?.title;
  const heading = data?.sections[3]?.heading;
  const description = data?.sections[3]?.description;
  const btn_text = data?.sections[3]?.button?.cta_btn_text;
  const btn_url = data?.sections[3]?.button?.cta_btn_url;
  const external_url = data?.sections[3]?.button?.isExternal;
  const image = data?.sections[3]?.image?.url ? `${data?.sections[3]?.image?.url}` : "";

  return (
    <section className="w-wrapper mx-auto my-6 md:my-12">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
        {/* Left (content) side */}
        <div className="w-full md:flex-1 py-8 md:py-[90px] px-6 md:px-[50px] bg-[#F3F8F7] rounded-2xl">
          <span className="text-gray-600 text-sm font-medium uppercase">
            {title}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mt-2 md:mt-4 leading-tight">
            {heading}
          </h2>
          <p className="text-gray-600 text-base max-w-md mt-4 md:mt-6 mb-6">
            {description}
          </p>
          <Link
            href={btn_url ? btn_url : "#"}
            target={external_url ? "_blank" : "_self"}
            className="inline-flex items-center bg-green-700 hover:bg-green-800 text-white text-sm md:text-base px-4 md:px-6 py-2 rounded-full shadow transition-colors font-medium"
          >
            {btn_text}
            <span className="ml-2">
              <Image src={RightArrow} alt="down arrow" width={20} height={20} className="md:w-6 md:h-6" />
            </span>
          </Link>
        </div>
        {/* Right (image) side */}
        <div className="w-full md:flex-1 flex justify-center md:justify-end">
          <div className="relative rounded-[12px] w-full md:right-[80px]">
            {image && (
              <Image
                src={image}
                alt={title || "Career image"}
                width={800}
                height={100}
                className="w-full h-auto object-contain"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCareer