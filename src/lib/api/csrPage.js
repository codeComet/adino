import qs from "qs";

const query = qs.stringify(
  {
    populate: {
        hero: {
            populate: "*"
        },
        box: {
            populate: "*"
        },
        cta: {
            populate: "*"
        }
    }
  },
  { encodeValuesOnly: true },
);

export const getCsrPageData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/csr-page?${query}`,
  );
  const data = await res.json();
  return data;
};
