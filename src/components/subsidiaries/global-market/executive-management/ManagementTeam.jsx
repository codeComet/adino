import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const ManagementTeam = ({ teamData }) => {
  if (!teamData) return null;

  const members = Array.isArray(teamData)
    ? teamData
    : Array.isArray(teamData?.data)
      ? teamData.data
      : Array.isArray(teamData?.teamMembers)
        ? teamData.teamMembers
        : [];

  if (!members.length) return null;

  return (
    <section className="w-wrapper mx-auto pb-16 md:pb-24 px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, index) => {
          const key = member?.id ?? `${index}-${member?.name ?? "member"}`;
          const imageUrl = getStrapiMedia(member?.image);
          const alt =
            member?.image?.alternativeText ||
            member?.image?.caption ||
            member?.name ||
            "Team member";

          return (
            <div key={key} className="flex flex-col items-center group">
              <div className="relative w-full aspect-4/5 mb-4 overflow-hidden bg-[#8B8B9E] rounded-2xl">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : null}

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
                    {member?.name || ""}
                  </h3>
                  <p className="text-white/80 font-lato text-sm text-left mt-1">
                    {member?.location_designation || ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ManagementTeam;
