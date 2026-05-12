
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
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-asset-management?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset management data: ${res.status} ${res.statusText}`
    );
  }
  const data = await res.json();
  return data;
};
