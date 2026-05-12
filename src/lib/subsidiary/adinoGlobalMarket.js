import { fetchStrapi } from "@/lib/utils";

export const getGlobalMarketData = async () => {
  return fetchStrapi("/api/adino-global-market?populate[sections][populate]=*");
};
