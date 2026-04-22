"use client";

import Image from "next/image";
import greenLogo from "../../../public/assets/img/logo-green.svg";
import { getStrapiMedia } from "@/lib/utils";

export const Logo = ({ media }) => {
  const mediaUrl = getStrapiMedia(media);

  return (
    <div className="flex shrink-0 items-center">
      <Image
        src={mediaUrl || greenLogo}
        alt="Adino Logo"
        width={170}
        height={60}
        priority
        className="h-auto w-[120px] sm:w-[140px] lg:w-[160px] xl:w-[250px] 2xl:w-[270px]"
      />
    </div>
  );
};
