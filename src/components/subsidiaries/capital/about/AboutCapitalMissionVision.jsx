import React from "react";
import Image from "next/image";

const AboutCapitalMissionVision = ({ missionVisionData }) => {

  if (!missionVisionData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const vision = missionVisionData[0] || [];
  const mission = missionVisionData[1] || [];


  return (
    <div>
      <div className="w-wrapper mx-auto py-10 md:py-30 flex flex-col md:flex-row gap-3 md:gap-5 justify-between px-0 md:px-6">
        {/* Left */}
        <div className="md:flex-1/2 flex flex-col gap-4 md:gap-6 justify-center items-start bg-[#F4F4F4] rounded-[20px] py-4 md:py-[30px] px-6 md:px-[25px]">
          <div className="w-full flex items-center justify-between">
            <h5 className="font-lato text-sm uppercase text-primary font-medium rounded-full py-2 px-6 border border-primary">
              {vision?.title || ""}
            </h5>
            <Image
              src={vision?.image?.url || "https://placehold.co/100x100"}
              alt={vision?.title || ""}
              width={100}
              height={100}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[48px] tracking-tighter text-[#0C0C0D] max-w-[460px]">
            {vision?.heading || ""}
          </h2>
          <p className="text-base md:text-lg md:leading-[30px] font-lato text-[#0C0C0D]">
            {vision?.description || ""}
          </p>
        </div>

        {/* Right */}
        <div className="md:flex-1/2 flex flex-col gap-4 md:gap-6 justify-center items-start bg-[#F4F4F4] rounded-[20px] py-4 md:py-[30px] px-6 md:px-[25px]">
          <div className="w-full flex items-center justify-between">
            <h5 className="font-lato text-sm uppercase text-primary font-medium rounded-full py-2 px-6 border border-primary">
              {mission?.title || ""}
            </h5>
            <Image
              src={mission?.image?.url || "https://placehold.co/100x100"}
              alt={mission?.title || ""}
              width={100}
              height={100}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[48px] tracking-tighter text-[#0C0C0D] max-w-[460px]">
            {mission?.heading || ""}
          </h2>
          <p className="text-base md:text-lg md:leading-[30px] font-lato text-[#0C0C0D]">
            {mission?.description || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCapitalMissionVision;
