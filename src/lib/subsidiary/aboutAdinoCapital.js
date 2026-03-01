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
        populate:  {
            cta_btn: {
                populate: "*"
            }
        }
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
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-adino-capital?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAboutAdinoCapitalPageData = () => {
  return useQuery({
    queryKey: ["aboutAdinoCapitalPage"],
    queryFn: getAboutAdinoCapitalPageData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
