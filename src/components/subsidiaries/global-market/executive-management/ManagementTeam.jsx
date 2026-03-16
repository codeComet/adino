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
            <div key={key} className="flex flex-col gap-4">
              <div className="w-full aspect-4/5 relative bg-[#D9D9D9] rounded-2xl overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-1 items-center">
                <h3 className="font-lato font-medium text-base md:text-[20px] leading-[1.2] tracking-tight text-[#0E1435]">
                  {member?.name || ""}
                </h3>
                <p className="font-lato font-normal text-base text-[#474B64]">
                  {member?.location_designation || ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ManagementTeam;
