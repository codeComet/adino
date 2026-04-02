import React from "react";
import Image from "next/image";
import { getStrapiMedia, renderDescription } from "@/lib/utils";

const ExploreHeader = ({ hero }) => {
  if (!hero) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const { heading, description, image } = hero;
  const imageUrl = getStrapiMedia(image?.url || image);

  const renderInline = (node, key) => {
    if (!node) return null;

    if (typeof node?.text === "string") {
      let content = node.text;
      if (node.bold) content = <strong>{content}</strong>;
      if (node.italic) content = <em>{content}</em>;
      if (node.underline) content = <u>{content}</u>;
      if (node.strikethrough) content = <s>{content}</s>;
      if (node.code) content = <code>{content}</code>;
      return <React.Fragment key={key}>{content}</React.Fragment>;
    }

    if (Array.isArray(node?.children)) {
      return (
        <React.Fragment key={key}>
          {node.children.map((child, index) =>
            renderInline(child, `${key}-${index}`),
          )}
        </React.Fragment>
      );
    }

    return null;
  };

  const renderDescriptionBlocks = (value) => {
    if (!value) return null;

    const pClassName =
      "font-lato font-normal text-base md:text-lg leading-[28px] text-black mb-6 last:mb-0";
    const liClassName =
      "font-lato font-normal text-base md:text-lg leading-[28px] text-black";
    const listClassName = "pl-5 mb-6 last:mb-0";

    if (typeof value === "string") {
      return <div>{renderDescription(value, { pClassName })}</div>;
    }

    if (!Array.isArray(value)) {
      return <p className={pClassName}>{String(value)}</p>;
    }

    return value.map((block, index) => {
      if (block?.type === "paragraph") {
        return (
          <p key={index} className={pClassName}>
            {Array.isArray(block?.children)
              ? block.children.map((n, i) => renderInline(n, `${index}-${i}`))
              : null}
          </p>
        );
      }

      if (block?.type === "list") {
        const isOrdered = block.format === "ordered";
        const ListTag = isOrdered ? "ol" : "ul";

        return (
          <ListTag
            key={index}
            className={`${listClassName} ${isOrdered ? "list-decimal" : "list-disc"}`}
          >
            {Array.isArray(block?.children)
              ? block.children.map((li, liIndex) => (
                  <li key={liIndex} className={liClassName}>
                    {Array.isArray(li?.children)
                      ? li.children.map((n, i) =>
                          renderInline(n, `${index}-${liIndex}-${i}`),
                        )
                      : null}
                  </li>
                ))
              : null}
          </ListTag>
        );
      }

      return null;
    });
  };

  return (
    <section className="w-wrapper mx-auto py-40 pb-10 px-4 md:px-0">
      {heading ? (
        <h1 className="font-sequel-normal text-[#181818] text-3xl sm:text-4xl md:text-[56px] md:leading-[64px] tracking-tighter max-w-5xl">
          {heading}
        </h1>
      ) : null}

      {imageUrl ? (
        <div className="relative w-full mt-10 h-[500px] md:h-[600px] bg-[#F4F4F5] overflow-hidden">
          <Image
            src={imageUrl}
            alt={heading || "CSR explore image"}
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      {description ? (
        <div className="max-w-5xl mt-10">
          {renderDescriptionBlocks(description)}
        </div>
      ) : null}
    </section>
  );
};

export default ExploreHeader;
