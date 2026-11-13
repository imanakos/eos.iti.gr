import "./ridge-water-light.css";

/** Centre the small specular reflection on open water, in atlas coordinates. */
export function RidgeWaterLight({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <svg className="ridge-water-light" viewBox="0 0 1000 520" aria-hidden="true" focusable="false">
      <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" strokeLinecap="round">
        <path
          className="ridge-water-light__glint"
          stroke="#fff4cf"
          strokeWidth="1.25"
          d="M-19 -2q4-.65 8-.2t8-.12m3.5-.25q2.7-.22 4.4-.12"
        />
        <path
          className="ridge-water-light__glint ridge-water-light__glint--trailing"
          stroke="#c8f7ef"
          strokeWidth="1"
          d="M-5 2.6q3.5-.45 7.5-.12t8.2-.12m3-.18 2.6-.1"
        />
      </g>
    </svg>
  );
}
