"use client";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
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
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-partners-service?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAdinoPartnersServicePageData = () => {
  return useQuery({
    queryKey: ["adinoPartnersServicePage"],
    queryFn: getAdinoPartnersServicePageData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
