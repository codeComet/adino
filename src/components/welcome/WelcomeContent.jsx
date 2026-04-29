"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useWelcomePageData } from "@/lib/welcomePage";
import HomeContent from "@/components/home/HomeContent";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getStrapiMedia } from "@/lib/utils";
import { X } from "lucide-react";
import quoteIcon from "../../../public/assets/img/quote.png";

const WelcomeContent = () => {
  const { data } = useWelcomePageData();
  const [dismissed, setDismissed] = useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem("adino_welcome_dismissed");
      if (stored === "true") {
        setDismissed(true);
      }
    } catch {}
  }, []);

  const handleDismiss = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("adino_welcome_dismissed", "true");
    }
    setDismissed(true);
  }, []);

  const pageData = useMemo(() => {
    const payload = data?.data ?? data;
    if (Array.isArray(payload)) return payload[0] ?? null;
    return payload ?? null;
  }, [data]);

  const blocks = useMemo(
    () => ({
      paragraph: ({ children }) => (
        <p className="font-lato text-base md:text-lg leading-6 text-white">
          {children}
        </p>
      ),
      heading: ({ children, level }) => {
        const Tag = `h${level}`;
        return (
          <Tag className="font-lato font-semibold md:text-[20px] leading-snug tracking-tight text-white text-base mb-2">
            {children}
          </Tag>
        );
      },
      list: ({ children, format }) => {
        const Tag = format === "ordered" ? "ol" : "ul";
        return (
          <Tag
            className={`pl-5 ${
              format === "ordered" ? "list-decimal" : "list-disc"
            }`}
          >
            {children}
          </Tag>
        );
      },
      "list-item": ({ children }) => (
        <li className="font-lato text-sm leading-6 text-white/90">
          {children}
        </li>
      ),
    }),
    [],
  );

  const modifiers = useMemo(
    () => ({
      bold: ({ children }) => <strong className="font-bold">{children}</strong>,
      italic: ({ children }) => <em className="italic">{children}</em>,
    }),
    [],
  );

  if (dismissed) {
    return <HomeContent />;
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg relative">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    pageLogo,
    title,
    heading,
    description,
    testimonial,
    approachTitle,
    approachItems,
    approachDescription,
  } = pageData;

  const logoUrl = getStrapiMedia(
    pageLogo?.formats?.thumbnail?.url || pageLogo?.url || pageLogo,
  );
  const testimonialImageUrl = getStrapiMedia(
    testimonial?.image?.formats?.medium?.url ||
      testimonial?.image?.url ||
      testimonial?.image,
  );
  const descriptionFirstTwo = Array.isArray(description)
    ? description.slice(0, 2)
    : null;
  const descriptionRest = Array.isArray(description)
    ? description.slice(2)
    : null;
  return (
    <div className="fixed inset-0 z-100 overflow-y-auto bg-primary text-white">
      <div className="w-wrapper mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col items-start gap-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={title || "Adino Group"}
                width={100}
                height={100}
                className="h-[100px] w-[100px] object-contain"
                priority
              />
            ) : null}
            <p className="font-lato text-base font-semibold md:text-lg uppercase tracking-tight text-white">
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close"
            className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#B49355] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <X className="h-8 w-8 text-[#AD9056] cursor-pointer" />
          </button>
        </div>

        <div className="mt-6 max-w-4xl">
          <h1 className="font-sequel-normal text-[20px] md:text-[36px] leading-snug text-white tracking-tighter">
            {heading}
          </h1>

          {Array.isArray(description) ? (
            <div className="mt-9">
              <div className="border-l-4 border-[#AD9056] pl-5">
                <BlocksRenderer
                  content={descriptionFirstTwo}
                  blocks={blocks}
                  modifiers={modifiers}
                />
              </div>
              {descriptionRest?.length ? (
                <div className="mt-4 pl-5">
                  <BlocksRenderer
                    content={descriptionRest}
                    blocks={blocks}
                    modifiers={modifiers}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {testimonial ? (
          <div className="mt-16 md:mt-32">
            <div className="grid grid-cols-1 md:grid-cols-[420px_minmax(0,1fr)] lg:grid-cols-[460px_minmax(0,1fr)] gap-14 lg:gap-20 items-start md:items-stretch mx-auto">
              {/* LEFT IMAGE */}
              <div className="relative w-full max-w-[460px] md:h-full">
                <div className="overflow-hidden rounded-[2px] md:h-full">
                  {testimonialImageUrl ? (
                    <Image
                      src={testimonialImageUrl}
                      alt={testimonial?.name || "Testimonial"}
                      width={480}
                      height={560}
                      className="w-full h-[400px] sm:h-[420px] md:h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-[400px] sm:h-[420px] md:h-full bg-white/10" />
                  )}
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="relative text-white pt-2 md:pt-0">
                {/* QUOTE ICON */}
                <div className="mb-6 md:mb-8">
                  <Image
                    src={quoteIcon}
                    alt="Quote"
                    width={52}
                    height={52}
                    className="h-10 w-10 md:h-12 md:w-12 object-contain"
                    priority
                  />
                </div>

                {/* TEXT */}
                {Array.isArray(testimonial?.description) && (
                  <div className="space-y-5 max-w-[760px]">
                    <BlocksRenderer
                      content={testimonial.description}
                      blocks={{
                        ...blocks,
                        paragraph: ({ children }) => (
                          <p className="font-lato text-base md:text-lg leading-8 md:leading-[1.9] text-white">
                            {children}
                          </p>
                        ),
                      }}
                      modifiers={modifiers}
                    />
                  </div>
                )}

                {/* LINE */}
                <div className="mt-8 md:mt-10 h-[2px] w-24 bg-[#B49355]" />
                <div className="w-[260px] md:w-[320px] mt-8">
                  <p className="font-lato text-xl md:text-[22px] leading-tight font-normal text-white mb-2">
                    {testimonial?.name}
                  </p>
                  <p className="font-lato text-base md:text-lg leading-snug text-white">
                    {testimonial?.location_designation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-16 md:mt-32 text-center">
          <h2 className="font-sequel-normal text-[30px] md:text-[42px] leading-tight tracking-tighter md:max-w-[50%] mx-auto">
            {approachTitle}
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-15 bg-[#B49355]" />
        </div>

        {Array.isArray(approachItems) ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {approachItems.map((item) => {
              const iconUrl = getStrapiMedia(
                item?.icon?.url ||
                  item?.icon?.data?.attributes?.url ||
                  item?.icon,
              );

              return (
                <div
                  key={item.id}
                  className="rounded-[6px] bg-[#B49355] min-h-[260px] md:min-h-[320px] px-7 md:px-8 py-7 md:py-9 flex flex-col"
                >
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={item?.title || "Icon"}
                      width={40}
                      height={40}
                      className="h-8 w-8 md:h-9 md:w-9 object-contain"
                    />
                  ) : (
                    <div className="h-8 w-8 md:h-9 md:w-9" />
                  )}

                  <p className="mt-8 md:mt-10 font-lato text-[20px] md:text-[26px] leading-none uppercase tracking-[0.02em] text-white">
                    {item?.title}
                  </p>

                  <p className="mt-10 md:mt-14 font-lato text-[16px] md:text-[18px] leading-loose text-white/95 whitespace-pre-line max-w-[260px]">
                    {item?.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}

        {Array.isArray(approachDescription) ? (
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <BlocksRenderer
              content={approachDescription}
              blocks={{
                ...blocks,
                paragraph: ({ children }) => (
                  <p className="font-lato text-lg md:text-[22px] italic leading-8 text-white">
                    {children}
                  </p>
                ),
              }}
              modifiers={modifiers}
            />
            <div className="mx-auto mt-5 h-[2px] w-10 bg-[#B49355]" />
          </div>
        ) : null}

        <div className="mt-12 flex justify-center pb-10">
          <button
            type="button"
            onClick={handleDismiss}
            className="h-11 px-10 rounded-full bg-white text-[#0E5B37] font-lato text-base font-semibold hover:bg-white/90 cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
