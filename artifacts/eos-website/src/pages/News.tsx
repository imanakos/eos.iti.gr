import { ArrowUpRight, Calendar } from "lucide-react";

const newsArticles = [
  {
    title: "EOS contributes to land degradation monitoring",
    excerpt: "New initiatives in the Asterousia MONALISA project aim to leverage satellite data for early detection of soil degradation across Mediterranean landscapes.",
    image: `${import.meta.env.BASE_URL}images/news-1.png`,
    date: "April 2025",
    href: "https://eos.iti.gr/by_our_team.php#news155",
  },
  {
    title: "DigiCotton - Producer and Agricultural Advisor Information Day",
    excerpt: "Sharing insights on how precision agriculture and Earth Observation can optimize cotton yield and resource usage with farmers and agronomists.",
    image: `${import.meta.env.BASE_URL}images/news-2.png`,
    date: "March 2025",
    href: "https://eos.iti.gr/by_our_team.php#news154",
  },
  {
    title: "Satellite Image Analysis Expanded for Hallertau Hop Farms",
    excerpt: "Our team expands monitoring capabilities for hop farms in Germany, providing vital satellite-derived data for harvest predictions.",
    image: `${import.meta.env.BASE_URL}images/news-3.png`,
    date: "2024",
    href: "https://eos.iti.gr/by_our_team.php#news148",
  },
  {
    title: "EOS team at the 200th anniversary of the Karlsruhe Institute of Technology (KIT)",
    excerpt: "Presenting our latest findings and forging new academic partnerships at the historic 200th anniversary celebration of KIT.",
    image: `${import.meta.env.BASE_URL}images/news-4.png`,
    date: "2024",
    href: "https://eos.iti.gr/by_our_team.php#news147",
  },
  {
    title: "Forest and Sustainable Development",
    excerpt: "New research highlights the critical role of continuous remote sensing in maintaining sustainable forestry practices and detecting land cover changes.",
    image: `${import.meta.env.BASE_URL}images/news-5.png`,
    date: "2024",
    href: "https://eos.iti.gr/by_our_team.php#news143",
  },
  {
    title: "The WQeMS Services Platform",
    excerpt: "Successful rollout of the Water Quality Emergency Monitoring Service, delivering crucial data to water utilities across Europe.",
    image: `${import.meta.env.BASE_URL}images/news-6.png`,
    date: "2023",
    href: "https://eos.iti.gr/by_our_team.php#news130",
  },
];

export default function News() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Latest News</h1>
          <p className="text-xl text-muted-foreground">Discover the latest updates, events, and breakthroughs from the EOS team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {newsArticles.map((article, i) => (
            <a
              key={i}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full cursor-pointer"
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h2>

              <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex items-center text-sm font-bold text-primary transition-colors mt-auto w-fit gap-1">
                Read more <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-border pt-10">
          <p className="text-muted-foreground mb-4">See all news and updates on our main website</p>
          <a
            href="https://eos.iti.gr/by_our_team.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            View All News <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
