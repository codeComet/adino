
export const getJobData = async (slug) => {
  if (!slug) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jobs?filters[slug][$eq]=${slug}&populate=*`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
