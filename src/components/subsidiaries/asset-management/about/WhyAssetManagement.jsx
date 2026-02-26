import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const WhyAssetManagement = ({ whyAssetManagementData }) => {
  if (!whyAssetManagementData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { whyTitle, whyDescription, featureCompetitor } =
    whyAssetManagementData?.data || {};

  return (
    <div className="bg-[#F9F9FB]">
      <div className="w-wrapper mx-auto flex flex-col gap-0 py-10 md:py-20">
        <div className="flex flex-col items-center justify-center gap-6 mb-10">
          <h2 className="text-2xl leading-[45px] md:text-5xl md:leading-[60px] font-lato font-normal text-[#171A1C]">
            {whyTitle}
          </h2>
          <p className="text-center w-full md:w-[70%] text-[14px] leading-[24px] md:text-[20px] md:leading-[30px] font-lato font-normal text-[#555555]">
            {whyDescription}
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-10">
          <div className="hidden md:flex flex-row justify-between pb-4 mb-6 border-b border-gray-200">
            <h3 className="w-1/3 text-lg font-semibold text-[#545973]">
              Feature
            </h3>
            <h3 className="w-2/3 text-lg font-semibold text-[#545973]">
              Competitors
            </h3>
          </div>

          <div className="flex flex-col gap-6 md:gap-0">
            {featureCompetitor?.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row py-4 md:py-6 gap-2 md:gap-10 ${
                  index !== featureCompetitor.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="w-full md:w-1/3">
                  <h4 className="text-lg md:text-xl font-medium text-[#171A1C]">
                    {item.title1}
                  </h4>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-base text-[#555555] leading-relaxed">
                    {item.title2}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyAssetManagement;
