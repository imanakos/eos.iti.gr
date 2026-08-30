export type EOSEvidenceKind =
  | "Documented EOS outcome"
  | "Documented EOS workflow"
  | "Peer-reviewed publication"
  | "Applied EOS outcome"
  | "Related EOS project"
  | "Ongoing exploration";

export interface EOSEvidenceItem {
  kind: EOSEvidenceKind;
  label: string;
  description: string;
  href?: string;
}

export const eosEvidence: Record<string, EOSEvidenceItem[]> = {
  "can-radar-satellites-see-through-clouds": [
    {
      kind: "Documented EOS outcome",
      label: "Quality assessment of Doñana inundation maps",
      description:
        "ECOPOTENTIAL assessed 23 CERTH Sentinel-2 inundation maps. Across seven dates with Landsat reference maps, mean overall accuracy was 97.69% without boundary pixels and 96.40% with them; these figures apply to this site and validation design.",
      href: "https://ecopotential-project.eu/wp-content/uploads/2026/07/D4.6.pdf",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Radar-optical fusion for inundation mapping",
      description:
        "Manakos, Kordelas and Marini combined Sentinel-1 radar with Sentinel-2 products to delineate inundation when atmospheric conditions limited optical observations.",
      href: "https://doi.org/10.1080/22797254.2019.1596757",
    },
    {
      kind: "Documented EOS workflow",
      label: "SpeckleRemoval workflow",
      description:
        "ECOPOTENTIAL D6.3 documents a CERTH workflow for preparing Sentinel-1 GRD data with guided filtering. It reduces speckle but does not remove the need to interpret moisture, terrain and viewing geometry.",
      href: "https://ecopotential-project.eu/wp-content/uploads/2026/07/D6.3.pdf",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Kerkini multi-temporal inundation monitoring",
      description:
        "A Manakos-led study tested Sentinel-2 water mapping and Sentinel-1/2 fusion at Lake Kerkini. Sentinel-2 maps reached 88.05% to 97.16% overall accuracy in site-specific validation; the evaluated fusion maps reached 99.71% to 99.88% against same-date Sentinel-2 maps.",
      href: "https://doi.org/10.5220/0010555700480055",
    },
  ],
  "can-satellites-identify-urban-heat-islands": [
    {
      kind: "Ongoing exploration",
      label: "Urban heat as an emerging direction",
      description:
        "EOS is beginning to examine how thermal observations, land cover and local measurements might support urban-heat assessment. This is exploratory work, not yet a completed EOS service or validated result.",
    },
  ],
  "how-do-satellites-map-wildfire-damage": [
    {
      kind: "Peer-reviewed publication",
      label: "Automatic Sentinel-2 burned-area mapping",
      description:
        "An EOS-co-authored study developed an unsupervised method using pre- and post-fire Sentinel-2 observations, then compared the resulting burn-scar maps with reference information.",
      href: "https://doi.org/10.3390/land12020379",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Object- and pixel-based burn-scar mapping",
      description:
        "EOS researchers helped compare two Sentinel-2 approaches across different European biogeographical settings, documenting the advantages and limitations of each method.",
      href: "https://doi.org/10.3390/land12051087",
    },
  ],
  "why-does-healthy-vegetation-appear-red": [
    {
      kind: "Documented EOS outcome",
      label: "Doñana phenology metric layers",
      description:
        "This EOS-led open dataset turns a one-year NDVI time series into mapped green-up, senescence, maximum-NDVI date and peak-count metrics, together with classification layers. It is a concrete move from colourful imagery to measurable seasonal behaviour.",
      href: "https://doi.org/10.5281/zenodo.3403798",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Land-surface phenology from multispectral time series",
      description:
        "A 2023 chapter co-authored by Ioannis Manakos reviews how satellite time series, data fusion, cloud processing and validation are used to estimate seasonal vegetation development. One observation shows spectral contrast; a sequence can reveal timing.",
      href: "https://doi.org/10.1007/978-3-031-44112-7_2",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Sentinel-2 phenology for goldenrod mapping",
      description:
        "An EOS-co-authored IGARSS study used phenological metrics derived from multitemporal Sentinel-2 data to map Solidago gigantea. It shows how seasonal spectral behaviour can support a specific vegetation-mapping question rather than treating red tones alone as proof of species or health.",
      href: "https://doi.org/10.1109/IGARSS52108.2023.10282732",
    },
    {
      kind: "Applied EOS outcome",
      label: "DigiCotton crop-monitoring demonstration",
      description:
        "EOS combined Sentinel-2 observations with UAV surveys and supporting weather and field information to analyse cotton development. Demonstrations covered crop stages, harvest timing and within-field variability in the Nestos valley.",
      href: "/research/projects/digicotton-precision-agriculture/",
    },
    {
      kind: "Applied EOS outcome",
      label: "DigiRyzi rice-monitoring demonstration",
      description:
        "EOS used Sentinel-2 observations supported by UAV, weather and in-situ data to develop rice-field monitoring analyses. Demonstrations covered crop stages, harvest timing and within-field variability in the Axios Delta.",
      href: "/news/digiryzi-platform-supports-rice-farming-in-axios-delta/",
    },
    {
      kind: "Documented EOS workflow",
      label: "PhenologyMetrics and PhenologyChanges",
      description:
        "ECOPOTENTIAL D6.3 documents CERTH workflows for seasonal vegetation timing and abrupt breaks in NDVI time series. They show how spectral signals become measurements over time, rather than simply a coloured display.",
      href: "https://ecopotential-project.eu/wp-content/uploads/2026/07/D6.3.pdf",
    },
  ],
  "can-satellites-detect-water-pollution": [
    {
      kind: "Applied EOS outcome",
      label: "WQeMS water-monitoring platform",
      description:
        "EOS contributed water-monitoring research, service demonstrations and training that connected Copernicus observations with utility workflows and expert interpretation.",
      href: "/research/projects/wqems-water-quality-monitoring/",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Land-water transition monitoring for drinking-water production",
      description:
        "EOS researchers used satellite time series to examine change at the margins of inland waters in support of drinking-water production.",
      href: "https://doi.org/10.3390/w15142596",
    },
    {
      kind: "Peer-reviewed publication",
      label: "WQeMS platform for inland surface waters",
      description:
        "This consortium publication documents how the platform served user communities and supported expert analysis of inland water bodies.",
      href: "https://doi.org/10.1117/12.2680817",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Lake Kerkini surface-water quality estimation",
      description:
        "An EOS-co-authored study compared Landsat observations with in-situ measurements for temperature, water clarity and several chemical parameters. Some tested regressions exceeded R² 0.84, while others were moderate or unsuccessful, showing that performance depends on the parameter and local context.",
      href: "https://www.iti.gr/iti/wp-content/uploads/m-files/document/publications/CEMEPE_kerkini_2021.pdf",
    },
  ],
  "can-geoai-replace-the-earth-observation-expert": [
    {
      kind: "Related EOS project",
      label: "SnapEarth and the EarthPress pilot",
      description:
        "EOS introduced SnapEarth service concepts to journalism communities and gathered feedback on the EarthPress pilot. This is an example of experts shaping how GeoAI is used, not AI replacing them.",
      href: "/research/projects/snapearth-geoai/",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Foundation models for underwater vegetation",
      description:
        "EOS researchers examined foundation-model approaches with aerial and satellite imagery for mapping underwater vegetation, a case where training evidence, scale and domain knowledge remain decisive.",
      href: "https://doi.org/10.3390/rs15164001",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Calibrated uncertainty in canopy-height estimation",
      description:
        "An EOS-co-authored spaceborne time-series model reports calibrated uncertainty alongside canopy-height estimates, making uncertainty part of the result rather than hiding it.",
      href: "https://doi.org/10.1109/TGRS.2022.3171407",
    },
    {
      kind: "Documented EOS outcome",
      label: "Fine-tuned canopy-height mapping",
      description:
        "At GISTAM 2025, EOS reported that fine-tuning reduced mean absolute error from 4.26 m to 2.74 m in the primary Czech test area, while also examining species-specific uncertainty.",
      href: "/news/eos-team-at-gistam-2025-in-porto-portugal/",
    },
  ],
  "when-has-the-land-really-changed": [
    {
      kind: "Peer-reviewed publication",
      label: "A common language for land change",
      description:
        "Ioannis Manakos co-authored a 2022 international framework that describes land change through measurable environmental evidence and separates an observed impact from the possible pressure behind it.",
      href: "https://doi.org/10.1111/gcb.16346",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Testing land-cover maps across nine countries",
      description:
        "A Manakos-led study compared four global and continental land-cover products in representative South Central and Eastern European landscapes. Performance varied by class and local setting, showing why one headline accuracy value cannot answer every local question.",
      href: "https://doi.org/10.3390/rs10121967",
    },
    {
      kind: "Peer-reviewed publication",
      label: "A Mediterranean validation case in Thessaly",
      description:
        "An EOS-led study evaluated global and continental land-cover products against reference information in Thessaly. It demonstrates the value of transparent validation and class-specific checks before a broad map is used for a local decision.",
      href: "https://doi.org/10.3390/land6020034",
    },
    {
      kind: "Documented EOS workflow",
      label: "EODESM evidence-based classification",
      description:
        "The EOS co-authored EODESM approach combines measurable environmental descriptors to classify land cover and compare it through time, with links to habitat classifications and a consistent description of change.",
      href: "https://doi.org/10.1109/IGARSS.2018.8519474",
    },
    {
      kind: "Applied EOS outcome",
      label: "Urban growth observed in Northern Greece",
      description:
        "A Manakos-led Landsat study mapped built-up change in four Northern Greek areas across 2003, 2009 and 2014, then examined the pattern alongside construction and economic information.",
      href: "https://doi.org/10.1016/j.rsase.2017.06.004",
    },
  ],
  "can-satellites-reveal-the-link-between-geodiversity-and-biodiversity": [
    {
      kind: "Peer-reviewed publication",
      label: "The geodiversity-biodiversity nexus",
      description:
        "A 2025 synthesis co-authored by Ioannis Manakos brings biotic and abiotic diversity into one conceptual framework and identifies Earth Observation and Big Data as supporting capabilities. It is a scientific synthesis, not a validated satellite product.",
      href: "https://doi.org/10.1016/j.earscirev.2025.105075",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Remote sensing for biodiversity indicators",
      description:
        "Petrou, Manakos and Stathaki reviewed methods supporting habitat extent and condition, species distribution, environmental pressures, ecosystem services and protected-area assessment. Its Aichi Target context is historical, while its distinction between EO indicators and direct observations remains relevant.",
      href: "https://doi.org/10.1007/s10531-015-0947-z",
    },
    {
      kind: "Peer-reviewed publication",
      label: "The EODHaM habitat-monitoring system",
      description:
        "This BIO_SOS consortium study, co-authored by Ioannis Manakos, combined Earth Observation classification with expert rules to translate land-cover observations into General Habitat Categories and habitat maps.",
      href: "https://doi.org/10.1016/j.jag.2014.10.011",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Habitat evidence from very-high-resolution imagery",
      description:
        "Manakos and colleagues tested hundreds of spectral and textural image attributes against verified habitat maps. The site-specific results demonstrated useful discriminatory power while documenting the limits of deriving habitat information from imagery alone.",
      href: "https://doi.org/10.5721/EuJRS20164953",
    },
    {
      kind: "Related EOS project",
      label: "ECOPOTENTIAL protected-area monitoring",
      description:
        "Documented EOS work on inundation, vegetation phenology and landscape indicators shows how repeated satellite observations can support ecosystem monitoring in protected areas. These are components of integrated monitoring, not a complete measurement of biodiversity or geodiversity.",
      href: "/research/projects/ecopotential-biodiversity-monitoring/",
    },
  ],
  "why-does-a-global-land-change-taxonomy-matter": [
    {
      kind: "Peer-reviewed publication",
      label: "Global Change Taxonomy framework",
      description:
        "Ioannis Manakos was one member of the international team that introduced 246 initial impact-pressure combinations and linked them to measurable environmental descriptors and time. This was a collaborative contribution rather than an EOS-led study.",
      href: "https://doi.org/10.1111/gcb.16346",
    },
    {
      kind: "Documented EOS workflow",
      label: "EODESM as a technical foundation",
      description:
        "Earlier ECOPOTENTIAL work co-authored by Ioannis Manakos classified land cover through FAO LCCS descriptors and supported evidence-based change mapping without assuming that satellite data alone prove the cause of change.",
      href: "https://doi.org/10.1109/IGARSS.2018.8519474",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Land-cover validation across the SCERIN region",
      description:
        "A Manakos-led study evaluated four global or continental land-cover products across sites in nine countries. Class- and location-specific differences remained, illustrating why validation and shared meanings matter.",
      href: "https://doi.org/10.3390/rs10121967",
    },
    {
      kind: "Documented EOS outcome",
      label: "Living Earth continuation",
      description:
        "A 2024 IGARSS presentation by an international team including Ioannis Manakos carried the approach forward as a globally applicable land-monitoring concept. It is presented here as conference work, not as a peer-reviewed outcome.",
      href: "https://2024.ieeeigarss.org/view_paper.php?PaperNum=5853",
    },
  ],
};
