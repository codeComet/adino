import { fetchStrapi } from "@/lib/utils";

export const getJobData = async (slug) => {
  if (!slug) return null;
  return fetchStrapi(`/api/jobs?filters[slug][$eq]=${slug}&populate=*`);
};
