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
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch contact data: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
};
