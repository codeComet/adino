import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AssetManagementServiceSection = ({ serviceData }) => {
  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { serviceTitle, serviceDescription, serviceItems } = serviceData;
  return (
    <div className="w-wrapper mx-auto flex items-center justify-center py-10 md:py-20 px-0 bg relative">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl leading-tight font-sequel-normal tracking-tighter text-center text-[#181818] mb-8">
          {serviceTitle}
        </h2>
        <p className="w-full md:w-[60%] text-lg leading-[30px] text-center text-[#666666] mb-10 md:mb-[64px]">
          {serviceDescription}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((item, index) => (
            <div key={index} className="bg-primary p-6 rounded-lg shadow-md">
              <Image
                src={getStrapiMedia(item.icon)}
                alt={item.title}
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="font-sequel-normal text-xl md:text-[26px] md:leading-[30px] font-bold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-lg leading-[30px] font-lato text-white">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetManagementServiceSection;
