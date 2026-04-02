"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getStrapiMedia } from "@/lib/utils";

const normalizeGalleryItems = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  if (Array.isArray(input?.data))
    return input.data.map((entry) => entry?.attributes ?? entry);
  return [];
};

const pickImageUrl = (item, kind) => {
  if (!item) return "";
  if (typeof item === "string") return getStrapiMedia(item);

  const media = item?.attributes ?? item;
  const formats = media?.formats ?? media?.attributes?.formats;
  const baseUrl = media?.url ?? media?.attributes?.url ?? "";

  if (kind === "thumb") {
    const url =
      formats?.small?.url ||
      formats?.thumbnail?.url ||
      formats?.medium?.url ||
      baseUrl;
    return getStrapiMedia(url);
  }

  const url =
    formats?.large?.url ||
    formats?.medium?.url ||
    formats?.small?.url ||
    baseUrl;
  return getStrapiMedia(url);
};

const Gallery = ({ gallery }) => {
  const items = useMemo(() => normalizeGalleryItems(gallery), [gallery]);
  const [activeIndex, setActiveIndex] = useState(null);

  const safeActiveIndex =
    activeIndex === null ? null : Math.min(activeIndex, items.length - 1);
  const isOpen = safeActiveIndex !== null && items.length > 0;

  const activeItem = isOpen ? items[safeActiveIndex] : null;
  const activeAlt =
    activeItem?.alternativeText ||
    activeItem?.caption ||
    activeItem?.name ||
    "Gallery image";

  const goPrev = useCallback(() => {
    if (!items.length) return;
    setActiveIndex((current) => {
      const safeCurrent = typeof current === "number" ? current : 0;
      return (safeCurrent - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const goNext = useCallback(() => {
    if (!items.length) return;
    setActiveIndex((current) => {
      const safeCurrent = typeof current === "number" ? current : 0;
      return (safeCurrent + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, goPrev, goNext]);

  if (!items.length) return null;

  return (
    <section className="w-wrapper mx-auto pb-20 md:pb-[104px] px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const thumbSrc = pickImageUrl(item, "thumb");
          const alt =
            item?.alternativeText ||
            item?.caption ||
            item?.name ||
            "Gallery image";

          return (
            <button
              key={item?.documentId || item?.id || `${alt}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative w-full overflow-hidden rounded-[20px] bg-[#F4F4F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <div className="relative w-full h-[240px] md:h-[260px]">
                {thumbSrc ? (
                  <Image
                    src={thumbSrc}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#E7EEE9]" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <Dialog.Title className="sr-only">
              {activeAlt || "Gallery image viewer"}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Use left and right arrow keys to navigate between images.
            </Dialog.Description>
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
              <Dialog.Close className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-40"
              disabled={items.length <= 1}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-40"
              disabled={items.length <= 1}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {activeItem ? (
              <div className="relative w-full max-w-6xl h-[70vh] sm:h-[80vh]">
                {pickImageUrl(activeItem, "large") ? (
                  <Image
                    src={pickImageUrl(activeItem, "large")}
                    alt={activeAlt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-black/20" />
                )}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white text-sm font-lato">
                  {safeActiveIndex + 1} / {items.length}
                </div>
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default Gallery;
