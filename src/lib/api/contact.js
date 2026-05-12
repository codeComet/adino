import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

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
  },
);

export const getContactHeroData = async () => {
  return fetchStrapi(`/api/contact?${query}`);
};
