'use client';

import Image from "next/image";
import logo from "../../../public/assets/img/logo.svg";

export const Logo = () => (
  <div className="flex items-center space-x-2">
    <Image src={logo} alt="Adino Logo" width={140} height={100} priority />
  </div>
);
