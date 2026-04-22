"use client";

import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { useAboutPageData } from "@/lib/aboutPage";
import eyeIcon from "../../../public/assets/img/eye.svg";
import rocketIcon from "../../../public/assets/img/rocket.svg";

const AboutMission = () => {
  const { data: aboutMission, isLoading } = useAboutPageData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const missionData =
    aboutMission?.data?.mission || aboutMission?.data?.attributes?.mission;
  if (!Array.isArray(missionData) || missionData.length === 0) return null;

  const visionItem = missionData[0];
  const missionItem = missionData[1] || null;
  const leftImageUrl = getStrapiMedia(visionItem?.image?.url);

  return (
    <div className="w-wrapper mx-auto pb-[60px] md:pb-[120px] px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-stretch">
        {/* LEFT IMAGE */}
        <div className="relative w-full h-full">
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-[6px]">
            {leftImageUrl ? (
              <Image
                src={leftImageUrl}
                alt={visionItem?.title || "About image"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#D6E6DE]" />
            )}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-8 md:gap-16 h-full">
          <div className="rounded-[10px] bg-primary px-7 md:px-10 py-7 md:py-9 text-white flex-1">
            <div className="flex items-center gap-3">
              <Image
                src={eyeIcon}
                alt="Vision"
                width={22}
                height={22}
                className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]"
              />
              <p className="font-lato text-xs md:text-sm font-semibold uppercase tracking-[0.12em]">
                {visionItem?.title}
              </p>
            </div>

            <p className="mt-5 font-lato text-base md:text-lg leading-7 md:leading-8 text-white text-justify md:max-w-[80%]">
              {visionItem?.description}
            </p>
          </div>

          {missionItem ? (
            <div className="rounded-[10px] bg-[#B49355] px-7 md:px-10 py-7 md:py-9 text-white flex-1">
              <div className="flex items-center gap-3">
                <Image
                  src={rocketIcon}
                  alt="Mission"
                  width={22}
                  height={22}
                  className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]"
                />
                <p className="font-lato text-xs md:text-sm font-semibold uppercase tracking-[0.12em]">
                  {missionItem?.title}
                </p>
              </div>

              <p className="mt-5 font-lato text-base md:text-lg leading-7 md:leading-8 text-white text-justify md:max-w-[80%]">
                {missionItem?.description}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
