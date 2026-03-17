const uavFleet = [
  {
    name: "DJI Mini 3 Pro",
    specs: "4K camera",
    description: "Compact, high-performance drone with a 4K camera ideal for aerial surveys, vegetation monitoring, and precision agriculture field work.",
  },
  {
    name: "Anafi AI Parrot",
    specs: "48 Megapixel camera",
    description: "Advanced multi-rotor UAV equipped with a 48 Mpx sensor, ideal for high-resolution aerial photography, hyperspectral coupling, and detailed environmental monitoring.",
  },
  {
    name: "Specialist UAV Platform",
    specs: "Multi-purpose",
    description: "Additional UAV platform for specialist deployments, enabling simultaneous multi-drone operations for large-area environmental surveys and multi-band data acquisition campaigns.",
  },
];

export default function UAV() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">UAV Services</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The EOS Team has developed the capacity of its personnel and hardware with three cutting-edge Unmanned Aerial Vehicles (UAVs) to facilitate activities in environmental monitoring.
          </p>
        </div>

        {/* Fleet photo */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-md mb-10">
          <img
            src="/images/news/drones.png"
            alt="EOS UAV Fleet — DJI Mini 3 Pro, Anafi AI Parrot, and DJI Mavic 3 Multispectral"
            className="w-full object-cover"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {uavFleet.map((uav, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-foreground mb-1">{uav.name}</h3>
                <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">{uav.specs}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{uav.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Agricultural Field Monitoring", desc: "High-resolution UAV surveys for cotton, rice, and hop farms. Used in DigiCotton and DigiRyzi projects for crop growth stage monitoring and yield estimation." },
              { title: "Environmental Surveys", desc: "Aerial data collection for wetland mapping, vegetation indices calculation, and land cover classification in ecologically sensitive areas." },
              { title: "Hyperspectral Data Collection", desc: "Integration of UAV platforms with hyperspectral sensors for detailed vegetation health assessment and species-level discrimination." },
              { title: "Flood & Emergency Mapping", desc: "Rapid deployment capability for inundation mapping and emergency response in flood-affected areas." },
            ].map((cap, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h3 className="font-bold text-foreground mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-6">
          <h3 className="font-bold text-foreground mb-2">Interested in UAV services?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We offer UAV-based data collection and analysis for research projects, environmental monitoring, and precision agriculture applications.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Contact us →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
