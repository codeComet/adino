import React from "react";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import { renderDescription } from "@/lib/utils";

const AboutAdinoPartnersWhySection = ({ whySectionData }) => {
  const { title, description, icon } = whySectionData;
  return (
    <div className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-8 md:gap-30 justify-between">
        <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
          <Image
            src={getStrapiMedia(icon?.url) || "https://placehold.co/600x400"}
            alt="About Image"
            width={600}
            height={400}
            className="h-full object-cover rounded-lg md:rounded-none"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-6 justify-center w-full md:w-1/2">
          <div className="flex flex-col gap-6 max-w-[400px]">
            <h2 className="font-sequel-normal text-primary text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter max-w-[460px]">
              {title}
            </h2>
          </div>
          <div>{renderDescription(description)}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutAdinoPartnersWhySection;
