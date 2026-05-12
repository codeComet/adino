import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

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
      "sections.button",
    ],
  },
  { encodeValuesOnly: true },
);

export const getHomePageData = async () => {
  return fetchStrapi(`/api/home-page?${query}`);
};
