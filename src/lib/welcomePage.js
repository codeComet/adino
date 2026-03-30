"use client";

import { useQuery } from "@tanstack/react-query";
import { getWelcomePageData } from "@/lib/api/welcome";

export const useWelcomePageData = () => {
  return useQuery({
    queryKey: ["welcomePage"],
    queryFn: getWelcomePageData,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
