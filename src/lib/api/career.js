import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      career: {
        on: {
          "career.career-hero": {
            populate: {
              hero_img: true,
              cta: true,
            },
          },
          "career.career-stats": {
            populate: {
              stats: true,
            },
          },
          "career.career-benefits": {
            populate: {
              benefits: {
                populate: {
                  image: true,
                },
              },
            },
          },
          "elements.key-value": {
            populate: {
              image: true,
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getCareerData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/career?${query}`,
  );
  const data = await res.json();
  return data;
};
