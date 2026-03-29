import React from "react";
import minusIcon from "../../../../../public/assets/img/accordion-circle-minus.svg";
import Image from "next/image";

const AdinoGlobalMarketAboutMissionVission = ({ missionVisionData }) => {
  if (!missionVisionData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-wrapper mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="md:w-1/2">
          <p className="text-base font-sequel-normal font-medium text-primary md:text-lg uppercase leading-tight tracking-tighter w-fit px-4 py-2 bg-[#F0FDF4] rounded-full text-center">
            who we are
          </p>
        </div>
        <div className="flex flex-col flex-wrap">
          {missionVisionData?.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col justify-start gap-6 w-full border-0 py-5 md:py-10 ${index === 0 ? "md:border-b md:border-[#0000000D]" : ""} ${index === 0 ? "pt-0!" : ""}`}
            >
              <div className="flex justify-between items-center">
                <div
                  className="inline-flex items-start justify-start rounded-full bg-primary px-4 py-1 w-fit"
                  style={{
                    boxShadow:
                      "0px 2px 4px 0px #FFFFFF40 inset, 0px 1px 14px 0px #057C8B59",
                  }}
                >
                  <p className="font-lato font-medium text-sm leading-5 text-white uppercase">
                    {item?.title || ""}
                  </p>
                </div>
                <div>
                  <Image src={minusIcon} alt="minus" width={24} height={24} />
                </div>
              </div>
              <p className="text-base md:text-lg leading-[28px] font-lato font-medium text-[#787878] md:max-w-[85%]">
                {item?.description || ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdinoGlobalMarketAboutMissionVission;
