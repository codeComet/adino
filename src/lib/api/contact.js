import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      contact_info: {
        populate: ["image"],
      },
      faq_item: true,
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export const getContactHeroData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact?${query}`
  );
  const data = await res.json();
  return data;
};
