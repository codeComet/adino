"use client";

import { useQuery } from "@tanstack/react-query";
import { getCsrExploreData } from "@/lib/api/csrExplore";

export const useCsrExploreData = () => {
  return useQuery({
    queryKey: ["csrExplore"],
    queryFn: getCsrExploreData, 
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
