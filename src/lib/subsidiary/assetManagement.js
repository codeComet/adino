import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

const query = qs.stringify(
  {
    populate: {
      sections: {
        on: {
          "home-page.home-hero-section": {
            populate: "*",
          },
          "subsidiaries.global-market-about": {
            populate: "*",
          },
          "subsidiaries.global-market-service": {
            populate: {
              services: {
                populate: ["image"],
              },
              cta: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAssetManagementData = async () => {
  return fetchStrapi(`/api/adino-asset-management?${query}`);
};
