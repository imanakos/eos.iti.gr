// The same topic strips are shown on the interactive site and in the static
// HTML. Their landscape artwork comes from each note's own image record.
export const illustratedTopics = {
  sediment: {
    label: "Tracing sediment",
    detail: "Rainfall • runoff • river plumes",
    icon: "Waves",
  },
  mapagreement: {
    label: "Comparing maps",
    detail: "Algae • shared data • field checks",
    icon: "Layers3",
  },
  upwelling: {
    label: "Lake upwelling",
    detail: "Wind • water layers • shoreline cooling",
    icon: "ThermometerSun",
  },
  cloudgap: {
    label: "Gaps in the satellite record",
    detail: "Clouds • observations • AI estimates",
    icon: "CloudRain",
  },
  aquaticplants: {
    label: "Aquatic vegetation",
    detail: "Reeds • floating leaves • submerged plants",
    icon: "Leaf",
  },
} as const;

export type IllustratedTopic = keyof typeof illustratedTopics;

export const examplePrefix = "Hypothetical example.";
