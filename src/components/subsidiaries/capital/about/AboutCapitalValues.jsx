import React from "react";

const AboutCapitalValues = ({ valuesData }) => {
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
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4">
        <div className="md:flex-1/2 flex flex-col gap-5">
          <h5 className="max-w-[180px] text-center font-lato text-sm uppercase text-primary font-medium rounded-full py-2 px-6 border border-primary">
            {valuesTitle || ""}
          </h5>

          <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[48px] tracking-tighter text-primary max-w-[460px]">
            {valuesHeading || ""}
          </h2>
        </div>
        <div className="md:flex-1/2 flex flex-col gap-5">
          <p className="font-lato font-medium text-base md:text-lg leading-[24px] md:leading-[30px] text-[#555555]">
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

export default AboutCapitalValues;
