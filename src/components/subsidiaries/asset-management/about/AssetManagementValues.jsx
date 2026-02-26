import React from "react";

const AssetManagementValues = ({ valuesData }) => {
  if (!valuesData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { valuesTitle, valuesHeading, valuesDescription, valueItems } =
    valuesData?.data || {};

  return (
    <div className="w-wrapper mx-auto flex flex-col gap-0 py-10 md:py-10">
      <div className="flex items-center gap-4 mb-10">
        <h4 className="uppercase w-[150px] md:w-[100px] text-[14px] font-lato font-normal text-[#666666]">
          {valuesTitle}
        </h4>
        <div className="h-[1px] w-full bg-[#DCDCDC]"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 md:gap-30">
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <h2 className="text-2xl leading-[45px] md:text-5xl md:leading-[60px] font-lato font-normal text-black md:max-w-[60%]">
            {valuesHeading}
          </h2>
          <p className="font-lato font-medium text-sm md:text-lg leading-[24px] md:leading-[30px] text-[#555555]">
            {valuesDescription}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-20">
        {valueItems?.map((item, index) => (
          <div
            key={item.id}
            className="bg-[#FAFAFA] relative p-8 md:p-10 rounded-sm"
          >
            <div className="font-inter absolute top-4 left-3 w-12 h-12 rounded-full bg-[#166636] flex items-center justify-center text-white text-lg font-medium transform -translate-x-1/2 -translate-y-1/2">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-4">
              <h3 className="font-inter text-xl md:text-2xl text-[#2E2F2F] mb-4">
                {item.title}
              </h3>
              <p className="font-inter text-base text-[#2E2F2F] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetManagementValues;
