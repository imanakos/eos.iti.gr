import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { eoInsights, eoInsightsData, getEOInsight } from "@/data/eoInsightsData";
import { assetUrl } from "@/lib/utils";
import { possibleMudField, ridgeNotePatches } from "./ridgeNotePatches";
import { RidgeSedimentPlume } from "./RidgeSedimentPlume";
import { RidgeWaterLight } from "./RidgeWaterLight";
import "./ridge-field-atlas.css";

const art = assetUrl("/images/eo-insights/ridge-to-coast-cinematic.webp");
const smallArt = assetUrl("/images/eo-insights/ridge-to-coast-cinematic-800.webp");
const motionQuery =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const count = eoInsights.filter((note) => note.status !== "draft").length;
const patches = ridgeNotePatches.map((patch) => {
  const note = getEOInsight(patch.slug);
  if (!note || note.status === "draft")
    throw new Error("Unpublished landscape note: " + patch.slug);
  const regions = [
    { id: String(patch.id), x: Number(patch.x), y: Number(patch.y), path: String(patch.path) },
  ];
  if (patch.id === "sediment-plume")
    regions.push({ id: "possible-mud-field", ...possibleMudField });
  return {
    id: patch.id,
    title: note.title,
    href: assetUrl(`/eo-insights/${note.slug}/`),
    regions,
    paddedTarget: "paddedTarget" in patch && patch.paddedTarget,
  };
});
const spots = patches.flatMap((note) => note.regions.map((region) => ({ ...region, note })));

export function RidgeFieldAtlas() {
  const clipId = "ridge-stories-" + useId().replace(/[^a-z\d_-]/gi, "");
  const stage = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const lastPointer = useRef("");
  const pressedSpot = useRef("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [armed, setArmed] = useState<string | null>(null);
  const [image, setImage] = useState("");
  const [loadedLayer, setLoadedLayer] = useState("");
  const active = spots.find((spot) => spot.id === (armed ?? hovered ?? focused));

  useEffect(() => {
    if (!armed) return;
    const outside = (e: globalThis.PointerEvent) => {
      if (
        !(e.target instanceof Element) ||
        !stage.current?.contains(e.target) ||
        !e.target.closest(".ridge-note-link")
      ) {
        setArmed(null);
        setFocused(null);
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [armed]);

  function rest() {
    plane.current?.style.removeProperty("--ridge-x");
    plane.current?.style.removeProperty("--ridge-y");
  }
  function lean(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !window.matchMedia(motionQuery).matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    plane.current?.style.setProperty(
      "--ridge-x",
      (((event.clientX - box.left) / box.width - 0.5) * -8).toFixed(2) + "px"
    );
    plane.current?.style.setProperty(
      "--ridge-y",
      (((event.clientY - box.top) / box.height - 0.5) * -5).toFixed(2) + "px"
    );
  }
  return (
    <section className="ridge-atlas" aria-labelledby="ridge-title">
      <div className="ridge-inner">
        <header className="ridge-intro">
          <p className="ridge-eyebrow">
            <span />
            CERTH / ITI <b>·</b> Remote Sensing Research Team
          </p>
          <h1 id="ridge-title">
            Earth Observation <em>for the public.</em>
          </h1>
          <p className="ridge-mission">
            Turning satellite observations into practical evidence for land, water, ecosystems, and
            agriculture.
          </p>
          <p>
            <span className="ridge-pointer-instruction">
              Hover over a patch of colour to uncover a puzzle. Click to read the story.
            </span>
            <span className="ridge-touch-instruction">
              Tap a patch of colour to uncover a puzzle. Tap again to read the story.
            </span>
          </p>
        </header>
        <div className="ridge-plate">
          <figure className="ridge-figure">
            <div
              className="ridge-stage"
              ref={stage}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setArmed(null);
                  setFocused(null);
                  setHovered(null);
                }
              }}
            >
              <div
                className="ridge-map"
                data-ready={Boolean(image && image === loadedLayer)}
                onPointerMove={lean}
                onPointerLeave={rest}
                onPointerCancel={rest}
              >
                <div className="ridge-plane" ref={plane}>
                  <img
                    src={art}
                    srcSet={`${smallArt} 800w, ${art} 1600w`}
                    sizes="(max-width: 1344px) 94vw, 1248px"
                    width={1000}
                    height={520}
                    alt="An illustrated landscape from rocky peaks and forest to crop rows, a lake, a town and a research station. Coastal reeds flank the shore near a muddy river mouth."
                    fetchPriority="high"
                    draggable={false}
                    onLoad={(e) => setImage(e.currentTarget.currentSrc || e.currentTarget.src)}
                  />
                  <svg
                    className="ridge-overlay"
                    viewBox="0 0 1000 520"
                    role="group"
                    aria-label="Questions hidden in the landscape"
                  >
                    <defs>
                      <clipPath id={clipId}>
                        {spots.map((spot) => (
                          <path key={spot.id} d={spot.path} />
                        ))}
                      </clipPath>
                    </defs>
                    {image && (
                      <image
                        key={image}
                        aria-hidden="true"
                        pointerEvents="none"
                        className="ridge-vivid-image"
                        href={image}
                        width={1000}
                        height={520}
                        preserveAspectRatio="none"
                        clipPath={`url(#${clipId})`}
                        onLoad={() => setLoadedLayer(image)}
                      />
                    )}
                    <RidgeSedimentPlume />
                    {patches.map((patch) => (
                      <a
                        key={patch.id}
                        href={patch.href}
                        className="ridge-note-link"
                        tabIndex={0}
                        aria-label={patch.title}
                        data-highlight={active?.note.id === patch.id}
                        data-paired={patch.regions.length > 1}
                        onFocus={(e) => {
                          if (e.currentTarget.matches(":focus-visible")) setFocused(patch.id);
                        }}
                        onBlur={() => {
                          setFocused(null);
                          setArmed(null);
                        }}
                        onClick={(e) => {
                          const touch = lastPointer.current === "touch";
                          lastPointer.current = "";
                          if (
                            touch &&
                            e.detail !== 0 &&
                            !e.metaKey &&
                            !e.ctrlKey &&
                            armed !== pressedSpot.current
                          ) {
                            e.preventDefault();
                            setHovered(null);
                            setArmed(pressedSpot.current);
                          }
                        }}
                      >
                        {patch.regions.map((region) => (
                          <g
                            key={region.id}
                            onPointerEnter={(e) => {
                              if (e.pointerType !== "touch") {
                                setArmed(null);
                                setHovered(region.id);
                              }
                            }}
                            onPointerLeave={() => setHovered(null)}
                            onPointerDown={(e) => {
                              lastPointer.current = e.pointerType;
                              pressedSpot.current = region.id;
                            }}
                          >
                            {patch.paddedTarget && (
                              <path
                                className="ridge-note-hit-pad"
                                aria-hidden="true"
                                d={region.path}
                              />
                            )}
                            <path className="ridge-note-shape" d={region.path} />
                          </g>
                        ))}
                      </a>
                    ))}
                  </svg>
                  <RidgeWaterLight x={411} y={206} scale={1.25} />
                </div>
              </div>
              {active && (
                <span
                  className="ridge-place-hint"
                  aria-hidden="true"
                  data-upper={active.y < 260}
                  data-near-skyline={active.y < 100}
                  style={
                    {
                      "--hint-x": active.x / 10 + "%",
                      "--hint-y": active.y / 5.2 + "%",
                    } as CSSProperties
                  }
                >
                  {active.note.title}
                </span>
              )}
            </div>
            <figcaption>
              <span>{patches.length} stories in the landscape</span>
              <small>AI-assisted illustration, not satellite data</small>
            </figcaption>
          </figure>
        </div>
        <div className="ridge-next">
          <Link href="/eo-insights/">
            <BookOpen size={16} aria-hidden="true" />
            {eoInsightsData.publicTitle} · Browse all {count} stories/notes{" "}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/research">
            Explore our research <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
