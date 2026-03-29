"use client";

import Image from "next/image";
import greenLogo from "../../../public/assets/img/logo-green.svg";
import { getStrapiMedia } from "@/lib/utils";

export const Logo = ({ media }) => {
  const mediaUrl = getStrapiMedia(media);

  return (
    <div className="flex items-center space-x-2">
      <Image
        src={mediaUrl || greenLogo}
        alt="Adino Logo"
        width={170}
        height={60}
        priority
        className="md:scale-130"
      />
    </div>
  );
};
