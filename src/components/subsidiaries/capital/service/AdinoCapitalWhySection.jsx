import React from "react";
import Image from "next/image";
import Link from "next/link";

const RichTextRenderer = ({ content }) => {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <p className="font-lato font-medium text-white text-base md:text-lg leading-relaxed">
        {content}
      </p>
    );
  }

  if (Array.isArray(content)) {
    return (
      <div className="flex flex-col gap-4 font-lato font-medium text-white text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
        {content.map((item, index) => {
          if (item.type === "paragraph") {
            return (
              <p key={index}>
                {item.children.map((child, childIndex) => (
                  <span
                    key={childIndex}
                    className={child.bold ? "font-bold" : ""}
                  >
                    {child.text}
                  </span>
                ))}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return null;
};

const AdinoCapitalWhySection = ({ whySectionData }) => {
  if (!whySectionData) return null;

  const { heading, description_1, cta_btn } = whySectionData;
  const bgImage =
    "https://supportive-creativity-cd56af8fec.media.strapiapp.com/Section_CTA_Section_3fa55eb78c.png";

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-[#0F5132]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-wrapper mx-auto px-6 md:px-10 text-center">
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {/* Heading */}
          {heading && (
            <h2 className="font-sequel-normal text-[#C5A059] text-3xl md:text-5xl lg:text-[56px] leading-tight tracking-tight">
              {heading}
            </h2>
          )}

          {/* Description */}
          {description_1 && (
            <div className="max-w-[900px]">
              <RichTextRenderer content={description_1} />
            </div>
          )}

          {/* CTA Button */}
          {cta_btn && cta_btn.length > 0 && (
            <div className="mt-4">
              {cta_btn.map((btn) => (
                <Link
                  key={btn.id}
                  href={btn.cta_btn_url || "/"}
                  className="inline-flex items-center justify-center bg-white text-[#0F5132] font-lato font-bold text-base md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-full transition-transform hover:scale-105 hover:shadow-lg"
                >
                  {btn.cta_btn_text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdinoCapitalWhySection;
