import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Have questions about our research, products, or looking for potential collaborations? Reach out to the EOS team.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Address</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    Information Technologies Institute (ITI)<br/>
                    Centre for Research and Technology Hellas (CERTH)<br/>
                    6th km Harilaou - Thermi Road<br/>
                    57001 Thermi, Thessaloniki, Greece
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Email</h3>
                  <a href="mailto:info@iti.gr" className="text-muted-foreground hover:text-primary transition-colors mt-1 block">
                    info@iti.gr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Phone</h3>
                  <p className="text-muted-foreground mt-1">
                    +30 2311 257701
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Institution</h3>
                  <a href="https://www.iti.gr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors mt-1 block">
                    www.iti.gr
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Static demo) */}
          <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="Research Collaboration"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <Button type="button" className="w-full text-base py-6" onClick={() => alert("This is a static site demo. Contact form is not wired to a backend.")}>
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
