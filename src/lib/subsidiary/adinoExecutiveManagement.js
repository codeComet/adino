"use client";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { fetchStrapi } from "@/lib/utils";
const query = qs.stringify(
  {
    populate: {
      managementTeam: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAdinoExecutiveManagementData = async () => {
  return fetchStrapi(`/api/global-market-executive-management?${query}`);
};

export const useAdinoExecutiveManagementData = () => {
  return useQuery({
    queryKey: ["adinoExecutiveManagement"],
    queryFn: getAdinoExecutiveManagementData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
