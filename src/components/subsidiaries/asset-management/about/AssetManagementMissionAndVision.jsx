import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AssetManagementMissionAndVision = ({ missionAndVisionData }) => {
  if (!missionAndVisionData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { missionAndVision} = missionAndVisionData?.data || {};


  return (
    <div className="w-wrapper mx-auto flex flex-col gap-0 py-10 md:py-10">
      <div className="flex items-center gap-4 mb-10">
        <h4 className="uppercase w-[150px] md:w-[100px] text-[14px] font-lato font-normal text-[#666666]">
          {missionAndVision?.title}
        </h4>
        <div className="h-[1px] w-full bg-[#DCDCDC]"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 md:gap-30">
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <h2 className="text-2xl leading-[45px] md:text-5xl md:leading-[60px] font-lato font-normal text-black md:max-w-[60%]">
            {missionAndVision?.heading}
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-20 justify-center items-center mt-10 md:mt-20">
        <div className="w-full md:w-1/2">
          {missionAndVision?.stats?.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2.5 mb-10 md:mb-20">
              <h2 className="font-sequel-normal text-xl leading-8 md:text-2xl md:leading-10 text-black">
                {item?.stat_number}
              </h2>
              <p className="font-lato font-medium text-sm md:text-lg leading-[24px] md:leading-[30px] text-[#555555]">
                {item?.stat_desc}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2">
          <Image
            src={getStrapiMedia(missionAndVision?.missionImage?.url)}
            alt="mission and vision image"
            width={1000}
            height={720}
            className="rounded-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AssetManagementMissionAndVision;
