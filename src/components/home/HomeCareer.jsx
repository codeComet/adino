'use client';
import Image from 'next/image'
import Link from 'next/link';
import RightArrow from "../../../public/assets/img/arrow-right.svg";
import { useQuery } from '@tanstack/react-query';

const getCareerData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[sections][populate]=*`
  );
  const data = await res.json();
  return data;
};

const HomeCareer = () => {
  const { data: careerData, isLoading, isError } = useQuery({
    queryKey: ["career"],
    queryFn: getCareerData,
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

  const title = careerData?.data?.sections?.[3]?.title ?? 'Career';
  const heading = careerData?.data?.sections?.[3]?.heading ?? 'Join Us';
  const description = careerData?.data?.sections?.[3]?.description ?? 'Description coming soon';
  const btn_text = careerData?.data?.sections?.[3]?.button?.cta_btn_text ?? 'Apply Now';
  const btn_url = careerData?.data?.sections?.[3]?.button?.cta_btn_url ?? '#';
  const external_url = careerData?.data?.sections?.[3]?.button?.isExternal ?? false;
  const image =
    careerData?.data?.sections?.[3]?.image?.url ?? "https://placehold.co/800x400";

  return (
    <section className="w-wrapper mx-auto my-6 md:my-12">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
        {/* Left (content) side */}
        <div className="w-full md:flex-1 py-8 md:py-[90px] px-6 md:px-[50px] bg-[#F3F8F7] rounded-2xl">
          <span className="text-gray-600 text-sm font-medium uppercase">
            {title}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-sequel-normal text-gray-900 mt-2 md:mt-4 leading-tight tracking-tighter">
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