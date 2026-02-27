"use client";

import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "@/lib/api/home";

export const useHomePageData = () => {
  return useQuery({
    queryKey: ["homePage"],
    queryFn: getHomePageData,
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};
