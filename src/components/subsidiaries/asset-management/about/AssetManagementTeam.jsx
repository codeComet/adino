import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AssetManagementTeam = ({ teamData }) => {
  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { teamTitle, teamHeading, teamDescription, teamMembers } =
    teamData?.data || {};

  return (
    <div className="w-wrapper mx-auto flex flex-col gap-0 py-10 md:py-10">
      <div className="flex items-center gap-4 mb-10">
        <h4 className="uppercase w-[150px] md:w-[100px] text-[14px] font-lato font-normal text-[#666666]">
          {teamTitle}
        </h4>
        <div className="h-[1px] w-full bg-[#DCDCDC]"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 md:gap-30">
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <h2 className="text-2xl leading-[45px] md:text-5xl md:leading-[60px] font-lato font-normal text-black md:max-w-[90%]">
            {teamHeading}
          </h2>
          <p className="font-lato font-medium text-sm md:text-lg leading-[24px] md:leading-[30px] text-[#555555]">
            {teamDescription}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 md:mt-16">
        {teamMembers?.map((member) => (
          <div key={member.id} className="flex flex-col gap-4">
            <div className="w-full aspect-square relative bg-[#E5E0DD] overflow-hidden">
              {member.image?.url && (
                <Image
                  src={getStrapiMedia(member.image.url)}
                  alt={member.image.alternativeText || member.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-medium text-black">{member.name}</h3>
              <p className="text-base text-black">{member.designation}</p>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {member.social_links?.map((link) => (
                <a
                  key={link.id}
                  href={link.icon_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.icon_image?.url && (
                    <Image
                      src={getStrapiMedia(link.icon_image.url)}
                      alt={link.name || "Social Icon"}
                      width={24}
                      height={24}
                      className="w-5 h-5 object-contain"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetManagementTeam;
