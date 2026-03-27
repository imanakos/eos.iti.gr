import { ExternalLink, Satellite, MapPin } from "lucide-react";

const regions = [
  { name: "Doirani – Kerkini lakes", updated: "26/08/2020", url: "http://earthobservation.eu/vegindexes/?area=doirani" },
  { name: "Plain of Aksios Delta", updated: "12/06/2020", url: "http://earthobservation.eu/vegindexes/?area=axios" },
  { name: "North Keritis Watershed", updated: "Constantly updating", url: "http://earthobservation.eu/vegindexes/?area=keritis", isNew: true },
  { name: "South-West Wales Peninsula (Pembrokeshire)", updated: "01/08/2019", url: "http://earthobservation.eu/vegindexes/?area=wales" },
  { name: "Thessaloniki – Giannitsa Plain (subset area)", updated: "15/03/2019", url: "http://earthobservation.eu/vegindexes/?area=thessaloniki" },
  { name: "Zakynthos island", updated: "16/09/2019", url: "http://earthobservation.eu/vegindexes/?area=zakynthos" },
  { name: "Taldykol area (Kazakhstan)", updated: "17/09/2019", url: "http://earthobservation.eu/vegindexes/?area=kazakhstan" },
  { name: "North Keritis – Crete", updated: "07/11/2019", url: "http://earthobservation.eu/vegindexes/?area=crete" },
  { name: "Brasov (Romania)", updated: "New area", url: "http://earthobservation.eu/vegindexes/?area=brasov", isNew: true },
];

export default function VegetationIndices() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Satellite className="w-5 h-5 text-green-700 dark:text-green-400" />
            </div>
            <span className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-widest">Services &amp; Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Vegetation Indices</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Regional vegetation index calculation from Sentinel-2 imagery for plant health and agricultural monitoring. Select a region below to access the latest results.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-border bg-muted/40">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Select Region</h2>
            </div>
          </div>
          <div className="divide-y divide-border">
            {regions.map((region, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors group">
                <div className="flex items-start gap-3">
                  <div>
                    <span className="font-medium text-foreground">{region.name}</span>
                    {region.isNew && (
                      <span className="ml-2 text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">new area</span>
                    )}
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Last updated: {region.updated}
                    </div>
                  </div>
                </div>
                <a
                  href={region.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0 ml-4"
                >
                  Go <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-2">About Vegetation Indices</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Vegetation indices are quantitative measures derived from satellite remote sensing data that describe the spatial and temporal variation of vegetation. The EOS team calculates regional vegetation index products from Sentinel-2 imagery, made available for selected study areas across Europe, the Mediterranean basin, and Central Asia.
          </p>
        </div>

      </div>
    </div>
  );
}
