import { fetchStrapi } from "@/lib/utils";

export const getGlobalCapitalData = async () => {
  return fetchStrapi("/api/adino-capital?populate[sections][populate]=*");
};
