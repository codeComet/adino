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
      about: {
        populate: "*",
      },
      missionAndVisionBgImg: {
        populate: "*",
      },
      missionAndVisionItem: {
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
      whyAdinoSectionCta: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAboutAdinoPartnersPageData = async () => {
  return fetchStrapi(`/api/about-adino-partner?${query}`);
};

export const useAboutAdinoPartnersPageData = () => {
  return useQuery({
    queryKey: ["aboutAdinoPartnersPage"],
    queryFn: getAboutAdinoPartnersPageData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
