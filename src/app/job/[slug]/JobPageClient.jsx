
"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RightArrow from "../../../../public/assets/img/arrow-right.svg";
import Image from "next/image";
import BulletList from "./BulletList";
import Newsletter from "@/components/generic/Newsletter";
import { getJobData } from "@/lib/api/job";

const JobPageClient = ({ slug }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job", slug],
    queryFn: () => getJobData(slug),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const {
    title,
    type,
    summary,
    short_description,
    location,
    department,
    key_responsibilities_text,
    qualifications_text,
    experience_text,
    join_adino_text,
    key_responsibilities,
    qualifications,
    experience,
    join_adino,
    cta,
  } = data?.data[0] || {};


  return (
    <>
      <div className="w-wrapper mx-auto py-[100px] md:py-[150px] flex flex-col md:flex-row justify-between items-start px-4 md:px-0">
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-12.5 pr-0 md:pr-40 mb-10 md:mb-0">
          <div className="max-w-20">
            <Link
              href="/careers"
              className="flex gap-2 items-center justify-between text-[#08090A] text-base md:text-lg leading-6 font-lato font-normal"
            >
              <ChevronLeft className="text-[8px]" /> Back
            </Link>
          </div>

          <div>
            <span className="inline-block w-fit px-3 py-1.5 bg-[#EFFDF4] text-[#166636] text-sm rounded-full text-center font-medium font-inter">
              {type}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-5xl w-full md:max-w-[400px] font-sequel-normal text-[#181818] leading-[1.2] md:leading-[60px] mt-4 md:mt-6 mb-2 md:mb-3">
              {title}
            </h1>
            <p className="text-sm md:text-lg w-full md:max-w-[400px] text-[#666666] font-lato font-medium leading-6 md:leading-7.5">
              {short_description}
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-lato font-medium leading-[100%] text-[#181818] uppercase">
                Location:
              </h3>
              <p className="text-sm md:text-lg text-[#666666] font-lato font-medium leading-7.5">
                {location}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-lato font-medium leading-[100%] text-[#181818] uppercase">
                Department:
              </h3>
              <p className="text-sm md:text-lg text-[#666666] font-lato font-medium leading-7.5">
                {department}
              </p>
            </div>
          </div>

          <div>
            <Link
              href={cta?.cta_btn_url ? cta?.cta_btn_url : "#"}
              target={`${cta?.isExternal ? "_blank" : ""}`}
            >
              <Button
                size="lg"
                className="rounded-full bg-primary text-sm md:text-base leading-7 backdrop-blur-[70px] py-2 md:py-2.5 px-4 md:px-5 font-lato font-medium text-white cursor-pointer"
              >
                {cta?.cta_btn_text}{" "}
                <span className="ml-2">
                  <Image
                    src={RightArrow}
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

        {/* Right */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-4 border-t md:border-t-0 md:border-l border-[#CCCCCC] pt-8 md:pt-0 md:pl-20">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl leading-8 md:leading-10 font-sequel-normal font-normal text-[#08090A]">
              Job Summary
            </h3>
            <p className="text-sm md:text-lg text-[#666666] font-lato font-medium leading-6 md:leading-7.5">
              {summary && summary[0]?.children[0]?.text}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl md:text-2xl leading-8 md:leading-10 font-sequel-normal font-normal text-[#08090A]">
              {key_responsibilities_text}
            </h3>
            <div>
              {key_responsibilities?.map((item, index) => (
                <BulletList key={index} item={item?.value} />
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl md:text-2xl leading-8 md:leading-10 font-sequel-normal font-normal text-[#08090A]">
              {qualifications_text}
            </h3>
            <div>
              {qualifications?.map((item, index) => (
                <BulletList key={index} item={item?.value} />
              ))}
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl md:text-2xl leading-8 md:leading-10 font-sequel-normal font-normal text-[#08090A]">
              {experience_text}
            </h3>
            <div>
              {experience?.map((item, index) => (
                <BulletList key={index} item={item?.value} />
              ))}
            </div>
          </div>

          {/* Join Adino */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl md:text-2xl leading-8 md:leading-10 font-sequel-normal font-normal text-[#08090A]">
              {join_adino_text}
            </h3>
            <h4 className="font-inter text-base md:text-lg leading-6 md:leading-6.5 text-[#222] mb-2 md:mb-[11px]">
              At <strong>Adino</strong>, we offer:{" "}
            </h4>
            <div>
              {join_adino?.map((item, index) => (
                <BulletList key={index} item={item?.value} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Newsletter/>
    </>
  );
};

export default JobPageClient;
