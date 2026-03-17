import { MapPin, Building2, Users, ExternalLink, BookOpen, Satellite } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are a specialized research group within CERTH/ITI dedicated to harnessing satellite and Earth Observation data for environmental sustainability, biodiversity, and resource management.
          </p>
        </div>

        <div className="space-y-10">

          <section className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary" />
              Background
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                The Information Technologies Institute (ITI) was founded in 1998 as a non-profit organisation under the auspices of the General Secretariat for Research and Technology (GSRT) of Greece. Since 2000 it is a founding member of the Centre for Research and Technology Hellas (CERTH).
              </p>
              <p>
                Within this ecosystem, the <strong className="text-foreground">EOS Remote Sensing team</strong> operates as a specialized hub focusing on Earth System Science. We bridge the gap between raw satellite data and actionable intelligence, serving both scientific communities and public utilities.
              </p>
              <p>
                Our team innovates in Earth Observation research with the development of products and services for monitoring and assessment of biodiversity, habitats, cultivations, resources, and land cover/use changes to support decisions, modelling and scenarios towards sustainability.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://eos.iti.gr/background.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
              >
                Read Full Background <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          <section className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Satellite className="w-6 h-6 text-secondary" />
              Our Vision
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Earth Observation for peaceful purposes aims at the improvement of human life. Rational usage of natural resources, food security and climate change impacts' mitigation constitute core drivers for the development of sensors by the European (ESA), American (NASA) and other Space Agencies worldwide.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted rounded-2xl p-5 border border-border">
                <h4 className="font-bold text-foreground mb-3">Overall Goals</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Serve societal needs and UN Sustainable Development Goals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Act in cooperation and challenge knowledge as 'a pebble in the lake'
                  </li>
                </ul>
              </div>
              <div className="bg-muted rounded-2xl p-5 border border-border">
                <h4 className="font-bold text-foreground mb-3">Specific Activities</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    Sustainable EO value added supply chains
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    Land cover change monitoring at various scales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    Incorporation of EO into Earth System Science modelling
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-secondary" />
              The Team
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Our multidisciplinary team consists of remote sensing experts, environmental scientists, software engineers, and GIS specialists working collaboratively to build next-generation monitoring tools.
            </p>
            <a
              href="https://eos.iti.gr/team.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 text-secondary font-semibold text-sm hover:bg-secondary/20 transition-colors"
            >
              View Full Team Directory <ExternalLink className="w-4 h-4" />
            </a>
          </section>

          <section className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-accent" />
              Publications & Recognition
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Our research is regularly published in top-tier scientific journals. The team also guest-edits special issues and organizes workshops at major international conferences.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://eos.iti.gr/publishing.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent font-semibold text-sm hover:bg-accent/20 transition-colors"
              >
                Publications <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://eos.iti.gr/special-issues.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium text-sm hover:bg-border transition-colors"
              >
                Special Issues <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl p-8 shadow-lg">
              <MapPin className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="opacity-90 leading-relaxed text-sm">
                Information Technologies Institute (ITI)<br />
                Centre for Research and Technology Hellas (CERTH)<br />
                6th km Harilaou - Thermi Road<br />
                57001 Thermi, Thessaloniki, Greece
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 border border-border shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Get Involved</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  We are always open to collaborations with passionate researchers, organisations, and students interested in Earth Observation.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors w-fit"
              >
                Contact Us →
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
