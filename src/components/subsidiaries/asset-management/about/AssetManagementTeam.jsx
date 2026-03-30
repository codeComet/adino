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
          <div key={member.id} className="flex flex-col items-center group">
            <div className="relative w-full aspect-4/5 mb-4 overflow-hidden bg-[#8B8B9E]">
              {member.image?.url && (
                <Image
                  src={getStrapiMedia(member.image.url)}
                  alt={
                    member.image?.alternativeText ||
                    member.name ||
                    "Team Member"
                  }
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}

              <div
                className="absolute bottom-0 left-0 right-0 h-1/4 pl-4 py-6 flex flex-col items-start justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, #166635 100%)",
                  backdropFilter: "blur(1px)",
                  boxShadow: "0px 2.7px 24.33px 0px #00000033",
                }}
              >
                <h3 className="text-white font-sequel-normal font-medium text-sm md:text-[20px] text-left leading-snug">
                  {member?.name}
                </h3>
                <p className="text-white/80 font-lato text-sm text-left mt-1">
                  {member?.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetManagementTeam;
