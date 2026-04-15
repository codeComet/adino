import React, { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { getStrapiMedia } from "@/lib/utils";

const RichTextRenderer = ({ content, className, pClassName }) => {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <p
        className={`text-base font-medium leading-7 text-[#474B64] font-lato ${pClassName || ""}`}
      >
        {content}
      </p>
    );
  }

  if (Array.isArray(content)) {
    return (
      <div
        className={`flex flex-col gap-4 text-base leading-7 text-[#474B64] font-lato ${className || ""}`}
      >
        {content.map((item, index) => {
          if (item.type === "paragraph") {
            return (
              <p key={index} className={pClassName || ""}>
                {item.children?.map((child, i) => {
                  if (child.bold) {
                    return (
                      <strong key={i} className="font-bold">
                        {child.text}
                      </strong>
                    );
                  }
                  return child.text;
                })}
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
                {item.children?.map((listItem, liIndex) => (
                  <li key={liIndex}>
                    {listItem.children?.map((child, i) => {
                      if (child.bold) {
                        return (
                          <strong key={i} className="font-bold">
                            {child.text}
                          </strong>
                        );
                      }
                      return child.text;
                    })}
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

const getMemberImageSource = (image) => {
  if (!image) return null;
  return getStrapiMedia(image?.url || image);
};

const AssetManagementTeam = ({ teamData }) => {
  const data =
    teamData?.data?.attributes ||
    teamData?.data ||
    teamData?.attributes ||
    teamData ||
    {};

  const [selectedMember, setSelectedMember] = useState(null);

  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { teamTitle, teamHeading, teamDescription, teamMembers } = data;

  return (
    <>
      <div className="w-wrapper mx-auto flex flex-col gap-0 py-10 md:py-10">
        <div className="flex items-center gap-4 mb-10">
          <h4 className="uppercase w-[150px] md:w-[100px] text-[14px] font-lato font-normal text-[#666666]">
            {teamTitle}
          </h4>
          <div className="h-px w-full bg-[#DCDCDC]"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 md:gap-30">
          <div className="flex flex-col justify-center gap-6 md:w-1/2">
            <h2 className="text-2xl leading-[45px] md:text-5xl md:leading-[60px] font-lato font-normal text-black md:max-w-[90%] tracking-tighter">
              {teamHeading}
            </h2>
            <div className="font-lato font-medium text-sm md:text-lg leading-[24px] md:leading-[30px] text-[#555555]">
              <RichTextRenderer
                content={teamDescription}
                pClassName="font-lato font-medium text-sm md:text-lg leading-[24px] md:leading-[30px] text-[#555555]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 md:mt-16">
          {teamMembers?.map((member) => {
            const memberImageSrc = getMemberImageSource(member.image);

            return (
              <div
                key={member.id}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedMember(member)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedMember(member);
                  }
                }}
              >
                <div className="relative w-full aspect-4/5 mb-4 overflow-hidden bg-[#8B8B9E]">
                  {memberImageSrc && (
                    <Image
                      src={memberImageSrc}
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
                    <p className="text-white font-lato text-sm text-left mt-1 italic">
                      {member?.location_designation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog.Root
        open={!!selectedMember}
        onOpenChange={(open) => !open && setSelectedMember(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[32px] md:p-10 max-h-[90vh] overflow-y-auto">
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
              <Dialog.Close className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                <X className="h-6 w-6 text-gray-500" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {selectedMember && (
              <div className="flex flex-col gap-8">
                <div className="flex gap-5 items-start justify-start">
                  <div className="relative w-[100px] h-[100px] rounded-[24px] overflow-hidden bg-[#F0F0F0] mx-auto md:mx-0 shrink-0">
                    {getMemberImageSource(selectedMember.image) && (
                      <Image
                        src={getMemberImageSource(selectedMember.image)}
                        alt={
                          selectedMember.image?.alternativeText ||
                          selectedMember.name ||
                          "Team Member"
                        }
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 pr-8">
                    <Dialog.Title className="text-lg md:text-3xl font-sequel-normal font-medium text-black mb-1">
                      {selectedMember?.name}
                    </Dialog.Title>
                    <p className="text-black font-lato text-lg font-medium mb-6">
                      {selectedMember?.location_designation}
                    </p>
                  </div>
                </div>

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
    </>
  );
};

export default AssetManagementTeam;
