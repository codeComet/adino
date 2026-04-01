import React from "react";
import { renderDescriptionFromEditor } from "@/lib/utils";

const AboutAdinoPartnersAbout = ({ aboutData }) => {
  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { about_heading, about_description } = aboutData;

  return (
    <div className="w-wrapper mx-auto py-10 md:py-20">
      <h5 className="font-lato text-base md:text-xl uppercase font-medium text-[#5D6D78] rounded-full py-2 w-fit">
        About
      </h5>
      <h2 className="font-sequel-normal text-primary text-3xl leading-12 md:text-5xl md:leading-15 tracking-tighter">
        {about_heading}
      </h2>
      {renderDescriptionFromEditor(about_description, {
        pClassName:
          "w-full md:w-[80%] text-justify mt-5 text-[#666666] text-base md:text-lg leading-8 md:leading-[40px]",
      })}
    </div>
  );
};

export default AboutAdinoPartnersAbout;
