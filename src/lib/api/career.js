import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

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
  return fetchStrapi(`/api/career?${query}`);
};
