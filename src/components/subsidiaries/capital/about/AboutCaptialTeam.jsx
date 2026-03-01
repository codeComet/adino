import React, { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { getStrapiMedia } from "@/lib/utils";

const RichTextRenderer = ({ content }) => {
  if (!content) return null;

  // If it's a string, just render it in a paragraph
  if (typeof content === "string") {
    return (
      <p className="text-base leading-7 text-[#333333] font-lato">{content}</p>
    );
  }

  // If it's an array (Strapi blocks)
  if (Array.isArray(content)) {
    return (
      <div className="flex flex-col gap-4 text-base leading-7 text-[#333333] font-lato">
        {content.map((item, index) => {
          if (item.type === "paragraph") {
            return (
              <p key={index}>
                {item.children.map((child) => child.text).join("")}
              </p>
            );
          }
          if (item.type === "list") {
            const ListTag = item.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`pl-5 ${
                  item.format === "ordered" ? "list-decimal" : "list-disc"
                }`}
              >
                {item.children.map((listItem, liIndex) => (
                  <li key={liIndex}>
                    {listItem.children.map((child) => child.text).join("")}
                  </li>
                ))}
              </ListTag>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return null;
};

const AboutCaptialTeam = ({ teamData }) => {
  console.log(teamData);
  const { teamTitle, teamHeading, teamDescription, teamMembers } =
    teamData?.data || {};
  const [selectedMember, setSelectedMember] = useState(null);

  if (!teamData) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="w-full px-4 md:px-6 lg:w-wrapper mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex">
              <span className="font-lato text-sm uppercase text-primary font-medium rounded-full py-2 px-6 border border-primary">
                {teamTitle || "OUR TEAM"}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-sequel-normal font-normal text-[#054F30] leading-tight tracking-tight">
              {teamHeading}
            </h2>

            <div className="mt-2">
              <RichTextRenderer content={teamDescription} />
            </div>
          </div>

          {/* Right Column: Team Members Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {teamMembers?.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-2xl bg-[#F0F0F0]">
                  {member.image && (
                    <Image
                      src={getStrapiMedia(member.image)}
                      alt={member.name || "Team Member"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>

                <h3 className="text-[#000000] font-sequel-normal font-medium text-lg text-center leading-snug">
                  {member?.name}
                </h3>

                <p className="text-[#666666] font-lato text-sm text-center mt-1">
                  {member?.location_designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Member Detail Modal */}
      <Dialog.Root
        open={!!selectedMember}
        onOpenChange={(open) => !open && setSelectedMember(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[32px] md:p-10 max-h-[90vh] overflow-y-auto">
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
              <Dialog.Close className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                <X className="h-6 w-6 text-gray-500" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {selectedMember && (
              <div className="flex flex-col gap-8">
                {/* Modal Image */}
                <div className="flex gap-5 items-center">
                  <div className="relative w-[100px] h-[100px] md:w-[100px] md:h-[100px] rounded-[24px] overflow-hidden bg-[#F0F0F0] mx-auto md:mx-0">
                    {selectedMember.image && (
                      <Image
                        src={getStrapiMedia(selectedMember.image)}
                        alt={selectedMember.name || "Team Member"}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <Dialog.Title className="text-3xl font-sequel-normal font-medium text-black mb-1">
                      {selectedMember?.name}
                    </Dialog.Title>

                    <p className="text-[#054F30] font-lato text-lg font-medium mb-6">
                      {selectedMember?.location_designation}
                    </p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1">
                  <div className="prose prose-sm max-w-none text-[#333333] font-lato">
                    <RichTextRenderer
                      content={
                        selectedMember.fullBio ||
                        selectedMember.bio ||
                        selectedMember.description
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default AboutCaptialTeam;
