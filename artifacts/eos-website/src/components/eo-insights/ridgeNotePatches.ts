/** A possible upstream source, not an attribution of where the sediment arose. */
export const possibleMudField = {
  x: 241,
  y: 292,
  path: "M172 302Q186 297 202 289L238 275Q249 271 258 272L277 275L302 279L306 283Q287 288 279 297L267 305L250 312L231 318Q212 314 198 312L177 309Q169 307 172 302Z",
} as const;

/**
 * Small features in the cinematic landscape, traced in its 1000 × 520
 * coordinate space. Each cutout is a story prompt, not a measured boundary.
 * x and y are inside the path and can anchor a hint or a touch target.
 */
export const ridgeNotePatches = [
  {
    id: "rocky-ridge",
    slug: "can-satellites-reveal-the-link-between-geodiversity-and-biodiversity",
    x: 310,
    y: 38,
    path: "M208 48Q223 41 237 31L253 22L275 10L286 13L295 17L306 13L326 6L339 9L356 17L367 20L377 16L390 20L408 29Q394 34 380 40Q355 43 338 54L311 65Q294 64 277 60L255 58Q227 58 208 48Z",
  },
  {
    id: "foothill-tree-belt",
    slug: "how-can-we-separate-seasonal-forest-change-from-disturbance",
    x: 504,
    y: 102,
    paddedTarget: true,
    path: "M391 83Q400 72 414 68Q429 63 444 67Q461 68 474 75Q495 84 513 81Q528 77 542 79Q560 80 577 84Q592 87 611 89Q627 93 640 102Q626 107 614 107Q603 111 587 111Q576 114 568 120Q558 125 543 123Q530 124 517 135Q505 145 491 145Q475 145 466 137Q458 128 451 120Q439 114 424 110Q408 107 397 99Q389 92 391 83Z",
  },
  {
    id: "treetops",
    slug: "can-satellites-reveal-forest-structure-beyond-canopy-greenness",
    hint: "Beneath the canopy?",
    x: 103,
    y: 158,
    path: "M32 163Q34 149 44 145L48 132Q57 128 65 130L73 115Q80 111 85 117L94 105L104 110L112 104L120 111Q135 104 144 115L151 113L158 122Q171 119 176 130L184 133L184 143L193 148Q195 159 184 164L183 175Q172 180 166 180L160 189Q149 192 141 188L131 196Q122 200 114 193L103 198L95 194L85 198L76 193Q66 197 59 190Q47 192 45 182L35 180L38 171Z",
  },
  {
    id: "sediment-plume",
    slug: "where-did-all-that-mud-come-from",
    hint: "Whose mud?",
    x: 755,
    y: 383,
    path: "M702 364Q712 368 722 369Q742 368 757 372Q776 377 794 373Q813 370 829 368Q822 378 807 383Q785 391 775 397Q759 405 741 402Q725 399 710 406Q718 396 730 389Q740 381 726 377Q716 373 703 370Z",
  },
  {
    id: "lake-water",
    slug: "its-hot-outside-why-did-the-lake-turn-cold",
    hint: "Cold in summer?",
    x: 413,
    y: 205,
    path: "M309 216Q327 208 332 197Q351 189 377 184Q389 176 406 173Q429 168 455 173L500 174Q483 181 478 188Q474 198 496 202Q512 207 506 213Q483 218 460 221Q444 225 435 235Q412 236 397 231Q368 234 349 227Q324 225 309 221Z",
  },
  {
    id: "sunlit-roofs",
    slug: "can-satellites-identify-urban-heat-islands",
    hint: "Hotter here?",
    x: 660,
    y: 257,
    path: "M590 251L592 242L606 235L614 235L619 226L635 222L644 228L657 224L668 230L683 225L695 231L706 229L720 235L730 235L736 244L751 246L750 257L743 261L742 269L727 271L714 279L700 280L689 286L675 283L664 288L654 280L640 277L630 272L615 272L605 264L596 263Z",
  },
  {
    id: "research-dish",
    slug: "can-two-maps-agree-and-both-be-wrong",
    hint: "Trust both maps?",
    x: 464,
    y: 356,
    path: "M400 364L438 355L448 345L451 341Q441 337 438 326Q434 317 445 315L462 314L468 303L472 305L471 317Q489 321 495 332Q493 342 471 343L466 351L482 353L524 366L524 387L513 393L456 401L400 382Z",
  },
  {
    id: "tideline",
    slug: "why-do-shorelines-move-between-satellite-observations",
    hint: "Moving shoreline?",
    x: 880,
    y: 260,
    path: "M778 235Q780 225 794 216Q813 210 836 209Q855 208 866 212Q859 217 845 221Q827 225 818 231Q834 238 851 238L880 239Q894 239 900 229L905 229L909 239Q926 241 942 246Q965 250 983 262Q986 272 973 278Q954 287 933 288Q910 291 895 300Q877 311 854 311Q836 313 817 307Q799 303 786 308Q785 300 793 294Q809 286 833 282Q849 279 857 274Q848 269 832 270L808 272Q791 270 782 261Q775 252 778 235Z",
  },
  {
    id: "submerged-meadow",
    slug: "whats-growing-where-the-map-says-open-water",
    hint: "Meadow underwater?",
    x: 760,
    y: 450,
    path: "M680 452Q691 443 709 444Q722 438 738 442Q758 436 774 440Q784 436 796 442Q808 440 818 445Q837 446 849 456Q842 464 820 465Q807 473 789 470Q773 477 753 472Q737 476 723 469Q705 471 696 464Q683 464 680 457Z",
  },
  {
    id: "green-crop-rows",
    slug: "why-does-healthy-vegetation-appear-red",
    x: 104,
    y: 337,
    path: "M24 344L119 314Q137 311 147 312L189 320L159 332L111 347L65 363L48 357L24 350Z",
  },
  {
    id: "coastal-reeds",
    slug: "can-earth-observation-describe-ecological-condition",
    x: 833,
    y: 146,
    path: "M727 153Q740 142 755 138Q771 132 789 132Q807 129 819 121Q829 114 849 114L878 115Q893 112 910 114Q923 115 931 119Q914 126 892 128Q874 128 865 133Q879 135 893 139Q905 140 915 146Q898 152 880 154Q858 157 841 165Q825 172 805 173Q791 175 777 178Q757 178 744 171Q734 164 727 162Z",
  },
] as const;
