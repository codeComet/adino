
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-partner?${query}`,
  );
  const data = await res.json();
  return data;
};
