import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

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
  return fetchStrapi(`/api/csr-explore?${query}`);
};
