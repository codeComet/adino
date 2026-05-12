import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

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
  return fetchStrapi(`/api/csr-page?${query}`);
};
