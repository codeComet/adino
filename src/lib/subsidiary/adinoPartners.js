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
            populate: {
              stats: {
                populate: "*",
              },
              cta_btn: "*",
              image_1: {
                populate: "*",
              },
            },
          },
          "subsidiaries.global-market-service": {
            populate: "*",
          },
        },
      },
    },
  },
  { encodeValuesOnly: true },
);

export const getAdinoPartnersData = async () => {
  return fetchStrapi(`/api/adino-partner?${query}`);
};
