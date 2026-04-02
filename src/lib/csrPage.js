"use client";

import { useQuery } from "@tanstack/react-query";
import { getCsrPageData } from "@/lib/api/csrPage";

export const useCsrPageData = () => {
  return useQuery({
    queryKey: ["csrPage"],
    queryFn: getCsrPageData,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
