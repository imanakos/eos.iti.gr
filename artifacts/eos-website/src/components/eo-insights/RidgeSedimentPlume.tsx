import { useId } from "react";
import { ridgeNotePatches } from "./ridgeNotePatches";

const plumeShape = ridgeNotePatches.find((patch) => patch.id === "sediment-plume")!.path;

/** Illustrative suspended sediment where the river meets the sea. The
 * translucent feathered layers keep the original ripples visible beneath. */
export function RidgeSedimentPlume() {
  const prefix = "ridge-plume-" + useId().replace(/[^a-z\d_-]/gi, "");
  const paint = prefix + "-paint",
    diffuse = prefix + "-diffuse";
  return (
    <g aria-hidden="true" pointerEvents="none">
      <defs>
        <linearGradient
          id={paint}
          gradientUnits="userSpaceOnUse"
          x1="704"
          y1="367"
          x2="824"
          y2="394"
        >
          <stop stopColor="#a56a38" stopOpacity=".86" />
          <stop offset=".36" stopColor="#c9985f" stopOpacity=".86" />
          <stop offset=".7" stopColor="#ddbc7d" stopOpacity=".67" />
          <stop offset="1" stopColor="#cabb84" stopOpacity=".20" />
        </linearGradient>
        <filter id={diffuse} x="-8%" y="-14%" width="116%" height="128%">
          <feGaussianBlur stdDeviation="1.7" />
        </filter>
      </defs>
      <path d={plumeShape} fill={`url(#${paint})`} filter={`url(#${diffuse})`} />
      <path
        d="M688 361Q700 362 708 367T733 373Q747 372 765 378Q778 382 805 375Q793 382 777 384Q764 385 757 390Q744 398 733 397Q747 389 745 383Q743 380 731 377Q714 376 705 370Q697 365 688 363Z"
        fill={`url(#${paint})`}
        opacity=".68"
        filter={`url(#${diffuse})`}
      />
      <g strokeLinecap="round" fill="none" strokeWidth=".75" opacity=".34">
        <path
          d="M708 369q11 5 21 5t19 3m8 3q15 4 24 2m-36 12q7-2 13-7m8-9q10 3 18 2"
          stroke="#e6caa0"
        />
        <path d="M714 370q10 2 15 2m16 5q6 1 11 4m-27 16q8-2 13-7" stroke="#977f59" />
      </g>
    </g>
  );
}
