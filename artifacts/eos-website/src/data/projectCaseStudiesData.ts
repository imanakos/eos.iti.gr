export type ProjectEvidenceKind =
  | "Official project record"
  | "Project website"
  | "Institutional record"
  | "Research publication"
  | "Training resource"
  | "Public communication";

export interface ProjectEvidenceLink {
  label: string;
  url: string;
  publisher: string;
  kind: ProjectEvidenceKind;
}

export interface ProjectInternalTarget {
  label: string;
  path: string;
  description: string;
}

export interface ProjectOutcome {
  title: string;
  detail: string;
  status: "Documented output" | "Documented activity" | "Ongoing project target";
}

export interface ProjectCaseStudy {
  slug: string;
  projectName: string;
  fullName: string;
  programme: string;
  periodLabel: string;
  summary: string;
  challenge: string;
  eosContribution: string[];
  methodsAndData: string[];
  outputsAndOutcomes: ProjectOutcome[];
  beneficiaries: string[];
  evidenceLinks: ProjectEvidenceLink[];
  relatedInternalTargets: ProjectInternalTarget[];
  themes: string[];
  image: {
    src: string;
    alt: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    modifiedAt: string;
  };
  officialProjectUrl: string;
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "wqems-water-quality-monitoring",
    projectName: "WQeMS",
    fullName: "Water Quality Emergency Monitoring Service",
    programme: "European Union Horizon 2020, Research and Innovation Action",
    periodLabel: "Completed project with an accessible results archive",
    summary:
      "WQeMS connected Copernicus Earth Observation with the practical information needs of water utilities. EOS contributed through service demonstrations, water monitoring research, training, and communication with professional and scientific communities.",
    challenge:
      "Water utilities rely on local measurements, but water bodies and extreme events can change across areas that are difficult to inspect frequently. The project examined how repeat satellite observations could add timely spatial context while retaining expert interpretation and field evidence.",
    eosContribution: [
      "EOS presented and demonstrated the WQeMS service platform to water professionals, researchers, and public audiences. The team also contributed to analyses of inland water bodies and land-water transition zones, where satellite observations can reveal spatial patterns that local sampling alone may not show.",
      "The site archive documents EOS activity in training, stakeholder workshops, and the communication of WQeMS methods and services. These activities helped connect the technical platform with the people expected to interpret and use its products.",
    ],
    methodsAndData: [
      "Copernicus satellite products, including Sentinel-2 multispectral imagery",
      "Time series and change detection for water bodies and land-water transition zones",
      "Combination of Earth Observation products with available field and operational context",
      "Cloud-based service delivery and capacity-building material for professional users",
    ],
    outputsAndOutcomes: [
      {
        title: "Water monitoring platform",
        detail:
          "The consortium produced a platform for monitoring inland surface waters and supporting expert analysis. EOS repeatedly demonstrated its use in professional and scientific settings.",
        status: "Documented output",
      },
      {
        title: "Published monitoring methods",
        detail:
          "Project-related publications describe the collaborative platform and the monitoring of land-water transition zones in support of drinking-water production.",
        status: "Documented output",
      },
      {
        title: "Extreme-event mapping example",
        detail:
          "Following Storm Daniel in 2023, EOS reported a Sentinel-2 change analysis that mapped an inundated area of approximately 550 square kilometres in Thessaly.",
        status: "Documented activity",
      },
      {
        title: "Reusable training resources",
        detail:
          "The project results archive includes reports, training material, and resources intended to support continued use beyond the funded project.",
        status: "Documented output",
      },
    ],
    beneficiaries: [
      "Drinking-water utilities and water managers",
      "Environmental analysts and public authorities",
      "Researchers developing water-quality services",
      "Communities seeking clearer information about source-water conditions",
    ],
    evidenceLinks: [
      {
        label: "WQeMS project website",
        url: "https://wqems.eu/",
        publisher: "WQeMS consortium",
        kind: "Project website",
      },
      {
        label: "WQeMS project results",
        url: "https://cordis.europa.eu/project/id/101004157/results",
        publisher: "European Commission CORDIS",
        kind: "Official project record",
      },
      {
        label: "Monitoring European water quality from space",
        url: "https://cordis.europa.eu/article/id/447685-monitoring-european-water-quality-from-space",
        publisher: "European Commission CORDIS",
        kind: "Public communication",
      },
      {
        label: "WQeMS platform for inland surface water bodies' monitoring",
        url: "https://doi.org/10.1117/12.2680817",
        publisher: "SPIE Digital Library",
        kind: "Research publication",
      },
      {
        label: "Land-Water Transition Zone Monitoring in Support of Drinking Water Production",
        url: "https://doi.org/10.3390/w15142596",
        publisher: "Water",
        kind: "Research publication",
      },
    ],
    relatedInternalTargets: [
      {
        label: "Can satellites detect water pollution?",
        path: "/eo-insights/can-satellites-detect-water-pollution/",
        description: "A short explanation of what satellite observations can and cannot reveal.",
      },
      {
        label: "EOS tools and services",
        path: "/tools/",
        description:
          "Explore water, inundation, and other operational Earth Observation resources.",
      },
      {
        label: "EOS publications",
        path: "/research/",
        description: "Find the related research papers, posters, and presentations.",
      },
    ],
    themes: ["Water quality", "Copernicus", "Emergency monitoring", "Water utilities"],
    image: {
      src: "/images/projects/wqems.jpg",
      alt: "WQeMS project identity for the Water Quality Emergency Monitoring Service",
    },
    metadata: {
      title: "WQeMS Water Quality Monitoring Case Study | EOS",
      description:
        "How EOS contributed to WQeMS through Copernicus water monitoring, service demonstrations, research, and training for water professionals.",
      keywords: [
        "WQeMS",
        "water quality monitoring",
        "Copernicus",
        "Sentinel-2",
        "water utilities",
        "Earth Observation",
      ],
      modifiedAt: "2026-08-30",
    },
    officialProjectUrl: "https://wqems.eu/",
  },
  {
    slug: "digicotton-precision-agriculture",
    projectName: "DigiCotton",
    fullName: "Digital services for cotton cultivation in the Nestos valley",
    programme: "Greek collaborative research and digital agriculture initiative",
    periodLabel: "Operational services presented in 2025",
    summary:
      "DigiCotton brings satellite, UAV, weather, and farm information into a service designed for cotton growers and agricultural advisers in the Nestos valley. EOS contributed the crop-monitoring research and Earth Observation workflows used by the platform.",
    challenge:
      "Cotton fields develop unevenly across space and time, while frequent field inspection is demanding. Farmers and advisers need information that is timely, understandable, and close enough to their day-to-day decisions to be useful.",
    eosContribution: [
      "Within the collaboration between CERTH, foodStandard S.A., and EAS Kavala, EOS worked on crop monitoring and the interpretation of remotely sensed observations. The team carried out UAV surveys and developed algorithms intended to make regular Sentinel-2 observations useful at field level.",
      "EOS also presented the platform to producers and advisers, collected structured feedback, and demonstrated analyses of crop growth stages, harvest timing, and within-field yield variability. This user contact is documented as part of the platform's refinement, not as evidence that every agronomic outcome has already been independently measured.",
    ],
    methodsAndData: [
      "Sentinel-2 multispectral satellite observations",
      "High-resolution UAV surveys across the cotton growing cycle",
      "Weather, telematics, and other available field information",
      "Producer and agricultural-adviser feedback on platform usability",
    ],
    outputsAndOutcomes: [
      {
        title: "DigiCotton platform",
        detail:
          "A field information service was delivered and publicly presented, bringing remote observations and supporting data into one practical interface.",
        status: "Documented output",
      },
      {
        title: "Crop monitoring demonstrations",
        detail:
          "EOS demonstrated analyses related to crop development, harvest timing, and variability within fields at producer events and Agrothessaly 2025.",
        status: "Documented activity",
      },
      {
        title: "Grounded algorithm development",
        detail:
          "UAV surveys supplied detailed observations of the cotton cycle to support the development and checking of Sentinel-2 based algorithms.",
        status: "Documented activity",
      },
      {
        title: "Operational guidance",
        detail:
          "The delivered service provides personalised, frequently updated information intended to support agricultural practice. The repository does not yet document an independent quantitative impact assessment.",
        status: "Documented output",
      },
    ],
    beneficiaries: [
      "Cotton growers in the Nestos valley",
      "Agricultural advisers and producer organisations",
      "Researchers and service providers working in precision agriculture",
      "Regional actors concerned with productive and environmentally responsible farming",
    ],
    evidenceLinks: [
      {
        label: "DigiCotton project website",
        url: "https://digicotton.gr/",
        publisher: "DigiCotton partnership",
        kind: "Project website",
      },
      {
        label: "DigiCotton presentation on Greek National Television",
        url: "https://www.ertnews.gr/video/eketa-veltistes-georgikes-praktikes-me-xrisi-tis-texnologias-stin-koilada-tou-nestou/",
        publisher: "ERT News",
        kind: "Public communication",
      },
    ],
    relatedInternalTargets: [
      {
        label: "EOS UAV services",
        path: "/tools/",
        description: "See the team's UAV and field-scale Earth Observation capabilities.",
      },
      {
        label: "EOS project and publication archive",
        path: "/research/",
        description: "Explore the surrounding agricultural and remote-sensing research.",
      },
      {
        label: "DigiCotton field activities",
        path: "/news/",
        description:
          "Search the EOS news archive for surveys, demonstrations, and producer meetings.",
      },
    ],
    themes: ["Precision agriculture", "Cotton", "Sentinel-2", "UAV", "Digital farming"],
    image: {
      src: "/images/projects/digicotton_logo.jpg",
      alt: "DigiCotton project logo",
    },
    metadata: {
      title: "DigiCotton Precision Agriculture Case Study | EOS",
      description:
        "How EOS combined satellite, UAV, weather, and user feedback to support the DigiCotton service for growers in the Nestos valley.",
      keywords: [
        "DigiCotton",
        "precision agriculture",
        "cotton monitoring",
        "Sentinel-2",
        "UAV",
        "Nestos valley",
      ],
      modifiedAt: "2026-08-30",
    },
    officialProjectUrl: "https://digicotton.gr/",
  },
  {
    slug: "monalisa-land-degradation",
    projectName: "MONALISA",
    fullName: "Land Degradation Neutrality monitoring and solutions for Mediterranean drylands",
    programme: "European Union Horizon Europe, Innovation Action",
    periodLabel: "Ongoing project",
    summary:
      "MONALISA addresses land degradation and desertification across Mediterranean drylands. EOS is contributing to the preparation of Earth Observation monitoring in the South Crete case study and to the dialogue between field evidence, local knowledge, and spatial analysis.",
    challenge:
      "Land degradation is shaped by interacting land-use, climatic, geomorphological, and socioeconomic pressures. A useful monitoring approach must connect what satellites observe with conditions on the ground and with the practical experience of people managing the landscape.",
    eosContribution: [
      "EOS documented environmental conditions in the Asterousia region of South Crete in preparation for Earth Observation monitoring activities. Discussions with local stakeholders examined land use, landscape development, soil loss, and the pressures shaping the area.",
      "Because MONALISA is ongoing, this case study separates completed preparatory work from the project's intended results. The repository supports a clear account of field familiarisation and stakeholder engagement, while the Decision Support System remains a project target.",
    ],
    methodsAndData: [
      "Field observation and local environmental documentation in Asterousia, South Crete",
      "Stakeholder knowledge about land use, landscape development, and soil-loss pressures",
      "Earth Observation monitoring prepared in relation to climatic and geomorphological context",
      "Remote sensing and artificial intelligence planned within the wider decision-support workflow",
    ],
    outputsAndOutcomes: [
      {
        title: "South Crete case-study preparation",
        detail:
          "EOS recorded local conditions and discussed the interacting causes of degradation with stakeholders before the main monitoring activities.",
        status: "Documented activity",
      },
      {
        title: "Mediterranean comparison",
        detail:
          "The wider project works across six case studies in Italy, Spain, Greece, Tunisia, and Palestine, allowing solutions to be examined in different dryland contexts.",
        status: "Documented activity",
      },
      {
        title: "Decision Support System",
        detail:
          "MONALISA plans a system using remote sensing and artificial intelligence to support the assessment of sustainable land-management solutions. This is presented as an ongoing project target.",
        status: "Ongoing project target",
      },
    ],
    beneficiaries: [
      "Farmers, pastoralists, and other land managers in dryland regions",
      "Local and regional authorities",
      "Researchers assessing land degradation neutrality",
      "Organisations planning restoration and sustainable land-management measures",
    ],
    evidenceLinks: [
      {
        label: "MONALISA project website",
        url: "https://monalisa4land.eu/",
        publisher: "MONALISA consortium",
        kind: "Project website",
      },
    ],
    relatedInternalTargets: [
      {
        label: "EOS project portfolio",
        path: "/research/",
        description: "Place MONALISA within the team's broader land and ecosystem research.",
      },
      {
        label: "MONALISA field updates",
        path: "/news/",
        description: "Search the EOS news archive for South Crete and project meeting updates.",
      },
      {
        label: "Earth Observation tools",
        path: "/tools/",
        description: "Explore related land-cover, vegetation, and spatial-analysis capabilities.",
      },
    ],
    themes: [
      "Land degradation neutrality",
      "Desertification",
      "Mediterranean drylands",
      "Stakeholder engagement",
    ],
    image: {
      src: "/images/projects/monalisa.png",
      alt: "MONALISA project logo",
    },
    metadata: {
      title: "MONALISA Land Degradation Case Study | EOS",
      description:
        "EOS contributions to MONALISA in South Crete, connecting field context, stakeholder knowledge, and planned Earth Observation monitoring.",
      keywords: [
        "MONALISA",
        "land degradation neutrality",
        "desertification",
        "Earth Observation",
        "Asterousia",
        "South Crete",
      ],
      modifiedAt: "2026-08-30",
    },
    officialProjectUrl: "https://monalisa4land.eu/",
  },
  {
    slug: "ecopotential-biodiversity-monitoring",
    projectName: "ECOPOTENTIAL",
    fullName: "Improving future ecosystem benefits through Earth Observations",
    programme: "European Union Horizon 2020",
    periodLabel: "Completed project with a substantial research legacy",
    summary:
      "ECOPOTENTIAL connected satellite and in-situ observations with ecosystem research and protected-area management. EOS contributed to online data services, land-cover and habitat information, data-cube work, and methods for monitoring wetland inundation.",
    challenge:
      "Protected areas need repeated, comparable information about land cover, habitats, water regimes, and ecosystem change. The scientific difficulty is to combine observations from different sensors and scales without losing the ecological meaning required by researchers and managers.",
    eosContribution: [
      "EOS researchers contributed to the project's online monitoring services and to workflows that translate Earth Observation data into ecosystem indicators. Documented work includes protected-area data cubes, land-cover and habitat mapping, and inundation mapping for wetland areas.",
      "The publication archive records methods using Sentinel-1 and Sentinel-2, including optical inundation mapping and radar-optical fusion for conditions where cloud limits visible imagery. It also records EOS participation in the ECOPOTENTIAL Virtual Laboratory and service demonstrations.",
    ],
    methodsAndData: [
      "Sentinel-1 radar and Sentinel-2 multispectral observations",
      "Machine learning and data-driven thresholding for inundation mapping",
      "Earth Observation data cubes and cloud-based model sharing",
      "Land-cover, habitat, and biodiversity-indicator workflows",
      "Combination of satellite and in-situ information for protected areas",
    ],
    outputsAndOutcomes: [
      {
        title: "Online ecosystem monitoring services",
        detail:
          "EOS co-authored and presented an overview of online services designed to provide ecosystem indicators across project protected areas.",
        status: "Documented output",
      },
      {
        title: "Wetland inundation methods",
        detail:
          "Peer-reviewed studies document automatic Sentinel-2 inundation mapping and the fusion of Sentinel-1 with Sentinel-2 under unfavourable atmospheric conditions.",
        status: "Documented output",
      },
      {
        title: "EODESM and data access",
        detail:
          "The EOS site retains an ECOPOTENTIAL-derived land-cover mapping service and material about project portals, data cubes, and the Virtual Laboratory.",
        status: "Documented output",
      },
      {
        title: "Protected-area knowledge transfer",
        detail:
          "Methods and services were presented in project meetings, hands-on workshops, EuroGEOSS, GEO, NASA LCLUC, and SCERIN settings.",
        status: "Documented activity",
      },
    ],
    beneficiaries: [
      "Protected-area managers and conservation organisations",
      "Ecosystem and biodiversity researchers",
      "Public authorities responsible for environmental monitoring",
      "Earth Observation developers building reusable ecosystem services",
    ],
    evidenceLinks: [
      {
        label: "ECOPOTENTIAL project record and results",
        url: "https://cordis.europa.eu/project/id/641762",
        publisher: "European Commission CORDIS",
        kind: "Official project record",
      },
      {
        label: "Automatic inundation mapping using Sentinel-2",
        url: "https://doi.org/10.3390/rs11192251",
        publisher: "Remote Sensing",
        kind: "Research publication",
      },
      {
        label: "Fusion of Sentinel-1 and Sentinel-2 for inundation mapping",
        url: "https://doi.org/10.1080/22797254.2019.1596757",
        publisher: "European Journal of Remote Sensing",
        kind: "Research publication",
      },
      {
        label: "Integration of satellite data in ecosystem modelling",
        url: "https://doi.org/10.1111/2041-210X.13018",
        publisher: "Methods in Ecology and Evolution",
        kind: "Research publication",
      },
    ],
    relatedInternalTargets: [
      {
        label: "Can radar satellites see through clouds?",
        path: "/eo-insights/can-radar-satellites-see-through-clouds/",
        description: "Understand why radar complements optical monitoring in cloudy conditions.",
      },
      {
        label: "EOS land and water tools",
        path: "/tools/",
        description: "Explore EODESM, inundation mapping, habitat, and biodiversity modules.",
      },
      {
        label: "ECOPOTENTIAL publications and presentations",
        path: "/research/",
        description: "Find the project's peer-reviewed papers, posters, and workshop material.",
      },
    ],
    themes: ["Biodiversity", "Protected areas", "Inundation mapping", "Data cubes"],
    image: {
      src: "/images/projects/ecop.jpg",
      alt: "ECOPOTENTIAL project logo",
    },
    metadata: {
      title: "ECOPOTENTIAL Biodiversity Monitoring Case Study | EOS",
      description:
        "EOS contributions to ECOPOTENTIAL in protected-area monitoring, inundation mapping, data cubes, and ecosystem information services.",
      keywords: [
        "ECOPOTENTIAL",
        "biodiversity monitoring",
        "protected areas",
        "Sentinel-1",
        "Sentinel-2",
        "inundation mapping",
      ],
      modifiedAt: "2026-08-30",
    },
    officialProjectUrl: "https://cordis.europa.eu/project/id/641762",
  },
  {
    slug: "eeobss-earth-observation-education",
    projectName: "EEOBSS",
    fullName: "Education in Earth Observation for Bulgarian Secondary Schools",
    programme: "European Space Agency supported education project",
    periodLabel: "Completed education project",
    summary:
      "EEOBSS translated Earth Observation concepts into material and activities for Bulgarian secondary-school pupils. EOS contributed subject expertise, including educational content on remote sensing and geoinformation in agriculture.",
    challenge:
      "Satellite data can feel remote from a school curriculum. Teachers and pupils need scientifically sound explanations, recognisable applications, and material that can be used beyond a specialist university environment.",
    eosContribution: [
      "Dr Ioannis Manakos co-authored educational material on the use of remote sensing and geoinformation technologies in agriculture. The bilingual tutorial was prepared for individual work in extracurricular natural-science activities.",
      "The EOS record also documents project presentations, tutorial dissemination, educational videos, events, and a summer school. The contribution is presented as part of a multi-partner educational effort rather than as a sole EOS product.",
    ],
    methodsAndData: [
      "Age-appropriate tutorials linking satellite observations to environmental applications",
      "Classroom and extracurricular learning material in Bulgarian and English",
      "Lectures, educational events, project presentations, and video resources",
      "Agriculture as a practical route into remote sensing and geoinformation",
    ],
    outputsAndOutcomes: [
      {
        title: "Open educational tutorial",
        detail:
          "The project produced an Earth Observation tutorial for extracurricular work in natural sciences, including an agriculture chapter co-authored by Ioannis Manakos.",
        status: "Documented output",
      },
      {
        title: "School-oriented activities",
        detail:
          "The institutional project record documents adapted learning material, educational events, and a summer school for Bulgarian pupils.",
        status: "Documented activity",
      },
      {
        title: "International dissemination",
        detail:
          "EEOBSS educational work was presented at the 2019 United Nations/Romania conference on space solutions for sustainable agriculture and precision farming.",
        status: "Documented activity",
      },
      {
        title: "Education research legacy",
        detail:
          "Two later review articles examined Earth Observation resources for secondary-school education, extending the documented knowledge base around the project theme.",
        status: "Documented output",
      },
    ],
    beneficiaries: [
      "Bulgarian secondary-school pupils",
      "Teachers and extracurricular science educators",
      "Education organisations introducing space and environmental topics",
      "Researchers developing Earth Observation learning resources",
    ],
    evidenceLinks: [
      {
        label: "EEOBSS institutional project record",
        url: "https://www.iti.gr/iti/en/project/eeobss-en/",
        publisher: "CERTH/ITI",
        kind: "Institutional record",
      },
      {
        label: "Earth Observation from Space tutorial",
        url: "http://space.bas.bg/BG/magasin/Lecture_Notes_EEOBSS.pdf",
        publisher: "Space Research and Technology Institute, Bulgarian Academy of Sciences",
        kind: "Training resource",
      },
      {
        label: "EEOBSS presentation at the UN/Romania conference",
        url: "http://www.unoosa.org/documents/pdf/psa/activities/2019/UNRomania2019/UNRomania_Presentations/Filchev_L_et_al-EEOBSS-UNOOSA-ROSA-2019.pdf",
        publisher: "United Nations Office for Outer Space Affairs",
        kind: "Public communication",
      },
      {
        label: "Review of EO resources for secondary school education, Part II",
        url: "https://doi.org/10.3897/arb.v33.e18",
        publisher: "Aerospace Research in Bulgaria",
        kind: "Research publication",
      },
    ],
    relatedInternalTargets: [
      {
        label: "EOS learning resources",
        path: "/tools/",
        description: "Explore e-learning platforms and introductory Earth Observation modules.",
      },
      {
        label: "EEOBSS publications and videos",
        path: "/research/",
        description: "Find the tutorial, poster, presentations, and archived video material.",
      },
      {
        label: "EOS outreach news",
        path: "/news/",
        description: "Explore education, training, and public-engagement activities.",
      },
    ],
    themes: ["Earth Observation education", "Secondary schools", "ESA", "Outreach"],
    image: {
      src: "/images/cooperation/projects/eeobss.png",
      alt: "EEOBSS project identity for Earth Observation education in Bulgarian schools",
    },
    metadata: {
      title: "EEOBSS Earth Observation Education Case Study | EOS",
      description:
        "How EOS contributed educational expertise and learning resources to the ESA-supported EEOBSS project for Bulgarian secondary schools.",
      keywords: [
        "EEOBSS",
        "Earth Observation education",
        "secondary schools",
        "Bulgaria",
        "ESA",
        "remote sensing training",
      ],
      modifiedAt: "2026-08-30",
    },
    officialProjectUrl: "https://www.iti.gr/iti/en/project/eeobss-en/",
  },
  {
    slug: "snapearth-geoai",
    projectName: "SnapEarth",
    fullName: "Artificial intelligence and cloud services for accessible Earth Observation",
    programme: "European Union Horizon 2020",
    periodLabel: "Completed project with an archived CORDIS record",
    summary:
      "SnapEarth explored how artificial intelligence, indexing, and cloud services could make large Earth Observation collections easier to find and use. EOS participated through CERTH, with a visible emphasis on connecting EO information to journalism and public communication.",
    challenge:
      "Earth Observation archives are large and technically demanding. Journalists, citizens, and emerging service providers need ways to discover relevant observations without first mastering specialist catalogue structures and processing environments.",
    eosContribution: [
      "CERTH was a member of the SnapEarth consortium. The EOS archive documents workshops that introduced the project to journalists and gathered feedback on proposed services, including collaboration with the School of Journalism and Mass Communication at Aristotle University of Thessaloniki.",
      "The EarthPress pilot was framed around the needs of editors and journalists, with the goal of relating EO-derived products to news information. Existing material supports this contribution to service design, communication, and user engagement, but does not support attributing the complete SnapEarth technical platform to EOS alone.",
    ],
    methodsAndData: [
      "Artificial-intelligence methods for EO data labelling and indexing",
      "Search and retrieval across large Earth Observation collections",
      "Cloud processing and access across different service providers",
      "Correlation of EO-derived information with news and other public information sources",
      "Development workshops and feedback from journalism communities",
    ],
    outputsAndOutcomes: [
      {
        title: "EO discovery and access concepts",
        detail:
          "The project developed services around large-scale EO retrieval, data labelling, indexing, and cloud access, documented in its archived CORDIS record.",
        status: "Documented output",
      },
      {
        title: "EarthPress pilot",
        detail:
          "Project material describes a pilot intended to help editors and journalists find value-added EO products relevant to public stories.",
        status: "Documented output",
      },
      {
        title: "Journalism engagement",
        detail:
          "EOS-related records document workshops with journalism academics and participants to present the service ideas and collect feedback.",
        status: "Documented activity",
      },
      {
        title: "Public project material",
        detail:
          "Promotional video, newsletters, workshops, and the European Commission project archive preserve the project's purpose and results after completion.",
        status: "Documented output",
      },
    ],
    beneficiaries: [
      "Journalists and editors seeking location-based environmental evidence",
      "Citizens exploring Earth Observation information",
      "EO service developers and data providers",
      "Researchers working on search, GeoAI, and information retrieval",
    ],
    evidenceLinks: [
      {
        label: "SnapEarth project record and archived results",
        url: "https://cordis.europa.eu/project/id/870373",
        publisher: "European Commission CORDIS",
        kind: "Official project record",
      },
      {
        label: "Interdisciplinary SnapEarth workshop for journalists",
        url: "https://www.jour.auth.gr/news/gramatia/interdisciplinary-workshop-on-big-data-earth-observation-services-for-journalists/",
        publisher:
          "Aristotle University of Thessaloniki, School of Journalism and Mass Communications",
        kind: "Institutional record",
      },
      {
        label: "SnapEarth platform promotional video",
        url: "https://www.youtube.com/watch?v=Q4yy2XS3ptU",
        publisher: "SnapEarth project",
        kind: "Public communication",
      },
    ],
    relatedInternalTargets: [
      {
        label: "Can GeoAI replace the Earth Observation expert?",
        path: "/eo-insights/can-geoai-replace-the-earth-observation-expert/",
        description:
          "A concise discussion of where automation helps and where expert judgement remains essential.",
      },
      {
        label: "EOS GeoAI and data research",
        path: "/research/",
        description: "Explore related projects, publications, workshops, and cooperations.",
      },
      {
        label: "EOS data tools",
        path: "/tools/",
        description: "See the team's open data, processing modules, and online services.",
      },
    ],
    themes: ["GeoAI", "Search and retrieval", "Cloud services", "Journalism", "EO accessibility"],
    image: {
      src: "/images/projects/snapearth.jpg",
      alt: "SnapEarth project logo",
    },
    metadata: {
      title: "SnapEarth GeoAI and EO Access Case Study | EOS",
      description:
        "EOS participation in SnapEarth, connecting artificial intelligence, cloud Earth Observation services, journalism, and public access to EO information.",
      keywords: [
        "SnapEarth",
        "GeoAI",
        "Earth Observation search",
        "journalism",
        "cloud services",
        "Horizon 2020",
      ],
      modifiedAt: "2026-08-30",
    },
    officialProjectUrl: "https://cordis.europa.eu/project/id/870373",
  },
];

const projectCaseStudiesBySlug = new Map(
  projectCaseStudies.map((caseStudy) => [caseStudy.slug, caseStudy])
);

const projectCaseStudiesByName = new Map(
  projectCaseStudies.map((caseStudy) => [caseStudy.projectName.toLocaleLowerCase(), caseStudy])
);

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudiesBySlug.get(slug);
}

export function getProjectCaseStudyByProjectName(
  projectName: string
): ProjectCaseStudy | undefined {
  return projectCaseStudiesByName.get(projectName.toLocaleLowerCase());
}
