export const getBlogData = async (slugValue) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$eq]=${slugValue}&populate=*`,
  );
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data;
};

export const getRelatedPosts = async (category) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[category][$eq]=${category}&pagination[limit]=4&populate=banner_image`,
  );
  if (!res.ok) throw new Error("Failed to fetch related posts");
  const data = await res.json();
  return data;
};
