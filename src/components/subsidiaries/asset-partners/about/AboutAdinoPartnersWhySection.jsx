import React from "react";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import { renderDescription } from "@/lib/utils";

const AboutAdinoPartnersWhySection = ({ whySectionData }) => {
  const { title, description, icon } = whySectionData?.whyAdinoSection || {};
  const { cta_btn_text, cta_btn_url } =
    whySectionData?.whyAdinoSectionCta || {};

  const imageUrl = getStrapiMedia(icon?.url) || "https://placehold.co/1600x900";
  const hasContent = Boolean(title || description || cta_btn_text);
  if (!imageUrl && !hasContent) return null;

  return (
    <section className="w-full">
      <div className="relative overflow-hidden min-h-[520px] md:min-h-[620px]">
        <Image
          src={imageUrl}
          alt={title || "Why Choose Adino Partners"}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
          priority={false}
        />

        <div className="relative z-10 w-full h-full flex items-center justify-center md:justify-end p-4 md:p-15">
          <div className="w-full max-w-[620px] bg-white shadow-sm p-6 sm:p-8 md:p-12">
            <h2 className="font-sequel-normal text-primary text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
              {title}
            </h2>

            <div className="mt-6 font-lato text-[#666666] text-sm md:text-base leading-[26px] md:leading-[30px]">
              {renderDescription(description)}
            </div>

            {cta_btn_text ? (
              <div className="mt-10">
                <a
                  href={cta_btn_url || "#"}
                  className="inline-flex items-center justify-center rounded-full border border-primary text-primary px-8 py-3 text-sm md:text-base font-lato"
                >
                  {cta_btn_text}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdinoPartnersWhySection;
