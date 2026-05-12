import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

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
  return fetchStrapi(`/api/welcome-page?${query}`);
};
