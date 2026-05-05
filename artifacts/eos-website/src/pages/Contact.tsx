import { useState } from "react";
import { Mail, MapPin, Phone, Globe, Printer } from "lucide-react";
import { assetUrl } from "@/lib/utils";

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = formData;
    const body = encodeURIComponent(`From: ${firstName} ${lastName} <${email}>\n\n${message}`);
    window.location.href = `mailto:imanakos@iti.gr?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact</h1>
          <p className="text-xl text-muted-foreground">
            Reach out for research collaborations, service enquiries, or any questions about our work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="space-y-6">

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex items-start gap-5">
              <img
                src={assetUrl("/images/structure/imanakos.jpg")}
                alt="Dr. Ioannis Manakos"
                className="w-20 h-20 rounded-xl object-cover object-top flex-shrink-0"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div>
                <h2 className="text-lg font-bold text-foreground">Ioannis Manakos, Dr.</h2>
                <p className="text-sm text-primary font-medium mb-3">Director of Research in Remote Sensing</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Information Technologies Institute<br />
                  Centre for Research and Technology Hellas
                </p>
              </div>
            </div>

            {[
              {
                icon: <MapPin className="w-5 h-5 text-primary" />,
                label: "Address",
                content: <>6th km Harilaou - Thermi, 57001<br />Thessaloniki, Greece</>,
              },
              {
                icon: <Mail className="w-5 h-5 text-secondary" />,
                label: "Email",
                content: <a href="mailto:imanakos@iti.gr" className="text-primary hover:underline">imanakos@iti.gr</a>,
              },
              {
                icon: <Phone className="w-5 h-5 text-accent" />,
                label: "Phone",
                content: <span>+30 2311 257760</span>,
              },
              {
                icon: <Printer className="w-5 h-5 text-muted-foreground" />,
                label: "Fax",
                content: <span>+30 2310 474128</span>,
              },
              {
                icon: <Globe className="w-5 h-5 text-muted-foreground" />,
                label: "Institution",
                content: <a href="https://www.iti.gr/iti/en/people/ioannis-manakos/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.iti.gr</a>,
              },
            ].map(({ icon, label, content }, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                  <div className="text-sm text-foreground">{content}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={update("firstName")}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={update("lastName")}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    placeholder="Doe"
                  />
                </div>
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
