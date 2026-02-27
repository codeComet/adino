import qs from "qs";

const query = qs.stringify(
  {
    populate: [
      "sections",
      "sections.about_stat_cards",
      "sections.about_stat_cards.stat_bg_img",
      "sections.hero_bg",
      "sections.hero_cta",
      "sections.hero_features",
      "sections.about_cta",
      "sections.specializeItems.feature_image",
      "sections.image",
      "sections.iconBox",
      "sections.iconBox.icon",
      "sections.newsCta",
      "sections.newCta",
      "sections.button",
      "sections.button"
    ],
  },
  { encodeValuesOnly: true },
);

export const getHomePageData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?${query}`,
  );
  const data = await res.json();
  return data;
};
