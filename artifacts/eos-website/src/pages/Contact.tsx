import { useState } from "react";
import { Mail, MapPin, Phone, Globe, ExternalLink, Linkedin, Printer } from "lucide-react";
import { assetUrl } from "@/lib/utils";

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

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = formData;
    const body = encodeURIComponent(`From: ${firstName} ${lastName} <${email}>\n\n${message}`);
    window.location.href = `mailto:imanakos@iti.gr?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const update =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Page header */}
      <div className="bg-[hsl(222_56%_14%)] pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">Contact</h1>
          <p className="text-white/65 text-lg max-w-xl">
            Reach out for research collaborations, service enquiries, or any questions about our
            work.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* ── Dr Manakos bio + contact ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left: profile & contact info */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex items-start gap-5">
              <img
                src={assetUrl("/images/structure/imanakos.jpg")}
                alt="Dr. Ioannis Manakos"
                className="w-24 h-24 rounded-2xl object-cover object-top flex-shrink-0 shadow"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  Ioannis Manakos, Dr.
                </h2>
                <p className="text-sm font-semibold text-primary mb-3">
                  Director of Research in Remote Sensing
                  <span className="block mt-1 text-[hsl(37_80%_40%)]">Copernicus Ambassador</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Information Technologies Institute (ITI)
                  <br />
                  Centre for Research and Technology Hellas (CERTH)
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/eoservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(210_90%_52%)]/10 text-[hsl(210_90%_42%)] text-xs font-semibold hover:bg-[hsl(210_90%_52%)]/20 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  <a
                    href="https://www.iti.gr/iti/en/people/ioannis-manakos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    ITI Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Contact details */}
            {[
              {
                icon: <MapPin className="w-4 h-4 text-primary" />,
                label: "Address",
                content: (
                  <>
                    6th km Harilaou – Thermi Road, 57001
                    <br />
                    Thermi, Thessaloniki, Greece
                  </>
                ),
              },
              {
                icon: <Mail className="w-4 h-4 text-[hsl(37_80%_46%)]" />,
                label: "Email",
                content: (
                  <a href="mailto:imanakos@iti.gr" className="text-primary hover:underline">
                    imanakos@iti.gr
                  </a>
                ),
              },
              {
                icon: <Phone className="w-4 h-4 text-[hsl(16_62%_50%)]" />,
                label: "Phone",
                content: <span>+30 2311 257760</span>,
              },
              {
                icon: <Printer className="w-4 h-4 text-muted-foreground" />,
                label: "Fax",
                content: <span>+30 2310 474128</span>,
              },
              {
                icon: <Globe className="w-4 h-4 text-muted-foreground" />,
                label: "Institution",
                content: (
                  <a
                    href="https://www.iti.gr/iti/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.iti.gr
                  </a>
                ),
              },
            ].map(({ icon, label, content }, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border p-4 shadow-sm flex items-center gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <div className="text-sm text-foreground">{content}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: contact form */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">Send a Message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {(["firstName", "lastName"] as const).map((field, i) => (
                  <div key={field} className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      {i === 0 ? "First Name" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData[field]}
                      onChange={update(field)}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      placeholder={i === 0 ? "Jane" : "Doe"}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={update("email")}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={update("subject")}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="Research Collaboration"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={update("message")}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
              <p className="text-xs text-muted-foreground text-center">
                This will open your email client to send a message to Dr. Manakos.
              </p>
            </form>
          </div>
        </div>

        {/* ── Background section ── */}
        <div className="border-t border-border pt-14">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Background</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            The EOS team builds on the background and experience that Dr. Ioannis Manakos has
            accumulated through decades of collaboration with academics, researchers, and
            technicians across four continents.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bio */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <h3 className="text-xl font-display font-bold text-foreground mb-5">
                A Brief Overview
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Dr. Ioannis Manakos is cooperating with academics and researchers from Europe,
                  America, Asia, and Africa in subjects relevant to Remote Sensing since 1996. He is{" "}
                  <strong className="text-foreground">
                    Director of Research in 'Remote Sensing'
                  </strong>{" "}
                  at the{" "}
                  <a
                    href="https://www.iti.gr/iti/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Information Technologies Institute (ITI)
                  </a>{" "}
                  of the{" "}
                  <a
                    href="https://www.certh.gr/root.en.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Centre for Research and Technology Hellas (CERTH)
                  </a>
                  .
                </p>
                <p>
                  He was elected{" "}
                  <strong className="text-foreground">
                    Chairman of the SIG 'Remote Sensing in Land Use &amp; Land Cover'
                  </strong>{" "}
                  of EARSeL for 2011–2020, and{" "}
                  <strong className="text-foreground">Chairman of EARSeL</strong> from 2012 to 2014.
                </p>
                <p>
                  He serves as a member of the{" "}
                  <strong className="text-foreground">GEOBON Flagship</strong> within the Group on
                  Earth Observations, and is an{" "}
                  <strong className="text-foreground">Adjunct Professor in Remote Sensing</strong>{" "}
                  at{" "}
                  <a
                    href="https://www.ciheam.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    CIHEAM
                  </a>
                  , where he led the Geoinformation in Environmental Management Department for seven
                  years.
                </p>
                <p>
                  He is a founding member of <strong className="text-foreground">MEDRIN</strong>, a{" "}
                  <strong className="text-foreground">Copernicus Ambassador</strong>, and a member
                  of the <strong className="text-foreground">Copernicus Academy</strong>. His
                  research spans from space-borne Earth Observation to in-situ proximal sensing
                  across a wide range of environmental application fields.
                </p>
              </div>
            </div>

            {/* Domain timeline */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Research Domain Timeline
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Evolution of research domains addressed over the years.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {domainTimeline.map((entry) => (
                  <div
                    key={entry.year}
                    className="flex items-start gap-2 py-1.5 border-b border-border/40"
                  >
                    <span className="text-xs font-bold text-primary shrink-0 w-9 tabular-nums">
                      {entry.year}
                    </span>
                    <span className="text-xs text-muted-foreground leading-snug">
                      {entry.domain}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
