"use client";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
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
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/global-market-executive-management?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAdinoExecutiveManagementData = () => {
  return useQuery({
    queryKey: ["adinoExecutiveManagement"],
    queryFn: getAdinoExecutiveManagementData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
