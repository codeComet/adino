import qs from "qs";

const heroQuery = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true }
);

export const getInsightData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/insight?${heroQuery}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch insight data: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
};

const postsQuery = qs.stringify(
  {
    populate: "*",
  },
  { encodeValuesOnly: true },
);

export const getInsightPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?${postsQuery}`,
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
