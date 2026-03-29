import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      pageLogo: {
        populate: "*",
      },
      testimonial: {
        populate: "*",
      },
      approachItems: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);


export const getWelcomePageData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/welcome-page?${query}`,
  );
  const data = await res.json();
  return data;
};
