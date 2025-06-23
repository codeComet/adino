import Image from "next/image";
import React from "react";

const CareerBenefits = (data) => {
  let CareerBenefitsData = data?.data;
  if (!CareerBenefitsData || !CareerBenefitsData.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>No data available</p>
      </div>
    );
  }

  console.log(CareerBenefitsData);
  const { title, heading, description, benefits } =
    CareerBenefitsData?.data?.career[2] || {};
  return (
    <div className="w-wrapper mx-auto py-10 md:py-32">
      <div className="flex flex-wrap justify-between items-end gap-4 md:gap-0">
        <div className="flex flex-col gap-8 w-full md:flex-2/5">
          <h5 className="font-lato text-sm uppercase text-[#181818] font-medium">
            {title}
          </h5>
          <h2 className="font-sequel-normal text-[#08090A] text-4xl leading-10 md:text-5xl md:leading-[60px]">
            {heading}
          </h2>
        </div>
        <div className="flex w-full md:flex-3/5 justify-end">
          <p className="w-full md:max-w-[340px]">{description}</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex flex-col gap-8 mt-10 md:mt-20">
        {benefits && benefits.length > 0 ? (
          <div className="flex flex-col flex-wrap">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between gap-4 md:gap-0 w-full bg-[#F6F6F6] py-[28px] px-[32px] rounded-[10px] sticky top-0 mb-6 md:mb-8"
              >
                <div className="flex flex-col justify-around w-full md:w-1/3">
                  <div className="mb-5 md:mb-0">
                    <h2 className="text-primary font-lato font-medium text-4xl leading-8 md:text-5xl md:leading-14">
                      0{index + 1}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-sequel-normal text-[#181818] text-3xl leading-10 md:text-[40px] md:leading-12">
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-base leading-6 text-[#666666]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-2/3 flex justify-center md:justify-end">
                  <Image
                    src={`${benefit.image.url}`}
                    alt={benefit.title}
                    width={700}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No benefits available</p>
        )}
      </div>
    </div>
  );
};

export default CareerBenefits;
