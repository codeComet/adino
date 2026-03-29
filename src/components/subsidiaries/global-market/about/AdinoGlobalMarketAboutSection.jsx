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
        "w-full md:w-[90%] mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px]",
    })
  ) : (
    <p className="w-full md:w-[90%] mt-5 text-[#666666] text-base md:text-lg leading-normal md:leading-[34px] font-lato">
      {about_description || ""}
    </p>
  );

  return (
    <section className="w-wrapper mx-auto py-10 md:py-20 px-4 md:px-0">
      <div className="max-w-4xl">
        <h2 className="w-full md:w-[70%] mt-5 font-sequel-normal text-[#181818] text-3xl md:text-5xl leading-tight tracking-tighter">
          {about_heading || ""}
        </h2>
        {descriptionNode}
      </div>
    </section>
  );
};

export default AdinoGlobalMarketAboutSection;
