"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      aboutSections: {
        on: {
          "about.about-team": {
            populate: [
              "team",
              "team.image",
              "team.social_links",
              "team.social_links.icon_image",
            ],
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

// get data from strapi
const getAboutTeamsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?${query}`
  );
  const data = await res.json();
  return data;
};

const AboutTeams = () => {
  const { data: aboutTeamsData, isLoading } = useQuery({
    queryKey: ["aboutTeams"],
    queryFn: getAboutTeamsData,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }


  const {title, heading, team} = aboutTeamsData?.data?.aboutSections[0]

  return (
    <div className="w-full bg-[#1F2020] pt-[50px] md:pt-[100px] pb-[125px] md:pb-[250px]">
      <div className="w-full px-4 md:px-6 lg:w-wrapper mx-auto">
        <div className="flex flex-col gap-[15px] md:gap-[21px] mb-10 md:mb-20">
          <h4 className="text-white font-lato font-medium text-xs md:text-sm leading-[100%] uppercase">
            {title}
          </h4>
          <h2 className="text-white font-sequel-normal text-[32px] md:text-[48px] leading-[40px] md:leading-[60px]">
            {heading}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center md:justify-between gap-6">
          {team?.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center md:items-start mb-10"
            >
              <div className="relative w-full h-auto sm:w-[265px] sm:h-[295px]">
                <Image
                  src={member?.image?.url}
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
                      src={link?.icon_image?.url}
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
}

export default AboutTeams;
