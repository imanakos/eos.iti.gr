import {
  BrainCircuit,
  CloudRain,
  Flame,
  Leaf,
  Satellite,
  ThermometerSun,
  Waves,
} from "lucide-react";
import type { InsightVisual as InsightVisualName } from "@/data/eoInsightsData";
import { assetUrl, cn } from "@/lib/utils";

const visualStyles: Record<
  InsightVisualName,
  {
    Icon: typeof Leaf;
    label: string;
    detail: string;
    image: string;
    background: string;
    accent: string;
  }
> = {
  radar: {
    Icon: CloudRain,
    label: "Radar observation",
    detail: "Microwaves • backscatter • geometry",
    image: "/images/eo-insights/radar-through-clouds.jpg",
    background: "from-[hsl(218_70%_12%)] via-[hsl(202_63%_27%)] to-[hsl(37_70%_42%)]",
    accent: "bg-[hsl(183_76%_68%)]",
  },
  heat: {
    Icon: ThermometerSun,
    label: "Surface temperature",
    detail: "Thermal signal • land cover • context",
    image: "/images/eo-insights/urban-heat-islands.jpg",
    background: "from-[hsl(222_68%_13%)] via-[hsl(15_66%_38%)] to-[hsl(39_82%_54%)]",
    accent: "bg-[hsl(39_94%_66%)]",
  },
  fire: {
    Icon: Flame,
    label: "Fire impact",
    detail: "Hotspots • burned area • recovery",
    image: "/images/eo-insights/wildfire-damage-mapping.jpg",
    background: "from-[hsl(221_63%_12%)] via-[hsl(11_58%_30%)] to-[hsl(31_82%_46%)]",
    accent: "bg-[hsl(24_94%_63%)]",
  },
  vegetation: {
    Icon: Leaf,
    label: "False-colour signal",
    detail: "Near infrared • red • green",
    image: "/images/eo-insights/vegetation-false-colour.jpg",
    background: "from-[hsl(338_64%_28%)] via-[hsl(349_62%_42%)] to-[hsl(37_76%_46%)]",
    accent: "bg-[hsl(37_90%_70%)]",
  },
  water: {
    Icon: Waves,
    label: "Water-leaving signal",
    detail: "Reflectance • turbidity • chlorophyll",
    image: "/images/eo-insights/water-quality-observation.jpg",
    background: "from-[hsl(222_60%_16%)] via-[hsl(202_72%_34%)] to-[hsl(177_58%_42%)]",
    accent: "bg-[hsl(177_72%_68%)]",
  },
  geoai: {
    Icon: BrainCircuit,
    label: "Human + machine reasoning",
    detail: "Patterns • context • uncertainty",
    image: "/images/eo-insights/geoai-earth-observation.jpg",
    background: "from-[hsl(222_66%_14%)] via-[hsl(249_55%_34%)] to-[hsl(16_62%_48%)]",
    accent: "bg-[hsl(37_85%_62%)]",
  },
};

export function InsightVisual({
  visual,
  className,
  imageAlt,
}: {
  visual: InsightVisualName;
  className?: string;
  imageAlt?: string;
}) {
  const style = visualStyles[visual];
  const Icon = style.Icon;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br text-white",
        style.background,
        className
      )}
    >
      <img
        src={assetUrl(style.image)}
        alt={imageAlt ?? ""}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />
        <div className="absolute right-8 top-7 flex items-center gap-2 opacity-55">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-px w-16 bg-white" />
          <Satellite className="h-4 w-4" />
        </div>

        <div className="relative flex h-full flex-col justify-end p-6 sm:p-7">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            <span className={cn("h-2 w-2 rounded-full", style.accent)} />
            {style.label}
          </div>
          <p className="mt-2 text-sm font-medium text-white/90">{style.detail}</p>
        </div>
      </div>
    </div>
  );
}
