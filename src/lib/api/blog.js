import { fetchStrapi } from "@/lib/utils";

export const getBlogData = async (slugValue) => {
  return fetchStrapi(`/api/blogs?filters[slug][$eq]=${slugValue}&populate=*`);
};

export const getRelatedPosts = async (category) => {
  return fetchStrapi(
    `/api/blogs?filters[category][$eq]=${category}&pagination[limit]=4&populate=banner_image`,
  );
};
