import React from "react";
import { renderDescriptionFromEditor } from "@/lib/utils";

const AdinoGlobalMarketAboutSection = ({ aboutData }) => {
  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { about_heading, about_description } = aboutData || {};

  const descriptionNode = Array.isArray(about_description) ? (
    renderDescriptionFromEditor(about_description, {
      pClassName:
        "text-center w-full md:w-[80%] mx-auto mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px]",
    })
  ) : (
    <p className="text-center w-full md:w-[80%] mx-auto mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px] font-lato">
      {about_description || ""}
    </p>
  );

  return (
    <section className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-0">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-[#E4EDF4] backdrop-blur-md px-4 py-1">
          <p className="font-lato font-medium text-sm leading-5 text-black uppercase">
            who we are
          </p>
        </div>
        <h2 className="w-full md:w-[70%] mx-auto mt-5 font-sequel-normal text-[#181818] text-3xl md:text-5xl leading-tight tracking-tighter">
          {about_heading || ""}
        </h2>
        {descriptionNode}
      </div>
    </section>
  );
};

export default AdinoGlobalMarketAboutSection;
