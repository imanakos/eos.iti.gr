import { ArrowDown, ArrowUpRight, Droplets, Leaf, ScanSearch, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { eoReaderTopics, type EOReaderTopicId } from "@/data/eoReaderTopics";
import { sortedEOInsights, type EOInsight } from "@/data/eoInsightsData";
import { CuriousThinker } from "./CuriousThinker";
import "./reader-wheel.css";

const icons = { water: Droplets, safety: ShieldCheck, nature: Leaf, trust: ScanSearch };
const lines = {
  water: ["The water", "we drink"],
  safety: ["Staying", "safe"],
  nature: ["Nature", "around us"],
  trust: ["What can", "I trust?"],
};
type Props = { selected: EOReaderTopicId | null; choose: (id: EOReaderTopicId | null) => void };

export function ReaderWheel({ selected, choose }: Props) {
  return (
    <div className="eo-wheel-explorer">
      <h2 id="eo-wheel-title">What matters to you?</h2>
      <p>Pick a topic to find a note.</p>
      <div className="eo-wheel-rim" data-topic={selected ?? "all"}>
        <div className="eo-wheel-disc" role="group" aria-labelledby="eo-wheel-title">
          {eoReaderTopics.map(({ id, label }) => {
            const Icon = icons[id];
            return (
              <button
                type="button"
                key={id}
                data-sector={id}
                className="eo-wheel-sector"
                aria-label={label}
                aria-pressed={id === selected}
                aria-controls="eo-wheel-results eo-notes-catalogue"
                onClick={() => choose(id)}
              >
                <span className="eo-wheel-sector-content">
                  <Icon size={19} aria-hidden="true" />
                  <span>
                    {lines[id][0]} <br />
                    {lines[id][1]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="eo-wheel-hub">
          <CuriousThinker />
        </div>
        <span aria-hidden="true" className="eo-wheel-pointer" />
      </div>
      <a className="eo-wheel-all" href="#eo-notes-catalogue" onClick={() => choose(null)}>
        Browse all {sortedEOInsights.length} notes <ArrowDown aria-hidden="true" size={14} />
      </a>
    </div>
  );
}

export function WheelPicks({
  selected,
  notes,
}: {
  selected: EOReaderTopicId | null;
  notes: EOInsight[];
}) {
  const group = eoReaderTopics.find((item) => item.id === selected);
  return (
    <div id="eo-wheel-results">
      <span role="status" className="sr-only">
        {group
          ? group.label + ": " + notes.length + " notes. Three suggested reads follow."
          : "All notes are shown."}
      </span>
      {group && (
        <section className="eo-wheel-picks" aria-label={`Suggested reads: ${group.label}`}>
          <div className="eo-wheel-picks-heading">
            <h3>
              <span>Start here</span> {group.label}
            </h3>
            <a href="#eo-notes-catalogue">
              See all {notes.length} in this topic <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="eo-wheel-picks-grid">
            {notes.slice(0, 3).map((note) => (
              <Link key={note.slug} href={`/eo-insights/${note.slug}/`} className="eo-wheel-pick">
                <span>{note.title}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
