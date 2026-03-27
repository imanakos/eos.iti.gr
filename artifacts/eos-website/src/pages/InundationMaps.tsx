import { ExternalLink, Droplets, MapPin } from "lucide-react";

const regions = [
  { name: "Doirani – Kerkini lakes", updated: "26/08/2020", url: "http://earthobservation.eu/inundation/?area=doirani" },
  { name: "Plain of Aksios Delta", updated: "12/06/2020", url: "http://earthobservation.eu/inundation/?area=axios" },
  { name: "North Keritis Watershed", updated: "Constantly updating", url: "http://earthobservation.eu/inundation/?area=keritis", isNew: true },
  { name: "South-West Wales Peninsula (Pembrokeshire)", updated: "01/08/2019", url: "http://earthobservation.eu/inundation/?area=wales" },
  { name: "Thessaloniki – Giannitsa Plain (subset area)", updated: "15/03/2019", url: "http://earthobservation.eu/inundation/?area=thessaloniki" },
  { name: "Zakynthos island", updated: "16/09/2019", url: "http://earthobservation.eu/inundation/?area=zakynthos" },
  { name: "Taldykol area (Kazakhstan)", updated: "17/09/2019", url: "http://earthobservation.eu/inundation/?area=kazakhstan" },
  { name: "North Keritis – Crete", updated: "07/11/2019", url: "http://earthobservation.eu/inundation/?area=crete" },
  { name: "Brasov (Romania)", updated: "New area", url: "http://earthobservation.eu/inundation/?area=brasov", isNew: true },
];

export default function InundationMaps() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-widest">Services &amp; Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Inundation Maps</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Flood inundation mapping from Sentinel-2 imagery for water resource management and flood assessment. Select a region below to access the latest inundation maps.
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
                      <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">new area</span>
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
          <h3 className="font-semibold text-foreground mb-2">About Inundation Maps</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Flood inundation maps are derived from Sentinel-2 multispectral imagery using water detection algorithms developed by the EOS team. These maps support water resource management, flood risk assessment, and hydroperiod analysis across selected study areas updated on a regular basis. The service builds on the WaterMasks module, which generates water masks through unsupervised local thresholding, and the HydroMap module, which produces hydroperiod maps from time-series water mask collections.
          </p>
        </div>

      </div>
    </div>
  );
}
