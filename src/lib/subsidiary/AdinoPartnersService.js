"use client";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { fetchStrapi } from "@/lib/utils";
const query = qs.stringify(
  {
    populate: {
      hero: {
        populate: "*",
      },
      focusAreaImage: {
        populate: "*",
      },
      focusAreaItems: {
        populate: "*",
      },
      keyIndustry: {
        populate: "*",
      },
      coreStrategyItems: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAdinoPartnersServicePageData = async () => {
  return fetchStrapi(`/api/adino-partners-service?${query}`);
};

export const useAdinoPartnersServicePageData = () => {
  return useQuery({
    queryKey: ["adinoPartnersServicePage"],
    queryFn: getAdinoPartnersServicePageData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
