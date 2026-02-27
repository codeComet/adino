"use client";

import { useQuery } from "@tanstack/react-query";
import { getAboutPageData } from "@/lib/api/about";

export const useAboutPageData = () => {
  return useQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPageData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
