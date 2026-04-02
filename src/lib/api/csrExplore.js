import qs from "qs";

const query = qs.stringify(
  {
    populate: {
        gallery: {
            populate: "*"
        },
        image: {
            populate: "*"
        }
    }
  },
  { encodeValuesOnly: true },
);

export const getCsrExploreData = async () => { 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/csr-explore?${query}`,
  );
  const data = await res.json();
  return data;
};
