'use client';

import Image from "next/image";
import logo from "../../../public/assets/img/logo.svg";
import greenLogo from "../../../public/assets/img/logo-green.svg"

export const Logo = ({type}) => (
  <div className="flex items-center space-x-2">
    {type === "home" && <Image src={logo} alt="Adino Logo" width={140} height={100} priority />}
    {type === "main" && <Image src={greenLogo} alt="Adino Logo" width={170} height="auto" priority />}
  </div>
);
