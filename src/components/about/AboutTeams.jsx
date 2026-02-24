"use client";

import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { useAboutPageData } from "@/lib/aboutPage";

const AboutTeams = () => {
  const { data: aboutTeamsData, isLoading } = useAboutPageData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const aboutSections =
    aboutTeamsData?.data?.aboutSections ||
    aboutTeamsData?.data?.attributes?.aboutSections;
  const teamSection = aboutSections?.find(
    (section) => section.__component === "about.about-team",
  );

  if (!teamSection) return null;

  const {
    teamTitle,
    teamDescription,
    directorTitle,
    directorDescription,
    teamMember,
  } = teamSection;

  return (
    <div className="w-full bg-[#1F2020] pt-[50px] md:pt-[100px] pb-[125px] md:pb-[250px]">
      <div className="w-full px-4 md:px-6 lg:w-wrapper mx-auto">
        <div className="flex flex-col gap-[33px] md:gap-[21px] mb-10 md:mb-20">
          <h4 className="text-[#AD9056] font-lato font-medium text-xs md:text-sm leading-[100%] uppercase">
            {teamTitle}
          </h4>
          <h2 className="text-white font-sequel-normal text-[20px] md:text-[28px] leading-[30px] md:leading-[42px] tracking-tighter w-full md:w-[80%]">
            {teamDescription}
          </h2>
        </div>

        <div className="flex flex-col gap-[33px] md:gap-[21px] mb-10 md:mb-20">
          <h4 className="text-[#AD9056] font-lato font-medium text-xs md:text-sm leading-[100%] uppercase">
            {directorTitle}
          </h4>
          <h2 className="text-white font-sequel-normal text-[20px] md:text-[28px] leading-[30px] md:leading-[42px] tracking-tighter w-full md:w-[80%]">
            {directorDescription}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {teamMember?.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center md:items-start mb-10"
            >
              <div className="relative w-full h-auto sm:w-[265px] sm:h-[295px]">
                <Image
                  src={getStrapiMedia(member?.image?.url)}
                  alt={member?.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-sequel-normal text-[18px] md:text-[22px] leading-[26px] md:leading-[30px] mt-4 text-center md:text-left">
                {member?.name}
              </h3>
              <p className="text-[#F6F6F6] font-lato font-normal text-base md:text-lg leading-[26px] md:leading-[30px] mt-2 text-center md:text-left">
                {member?.designation}
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                {member?.social_links?.map((link) => (
                  <a
                    key={link.id}
                    href={link?.icon_url}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer"
                  >
                    <Image
                      src={getStrapiMedia(link?.icon_image?.url)}
                      alt={link?.icon_image?.url}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTeams;
