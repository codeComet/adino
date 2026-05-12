
export const getGlobalMarketData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-global-market?populate[sections][populate]=*`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch global market data: ${res.status} ${res.statusText}`
    );
  }
  const data = await res.json();
  return data;
};
