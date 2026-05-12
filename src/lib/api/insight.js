import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

const heroQuery = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true },
);

export const getInsightData = async () => {
  return fetchStrapi(`/api/insight?${heroQuery}`);
};

const postsQuery = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true },
);

export const getInsightPosts = async () => {
  return fetchStrapi(`/api/blogs?${postsQuery}`);
};
