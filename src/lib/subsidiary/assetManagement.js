
import qs from "qs";

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
  }
);

export const getAssetManagementData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-asset-management?${query}`
  );
  const data = await res.json();
  return data;
};
