"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { renderDescription } from "@/lib/utils";

const Services = ({ data }) => {
  const { title, heading, services, description } = data || {};
  const [selectedService, setSelectedService] = useState(null);
  const serviceList = Array.isArray(services) ? services : [];

  if (!data) return null;

  return (
    <div className="w-full bg-[#EDF3F1] py-12 sm:py-16 md:py-20 lg:py-[104px]">
      <div className="w-wrapper mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 justify-between items-center sm:gap-6 pb-3 border-b border-[#00000033] md:pb-15">
          <div className="flex flex-col gap-4 flex-1">
            <h5 className="font-lato text-base md:text-xl uppercase text-primary font-medium bg-white rounded-full py-1 px-3 sm:px-4 w-fit">
              {title}
            </h5>
            <h2 className="font-sequel-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-5xl leading-[1.2] md:leading-[60px] tracking-tighter">
              {heading}
            </h2>
          </div>
          <div className="flex-1">
            {renderDescription(description, { pClassName: "text-black text-justify" })}
          </div>
        </div>

        {/* services */}

        {serviceList.length !== 0
          ? serviceList.map((item, index) => (
              <div
                className="flex flex-col md:flex-row md:items-center justify-between py-4 sm:py-5 border-b border-[#00000033] gap-4 md:gap-0"
                key={index}
              >
                <div className="flex flex-col gap-2 sm:gap-3 w-full md:w-2/3">
                  <h3 className="font-sequel-normal text-xl sm:text-2xl leading-8 sm:leading-10 text-black tracking-tighter">
                    {item.title}
                  </h3>
                  {renderDescription(item.description, {
                    pClassName: "text-[#333333] text-justify",
                  })}
                </div>
                {item?.url_text && (
                <button
                  type="button"
                  onClick={() => setSelectedService(item)}
                  className="flex gap-2.5 items-center text-sm sm:text-base hover:underline"
                >
                  {item?.url_text}
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-[18px] sm:h-[19px]"
                  >
                    <path
                      d="M2 9.38989H16M16 9.38989L11.8933 13.3899M16 9.38989L11.8933 5.38989"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                )}
              </div>
            ))
          : null}
      </div>

      <Dialog.Root
        open={!!selectedService}
        onOpenChange={(open) => !open && setSelectedService(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-[24px] bg-white px-6 py-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="absolute right-4 top-4">
              <Dialog.Close className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                <X className="h-6 w-6 text-gray-500" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {selectedService ? (
              <div className="flex flex-col gap-6">
                <Dialog.Title className="font-sequel-normal text-2xl sm:text-3xl leading-tight text-black tracking-tighter">
                  {selectedService?.title}
                </Dialog.Title>

                {selectedService?.description ? (
                  <p className="font-lato font-medium text-base sm:text-lg leading-7 sm:leading-7.5 text-[#333333]">
                    {selectedService.description}
                  </p>
                ) : null}

                {selectedService?.url ? (
                  <Link
                    href={selectedService.url || "#"}
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-lato text-sm sm:text-base font-medium text-white hover:bg-green-700 transition-colors"
                  >
                    {selectedService?.url_text || "Get Started Today"}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Services;
