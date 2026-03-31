import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RichTextRenderer = ({ content }) => {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <p className="font-lato font-medium text-white/70 text-base md:text-lg leading-[28px] md:leading-[34px] text-center">
        {content}
      </p>
    );
  }

  if (Array.isArray(content)) {
    return (
      <div className="flex flex-col gap-4 font-lato font-medium text-white/70 text-base md:text-lg leading-[28px] md:leading-[34px] text-center max-w-4xl mx-auto">
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

  const {
    whyAdinoSectionCta,
    whyAdinoSectionHeading,
    whyAdinoSectionDescription,
  } = whySectionData;

  const ctas = Array.isArray(whyAdinoSectionCta)
    ? whyAdinoSectionCta
    : whyAdinoSectionCta
      ? [whyAdinoSectionCta]
      : [];

  return (
    <section className="w-full bg-linear-to-b from-[#F0FDF4] to-white py-10 md:py-20">
      <div className="w-wrapper mx-auto px-4 md:px-0">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-primary px-6 py-10 md:px-16 md:py-16 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div
            className="absolute left-0 bottom-0 w-[280px] h-[180px] opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />
          <div
            className="absolute right-0 bottom-0 w-[280px] h-[180px] opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {whyAdinoSectionHeading ? (
              <h2 className="font-sequel-normal text-white text-[28px] md:text-5xl lg:text-[56px] leading-[1.1] tracking-tighter">
                {whyAdinoSectionHeading}
              </h2>
            ) : null}

            {whyAdinoSectionDescription ? (
              <div className="mt-5 md:mt-7 max-w-[920px]">
                <RichTextRenderer content={whyAdinoSectionDescription} />
              </div>
            ) : null}

            {ctas.length ? (
              <div className="mt-7 md:mt-10 flex flex-wrap items-center justify-center gap-3">
                {ctas.map((btn, index) => {
                  const href = btn?.cta_btn_url || "/";
                  const isExternal =
                    Boolean(btn?.isExternal) ||
                    (typeof href === "string" && href.startsWith("http"));
                  const className =
                    "inline-flex items-center justify-center gap-2 bg-white text-[#0F5132] font-lato font-semibold text-sm md:text-base px-6 py-3 rounded-full hover:bg-white/95 transition-colors";

                  return isExternal ? (
                    <a
                      key={btn?.id ?? `${btn?.cta_btn_text ?? "cta"}-${index}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {btn?.cta_btn_text || "Contact us"}
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <Link
                      key={btn?.id ?? `${btn?.cta_btn_text ?? "cta"}-${index}`}
                      href={href}
                      className={className}
                    >
                      {btn?.cta_btn_text || "Contact us"}
                      <ArrowRight size={16} />
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdinoCapitalWhySection;
