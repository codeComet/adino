"use client";

import { useQuery } from "@tanstack/react-query";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      aboutHero: {
        populate: ["aboutHeroImg", "companyInfo"],
      },
      aboutCompany: {
        populate: ["image"],
      },
      mission: {
        populate: ["image"],
      },
      aboutSections: {
        on: {
          "about.about-insight": {
            populate: ["stats", "stats.stat_bg_img"],
          },
          "about.about-team": {
            populate: [
              "teamMember",
              "teamMember.image",
              "teamMember.social_links",
              "teamMember.social_links.icon_image",
            ],
          },
          "about.about-values": {
            populate: ["valueItems", "valueItems.image"],
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

const getAboutPageData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAboutPageData = () => {
  return useQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPageData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
