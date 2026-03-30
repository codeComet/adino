"use client";

import { useQuery } from "@tanstack/react-query";
import { getAboutPageData } from "@/lib/api/about";

export const useAboutPageData = () => {
  return useQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPageData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
