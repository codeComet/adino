"use client";

import { useQuery } from "@tanstack/react-query";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      hero: {
        populate: "*",
      },
      serviceItems: {
        populate: "*",
      },
      portfolioImage: {
        populate: "*",
      },
      portFolioItems: {
        populate: "*",
      },
      ndPortfolioItems: {
        populate: "*",
      },
      investmentApproach: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAssetManagementServiceData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/asset-management-service?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAssetManagementServiceData = () => {
  return useQuery({
    queryKey: ["assetManagementService"],
    queryFn: getAssetManagementServiceData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
