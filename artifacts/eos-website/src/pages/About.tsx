import { MapPin, Building2, Users } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground">
            We are a specialized research group within CERTH/ITI dedicated to harnessing satellite data for environmental sustainability.
          </p>
        </div>

        <div className="space-y-12">
          
          <section className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary" />
              Background
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                The Information Technologies Institute (ITI) was founded in 1998 as a non-profit organisation under the auspices of the General Secretariat for Research and Technology (GSRT) of Greece. Since 2000 it is a founding member of the Centre for Research and Technology Hellas (CERTH).
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                Within this ecosystem, the <strong>EOS Remote Sensing team</strong> operates as a specialized hub focusing on Earth System Science. We bridge the gap between raw satellite data and actionable intelligence, serving both scientific communities and public utilities.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-secondary" />
              The Team
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              Our multidisciplinary team consists of remote sensing experts, environmental scientists, software engineers, and GIS specialists working collaboratively to build next-generation monitoring tools.
            </p>
            
            <div className="bg-muted rounded-2xl p-6 border border-border">
              <p className="text-center text-muted-foreground italic">
                Detailed team profiles are available on our institutional portal.
              </p>
              <div className="mt-4 text-center">
                <a 
                  href="https://eos.iti.gr/team.php" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  View Full Team Directory
                </a>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl p-8 shadow-lg">
              <MapPin className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="opacity-90 leading-relaxed">
                6th km Harilaou - Thermi Road<br/>
                57001 Thermi, Thessaloniki<br/>
                Greece
              </p>
            </div>
            
            <div className="bg-card rounded-3xl p-8 border border-border shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-4">Join Us</h3>
              <p className="text-muted-foreground mb-6">
                We are always open to collaborations with passionate researchers and students interested in Earth Observation.
              </p>
              <a href="/contact" className="text-primary font-semibold hover:underline">
                Get in touch &rarr;
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
