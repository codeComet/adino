
export const getGlobalCapitalData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adino-capital?populate[sections][populate]=*`
  );
  const data = await res.json();
  return data;
};
