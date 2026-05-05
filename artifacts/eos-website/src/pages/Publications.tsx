import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ExternalLink, MonitorPlay } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

const tabs = [
  { id: 'journal', label: 'Journal Publications' },
  { id: 'book', label: 'Books / Book Chapters' },
  { id: 'conference', label: 'Conference Publications' },
  { id: 'networking', label: 'Networking / Communication' },
  { id: 'posters', label: 'Poster Corner' },
  { id: 'videos', label: 'Video Corner' },
  { id: 'press', label: 'Press Corner' },
];

const journalPubs = [
  {
    "text": "C. Beierkuhnlein, B. Pugh, S. Justice, F. Schrodt, G. El Serafy, A. Karnieli, I. Manakos, L. Nietsch, J. Peñas de Giles, A. Peterek, D. Poursanidis, Z. Zwoliński, T. White, E. Wozniak, R. Field, A. Provenzale, Towards a comprehensive geodiversity - Biodiversity nexus in terrestrial ecosystems , 2025, Earth-Science Reviews, 105075, DOI: https://doi.org/10.1016/j.earscirev.2025.105075.",
    "link": "https://www.sciencedirect.com/science/article/pii/S0012825225000364"
  },
  {
    "text": "R.-T. Chadoulis, I. Livieratos, I. Manakos, T. Spanos, Z. Marouni, C. Kalogeropoulos, C. Kotropoulos, 3D-CNN detection of systemic symptoms induced by different Potexvirus infections in four Nicotiana benthamiana genotypes using leaf hyperspectral imaging , 2025, Plant Methods 21(15), DOI: 10.1186/s13007-025-01337-0.",
    "link": "https://link.springer.com/article/10.1186/s13007-025-01337-0"
  },
  {
    "text": "L. Alagialoglou, I. Manakos, E. Katsikis, S. Medinets, Y. Gazyetov, V. Medinets, A. Delopoulos, Machine Learning for Identifying Emergent and Floating Aquatic Vegetation from Space: A Case Study in the Dniester Delta, Ukraine , 2024, SN Computer Science, DOI: 10.1007/s42979-024-02873-7.",
    "link": "https://link.springer.com/article/10.1007/s42979-024-02873-7?utm_source=rct_congratemailt&utm_medium=email&utm_campaign=oa_20240528&utm_content=10.1007%2Fs42979-024-02873-7"
  },
  {
    "text": "F. Lokmen, I. Manakos, G. Sylaios, C. Kalaitzidis, A modified version of the Direct Sampling method for filling gaps in Landsat 7 and Sentinel 2 satellite imagery in the coastal area of Rhone River , 2023, Remote Sensing, DOI: 10.3390/rs15215122.",
    "link": "https://www.mdpi.com/2072-4292/15/21/5122"
  },
  {
    "text": "L. Alagialoglou, I. Manakos, S. Papadopoulou, R. Chadoulis, A. Kita, Mapping underwater aquatic vegetation using foundation models with air- and space-borne images: the case of Polyphytos Lake , 2023, Remote Sensing, Special Issue: Remote Sensing and Artificial Intelligence in Inland Waters, DOI: 10.3390/rs15164001",
    "link": "https://www.mdpi.com/2072-4292/15/16/4001"
  },
  {
    "text": "A. Kita, I. Manakos, S. Papadopoulou, I. Lioumbas, L. Alagialoglou, M. Katsiapi, A. Christodoulou, Land–Water Transition Zone Monitoring in Support of Drinking Water Production , 2023, Water MDPI, DOI: 10.3390/w15142596",
    "link": "https://www.mdpi.com/2073-4441/15/14/2596"
  },
  {
    "text": "M. Milczarek, S. Aleksandrowicz, A. Kita, R.-T. Chadoulis, I. Manakos, E. Woźniak, Object- Versus Pixel-Based Unsupervised Fire Burn Scar Mapping under Different Biogeographical Conditions in Europe , 2023, Multidisciplinary Digital Publishing Institute - Land, 12(5), 1087, DOI: 10.3390/land12051087",
    "link": "https://www.mdpi.com/2073-445X/12/5/1087"
  },
  {
    "text": "M. Sismanis, R-T. Chadoulis, I. Manakos, A. Drosou, An Unsupervised Burned Area Mapping Approach Using Sentinel-2 Images , 2023, Multidisciplinary Digital Publishing Institute - Land, 12(2), 379, DOI: 10.3390/land12020379",
    "link": "https://www.mdpi.com/2073-445X/12/2/379"
  },
  {
    "text": "R. M. Lucas, S. German, G. Metternicht, R. K. Schmidt, C. J. Owers, S. M. Prober, A. E. Richards, S. Tetreault-Campbell, K. J. Williams, N. Mueller, B. Tissott, S. M. T. Chua, A. Cowood, T. Hills, D. Gunawardana, A. McIntyre, S. Chognard, C. Hurford, C. Planque, S. Punalekar, D. Clewley, R. Sonnenschein, N. J. Murray, I. Manakos, P. Blonda, K. Owers, S. Roxburgh, H. Kay, P. Bunting, C. Horton, A globally relevant change taxonomy and evidence-based change framework for land monitoring , 2022, Global Change Biology, 00, 1–25, DOI: https://onlinelibrary.wiley.com/doi/10.1111/gcb.16346",
    "link": "https://onlinelibrary.wiley.com/doi/10.1111/gcb.16346"
  },
  {
    "text": "L. Alagialoglou, I. Manakos, M. Heurich, J. Cervenka, A. Delopoulos, A learnable model with calibrated uncertainty quantification for estimating canopy height from spaceborne sequential imagery , 2022, IEEE Transactions on Geoscience and Remote Sensing, DOI: 10.1109/TGRS.2022.3171407",
    "link": "https://ieeexplore.ieee.org/document/9768161"
  },
  {
    "text": "L. Filchev, I. Manakos, R. Reuter, G. Mardirossian, T. Srebrova, L. Kraleva, D. Dimitrov, K. Marini, A. Rienow, A Review of Earth Observation Resources for Secondary School Education - Part II , 2021, Aerospace Research in Bulgaria, DOI: https://doi.org/10.3897/arb.v33.e18",
    "link": "http://journal.space.bas.bg/arhiv/n%2033/Articles/18_Filchev.pdf"
  },
  {
    "text": "I. Manakos, G. Gutman, C. Kalaitzidis, Monitoring Land Cover Change: Towards Sustainability , 2021, Multidisciplinary Digital Publishing Institute - Land, DOI: https://doi.org/10.3390/land10121356",
    "link": "https://www.mdpi.com/2073-445X/10/12/1356"
  },
  {
    "text": "L. Filchev, I. Manakos, R. Reuter, G. Mardirossian, T. Srebrova, L. Kraleva, D. Dimitrov, K. Marini, A. Rienow, A Review of Earth Observation Resources for Secondary School Education - Part I , 2020, Aerospace Research in Bulgaria, DOI: https://doi.org/10.3897/arb.v32.e18",
    "link": "http://journal.space.bas.bg/arhiv/n%2032/Articles/18_Filchev.pdf"
  },
  {
    "text": "C. Kalaitzidis, I. Manakos, C. Jurgens, P. Wezyk, Introduction to the special issue: “Earth observation supporting sustainability research” , 2020, European Journal of Remote Sensing, DOI: https://doi.org/10.1080/22797254.2020.1784677",
    "link": null
  },
  {
    "text": "C. Boutsoukis, I. Manakos, M. Heurich, A. Delopoulos, Canopy height estimation from single multispectral 2D airborne imagery using texture analysis and machine learning in structurally rich temperate forests , 2019, Remote Sensing Journal, DOI: https://doi.org/10.3390/rs11232853",
    "link": null
  },
  {
    "text": "G. Kordelas, I. Manakos, G. Lefebvre, B. Poulin, Automatic Inundation Mapping Using Sentinel-2 Data Applicable to Both Camargue and Doñana Biosphere Reserves , 2019, Remote Sensing Journal, 11(19), 2251, DOI: https://doi.org/10.3390/rs11192251",
    "link": "https://www.mdpi.com/2072-4292/11/19/2251"
  },
  {
    "text": "I. Manakos, G. Kordelas, K. Marini, Fusion of Sentinel-1 data with Sentinel-2 products to overcome non-favourable atmospheric conditions for the delineation of inundation maps\" , 2019, European Journal of Remote Sensing, DOI: 10.1080/22797254.2019.1596757",
    "link": "https://www.tandfonline.com/doi/full/10.1080/22797254.2019.1596757"
  },
  {
    "text": "I. Manakos, M. Tomaszewska, I. Gkinis, O. Brovkina, L. Filchev, L. Genc, I. Gitas, A. Halabuk, M. Inalpulat, A. Irimescu, G. Jelev, K. Karantzalos, T. Katagis, L. Kupkova, M. Lavreniuk, M. Mesaros, D. Mihailescu, M. Nita, T. Rusnak, P. Stych, F. Zemek, J. Albrechtova, P. Campbell, Comparison of Global and Continental Land Cover Products for selected study areas in South Central and Eastern European Region , 2018, Remote Sensing, 10(12), 1967, DOI: https://doi.org/10.3390/rs10121967",
    "link": "https://www.mdpi.com/2072-4292/10/12/1967"
  },
  {
    "text": "G. Kordelas, I. Manakos, D. Aragones, R. Diaz-Delgado, J. Bustamante, Fast and automatic data-driven thresholding for inundation mapping with Sentinel-2 data , 2018, Remote Sensing, 10, 910, DOI: 10.3390/rs10060910.",
    "link": "https://www.mdpi.com/2072-4292/10/6/910"
  },
  {
    "text": "D. Pasetto, S. Arenas-Castro, J. Bustamante, R. Casagrandi, N. Chrysoulakis, A. Cord, A. Dittrich, C. Domingo, G. El Serafy, A. Karnieli, G. Kordelas, I. Manakos, L. Mari, A. Monteiro, E. Palazzi, D. Poursanidis, A. Rinaldo, S. Terzago, A. Ziemba, G. Ziv, Integration of satellite remote sensing data in ecosystem modelling at local scales: practices and trends , 2018, Methods in Ecology and Evolution, 9, 1810–1821.",
    "link": "https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.13018"
  },
  {
    "text": "I. Manakos, K. Chatzopoulos-Vouzoglanis, I. Gkinis, Z. Petrou, E. Stylianidis, G. Pozoukidou, Assessing urban development trends in representative Local Administrative Units before and after the Greek economic crisis , 2017, Remote Sensing Applications: Society and Environment, 7, 49-56, DOI: 10.1016/j.rsase.2017.06.004.",
    "link": "https://www.sciencedirect.com/science/article/pii/S2352938517300678"
  },
  {
    "text": "I. Manakos, C. Karakizi, I. Gkinis, K. Karantzalos, Validation and Inter-Comparison of Spaceborne Derived Global and Continental Land Cover Products for the Mediterranean Region: The Case of Thessaly , 2017, Land, 6(2), 34, DOI: 10.3390/land6020034.",
    "link": "https://www.mdpi.com/2073-445X/6/2/34"
  },
  {
    "text": "I. Manakos, E. Technitou, Z. Petrou, C. Karydas, V. Tomaselli, G. Veronico, G. Mountrakis, Multi-modal knowledge base generation from very high resolution satellite imagery for habitat mapping , 2016, European Journal of Remote Sensing, 49, 1033-1060, DOI: 10.5721/EuJRS20164953.",
    "link": "https://www.tandfonline.com/doi/abs/10.5721/EuJRS20164953"
  },
  {
    "text": "A. Endres, G. Mountrakis, H. Jin, W. Zhuang, I. Manakos, J.J. Wiley Jr, C.M. Beier, Relative importance analysis of Landsat, waveform LIDAR and PALSAR inputs for deciduous biomass estimation , 2016, European Journal of Remote Sensing, 49, 795-807, DOI: 10.5721/EuJRS20164942.",
    "link": "https://www.tandfonline.com/doi/abs/10.5721/EuJRS20164942"
  },
  {
    "text": "D. Koureas, A. Hardisty, R. Vos, D. Agosti, C. Arvanitidis, P. Bogatencov, P. Buttigieg, Y. de Jong, F. Horvath, G. Gkoutos, Q. Groom, T. Kliment, U. Kõljalg, I. Manakos, A. Marcer, K. Marhold, D. Morse, P. Mergen, L. Penev, L. Pettersson, J. Svenning, A. van de Putte, V. Smith, Unifying European Biodiversity Informatics (BioUnify) , 2016, Research Ideas and Outcomes 2: e7787, doi: 10.3897/rio.2.e7787",
    "link": "https://riojournal.com/articles.php?journal_name=rio&id=7787"
  },
  {
    "text": "Z. Petrou, I. Manakos, T. Stathaki, Remote sensing for biodiversity monitoring: A review of methods for biodiversity indicator extraction and assessment of progress towards international targets , 2015, Biodiversity and Conservation, 24(10), 2333-2363.",
    "link": "https://link.springer.com/article/10.1007/s10531-015-0947-z"
  },
  {
    "text": "Z. Petrou, I. Manakos, T. Stathaki, C. A. Mücher, M. Adamo, Discrimination of vegetation height categories with passive satellite sensor imagery using texture analysis , 2015, IEEE Journal of Selected Topics in Applied Earth Observation and Remote Sensing, 8(4), 1442–1455.",
    "link": "https://ieeexplore.ieee.org/document/7061969/?reload=true&arnumber=7061969&abstractAccess=no&userType=inst"
  },
  {
    "text": "I. Manakos, K. Chatzopoulos-Vouzoglanis, Z. Petrou, L. Filchev, A. Apostolakis, Globalland30 Mapping Capacity of Land Surface Water in Thessaly, Greece , 2015, Land 4(1), 1-18.",
    "link": "https://www.mdpi.com/2073-445X/4/1/1"
  },
  {
    "text": "R. Lucas, P. Blonda, P. Bunting, G. Jones, J. Inglada, M. Arias, V. Kosmidou, Z. Petrou, I. Manakos, M. Adamo, R. Charnock, C. Tarantino, C. A. Mücher, R. Jongman, H. Kramer, D. Arvor, J. P. Honrado, P. Mairota, The Earth Observation Data for Habitat Monitoring (EODHAM) System , 2015, International Journal of Applied Earth Observation and Geoinformation 37, 17–28.",
    "link": "https://www.sciencedirect.com/science/article/pii/S0303243414002347"
  },
  {
    "text": "H. Nagendra, P. Mairota, C. Marangi, R. Lucas, P. Dimopoulos, J. P. Honrado, M. Niphadkar, C. A. Mücher, V. Tomaselli, M. Panitsa, C. Tarantino, I. Manakos, P. Blonda, Satellite Earth observation data to identify anthropogenic pressures in selected protected areas , 2015.",
    "link": "https://www.sciencedirect.com/science/article/pii/S0303243414002335"
  },
  {
    "text": "C. A. Mücher, L. Roupioz, H. Kramer, M. M. B. Bogers, R. H. G. Jongman, R. M. Lucas, V. Kosmidou, Z. Petrou, I. Manakos, E. Padoa-Schioppa, M. Adamo, P. Blonda, Synergy of Airborne LiDAR and Worldview-2 satellite imagery for land cover and habitat mapping: a BIOSOS-EODHAM case study for the Netherlands , 2015, International Journal of Applied Earth Observation and Geoinformation 37, 48–55.",
    "link": "https://www.sciencedirect.com/science/article/pii/S0303243414001950?via%3Dihub"
  },
  {
    "text": "Z. Petrou, V. Kosmidou, I. Manakos, T. Stathaki, M. Adamo, C. Tarantino, V. Tomaselli, P. Blonda, M. Petrou, A rule-based classification methodology to handle uncertainty in habitat mapping employing evidential reasoning and fuzzy logic , 2014, Pattern Recognition Letters, 48, 24-33.",
    "link": "https://www.sciencedirect.com/science/article/pii/S016786551300425X"
  },
  {
    "text": "M. Adamo, C. Tarantino, V. Tomaselli, V. Kosmidou, Z. Petrou, I. Manakos, R.M. Lucas, C.A. Mucher, G. Veronico, C. Marangi, V. De Pasquale, P. Blonda, Expert knowledge for translating land cover/use maps to General Habitat Categories (GHC) , 2014, Landscape Ecol., 29(6), 1045-1067.",
    "link": "https://link.springer.com/article/10.1007/s10980-014-0028-9"
  },
  {
    "text": "V. Kosmidou, Z. Petrou, R.G.H. Bunce, C.A. Mucher, R.H.G. Jongman, M.M. Bogers, R.M. Lucas, V. Tomaselli, P. Blonda, E. Padoa-Schioppa, I. Manakos, M. Petrou, Harmonization of the Land Cover Classification System (LCCS) with the General Habitat Categories (GHC) classification system , 2014, Ecol. Indic. 36, 290–300.",
    "link": "https://www.sciencedirect.com/science/article/pii/S1470160X13002951"
  },
  {
    "text": "A. Elatawneh, A. Wallner, I. Manakos, T. Schneider, T. Knoke, Forest Cover Database Updates Using Multi-Seasonal RapidEye Data - Storm Event Assessment in the Bavarian Forest National Park , Forests 2014, 5, 1284-1303.",
    "link": "https://www.mdpi.com/1999-4907/5/6/1284"
  },
  {
    "text": "C.G. Karydas, M. Petriolis, I. Manakos, Evaluating alternative methods of soil erodibility mapping in the Mediterranean island of Crete , Special Issue 'Soil Erosion: A Major Threat to Food Production and the Environment', Journal of Agriculture, 2013, 3(3), Pages 362-380.",
    "link": "https://www.mdpi.com/2077-0472/3/3/362"
  },
  {
    "text": "I. Manakos, Remote Sensing in Europe: Status analysis and trends focusing on environment and agriculture , Journal of Aeronautics and Space Technologies, 2013, Vol.6, No. 1, Pages 1-5.",
    "link": "https://www.tandfonline.com/doi/full/10.1080/01431161.2017.1291484"
  }
];

const bookPubs = [
  {
    "text": "W. Batita, B. Dixon, I. Manakos, Effects of Data on Soil Erosion Prediction: An Illustration Using the RUSLE Model, 2025, In: Interdisciplinary Environmental Solutions, Barnali Dixon, Palgrave Macmillan, ISBN 978-3-031-16765-2, pp: 735-751, https://doi.org/10.1007/978-3-031-16763-8_19 .",
    "link": "https://link.springer.com/chapter/10.1007/978-3-031-16763-8_19"
  },
  {
    "text": "I. Soubry, I. Manakos, C. Kalaitzidis, Progress on Land Surface Phenology Estimation with Multispectral Remote Sensing, 2023, Communications in Computer and Information Science (1908), Editors: C. Grueau, R. Lauren, L. Ragia, Springer, ISBN 978-3-031-44111-0, pp. 16-37, https://doi.org/10.1007/978-3-031-44112-7 .",
    "link": "https://link.springer.com/chapter/10.1007/978-3-031-44112-7_2"
  },
  {
    "text": "R. Lucas, P. Blonda, J. Bustamante, R. Diaz-Delgado, S. Giamberini, G. Kordelas, J. Goncalves, I. Manakos, M. Santoro, R. Sonnenschein, F. Weiser, L. Willm, R. Viterbi, Enabling Earth Observation for Protected Areas, The ever growing use of Copernicus across Europe’s Regions - A selection of 99 user stories by local and regional authorities , 2018, Co-Production of the European Commission, the European Space Agency and the Network of European Regions Using Space Technologies, 120-121.",
    "link": "https://www.nereus-regions.eu/wp-content/uploads/2017/10/PUBLICATION_Copernicus4regions_2018.pdf"
  },
  {
    "text": "I. Manakos, M. Braun, Land Use & land cover mapping in Europe - practices and trends , Remote Sensing and Digital Image Processing Book Series, 2014, Springer Verlag, 18, p.441.",
    "link": "https://www.springer.com/us/book/9789400779686"
  },
  {
    "text": "C. Kalaitzidis, I. Manakos, \"Приложение на дистанционните изследвания и геоинформационните технологии в земеделието - Application of remote sensing and geoinformation technologies in agriculture\", in Наблюдение на Земята от Космоса: : Учебно помагало за самоподготовка в извънкласни дейности по природни науки/ Earth Observation from Space - Tutorial for individual work in extracurricular activities in natural sciences , 2018, L. Filchev Ed., Space Research and Technology Institute-Bulgarian Academy of Sciences, p. 190 ( ISBN 978-619-7490-03-9/ eISBN 978-619-7490-04-6, DOI :10.3897/9786197490046 ) http://space.bas.bg/BG/magasin/Lecture_Notes_EEOBSS.pdf",
    "link": "http://space.bas.bg/BG/magasin/Lecture_Notes_EEOBSS.pdf"
  },
  {
    "text": "I. Manakos, S. Lavender, \"Remote Sensing in Support of Geo-Information in Europe\", Land Use and Land Cover Mapping in Europe - practices & trends, Remote Sensing and Digital Image Processing Book Series, 2014, Springer Verlag, 18, 3-10.",
    "link": null
  }
];

const conferencePubs = [
  {
    "text": "L. Alagialoglou, I. Manakos, O. Brovkina, J. Novotný, A. Delopoulos, Assessment of Fine-Tuned Canopy Height Maps from Satellite Imagery: A Case Study in the Czech Republic , In Proceedings of the 11th International Conference on Geographical Information Systems Theory, Applications and Management, 1-3 April, 2025, Porto, Portugal, SciTePress, pages 236-243, DOI: 10.5220/0013475200003935",
    "link": null
  },
  {
    "text": "I. Manakos, H. Linseisen, E. Katsikis, A. Delopoulos, Hop yield forecast using Sentinel-2 images, Referate der 45. GIL-Jahrestagung, \"Informatik in der Land-, Forst und Ernährungswirtschaft\", J. Dörr et al. (Hrsg.), GI-Edition \"Lecture Notes in Informatics\" , 25-26 February 2025, Wieselburg, Austria, pp. 309-314.",
    "link": null
  },
  {
    "text": "P. Ribeiro, O. Reigners, T. Voirand, M. Delpey, A. Declerck, C. Pulido, I. Manakos, C. Kalogeropoulos, T. Habib, E. Tsiros, MEDEOS - Earth Observation for land-based pollution assessment & monitoring in mediterranean coastal waters, 2024 IEEE International Geoscience and Remote Sensing Symposium , 7-12 July 2024, Athens, Greece.",
    "link": null
  },
  {
    "text": "H. Linseisen, I. Manakos, E. Katsikis, A. Delopoulos, Assimilation von satellitenbasierten Reflexionsmessungen in einem Informationssystem für einen modernen Hopfenbaubetrieb, Referate der 44. GIL-Jahrestagung, \"Informatik in der Land-, Forst und Ernährungswirtschaft\", C. Hoffmann et al. (Hrsg.), GI-Edition \"Lecture Notes in Informatics\" , 27-28 February 2024, Stuttgart-Hohenheim, Germany, pp. 323-327.",
    "link": "https://gil-net.de/wp-content/uploads/2024/02/GI_Proceedings_344-3.f.pdf"
  },
  {
    "text": "R.-T. Chadoulis, M. Ruciński, E. Katsikis, P. Archicinski, S. Sala, E. Gromny, E. Wozniak, I. Manakos, A. Affek, A. Foks-Ryznar, Phenological Metrics Derived From Sentinel-2 Data For Solidago Gigantea Mapping, IGARSS 2023 - 2023 IEEE International Geoscience and Remote Sensing Symposium , 16-21 July 2023, Pasadena, CA, USA, pp. 445-447, DOI: 10.1109/IGARSS52108.2023.10282732.",
    "link": "https://ieeexplore.ieee.org/document/10282732/"
  },
  {
    "text": "G. Scarpino, M. Matera, P. Bauer, I. Manakos, A. Kita, K. Vlachos, A. Bozas, I. Serral, A. Moumtzidou, I. Gialampoukidis, S. Vrochidis, WQEMS platform for inland surface water bodies' monitoring: serving user communities and supporting expert analyses, Proc. SPIE 12786 , Ninth International Conference on Remote Sensing and Geoinformation of the Environment (RSCy2023), 21 September 2023, DOI: https://doi.org/10.1117/12.2680817",
    "link": "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12786/1278615/WQEMS-platform-for-inland-surface-water-bodies-monitoring--serving/10.1117/12.2680817.short?SSO=1"
  },
  {
    "text": "Best Paper Award I. Manakos, E. Katsikis, S. Medinets, Y. Gazyetov, L. Alagialoglou, V. Medinets, Identification of Emergent and Floating Aquatic Vegetation Using an Unsupervised Thresholding Approach: A Case Study of the Dniester Delta in Ukraine , 9th International Conference on Geographical Information Systems Theory, Applications and Management, 25-27 April 2023, Prague, Czech Republic, DOI: 10.5220/0012024000003473",
    "link": null
  },
  {
    "text": "G.-F. Angelis, A. Domi, A. Zamichos, M. Tsourma, I. Manakos, A. Drosou, D. Tzovaras, A Comparative Study on Vision Transformers in Remote Sensing Building Extraction , 14th International Conference on Information Visualization Theory and Applications, January 2023, Lisbon, Portugal, DOI:10.5220/0011787800003417.",
    "link": "https://www.researchgate.net/publication/369016090_A_Comparative_Study_on_Vision_Transformers_in_Remote_Sensing_Building_Extraction"
  },
  {
    "text": "P. Archiciński, S. Sala, E. Katsikis, M. Ruciński, R. T. Chadoulis, A. Kita, E. Gromny, E. Woźniak, I. Manakos, Correlation of the flooding regime with the presence of solidago gigantea over the valley of Narew in Poland, IALE 2022 European Landscape Ecology Congress, making the future, learning from the past , 11-15 July 2022, Warsaw, Poland, pp. 140.",
    "link": null
  },
  {
    "text": "M. Kanj, I. Manakos, I. Tsolakidis, N. Katselas, C. Kalaitzidis, Empirical estimation of surface water quality parameters in Lake Kerkini using Landsat ETM+/OLI, Eighth International Conference on Enviromental Management, Engineering, Planning and Economics (CEMEPE) and SECOTOX Conference , 20-24 July 2021, Thessaloniki, Greece pp. 110-121.",
    "link": null
  },
  {
    "text": "I. Manakos, M. Kanj, M. Sismanis, I. Tsolakidis, C. Kalaitzidis, Multi-Temporal Inundated Areas Monitoring Made Easy: The Case of Kerkini Lake in Greece , 7th International Conference on Geographical Information Systems Theory, Applications and Management, 23-25 April 2021, Prague, Czech Republic, doi:10.5220/0010555700480055",
    "link": "https://www.scitepress.org/PublicationsDetail.aspx?ID=0uyhInZ1A8E=&t=1"
  },
  {
    "text": "I. Soubry, I. Manakos, C. Kalaitzidis, Recent Advances in Land Surface Phenology Estimation with Multispectral Sensing , 7th International Conference on Geographical Information Systems Theory, Applications and Management, 23-25 April 2021, Prague, Czech Republic, doi: 10.5220/0010555801340145",
    "link": "https://www.scitepress.org/PublicationsDetail.aspx?ID=wR+VR9FgAl8=&t=1"
  },
  {
    "text": "I. Manakos, A. Ledawi, A. Stergioudis, C. Kalaitzidis, Assessment of Texture Features’ Contribution in Discriminating Natural Bare Areas vs. Artificially Covered Ones: Chania Case Study, Proceedings of the EARSeL Joint Workshop 2021 \"EO for sustainable cities and communities\" , 30 March - 1 April 2021, Liege, Belgium, pp. 126-127.",
    "link": null
  },
  {
    "text": "L. Alagialoglou, I. Manakos, M. Heurich, J. Červenka and A. Delopoulos, Canopy height estimation from spaceborne imagery using convolutional encoder-decoder, 27th International Conference on Multimedia Modeling , 22-24 June 2021, Prague, Czech Republic, doi: 10.1007/978-3-030-67835-7_26",
    "link": "https://mmm2021.cz/timetable/event/mmarsat/"
  },
  {
    "text": "R. Lucas, A. Mitchell, I. Manakos, P. Blonda, The Earth Obsevation Data Ecosystem Monitoring (Eodesm) System , IGARSS 2018 - 2018 IEEE International Geoscience and Remote Sensing Symposium, Valencia, 2018, 8985-8987, doi: 10.1109/IGARSS.2018.8519474",
    "link": "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8519474&isnumber=8517275&tag=1"
  },
  {
    "text": "Z. Petrou, T. Stathaki, I. Manakos, M. Adamo, C. Tarantino, P. Blonda, Land cover to habitat map conversion using remote sensing data: a supervised learning approach , in: IEEE Int. Geoscience and Remote Sensing Symp., IEEE, Quebec City, 2014, pp. 4683–4686.",
    "link": "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6947538"
  },
  {
    "text": "Z. Petrou, I. Manakos, T. Stathaki, C. Tarantino, M. Adamo, P. Blonda, A vegetation height classification approach based on texture analysis of a single VHR image , Proceedings of the 35th International Symposium on Remote Sensing of Environment, 2014, IOP Conference Series: Earth and Environmental Science, 17, 012210 doi:10.1088/1755-1315/17/1/012210.",
    "link": "https://iopscience.iop.org/article/10.1088/1755-1315/17/1/012210/meta"
  },
  {
    "text": "S. Mucher, L. Roupioz, H. Kramer, M. Wolters, M. Bogers, R. Lucas, P. Bunting, Z. Petrou, V. Kosmidou, I. Manakos, E. Padoa-Schioppa, G.F. Ficetola, A. Bonardi, M. Adamo, P. Blonda, LIDAR as a valuable information source for habitat mapping , GI_Forum conference, 2-5 July 2013, Salzburg, Austria, pp. 520–523.",
    "link": "https://gispoint.de/fileadmin/user_upload/paper_gis_open/537532044.pdf"
  },
  {
    "text": "M. Adamo, C. Tarantino, V. Kosmidou, Z. Petrou, I. Manakos, V. Tomaselli, R. Lucas, S. Muncher, P. Blonda, Disambiguation rules based on Earth Observation data for Land Cover to habitat map translation: a case study, GI_Forum conference, 2-5 July 2013, Salzburg, Austria, pp. 487–491.",
    "link": null
  },
  {
    "text": "M. Adamo, C. Tarantino, V. Kosmidou, Z. Petrou, I. Manakos, R. M. Lucas, V. Tomaselli, C. A. Mucher, P. Blonda, Land cover to habitat map translation: Disambiguation rules based on Earth Observation data , in: IEEE Int. Geoscience and Remote Sensing Symp., IEEE, Melbourne, 2013. pp. 3817–3820.",
    "link": "https://ieeexplore.ieee.org/document/6723663/"
  },
  {
    "text": "P. Blonda, P. Dimopoulos, R. H. G. Jongman, C. A. Mucher, H. Nagendra, D. Iasillo, A. Arnaud, P. Mairota, J. P. Honrado, E. Padoa-Schioppa, R. Lucas, P. Bunting, L. Durieux, S. Bollanos, L. Candela, J. Inglada, I. Manakos, \"The BIO_SOS European Initiative for Habitat Monitoring\", 33rd EARSeL annual Symposium Proceedings, Matera, Italy, 2013, 911 - 920.",
    "link": null
  }
];

const networkingPubs = [
  {
    "text": "I. Manakos, 2025, Advancing Earth Observation services via IT solutions, Thematic Session: System & AI Integration in Health, Space, Automotive & Energy , KATHES Workshop, Karlsruhe, Germany, 20, February.",
    "link": null
  },
  {
    "text": "R. T. Chadoulis, I. Manakos, C. Kotropoulos, 2024, Assessing the Impact of the 2023 Storm Daniel Flood in Pineios River Estuaries, Joint GOFC-GOLD SCERIN/MedRIN Meeting 2024, Chania, Greece, 16-19, July.",
    "link": null
  },
  {
    "text": "R. Lucas, C. Planque, G. Guilliani, I. Manakos, R.-T. Chadoulis, 2024, Living earth: a novel globally applicable approach to land monitoring , IEEE International Geoscience and Remote Sensing Symposium, Athens, Greece, 7-12, July.",
    "link": null
  },
  {
    "text": "P. Ribeiro, O. Reigners, T. Voirand, M. Delpey, A. Declerck, C. Pulido, I. Manakos, C. Kalogeropoulos, T. Habib, E. Tsiros, 2024, MEDEOS - Earth Observation for land-based pollution assessment & monitoring in mediterranean coastal waters , IEEE International Geoscience and Remote Sensing Symposium, Athens, Greece, 7-12, July.",
    "link": null
  },
  {
    "text": "I. Serral, P. Bauer, A. Kita, K. Vlachos, M. Matera, M. Basile, R.T. Chadoulis, J. Masó, I. Manakos, 2024. An innovative Drinking Water Data Space in times of water scarcity and extreme events: the WQeMS platform , EGU General Assembly, Vienna, Austria, 14–19, April, EGU24-17631.",
    "link": "https://meetingorganizer.copernicus.org/EGU24/EGU24-17631.html"
  },
  {
    "text": "I. Manakos, 2024. Copernicus Assisted Lake Water Quality Emergency Monitoring Service, Invited lecture for the “GEOG423/823 Remote Sensing Applications” lecture series, University of Saskatchewan, Canada, 13, March.",
    "link": null
  },
  {
    "text": "R.-T. Chadoulis, I. Manakos, C. Kotroppoulos, 2024. Assessing the Impact of the 2023 Storm Daniel Flood in Pineios River Estuaries: An Analysis of Crop-Type and Inundation Mapping Using Sentinel-1/2 Imagery, DPG-Frühjahrstagung , Greifswald, Germany, 26-29, February.",
    "link": "https://www.dpg-physik.de/aktivitaeten-und-programme/tagungen/fruehjahrstagungen/2024?set_language=en"
  },
  {
    "text": "P. Ribeiro, C.-L. Pulido, O. Regniers, R. Budin, T. Voirand, A. Declerck, M. Delpey, E. Tsiros, I. Manakos, T. Habib, 2023. MedEOS - Earth observation for land-based pollution assessment & monitoring in the Mediterranean coastal waters, Earth System Science Initiative , Frascati (Rome), Italy, 24, November.",
    "link": "https://www.conftool.pro/earth-system-science-initiative2023/index.php?page=browseSessions&form_session=78"
  },
  {
    "text": "I. Manakos, 2023. Monitoring European water quality from space, CORDIS - Results in Brief , 20 November.",
    "link": "https://cordis.europa.eu/article/id/447685-monitoring-european-water-quality-from-space?WT.mc_id=exp"
  },
  {
    "text": "M. Katsiapi, P. Bauer, D. Alexiadou, N. Filippidis, T. Konstantoula, I. Lioumbas, A. Christodoulou, N. Xanthopoulou, G. Seretoudi, K. Schenk, T. Karantoumanis, A. Κotidis, I. Manakos, 2023. Assessing water quality in drinking water reservoirs using satellite data: the case of polyphytos reservoir, Eighth Environmental Conference of Macedonia, Thessaloniki, Greece, 06-08, October.",
    "link": null
  },
  {
    "text": "I. Manakos, E. Katsikis, S. Medinets, Y. Gazyetov, L. Alagialoglou, V. Medinets, 2023. Water emergent and floating aquatic vegetation mapping using Earth Observation data: An example at the Dniester Delta in Ukraine, SCERIN-10 Workshop on Earth System Observations and 10th Anniversary , Brno, Czech Republic, 27, June.",
    "link": "https://start.org/news/upcoming-scerin-10-workshop-on-earth-system-observations-and-10th-anniversary/"
  },
  {
    "text": "I. Manakos, 2023. WQeMS: A Copernicus assisted water quality monitoring service in support of the water utilities for drinking water production, SCERIN-10 Workshop on Earth System Observations and 10th Anniversary , Brno, Czech Republic, 26, June.",
    "link": "https://start.org/news/upcoming-scerin-10-workshop-on-earth-system-observations-and-10th-anniversary/"
  },
  {
    "text": "I. Manakos, 2023. Open surface water areas monitoring for the Black Sea and Greece, GEO organized Open Data/Open Knowledge Workshop , Geneva, Switzerland, 16, June.",
    "link": "https://www.earthobservations.org/odok2023.php"
  },
  {
    "text": "I. Manakos, G. Scarpino, 2023. The WQeMS Platform For Inland Surface Water Quality Monitoring: A Collaborative Tool For Drinking Water Managers And Innovators. Poster at the Sustainable Value Creation in Space, Land, and Green Economy, Lisbon, Portugal, 25, May.",
    "link": null
  },
  {
    "text": "I. Manakos, D. Ribeiro, T. Kauranne, J. Wilson, 2023. The specificities of providing EO services to agriculture and forestry and their added value according to customer needs, Sustainable Value Creation in Space, Land, and Green Economy, Lisbon, Portugal, 25, May.",
    "link": null
  },
  {
    "text": "G. Scarpino, M. Matera, G. Milis, P. Bauer, I. Manakos, 2023. The WQeMS platform for inland surface water bodies' monitoring: serving user communities and supporting experts' analyses, Ninth International Conference on Remote Sensing & Geoinformation of Environment , 04, April.",
    "link": "https://rscy2023.cyprusremotesensing.com/sites/default/files/docs/RSCy2023_Conference_program_0.pdf"
  },
  {
    "text": "G. Milis, A. Nicolaou, M. Matera, I. Serral, K. Sampsa, A. Kita, A. Bozas, K. Vlachos, I. Manakos, 2023. Capacity building for professionals towards the application of remote sensing in the monitoring of inland water sources, Ninth International Conference on Remote Sensing & Geoinformation of Environment , 04, April.",
    "link": "https://rscy2023.cyprusremotesensing.com/sites/default/files/docs/RSCy2023_Conference_program_0.pdf"
  },
  {
    "text": "I. Serral, J. Masó, I. Manakos, M. Matera, M. Basile, N. Julià, 2023. Harmonized and fair lake water quality datasets for a better policy decision making, Ninth International Conference on Remote Sensing & Geoinformation of Environment , 04, April.",
    "link": "https://rscy2023.cyprusremotesensing.com/sites/default/files/docs/RSCy2023_Conference_program_0.pdf"
  },
  {
    "text": "I. Manakos, A. Kita, S. Papadopoulou, I. Lioumpas, M. Katsiapi, E. Katsikis, L. Alagialoglou, A. Christodoulou, 2023. Land water transition zone mapping challenges in dynamically changing environments, Ninth International Conference on Remote Sensing & Geoinformation of Environment , 04, April.",
    "link": "https://rscy2023.cyprusremotesensing.com/sites/default/files/docs/RSCy2023_Conference_program_0.pdf"
  },
  {
    "text": "I. Manakos, 2023. Inundation mapping in service of land cover evidence-based change monitoring. Keynote speaker at the Ninth International Conference on Remote Sensing & Geoinformation of Environment , 04, April.",
    "link": "https://rscy2023.cyprusremotesensing.com/sites/default/files/docs/RSCy2023_Conference_program_0.pdf"
  },
  {
    "text": "I. Manakos, 2023. Water We Drink through WQeMS: A Copernicus Assisted Water Quality Monitoring Service, Water Market Europe , Brussels, Belgium, 15, March.",
    "link": "https://watereurope.eu/events/water-market-europe/"
  },
  {
    "text": "I. Manakos, 2022. WQeMS: a Copernicus assisted monitoring platform for the water we drink in Athens. EuroGEO workshop , Athens, Greece, 08 December.",
    "link": "https://rea.ec.europa.eu/events/eurogeo-workshop-2022-2022-12-07_en"
  },
  {
    "text": "M. Milczarek, S. Aleksandrowicz, A. Kita, R.-T. Chadoulis I. Manakos, E. Woźniak, 2022. Comparative analysis of selected scorched terrain detection methods on Sentinel-2 satellite images (Analiza porównawcza wybranych metod wykrywania spalonego terenu na obrazach satelitarnych Sentinel-2). Presentation at the 25th National Conference of Photointerpretation and Remote Sensing (XXV Ogólnopolska Konferencja Fotointerpretacji i Teledetekcji) , 28-30, November.",
    "link": "https://www.xxvokfit.pw.edu.pl/"
  },
  {
    "text": "I. Manakos, 2022. An Overview of European Research Directions in Land-Use Science, invited speaker at the NASA LCLUC Science Team Meeting & Silver Jubilee Celebration , 20, October.",
    "link": "https://lcluc.umd.edu/meetings/2021-22-nasa-lcluc-science-team-meeting-silver-jubilee-celebration"
  },
  {
    "text": "I. Manakos, A. Kita, F. Zaffanella, S. Papadopoulou, L. Napolitano, 2022. Adaptability of Inundation Mapping in Service of the Water Utilities: the Case of Giaretta Lake and Brenta River. 41st EARSeL Symposium , Paphos, Cyprus, 14, September.",
    "link": "https://cyprus2022.earsel.org/"
  },
  {
    "text": "I. Manakos, 2022. Land cover and land use products in service of agriculture and ecosystem monitoring EuroGEO showcases , NASA LCLUC Science Team Meeting & Silver Jubilee Celebration , 18, October.",
    "link": "https://lcluc.umd.edu/meetings/2021-22-nasa-lcluc-science-team-meeting-silver-jubilee-celebration"
  },
  {
    "text": "P. Archiciński, S. Sala, E. Katsikis, M. Ruciński, R.-T. Chadoulis, A. Kita, E. Gromny, E. Woźniak, I. Manakos, 2022. Correlation of the flooding regime with the presence of Solidago Gigantea over the valley of narew in Poland. Presentation at the IALE 2022 European Landscape Ecology Congress , 11-15, July.",
    "link": "https://www.iale2022.eu/home.html"
  },
  {
    "text": "A. Kita, M. Sismanis, I. Manakos, C. Kalogeropoulos, C. Christodoulou, J. S. Lioumbas, 2022. Fusion of Sentinel-1 and Sentinel-2 data for inundation mapping in service of the water utilities, ESA Living Planet Symposium , Bonn, Germany, 23–27, May.",
    "link": "https://www.esa.int/Applications/Observing_the_Earth/Save_the_date_Living_Planet_Symposium_2022"
  },
  {
    "text": "I. Serral, J. Masó, N. Julià, I. Manakos, G. Milis, L. Pesquer, 2022. Applying water requirements into metadata in the era of SDGs and Essential Variables: semantics, quality parameters and discoverability in the GEM+ , EGU General Assembly, Vienna, Austria, Doi: 10.5194/egusphere-egu22-5490, 23–27, May.",
    "link": "https://meetingorganizer.copernicus.org/EGU22/EGU22-5490.html"
  },
  {
    "text": "I. Manakos, 2022. Introduction to the Copernicus Assisted Lake Water Quality Emergency Monitoring Service - WQeMS, ESA's Living Planet Symposium , Bonn, Germany, 26, May.",
    "link": "https://www.esa.int/Applications/Observing_the_Earth/Save_the_date_Living_Planet_Symposium_2022"
  },
  {
    "text": "M. Sismanis, I. Manakos, 2021. Copernicus Sentinel-1 and Sentinel-2 data help create inundation maps . Sentinel Success Stories, The European Space Agency, 16, December.",
    "link": "https://sentinel.esa.int/ca/web/success-stories/-/copernicus-sentinel-1-sentinel-2-data-help-create-inundation-maps"
  },
  {
    "text": "I. Manakos, 2021. A water quality emergency monitoring service evolution and the generation of a roadmap for future Copernicus water services: WQeMS meets Water-ForCE . GEO Week 2021, 26, November.",
    "link": "https://www.youtube.com/watch?v=3EjTIHosges&ab_channel=GrouponEarthObservations"
  },
  {
    "text": "R-T. Chadoulis, I. Manakos, 2021. Canopy height estimation from spaceborne imagery using convolutional encoder-decoder . Sentinel Success Stories, The European Space Agency, 11, November.",
    "link": "https://sentinels.copernicus.eu/web/success-stories/-/copernicus-sentinel-2-data-for-canopy-height-estimation"
  },
  {
    "text": "I. Manakos, 2021. CEMS possible evolution towards a Water Quality Emergency Monitoring Service add-on for the Water We Drink . CEMS Week 2021, 25, October.",
    "link": "https://emergency.copernicus.eu/mapping/ems/cems-week-2021"
  },
  {
    "text": "M. Banti, E. Katsikis, 2021. The PONTOS project, the Copernicus Earth Observation program and introduction to PONTOS platform and application tools. Online presentation at PONTOS' brainstorming event , Georgia , 22, July.",
    "link": "https://pontos-eu.aua.am/outreach/brainstorming-event-in-georgia/"
  },
  {
    "text": "I. Manakos, 2021. MedRIN Remote Sensing hot-topics by Country. Online presentation of the Greek presence in MedRIN/ GOFC GOLD network at the Joint MedRIN and SCERIN Virtual Capacity Building Workshop , 15-17 June.",
    "link": "http://start.org/wp-content/uploads/news/Joint-MS-Capacity-Building-Workshop_Final-Agenda.pdf"
  },
  {
    "text": "I. Manakos, 2021. Earth Observation Data for Ecosystem Monitoring tool: an integrator of geospatial data towards policy implementation. Keynote speaker at the 40th EARSeL Symposium , 07-10, June.",
    "link": "http://symposium.earsel.org/40th-symposium-Warszaw/keynote-speakers/"
  },
  {
    "text": "I. Manakos, M. Banti, E. Katsikis, 2021. The PONTOS project, the Copernicus Earth Observation program and introduction to PONTOS platform and application tools. Online presentation at PONTOS' brainstorming event , Nestos, Greece, 26, May.",
    "link": "https://pontos-eu.aua.am/outreach/brainstorming-event-gr/"
  },
  {
    "text": "I. Manakos, 2021. Earth Observation in Service of Terrestrial Ecosystems' Monitoring. Keynote speaker at the 7th International Conference on Geographical Information Systems Theory, Applications and Management (GISTAM) , 23 - 25, April.",
    "link": "https://www.insticc.org/node/TechnicalProgram/gistam/2021/presentationDetails/1368"
  },
  {
    "text": "I. Manakos, 2020. Copernicus assisted services for forest management. Keynote speaker at the 9th International Symposium on Forest and Sustainable Development . Contributors for the services: H. Łoś, I. Piccard, S. Jose Rodrigues Saraiva, K. Panda, H. Erdem, A. Taravat, A. Stergioudis, M. Heurich, A. Delopoulos, C. Boutsoukis, D. Aristeridou, G. Kordelas, Brasov, Romania, 16 October.",
    "link": "https://unitbv.ro/en/research/scientific-events/408-scientific-events-2020/3936-the-9th-international-symposium-forest-and-sustainable-development.html"
  },
  {
    "text": "I. Manakos, 2020. Interview. Second edition of MedRIN's (Mediterranean Regional Information Network) newsletter , July.",
    "link": "https://gofcgold.org/sites/default/files/2020-06/MedRIN-NEWSLETTER-2020_Final3.pdf"
  },
  {
    "text": "A. Drosou, I. Manakos, 2020. Snapearth's (H2020 project) News announcement, Earth Observation data and Artificial Intelligence in support of Journalism , 31, March.",
    "link": "http://snapearth.eu/"
  },
  {
    "text": "J. Bustamante, I. Manakos, D. García, R. Díaz-Delgado, P. Méndez, G. Kordelas, 2019. CERTH's news announcement about the Copernicus Sentinels improve hydroperiod estimations of Mediterranean wetlands, ( Aξιοποίηση των δορυφορικών δεδομένων του δικτύου Copernicus στον υπολογισμό της εποχικής δυναμικότητας και της υδροπεριόδου των μεσογειακών υγρότοπων , article in Greek), 25, October.",
    "link": "https://www.certh.gr/A518490D.el.aspx"
  },
  {
    "text": "J. Bustamante, I. Manakos, D. García, R. Díaz-Delgado, P. Méndez, G. Kordelas, 2019. ESA's Sentinel Online Journal news about Copernicus Sentinels improve hydroperiod estimations of Mediterranean wetlands , 17, October.",
    "link": "https://earth.esa.int/web/sentinel/news/-/article/copernicus-sentinels-improve-hydroperiod-estimations-of-mediterranean-wetlands"
  },
  {
    "text": "I. Manakos, 2019. How to incorporate Sentinel 1 to hydroperiod estimates in Doñana. Oral presentation at the ECOPOTENTIAL tools hands-on workshop, Doñana Biological Reserve, Spain, 1-2, October.",
    "link": null
  },
  {
    "text": "I. Manakos, 2019. Using Sentinel 2 to estimate hydroperiod in Doñana. Oral presentation at the ECOPOTENTIAL tools hands-on workshop, Doñana Biological Reserve, Spain, 1-2, October.",
    "link": null
  },
  {
    "text": "I. Manakos, 2019. Cooperation experiences and outlook with the Validation focus Working Group of SCERIN. Oral presentation at the International LCLUC Regional Science Joint Meeting for Central Asia and Caucasus: Water - Energy - Food and Sustainability , Nur Sultan, Kazakhstan, 16- 18, September.",
    "link": "https://gofcgold.org/meetings/international-meeting-land-coverland-use-changes"
  },
  {
    "text": "I. Manakos, 2019. Inundation mapping by fusing Sentinel-1 and Sentinel-2 images with machine learning techniques: the ECOPOTENTIAL legacy. Oral presentation at the International LCLUC Regional Science Joint Meeting for Central Asia and Caucasus: Water - Energy - Food and Sustainability , Nur Sultan, Kazakhstan, 16- 18, September.",
    "link": "https://gofcgold.org/meetings/international-meeting-land-coverland-use-changes"
  },
  {
    "text": "Manakos, I., Kordelas, G., Marini, K., Bakratsas, M., Chantziaras, G., Bonet-García, F., Gómez, M., Herrero, J., Suárez-Muñoz, M., Marangi, C., Martiradonna, A., Diele, F., Rinaldo, A., Pasetto, D., Giezendanner, J., Gonçalves, J., Honrado, J., Arenas-Castro, S., Cord, A., Bustamante, J., Garcia, D., Díaz-Delgado, R., 2019. ECOPOTENTIAL On Line Data Services. Poster at the EuroGEOSS Workshop, Lisbon, Portugal, 3-5 July.",
    "link": "https://ec.europa.eu/easme/sites/easme-site/files/eurogeoss-workshop-posters.pdf"
  },
  {
    "text": "Provenzale, A., Giamberini, S., Marangi, C., Masò, J., Domingo, C., Lucas, R., Peterseil, J., Poursanidis, D., Simoes, J., Manakos, I., Marini, K., Kordelas, G., Blonda, P., Adamo, M., Tarantino, C., Karnieli, A., Santoro, M., Roncella, R., Mazzetti, P., 2019. MADE IN ECOPOTENTIAL: data portals and tools for natural ecosystems. Poster at the EuroGEOSS Workshop, Lisbon, Portugal, 3-5 July.",
    "link": "https://ec.europa.eu/easme/sites/easme-site/files/eurogeoss-workshop-posters.pdf"
  },
  {
    "text": "Mazzetti, P., Manakos, I., 2019. The ECOPOTENTIAL Virtual Laboratory (VLab): a tool to share and run scientific models on cloud platforms. Presentation at the EuroGEOSS workshop , Lisbon, Portugal, 3-5 July. Contributors for the data cube part: Aristeridou, D., Kordelas, G., Marini, K., Giuliani, G., Guigoz, Y., Chatenoux, B., Chrysoulakis, N., Poursanidis, D.",
    "link": "https://ec.europa.eu/easme/en/section/easme-home/eurogeoss-workshop-2019"
  },
  {
    "text": "Ambrosia, V., Hadjimitsis, D., Gitas, G., Manakos, I., Zalides, G., Kalaitzides, C., Brice, M., Albrechtova, J., Deodato, T., Chrysoulakis, N., Ben Dor, E., Karnielli, A., Kontoes, H., Genç, L., Koru, A. & Themistocleous, K., 2019. The benefits for joining forces in the Mediterranean region in earth observation: The Mediterranean Regional Information Network (MedRIN). Presentation at 39th Annual EARSeL Symposium , Salzburg, Austria, 1-4 July.",
    "link": "http://symposium.earsel.org/39th-symposium-Salzburg/"
  },
  {
    "text": "Manakos, I., 2019. ECOPOTENTIAL online data services legacy and SCERIN applications. Presentation at SCERIN-7 Capacity Building Workshop on Earth System Observations, \"Land Cover Dynamics in the Agricultural and Protected Natural Areas in the SCERIN Domain\" , Novi Sad, Serbia, 24-27 June.",
    "link": "http://csebr.cz/scerin2019/index.html"
  },
  {
    "text": "Manakos, I., Aristeridou, D., Kordelas, G., Marini, K., Giuliani, G., Guigoz, Y., Chatenoux, B., Chrysoulakis, N., Poursanidis, D., 2019. Exploring the potential of Earth Observations Data Cube for monitoring a protected area. Presentation at ECOPOTENTIAL General Meeting , Rome, Italy, 20-24 May.",
    "link": "https://www.ecopotential-project.eu/"
  },
  {
    "text": "Manakos, I., Kordelas, G., Bustamante, J., Poulin, B., 2019. Copernicus assisted inundation mapping for wetland Protected Areas. Presentation at ECOPOTENTIAL General Meeting , Rome, Italy, 20-24 May.",
    "link": "https://www.ecopotential-project.eu/"
  },
  {
    "text": "Manakos, I., Kordelas, G., Bustamante, J., Marini, K., 2019. Derivation of inundation maps by fusing Sentinel-1 data with Sentinel-2 products to overcome cloudy conditions. Oral presentation at 2019 Living Planet Symposium , Milan, Italy, 13-17 May.",
    "link": "https://lps19.esa.int/NikalWebsitePortal/living-planet-symposium-2019/lps19"
  },
  {
    "text": "Filchev, L., Manakos, I., Reuter, R., Mardirossian, G., Dimitrov, D., Kraleva, L., Srebrova, T., 2019. EEOBSS - EO education for Bulgarian secondary schools. Presentation and poster at United Nations/Romania International Conference on Space Solutions for Sustainable Agriculture and Precision Farming, Cluj-Napoca, Romania, 06 - 10 May.",
    "link": "http://www.unoosa.org/documents/pdf/psa/activities/2019/UNRomania2019/UNRomania_Presentations/Filchev_L_et_al-EEOBSS-UNOOSA-ROSA-2019.pdf"
  },
  {
    "text": "Manakos, I., Kordelas, G., Marini, K., Bakratsas, M., Chantziaras, G., Bonet-García, F., Polo-Gómez, M., Herrero, J., Suárez-Muñoz, M., Marangi, C., Martiradonna, A., Diele, F., Rinaldo, A., Pasetto, D., Giezendanner, J., Gonçalves, J., Honrado, J., Arenas-Castro, S., Cord, A., Bustamante, J., Garcia D. & Díaz-Delgado, R., 2019. Online monitoring data services for ecosystem indicators: an overview of ECOPOTENTIAL results. Presentation at 2019 NASA LCLUC Spring Science Team Meeting , Washington DC, USA, 9-11 April.",
    "link": "https://lcluc.umd.edu/meetings/2019-nasa-lcluc-spring-science-team-meeting"
  },
  {
    "text": "Manakos, I., Albrechtová, J., Campbell, P. & Kupková, L., 2019. The SCERIN network: Best practices and achievements. Oral presentation at the Mediterranean Regional Information Network (MedRIN) Meeting and Workshop , Paphos, Cyprus, 20 March.",
    "link": "https://gofcgoldvh1.umd.edu/sites/default/files/2019-04/MedRIN_SCERIN_Manakos.pdf"
  },
  {
    "text": "Manakos, I., Kordelas, G.A., Lefebvre, G., Poulin, B., Willm, L., Davranche, A. & Campagna, J., 2019. Automatic Thresholding Inundation Mapping Using Sentinel‐2 Data At The Camargue Wetlands. Oral presentation at the 7th International Conference on Remote Sensing and Geoinformation of Environment , Paphos, Cyprus, 18-21 March.",
    "link": "https://www.cyprusremotesensing.com/rscy2019/sites/default/files/docs/RSCy2019_conference_program.pdf"
  },
  {
    "text": "Mardirossian, G., Dimitrov, D., Manakos, I., 2019. Presentation of the EEOBSS tutorial contents at the Space Research and Technology Institute-Bulgarian Academy of Sciences, Sofia, Bulgaria, 22 February.",
    "link": "https://eeobss.space/"
  },
  {
    "text": "Manakos, I., Kordelas, G., Aragonés, D., Diaz-Delgado, R., Marini, K. & Bustamante, J., 2018. Benefits and challenges for Sentinel 1 & 2 supported hydroperiod estimation in wetland areas. Poster at the 38th EARSeL Symposium, Earth Observation Supporting Sustainability Research, Chania, Greece, 09-12 July.",
    "link": null
  },
  {
    "text": "Lucas R., Manakos, I., Mitchell, A. & Blonda, P., 2018. Land cover change detection based on quantitative evidence through EODESM. Oral presentation and poster at the 3rd joint EARSeL LULC & NASA LCLUC Workshop, Land-Use/Cover Change Drivers, Impacts and Sustainability within the Water-Energy-Food Nexus, Chania, Greece, 11-12 July.",
    "link": null
  },
  {
    "text": "Filchev, L., Manakos, I., Marini, K., Reuter, R., Mardirossian, G., Dimitrov, D., Kraleva, L., Srebrova, T., Mihnev, P., 2018. Education in Earth Observation for Bulgarian Secondary Schools. Poster at the 38th EARSeL Symposium, Earth Observation Supporting Sustainability Research, Chania, Greece, 09-12 July.",
    "link": null
  },
  {
    "text": "Lucas, R., Manakos, I., Mitchell, A., Blonda, P., 2018. The EODESM system: a New Approach to Land Cover and Change Classification. Speed talk and poster at the NASA LCLUC Spring Science Team Meeting, Gaithersburg, USA, 03-05 April.",
    "link": null
  },
  {
    "text": "Manakos, I., Tomaszewska, M., Gkinis, I., Brovkina, O., Filchev, L., Genc, L., Halabuk, A., Inalpulat, M., Irimescu, A., Jelev, G., Katagis, T., Kupková, L., Lavreniuk, M., Mesaroš, M., Mihailescu, D., Nita, M., Rusnak, T., Zemek, F., Albrechtová, J., Campbell, P., 2018. GOFC-GOLD SCERIN: Multinational Intercomparison of Global and Continental Land Cover Products in South Central and Eastern European Region - preliminary results’. Speed talk and poster at the NASA LCLUC Spring Science Team Meeting, Gaithersburg, USA, 03-05 April.",
    "link": null
  },
  {
    "text": "Hummel, C., Boyer, Y., Jurek, M., Andresen, P.M., Kobler, J., Beierkuhnlein, C., Provenzale, A., Ziv, G., Heurich, M., Kordelas, G., Wit, R., Manakos, I., Hummel, H., 2017. Ecosystem Services and Pressures in European Protected Areas: Divergent Views of Environmental Scientists and Managers. 6th Symposium for Research in Protected Areas, Salzburg, Austria, 02-03 November.",
    "link": null
  },
  {
    "text": "Manakos, I., 2017. Overview of ECOPOTENTIAL project. Oral presentation at the EO for achieving & monitoring mountain-related SDGs: ECOPOTENTIAL, GEO-GNOME & GEO-ECO Side Event to GEO Plenary XIV 2017, Washington DC, USA, 24 October.",
    "link": null
  },
  {
    "text": "Manakos, I., 2017. Contribution of EO to Environmental Education. Oral presentation at the Education in Earth Observation for Bulgarian Secondary Schools’ Workshop, Blagoevgrad, Bulgaria, 12-14 September.",
    "link": null
  },
  {
    "text": "Manakos, I., 2017. The Food and Agricultural Organisation Land Cover Classification System (LCCS2) & Application of Earth Observation in ecosystem services. Oral presentation at the Education in Earth Observation for Bulgarian Secondary Schools’ Summer school, Blagoevgrad, Bulgaria, 12-14 September.",
    "link": null
  },
  {
    "text": "Nativi, S., Mazzetti, P., Santoro, M., Manakos, I., Kordelas, G., Lucas, R., 2017. The GEO ECOPOTENTIAL Virtual Laboratory: a virtual research environment for ecosystem open science. Oral presentation at the Earth Observation Open Science 2017, Frascati, Italy, 25-28 September.",
    "link": null
  },
  {
    "text": "Manakos, I., 2017. EOs improving ecosystem benefits: ECOPOTENTIAL Activities in the SCERIN Protected Areas. Oral presentation at the SCERIN-5 Capacity Building Workshop, University of Pecs, Hungary, 20-23 June.",
    "link": null
  },
  {
    "text": "Manakos, I., Domingo, C., Blonda, P., 2017. Applications of EO tools in Protected Areas. Oral presentation at the Application of Earth Observation tools in protected areas Workshop, Pisa, Italy, 02-05 May.",
    "link": null
  },
  {
    "text": "Savvaidis, A., Chrysoulakis, N., Grammalidis, N., Lagios, E., Lykousis, V., Manakos, I., Nikolakopoulos, K., Papadimitriou, P., Papaioannou, C., Papatheodorou, G., Papazachos, C., Paradisis, D., Parcharidis, I., Pikridas, C., Sakellariou, D., Sarris, A., ‘EnCeladus hellenIc Supersite (Evoikos, Corinth rift and Ionian Sea)‘, 2017. European Geosciences Union (EGU), General Assembly 2017, 23-28 April, Geophysical Research Abstracts, Vol. 19.",
    "link": null
  },
  {
    "text": "Manakos, I., 2016. Global land cover products validation and inter-comparison in the SCERIN area. Oral Presenation at SCERIN-4 Capacity Building Workshop , Faculty of Foresty, Technical University in Zvolen, Slovakia, 18 - 22 July.",
    "link": "http://csebr.cz/scerin2016/presentations.html"
  },
  {
    "text": "Lucas, R., Mitchell, A., Blonda, P., Tomaselli, V., Tarantino, C., Adamo, P., Marangi, C., Manakos, I., Kosmidou, V., Petrou, Z., Bunting, P., Scott, D., Horton, C., Scarth, P., 2017. ‘Global to Local Land Cover and Habitat Mapping: The Ecopotential Approach. Oral presentation at the WorldCover 2017 Conference, Frascati, Italy, 14-16 March.",
    "link": null
  },
  {
    "text": "Manakos, I., Technitou, E., Petrou, Z., Karydas, C., Tomaselli, V., Veronico, G., Mountrakis, G., 2016. Multi-modal knowledge base generation from very high-resolution satellite imagery for habitat mapping. Poster presentation at the 2nd EARSeL SIG LU/LC and NASA LCLUC joint Workshop “Advancing horizons for land cover services entering the big data era”, Prague, Czech Republic, 6-7 May.",
    "link": null
  },
  {
    "text": "'Remotely-Sensed Biodiversity Variables for terrestrial ecosystem monitoring’, XIII international conference ‘Space, Ecology, Safety', Sofia, Bulgaria, 02-04 November 2017.",
    "link": null
  },
  {
    "text": "'Earth Observation LULC Products for Ecosystems and Agriculture in the EU', NASA LCLUC Spring Science Team Meeting (20th Anniversary), 18th -19th April, North Bethesda, Maryland, USA.",
    "link": null
  },
  {
    "text": "Provenzale, A., Beierkuhnlein, C., Marangi, C., Freyhof, J., Brito, F., Maso, J., Peterseil, J., Ziv, G., El Serafy, G., Walz, A., Hummel, H., Nativi, S., Jurek, M., Basset, A., Manakos, I., 2016. ECOPOTENTIAL: Remote Sensing in service of Ecosystems and Human Well-being. Poster presentation at the NASA LCLUC Spring Science Team Meeting, North Bethesda, Maryland, USA, 18-19 April.",
    "link": null
  },
  {
    "text": "Manakos, I., 2016. Earth Observation LULC Products for Ecosystems and Agriculture in the EU. Oral presentation at the NASA LCLUC Spring Science Team Meeting, North Bethesda, Maryland, USA, 18-19 April.",
    "link": null
  },
  {
    "text": "'European Collaborations with NASA LCLUC Program and Current Priorities', NASA LCLUC Spring Science Team Meeting, 22nd -23rd April, College Park, Maryland, USA.",
    "link": null
  },
  {
    "text": "'Earth Observation system for Habitats Observation', 2nd Technology Forum, 8 May, SEPVE, Thessaloniki.",
    "link": null
  },
  {
    "text": "'Remote Sensing and Environmental Innovation', JRC-CERTH technical meeting, 21st October, CERTH, Thessaloniki.",
    "link": null
  },
  {
    "text": "'Remote Sensing', 1st Technology Forum, 27 June, SEPVE/ CERTH, Thessaloniki, Greece.",
    "link": null
  },
  {
    "text": "'Remote Sensing in support of the Geo-information in Europe', Gnorasi Workshop 'Knowledge and processing algorithms for remote sensing data', 2nd December, CERTH, Thessaloniki, Greece.",
    "link": null
  },
  {
    "text": "'From Space to Species: The BIO_SOS European initiative for habitat monitoring', 1st International Conference on Remote Sensing and Geoinformation in Pafos, 8th – 10th April, Cyprus.",
    "link": null
  },
  {
    "text": "'From Space to species: The BIO_SOS European initiative for habitat monitoring', Seminar Series of the Cyprus Institute in Nicosia, 10th April, Cyprus.",
    "link": null
  },
  {
    "text": "Kosmidou, V., Petrou, Z., Adamo, M., Manakos, I., Mücher, C.A., Lucas, R., Tarantino, C., Jongman, R.H.G, Bogers, M., Tomaselli, V., Bunce, R.G.H., & Blonda, P., 2013. Harmonizing the Land Cover Classification System (LCCS) and the General Habitat Categories (GHC) taxonomies. Oral presentation and Symposium abstracts \"Earth Observation for biodiversity surveillance: technology for policy implementation\", IALE EUROPE, Manchester, UK.",
    "link": null
  },
  {
    "text": "Petrou, Z., Manakos, I., Stathaki, T., Tarantino, C., Adamo, M., & Blonda, P., 2013. Canopy height estimation through the use of texture analysis of a very high-resolution satellite image. Poster presentation at the 4th Advanced Training Course in Land Remote Sensing, ESA, Athens.",
    "link": null
  },
  {
    "text": "Blonda, P., Dimopoulos, P., Jongman, R.H.G., Mucher, C.A., Nagendra, H., Iasillo, D., Arnaud, A., Mairota, P., Honrado, J.P., Padoa-Schioppa, E., Lucas, R., Durieux, L., Bollanos, S., Candela, L., Inglada, J., & Manakos, I., 2013. BIO_SOS´ EODHaM System towards an operational Habitat Monitoring Service.Oral presentation and abstract at the Geospatial World Forum 2013, Rotterdam, The Netherlands.",
    "link": null
  },
  {
    "text": "Manakos, I., Sarantakos, G. & Voutetakis, P., 2013.Earth Observation products to support the Energy sector: Developments and trends. Oral presentation and abstract at the Geospatial World Forum 2013, Rotterdam, The Netherlands.",
    "link": null
  },
  {
    "text": "Blonda, P., Dimopoulos, P., Jongman, R.H.G., Mucher, S., Nagendra, H., Iasillo, D., Arnaud, A., Mairota, P., Honrado, J.P., Schioppa, E.P., Lucas, R., Durieux, L., Bollanos, S., Candela, L., Inglada, J., & Manakos, I., 2013. From Space To Species: The BIO_SOS European Initiative for Habitat Monitoring. Seminar Series at the Cyprus Institute, Nicosia, Cyprus.",
    "link": null
  },
  {
    "text": "Blonda, P., Dimopoulos, P., Jongman, R.H.G., Mucher, S., Nagendra, H., Iasillo, D., Arnaud, A., Mairota, P., Honrado, J.P., Schioppa, E.P., Lucas, R., Durieux, L., Bollanos, S., Candela, L., Inglada, J., & Manakos, I., 2013.From Space To Species: The BIO_SOS European Initiative for Habitat Monitoring. Keynote Speech at the 1st International Conference on Remote Sensing and Geoinformation of Environment, Pafos, Cyprus.",
    "link": null
  },
  {
    "text": "Blonda, P., Dimopoulos, P., Jongman, R.H.G., Mucher, C.A., Nagendra, H., Iasillo, D., Arnaud, A., Mairota, P., Honrado, J.P., Padoa-Schioppa, E., Lucas, R., Bunting, P., Durieux, L., Bollanos, S., Candela, L., Inglada, J. & I. Manakos, 2013. The BIO_SOS European Initiative for Habitat Monitoring. 33rd EARSeL annual Symposium Proceedings, Matera, Italy, 911 - 920.",
    "link": null
  }
];

const pressItems = [
  {
    "img": "/images/publishing/JOW_presscorner.png",
    "url": "https://www.karfitsa.gr/ekdiloseis/imerida-sti-thessaloniki-doryforikes-efarmoges-apo-ti-mavri-thalassa-sto-voreio-aigaio/",
    "caption": "PONTOS Joint Open Workshop 01/03/2022 (article in Greek)"
  },
  {
    "img": "/images/publishing/certh_newsletter.png",
    "url": "https://www.certh.gr/certh_newsletter.el.aspx",
    "caption": "CERTH newsletter pages 19-20, 28/06/2021 (article in Greek)"
  },
  {
    "img": "/images/publishing/nasa-maich.jpg",
    "url": "https://www.cretalive.gr/crete/synergasia-maich-me-th-nasa",
    "caption": "Cooperation between MAICH and NASA 10/07/2018 (article in Greek)"
  },
  {
    "img": "/images/news/newsletter-eshape1.jpg",
    "url": "http://e-shape.eu/images/newsletters/01_e-shape-newsletter.html",
    "caption": "E-shape newsletter, issue #1 October 2019 (in English)"
  },
  {
    "img": "/images/publishing/hopfen.png",
    "url": "",
    "caption": "Hopfen Rundschau Article in a regional journal in Bavaria 15/08/2024 article in German"
  }
];

const posterItems = [
  {
    "img": "/images/news/Poster_CERTH_updated.jpg",
    "caption": "ECOPOTENTIAL On Line Data Services, presented at the EuroGEOSS Workshop 2019"
  },
  {
    "img": "/images/news/EUROGEOSS_2.png",
    "caption": "MADE IN ECOPOTENTIAL: data portals and tools for natural ecosystems, presented at the EuroGEOSS Workshop 2019"
  },
  {
    "img": "/images/publishing/dc_poster.jpg",
    "caption": "Bytes από το διάστημα παρακολουθούν τη γη (in Greek), presented at the Researchers' Νight 2019"
  },
  {
    "img": "/images/publishing/spectral_poster.jpg",
    "caption": "Η φύση πέρα από την ανθρώπινη όραση.. Μια άλλη ματιά.. (in Greek), presented at the Researchers' Night 2019"
  },
  {
    "img": "/images/publishing/EEOBSS.jpg",
    "caption": "EEOBSS - EO Education for Bulgarian secondary schools (in English). Presented at UN/Romania International Conference on Space Solutions for Sustainable Agriculture and Precision Farming, 2019"
  },
  {
    "img": "/images/publishing/nasa_eshape.png",
    "caption": "Land cover and land use products in service of agriculture and ecosystem monitoring EuroGEO showcases, 2022"
  },
  {
    "img": "/images/publishing/esa_poster_2023.jpg",
    "caption": "Introduction to the Copernicus Assisted Lake Water Quality Emergency Monitoring Service – WQeMS, 2022"
  },
  {
    "img": "/images/publishing/nextland_2023_poster.jpg",
    "caption": "Canopy Height Estimation including Calibrated Uncertainty - spatioTempCHM -, 2023"
  },
  {
    "img": "/images/publishing/wqems_2023_poster.jpg",
    "caption": "The WQeMS Platform For Inland Surface Water Quality Monitoring: A Collaborative Tool For Drinking Water Managers And Innovators, 2023"
  }
];

const videoItems = [
  {
    "title": "DigiCotton: sustainable cotton farming in Nestos valley, July 2025",
    "url": "/videos/digicotton_ert_interview.mp4",
    "type": "local",
    "thumb": "/images/videos_start_image/digicotton_video_start_img.png",
    "note": "Greek National TV Interview"
  },
  {
    "title": "DigiRyzi: intelligent rice farming in Axios delta, June 2025",
    "url": "/videos/digiryzi_ert_interview.mp4",
    "type": "local",
    "thumb": "/images/videos_start_image/digiryzi_video_start_img.png",
    "note": "Greek National TV Interview"
  },
  {
    "title": "Παρατήρηση γης από το Διάστημα: οφέλη και υπηρεσίες για τον άνθρωπο (2015)",
    "url": "https://www.youtube.com/embed/WniWBZMRm9w",
    "type": "youtube",
    "note": "Researchers' Night 2020"
  },
  {
    "title": "Life of a Researcher (in Greek, 2015)",
    "url": "https://www.youtube.com/embed/FketIn_fNHg",
    "type": "youtube",
    "note": "Researchers' Night 2015"
  },
  {
    "title": "Radio interview about Remote Sensing in water, energy and food (in Greek, 2018)",
    "url": "https://www.youtube.com/embed/4x1T2HcAN6c",
    "type": "youtube"
  },
  {
    "title": "PONTOS Project Public Launch Event, July 2020",
    "url": "https://www.youtube.com/embed/VA-Ia6okR3s",
    "type": "youtube",
    "note": "Open on YouTube"
  },
  {
    "title": "Towards a Pan-European perspective – challenges in monitoring cross-scale processes (2018)",
    "url": "https://www.youtube.com/embed/JrJXan1O3S0",
    "type": "youtube"
  },
  {
    "title": "EODESM Product of ECOPOTENTIAL Project (2018)",
    "url": "https://player.vimeo.com/video/289580394",
    "type": "vimeo"
  },
  {
    "title": "AQUACYCLE Kick-off Meeting Photo Album (2019/2020)",
    "url": "https://www.youtube.com/embed/qmKrJLpRoXc",
    "type": "youtube"
  },
  {
    "title": "AQUACYCLE in Rolestorming Mode (in English, 2020)",
    "url": "https://www.youtube.com/embed/3ZmKoZxYoRg",
    "type": "youtube"
  },
  {
    "title": "ECOPOTENTIAL Project Presentation (in English, 2016)",
    "url": "https://www.youtube.com/embed/dytt5vmsIbw",
    "type": "youtube"
  },
  {
    "title": "ECOPOTENTIAL Virtual Laboratory Presentation (in English, 2017)",
    "url": "https://www.youtube.com/embed/SkmVmpYPvNY",
    "type": "youtube"
  },
  {
    "title": "9 ECOPOTENTIAL storylines (in English, 2018)",
    "url": "https://www.youtube.com/embed/bgg1CwmZgZQ",
    "type": "youtube"
  },
  {
    "title": "Earth observation to protect natural landscapes | ECOPOTENTIAL (2019)",
    "url": "https://www.youtube.com/embed/GeWf_IvXXdU",
    "type": "youtube"
  },
  {
    "title": "ECOPOTENTIAL EO resources for protected area management (2019)",
    "url": "https://www.youtube.com/embed/gpHqKHaB6a4",
    "type": "youtube"
  },
  {
    "title": "Land Cover Change and Land Degradation – Geo Week Canberra 2019",
    "url": "https://www.youtube.com/embed/W-JQc3rjC7g",
    "type": "youtube"
  },
  {
    "title": "Overview of the ECOPOTENTIAL project (2019)",
    "url": "https://www.youtube.com/embed/8N6zObQFqd0",
    "type": "youtube"
  },
  {
    "title": "EEOBSS Project: Earth Observation for Bulgarian Secondary Schools (2016)",
    "url": "https://www.youtube.com/embed/WnXH5erpY44",
    "type": "youtube"
  }
];

function PubItem({ text, link }: { text: string; link: string | null }) {
  return (
    <li className="bg-card rounded-xl border border-border p-4 shadow-sm">
      <p className="text-sm text-foreground leading-relaxed mb-2">{text}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
          View publication <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </li>
  );
}

export default function Publications() {
  const [location] = useLocation();
  const validIds = tabs.map(t => t.id);

  const getTabFromSearch = () => {
    const p = new URLSearchParams(window.location.search).get('tab') ?? '';
    return validIds.includes(p) ? p : 'journal';
  };

  const [activeTab, setActiveTab] = useState(getTabFromSearch);

  useEffect(() => {
    setActiveTab(getTabFromSearch());
  }, [location]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Publications</h1>
          <p className="text-xl text-muted-foreground">
            Scientific output of the EOS research team spanning journal articles, books, conference papers, and more.
          </p>
        </div>

        {/* Tab Nav */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Journal */}
        {activeTab === 'journal' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Journal Publications <span className="text-base font-normal text-muted-foreground">({journalPubs.length} entries)</span>
            </h2>
            <ol className="space-y-3 list-none">
              {journalPubs.map((pub, i) => <PubItem key={i} {...pub} />)}
            </ol>
          </section>
        )}

        {/* Books */}
        {activeTab === 'book' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Books / Book Chapters <span className="text-base font-normal text-muted-foreground">({bookPubs.length} entries)</span>
            </h2>
            <ol className="space-y-3 list-none">
              {bookPubs.map((pub, i) => <PubItem key={i} {...pub} />)}
            </ol>
          </section>
        )}

        {/* Conference */}
        {activeTab === 'conference' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Conference Publications <span className="text-base font-normal text-muted-foreground">({conferencePubs.length} entries)</span>
            </h2>
            <ol className="space-y-3 list-none">
              {conferencePubs.map((pub, i) => <PubItem key={i} {...pub} />)}
            </ol>
          </section>
        )}

        {/* Networking */}
        {activeTab === 'networking' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Networking / Communication <span className="text-base font-normal text-muted-foreground">({networkingPubs.length} entries)</span>
            </h2>
            <ol className="space-y-3 list-none">
              {networkingPubs.map((pub, i) => <PubItem key={i} {...pub} />)}
            </ol>
          </section>
        )}

        {/* Posters */}
        {activeTab === 'posters' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Poster Corner</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posterItems.map((p, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                  <img src={assetUrl(p.img)} alt={p.caption}
                    className="w-full h-48 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="p-3 text-center">
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos */}
        {activeTab === 'videos' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Video Corner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoItems.map((v, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                  {v.type === 'local' ? (
                    <a href={assetUrl(v.url)} target="_blank" rel="noopener noreferrer" className="block">
                      {v.thumb ? (
                        <img src={assetUrl(v.thumb)} alt={v.title} className="w-full h-44 object-cover hover:opacity-90 transition-opacity" />
                      ) : (
                        <div className="w-full h-44 bg-muted flex items-center justify-center">
                          <MonitorPlay className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </a>
                  ) : (
                    <div className="aspect-video">
                      <iframe className="w-full h-full" src={v.url} allowFullScreen title={v.title} />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground leading-snug">{v.title}</p>
                    {v.note && <p className="text-xs text-muted-foreground mt-1">{v.note}</p>}
                    {v.type === 'local' && (
                      <a href={assetUrl(v.url)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2">
                        Watch video <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Press */}
        {activeTab === 'press' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Press Corner</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressItems.map((p, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                      <img src={assetUrl(p.img)} alt={p.caption}
                        className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </a>
                  ) : (
                    <img src={assetUrl(p.img)} alt={p.caption}
                      className="w-full h-48 object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  )}
                  <div className="p-3 text-center">
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.caption}</p>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2">
                        Read article <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-200">
              <strong>Note:</strong> The <em>Hopfen Rundschau</em> article (Bavaria regional journal, August 2024, in German) is available as a{' '}
              <a href={assetUrl("/files/hopfen.pdf")} download className="underline font-semibold">PDF download</a>.
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
