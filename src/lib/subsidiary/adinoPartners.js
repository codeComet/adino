
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
            populate: {
              stats: {
                populate: "*",
              },
              cta_btn: "*",
              image_1: {
                populate: "*",
              },
            }
          },
          "subsidiaries.global-market-service": {
            populate: "*"
          },
        },
      },
    },
  },
  { encodeValuesOnly: true },
);

export const getAdinoPartnersData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-partner?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch adino partners data: ${res.status} ${res.statusText}`
    );
  }
  const data = await res.json();
  return data;
};
