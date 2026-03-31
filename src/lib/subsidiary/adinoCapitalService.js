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
        populate: {
          cta_btn: {
            populate: "*",
          },
        },
      },
      servicesItems: {
        populate: {
          icon: {
            populate: "*",
          },
        },
      },
      industryItems: {
        populate: "*",
      },
      industryImg: {
        populate: "*",
      },
      sustainibilityImage: {
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

export const getAdinoCapitalServicePageData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-capital-service?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAdinoCapitalServicePageData = () => {
  return useQuery({
    queryKey: ["adinoCapitalServicePage"],
    queryFn: getAdinoCapitalServicePageData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
