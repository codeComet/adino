"use client";

import { usePathname } from "next/navigation";
import HomeHeader from "@/components/header/HomeHeader";
import CommonHeader from "@/components/header/CommonHeader";

export default function HeaderWrapper() {
  const pathname = usePathname();
  return pathname === "/" ||
    pathname === "/subsidiaries/adino-partners" ||
    pathname === "/subsidiaries/asset-management" ? (
    <HomeHeader />
  ) : (
    <CommonHeader />
  );
}
