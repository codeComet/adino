
export const getGlobalMarketData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-global-market?populate[sections][populate]=*`
  );
  const data = await res.json();
  return data;
};
