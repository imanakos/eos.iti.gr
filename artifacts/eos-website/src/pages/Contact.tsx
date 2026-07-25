import { useState } from "react";
import { Mail, MapPin, Phone, Globe, ExternalLink, Linkedin, Printer } from "lucide-react";
import { assetUrl } from "@/lib/utils";

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
      </div>
    </div>
  );
}
