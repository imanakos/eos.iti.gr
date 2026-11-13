// Reader interests can overlap. Keep the most direct starting points first.
export const eoReaderTopics = [
  {
    id: "water",
    label: "The water we drink",
    slugs: [
      "can-satellites-detect-water-pollution",
      "when-is-a-water-quality-indicator-ready-to-support-management",
      "where-did-all-that-mud-come-from",
      "why-do-shorelines-move-between-satellite-observations",
    ],
  },
  {
    id: "safety",
    label: "Staying safe",
    slugs: [
      "can-satellites-identify-urban-heat-islands",
      "how-do-satellites-map-wildfire-damage",
      "its-hot-outside-why-did-the-lake-turn-cold",
      "can-radar-satellites-see-through-clouds",
    ],
  },
  {
    id: "nature",
    label: "Nature around us",
    slugs: [
      "whats-growing-where-the-map-says-open-water",
      "can-satellites-reveal-forest-structure-beyond-canopy-greenness",
      "how-can-we-separate-seasonal-forest-change-from-disturbance",
      "its-hot-outside-why-did-the-lake-turn-cold",
      "can-satellites-reveal-the-link-between-geodiversity-and-biodiversity",
      "can-earth-observation-describe-ecological-condition",
      "when-has-the-land-really-changed",
    ],
  },
  {
    id: "trust",
    label: "What can I trust?",
    slugs: [
      "can-two-maps-agree-and-both-be-wrong",
      "ai-removed-the-clouds-did-it-see-the-lake",
      "what-should-an-eo-model-do-when-the-evidence-is-insufficient",
      "can-geoai-replace-the-earth-observation-expert",
      "why-does-healthy-vegetation-appear-red",
      "when-has-the-land-really-changed",
      "why-does-a-global-land-change-taxonomy-matter",
    ],
  },
] as const;

export type EOReaderTopicId = (typeof eoReaderTopics)[number]["id"];
