import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const MissionVisionRichText = ({ content, variant }) => {
  if (!Array.isArray(content) || content.length === 0) return null;

  const paragraphClass =
    variant === "dark"
      ? "font-lato text-sm md:text-base leading-7 text-white/90"
      : "font-lato text-sm md:text-base leading-7 text-[#666666]";

  const listItemClass =
    variant === "dark"
      ? "font-lato text-sm md:text-base leading-7 text-white/90"
      : "font-lato text-sm md:text-base leading-7 text-[#666666]";

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className={paragraphClass}>{children}</p>
        ),
        list: ({ children, format }) => {
          const Tag = format === "ordered" ? "ol" : "ul";
          return (
            <Tag
              className={`mt-2 space-y-1 pl-5 ${
                format === "ordered" ? "list-decimal" : "list-disc"
              }`}
            >
              {children}
            </Tag>
          );
        },
        "list-item": ({ children }) => (
          <li className={listItemClass}>{children}</li>
        ),
      }}
      modifiers={{
        bold: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        italic: ({ children }) => <em className="italic">{children}</em>,
      }}
    />
  );
};

const MissionVisionCtaButton = ({ cta, variant }) => {
  const ctaItem = Array.isArray(cta) ? cta?.[0] : cta;
  if (!ctaItem?.cta_btn_text) return null;

  const href = ctaItem?.cta_btn_url || "#";
  const isExternal = Boolean(ctaItem?.isExternal);
  const className =
    variant === "dark"
      ? "inline-flex items-center justify-center rounded-full border border-white px-8 py-3 font-lato text-sm md:text-base font-medium text-white hover:bg-white/10 transition-colors"
      : "inline-flex items-center justify-center rounded-full border border-primary px-8 py-3 font-lato text-sm md:text-base font-medium text-primary hover:bg-primary/5 transition-colors";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
    >
      {ctaItem?.cta_btn_text}
    </a>
  );
};

const AboutAdinoPartnersMissionVission = ({ missionData }) => {
  const pageData = missionData?.attributes ?? missionData ?? {};

  if (!missionData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const { missionAndVisionItem, missionAndVisionBgImg } = pageData;

  const normalizeEntity = (entity) => {
    if (!entity) return null;
    if (entity?.attributes) return { id: entity.id, ...entity.attributes };
    return entity;
  };

  const normalizeItems = (input) => {
    if (Array.isArray(input)) return input.map(normalizeEntity);
    if (Array.isArray(input?.data)) return input.data.map(normalizeEntity);
    return [];
  };

  const items = normalizeItems(missionAndVisionItem);

  const findByHeading = (needle) =>
    items.find((item) =>
      String(item?.heading ?? item?.title ?? "")
        .toLowerCase()
        .includes(needle),
    );

  const visionItem = findByHeading("vision") ?? items?.[0] ?? null;
  const missionItem =
    findByHeading("mission") ??
    items?.find((i) => i?.id !== visionItem?.id) ??
    items?.[1] ??
    null;

  const backgroundInput =
    missionAndVisionBgImg?.url ??
    missionAndVisionBgImg?.data?.attributes?.url ??
    missionAndVisionBgImg?.data?.url ??
    missionAndVisionBgImg;
  const backgroundUrl = backgroundInput ? getStrapiMedia(backgroundInput) : "";

  return (
    <section className="w-full py-10 md:py-20">
      <div className="relative w-full min-h-[980px] md:min-h-[980px] lg:min-h-[1000px] overflow-hidden">
        {backgroundUrl ? (
          <Image
            src={backgroundUrl}
            alt="Mission and vision background"
            fill
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-[#D6E6DE]" />
        )}

        <div className="absolute inset-0 z-10">
          <div className="w-wrapper mx-auto h-full px-4 md:px-6 py-10 md:py-0">
            {/* Outer: vertically centers the whole block as one unit */}
            <div className="relative h-full flex items-center">
              {/* Inner: explicit height = vision card approx height + mission card top offset */}
              {/* Adjust h values to match your actual card heights */}
              <div
                className="relative w-full flex flex-col gap-6
            md:block md:h-[480px] lg:h-[520px]"
              >
                {visionItem ? (
                  <div
                    className="
                w-full
                md:absolute md:left-0 md:top-0
                md:w-[460px] lg:w-[520px]
                bg-white p-7 md:p-12
                shadow-[0_18px_60px_rgba(0,0,0,0.15)]
              "
                  >
                    <h3 className="font-sequel-normal text-primary text-3xl md:text-4xl leading-tight tracking-tighter">
                      {visionItem?.heading || visionItem?.title || ""}
                    </h3>
                    <div className="mt-5 space-y-4">
                      <MissionVisionRichText
                        content={visionItem?.description}
                        variant="light"
                      />
                    </div>
                    <div className="mt-10">
                      <MissionVisionCtaButton
                        cta={visionItem?.cta}
                        variant="light"
                      />
                    </div>
                  </div>
                ) : null}

                {missionItem ? (
                  <div
                    className="
                w-full
                md:absolute md:left-[220px] lg:left-[320px] md:top-[200px] lg:top-[220px]
                md:w-[520px] lg:w-[620px]
                bg-[#B49355] p-7 md:p-12
                shadow-[0_18px_60px_rgba(0,0,0,0.20)]
              "
                  >
                    <h3 className="font-sequel-normal text-white text-3xl md:text-4xl leading-tight tracking-tighter">
                      {missionItem?.heading || missionItem?.title || ""}
                    </h3>
                    <div className="mt-5 space-y-4">
                      <MissionVisionRichText
                        content={missionItem?.description}
                        variant="dark"
                      />
                    </div>
                    <div className="mt-10">
                      <MissionVisionCtaButton
                        cta={missionItem?.cta}
                        variant="dark"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdinoPartnersMissionVission;
