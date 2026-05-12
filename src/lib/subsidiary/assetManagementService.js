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
  return fetchStrapi(`/api/asset-management-service?${query}`);
};

export const useAssetManagementServiceData = () => {
  return useQuery({
    queryKey: ["assetManagementService"],
    queryFn: getAssetManagementServiceData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
