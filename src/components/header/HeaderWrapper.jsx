"use client";

import { usePathname } from "next/navigation";
import HomeHeader from "@/components/header/HomeHeader";
import CommonHeader from "@/components/header/CommonHeader";

export default function HeaderWrapper() {
  const pathname = usePathname();

  return pathname === "/" ? <HomeHeader /> : <CommonHeader />;
}
