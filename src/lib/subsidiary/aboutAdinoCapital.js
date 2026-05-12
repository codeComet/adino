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
        populate: {
          cta_btn: {
            populate: "*",
          },
        },
      },
      missionAndVision: {
        populate: "*",
      },
      valueItems: {
        populate: "*",
      },
      teamMembers: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAboutAdinoCapitalPageData = async () => {
  return fetchStrapi(`/api/about-adino-capital?${query}`);
};

export const useAboutAdinoCapitalPageData = () => {
  return useQuery({
    queryKey: ["aboutAdinoCapitalPage"],
    queryFn: getAboutAdinoCapitalPageData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
