import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AssetManagementModel = ({ modelData }) => {
  if (!modelData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { ourModel, ourStrength } = modelData?.data || {};


  return (
    <div className="w-wrapper mx-auto flex flex-col gap-20 py-0 md:py-20">
      {/* Strength */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 md:gap-30">
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <h2 className="text-2xl leading-[45px] md:text-5xl md:leading-[60px] font-lato font-normal text-black">
            {ourStrength?.title}
          </h2>
          <div className="font-lato font-normal text-base md:text-lg leading-[24px] md:leading-[30px] text-[#3B3E3C] flex flex-col gap-4">
            {ourStrength?.description_editor?.map((item, index) => {
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
                    className={`pl-5 ${item.format === "ordered" ? "list-decimal" : "list-disc"}`}
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
        </div>

        <div className="md:w-1/2">
          <Image
            src={getStrapiMedia(ourStrength?.image?.url)}
            alt={ourModel?.image?.alternativeText || "our model image"}
            width={300}
            height={200}
            className="rounded-md w-full h-auto"
            unoptimized={true}
          />
        </div>
      </div>

      {/* Model */}

      <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between gap-6 md:gap-30 md:flex-nowrap">
        <div className="md:w-1/2">
          <Image
            src={getStrapiMedia(ourModel?.image?.url)}
            alt={ourModel?.image?.alternativeText || "our model image"}
            width={300}
            height={200}
            className="rounded-md w-full h-auto"
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col gap-6 md:w-1/2 justify-center">
          <h2 className="text-2xl leading-[45px] md:text-5xl md:leading-[60px] font-lato font-normal text-black">
            {ourModel?.title}
          </h2>
          <div className="font-lato font-normal text-base md:text-lg leading-[24px] md:leading-[30px] text-[#3B3E3C] flex flex-col gap-4">
            {ourModel?.description_editor?.map((item, index) => {
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
                    className={`pl-5 ${item.format === "ordered" ? "list-decimal" : "list-disc"}`}
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
        </div>
      </div>
    </div>
  );
};

export default AssetManagementModel;
