"use client";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
const query = qs.stringify(
  {
    populate: {
      hero: {
        populate: "*",
      },
      about: {
        populate: "*",
      },
      missionAndVision: {
        populate: "*",
      },
      coreValueItems: {
        populate: "*",
      },
      whyAdinoSection: {
        populate: "*",
      },
      teamMembers: {
        populate: "*",
      },
      whySectionItems: {
        populate: "*"
      }
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAboutAdinoPartnersPageData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-adino-partner?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAboutAdinoPartnersPageData = () => {
  return useQuery({
    queryKey: ["aboutAdinoPartnersPage"],
    queryFn: getAboutAdinoPartnersPageData, 
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
