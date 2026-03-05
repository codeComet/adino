import React from "react";
import Image from "next/image";

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const AdinoCapitalServices = ({ serviceItems = [] }) => {
  if (!Array.isArray(serviceItems) || serviceItems.length === 0) return null;

  const hasTwoInLastRowAtLg = serviceItems.length % 3 === 2;

  return (
    <div className="w-wrapper mx-auto px-0 py-10 md:py-20">
      <div className="bg-[#F4F7F6] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-px bg-[#F4F7F6]">
          {serviceItems.map((item, index) => {
            const icon = item?.icon?.url;
            const heading = item?.title;
            const description = item?.description;


            const isLastTwoAtLg =
              hasTwoInLastRowAtLg && index >= serviceItems.length - 2;
            const lgColSpanClass = isLastTwoAtLg
              ? "lg:col-span-3"
              : "lg:col-span-2";

            return (
              <div
                key={`${heading ?? "service"}-${index}`}
                className={`bg-white px-6 py-10 md:px-10 md:py-14 ${lgColSpanClass}`}
              >
                <div className="flex flex-col gap-4 md:gap-6">
                  {icon ? (
                    <div className="w-6 h-6 md:w-7 md:h-7 relative">
                      {isNonEmptyString(icon) ? (
                        <Image
                          src={icon}
                          alt={isNonEmptyString(heading) ? heading : "Service"}
                          fill
                          sizes="28px"
                          className="object-contain"
                        />
                      ) : (
                        icon
                      )}
                    </div>
                  ) : null}

                  {heading ? (
                    <h3 className="font-sequel-normal text-primary tracking-tighter text-[28px] md:text-[32px] leading-[1.15]">
                      {heading}
                    </h3>
                  ) : null}

                  {description ? (
                    <p className="font-lato font-medium text-[#666666] text-sm md:text-base leading-[24px] md:leading-[28px] max-w-[560px]">
                      {description}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdinoCapitalServices;
