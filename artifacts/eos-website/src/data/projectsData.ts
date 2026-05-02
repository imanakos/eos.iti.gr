export interface Project {
  name: string;
  img: string;
  description: string;
  status: "recent" | "past";
  url?: string;
}

export const projects: Project[] = [
  {
    name: "MONALISA",
    img: "/images/projects/monalisa.png",
    description: "Land Degradation Neutrality monitoring under EU Horizon Europe RIA. EOS contributes to monitoring and mitigating land degradation and desertification across Mediterranean areas.",
    status: "recent",
    url: "https://monalisa4land.eu/",
  },
  {
    name: "DigiCotton",
    img: "/images/projects/digicotton_logo.jpg",
    description: "Digital solutions for cotton crop monitoring. A platform providing real-time guidance on best agricultural practices using satellite, telematics, and remote sensing data for cotton farmers in Nestos valley.",
    status: "recent",
    url: "https://digicotton.gr/",
  },
  {
    name: "DigiRyzi",
    img: "/images/projects/digiryzi_logo.jpg",
    description: "Digital farming initiative reshaping rice cultivation in Greece. Enables real-time monitoring using satellite imagery, integrated weather data, and in-situ observations for the Axios River Delta.",
    status: "recent",
    url: "https://digiryzi.gr/",
  },
  {
    name: "MEDWAYCAP",
    img: "/images/projects/medwaycap.png",
    description: "Mediterranean Water Capacity building project leveraging Earth Observation for water resource management across the Mediterranean basin.",
    status: "recent",
  },
  {
    name: "MedEOS",
    img: "/images/projects/medeos.png",
    description: "Mediterranean Earth Observation Services project. Concluded with a key presentation at IEEE IGARSS 2024.",
    status: "recent",
    url: "https://medeos.deimos.pt/",
  },
  {
    name: "WQeMS",
    img: "/images/projects/WQEMS.jpg",
    description: "Water Quality Emergency Monitoring Service (H2020). An EO-based platform for water utilities providing early-warning capabilities. Featured in the Copernicus Observer newsletter.",
    status: "recent",
    url: "https://portal-wqems.iti.gr/",
  },
  {
    name: "EOTiST",
    img: "/images/projects/eostis.png",
    description: "Earth Observation Training in Ecosystem Services Technology. Produced standard and advanced training courses available on Zenodo.",
    status: "recent",
    url: "https://zenodo.org/records/13712172",
  },
  {
    name: "NextLand",
    img: "/images/projects/nextland4.png",
    description: "Next generation land monitoring project combining satellite data streams for comprehensive land cover change detection at multiple scales.",
    status: "recent",
  },
  {
    name: "PONTOS",
    img: "/images/projects/PONTOS_logo.jpg",
    description: "Copernicus-based services for the Black Sea basin (ENI CBC). Provides coastal and marine monitoring services through a dedicated Web GIS platform.",
    status: "recent",
    url: "http://labecolftp.env.duth.gr/PONTOS/",
  },
  {
    name: "SnapEarth",
    img: "/images/projects/snapearth.jpg",
    description: "An Earth Observation marketplace connecting EO data providers and downstream service developers, facilitating innovation in the EO value chain.",
    status: "recent",
  },
  {
    name: "AQUACYCLE",
    img: "/images/projects/aquacycle.jpg",
    description: "Waste water treatment training and knowledge transfer project with dedicated e-learning content for water utility operators.",
    status: "recent",
    url: "https://etraining-aquacycle.eu/",
  },
  {
    name: "E-SHAPE",
    img: "/images/projects/eshape.jpg",
    description: "EuroGEOSS Showcases: Applications Powered by Europe initiative. Demonstrating Earth Observation pilot applications across multiple sectors.",
    status: "recent",
  },
  {
    name: "ODYSSEUS",
    img: "/images/projects/odysseas.jpg",
    description: "Earth Observation project supporting biodiversity monitoring and ecosystem assessment with remote sensing methodologies.",
    status: "recent",
  },
  {
    name: "ECOPOTENTIAL",
    img: "/images/projects/ecop.jpg",
    description: "Improving future ecosystem benefits through Earth Observations (H2020). Combined satellite and in-situ data to improve modelling and management of protected areas.",
    status: "recent",
  },
  {
    name: "eLTER PLUS",
    img: "/images/projects/eostis.png",
    description: "European Long-Term Ecosystem Research (H2020). EOS contributed through field surveys in Doñana National Park and development of EO-based monitoring tools.",
    status: "recent",
  },
  {
    name: "EcoSense",
    img: "/images/projects/snapearth.jpg",
    description: "Earth Observation for Protected Areas (ESA). Provides monitoring capabilities for protected natural areas through the EcoSense platform.",
    status: "recent",
    url: "https://biosense.rs/",
  },
  {
    name: "EEOBSS",
    img: "/images/cooperation/projects/eeobss.png",
    description: "European Earth Observation Biodiversity Support Service project.",
    status: "past",
  },
  {
    name: "TD1202",
    img: "/images/cooperation/projects/cost.png",
    description: "COST Action TD1202: Mapping and the Citizen Sensor.",
    status: "past",
  },
  {
    name: "BIO_SOS",
    img: "/images/cooperation/projects/biosos.png",
    description: "FP7 BIO_SOS: BIOdiversity multi-SOurce monitoring System: from Space TO Species — integrated remote sensing approaches for biodiversity conservation.",
    status: "past",
  },
];
