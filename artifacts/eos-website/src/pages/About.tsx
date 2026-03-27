import { ExternalLink } from "lucide-react";

const domainTimeline = [
  { year: 1993, domain: "Remote Sensing & Geology" },
  { year: 1994, domain: "Geographic Information Systems" },
  { year: 1995, domain: "Geomorphology" },
  { year: 1996, domain: "Soil Sciences" },
  { year: 1997, domain: "Agriculture" },
  { year: 1998, domain: "Soil Erosion" },
  { year: 1999, domain: "Expert Systems" },
  { year: 2000, domain: "Precision Agriculture" },
  { year: 2001, domain: "Field Spectroradiometry" },
  { year: 2002, domain: "Programming" },
  { year: 2003, domain: "Reflection Models" },
  { year: 2004, domain: "Forestry" },
  { year: 2005, domain: "Landscape Architecture" },
  { year: 2006, domain: "Environment" },
  { year: 2007, domain: "Biodiversity" },
  { year: 2008, domain: "Tourism" },
  { year: 2009, domain: "Land Use and Management" },
  { year: 2010, domain: "Satellite Systems Design" },
  { year: 2011, domain: "Natural Resources Management" },
  { year: 2012, domain: "Habitat Monitoring" },
  { year: 2013, domain: "Uncertainty Handling" },
  { year: 2014, domain: "Urban Growth" },
  { year: 2015, domain: "Ecosystem Services" },
  { year: 2016, domain: "Physical Process Based Models" },
  { year: 2017, domain: "Marine Applications" },
  { year: 2018, domain: "Open Source Software Development for RS Applications" },
];

export default function About() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Background</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Eos.iti.gr builds on the background and experience that Dr. Ioannis Manakos accumulated by his interaction with all directly related or affiliated academics, researchers, and technicians, with whom he interacted and interacts within his studies and career.
          </p>
        </div>

        <div className="space-y-8">

          <section className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">A Brief Overview</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dr. Ioannis Manakos is cooperating with academics and researchers from Europe, America, Asia, and Africa in subjects relevant to research and development in Remote Sensing since 1996. He is{" "}
                <strong className="text-foreground">Director of Research in 'Remote Sensing'</strong> at the{" "}
                <a href="https://www.iti.gr/iti/en/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Information Technologies Institute (ITI)
                </a>{" "}
                of the{" "}
                <a href="https://www.certh.gr/root.en.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Centre for Research and Technology Hellas (CERTH)
                </a>
                .
              </p>
              <p>
                He was elected <strong className="text-foreground">Chairman of the Special Interest Group 'Remote Sensing in Land Use &amp; Land Cover'</strong> of the European Association of Remote Sensing Laboratories (EARSeL) for the period 2011–2020, and <strong className="text-foreground">Chairman of the EARSeL</strong> from 2012 till 2014.
              </p>
              <p>
                He serves as a member of the <strong className="text-foreground">GEOBON Flagship</strong> within the Group on Earth Observations.
              </p>
              <p>
                He is an <strong className="text-foreground">Adjunct Professor in Remote Sensing</strong> at the International Centre for Advanced Mediterranean Agronomic Studies (CIHEAM), where he was leading the Geoinformation in Environmental Management Department for seven (7) years.
              </p>
              <p>
                His activity is also recognized at the{" "}
                <strong className="text-foreground">South Central and Eastern European Regional Information Network (SCERIN)</strong>, regional network of the GOFC-GOLD (Global Observation of Forest and Land Cover Dynamics) and GTOS (Global Terrestrial Observing System), where he serves as Lead in relation with the 'Global/Continental land cover products validation and intercomparison in the SCERIN area'.
              </p>
              <p>
                He is a founding member of the <strong className="text-foreground">Mediterranean Regional Information Network (MEDRIN)</strong> and a member of the <strong className="text-foreground">Copernicus Academy</strong>.
              </p>
              <p>
                Dr. Ioannis Manakos coordinates and participates in European, bilateral, and national projects. The subjects of his research activities range from earth observation from space (remote sensing) to in situ measurements (proximal sensing), across a wide range of application fields.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-2">Research Domain Timeline</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Evolution of research domains addressed over the years.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {domainTimeline.map((entry) => (
                <div key={entry.year} className="flex items-start gap-2 py-2 border-b border-border/40">
                  <span className="text-xs font-bold text-primary shrink-0 w-10 tabular-nums">{entry.year}</span>
                  <span className="text-xs text-muted-foreground">{entry.domain}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-3">Location</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Information Technologies Institute (ITI)<br />
                Centre for Research and Technology Hellas (CERTH)<br />
                6th km Harilaou – Thermi Road<br />
                57001 Thermi, Thessaloniki, Greece
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Dr. Manakos' Profile</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Full profile and publication record available at the ITI website.
                </p>
              </div>
              <a
                href="https://www.iti.gr/iti/en/people/ioannis-manakos/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View Profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
