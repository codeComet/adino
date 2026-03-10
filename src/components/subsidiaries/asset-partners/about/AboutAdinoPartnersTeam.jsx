import React, { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { getStrapiMedia } from "@/lib/utils";

const RichTextRenderer = ({ content, className, pClassName }) => {
  if (!content) return null;

  // If it's a string, just render it in a paragraph
  if (typeof content === "string") {
    return (
      <p
        className={`text-base leading-7 text-[#333333] font-lato ${pClassName || ""}`}
      >
        {content}
      </p>
    );
  }

  // If it's an array (Strapi blocks)
  if (Array.isArray(content)) {
    return (
      <div
        className={`flex flex-col gap-4 text-base leading-7 text-[#333333] font-lato ${className || ""}`}
      >
        {content.map((item, index) => {
          if (item.type === "paragraph") {
            return (
              <p key={index} className={pClassName || ""}>
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

const AboutAdinoPartnersTeam = ({ teamData }) => {
  const data =
    teamData?.data?.attributes ||
    teamData?.data ||
    teamData?.attributes ||
    teamData ||
    {};

  const { teamHeading, teamDescription, teamMembers } = data;
  const [selectedMember, setSelectedMember] = useState(null);

  if (!teamData) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="w-full px-4 md:px-6 lg:w-wrapper mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-sequel-normal font-normal text-[#054F30] leading-tight tracking-tight">
            {teamHeading}
          </h2>

          <div className="mt-3">
            <RichTextRenderer
              content={teamDescription}
              className="items-center"
              pClassName="text-[#666666] text-sm md:text-base leading-[22px] md:leading-[26px]"
            />
          </div>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers?.map((member) => (
            <div
              key={member.id}
              className="group cursor-pointer rounded-2xl border border-[#E9E9E9] bg-white p-4 transition-colors hover:bg-[#F2FBF6] hover:border-[#D7F2E3]"
              onClick={() => setSelectedMember(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setSelectedMember(member);
              }}
            >
              <div className="relative w-full aspect-4/5 overflow-hidden rounded-xl bg-[#D9D9D9]">
                {member.image && (
                  <Image
                    src={getStrapiMedia(member.image)}
                    alt={member.name || "Team Member"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <h3 className="text-[#000000] font-sequel-normal font-medium text-base md:text-lg leading-snug">
                    {member?.name}
                  </h3>
                  <p className="w-fit bg-[#F4FFFB] p-2 text-primary font-lato text-base md:text-lg mt-2">
                    {member?.location_designation}
                  </p>
                </div>

                <div className="mt-1 text-[#666666] group-hover:text-primary transition-colors">
                  <ArrowUpRight className="w-7 h-7" />
                </div>
              </div>
            </div>
          ))}
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
                <div className="flex gap-5 items-start justify-start">
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
                  <div className="flex-1">
                    <Dialog.Title className="text-lg md:text-3xl font-sequel-normal font-medium text-black mb-1">
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

export default AboutAdinoPartnersTeam;
