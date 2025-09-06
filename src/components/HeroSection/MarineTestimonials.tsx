import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const marineResearchTestimonials = [
  {
    author: {
      name: "Dr. Sarah Chen",
      handle: "@marine_ecology_lab",
      avatar: "/api/placeholder/64/64"
    },
    text: "This integrated platform has revolutionized our species identification workflows. The eDNA analysis tools helped us discover three new species in the Indian Ocean EEZ.",
    href: "https://research-profile.com/sarah-chen"
  },
  {
    author: {
      name: "Prof. Ahmed Rahman",
      handle: "@oceanographic_institute",
      avatar: "/api/placeholder/64/64"
    },
    text: "The real-time oceanographic data integration capabilities have enhanced our climate modeling accuracy by 40%. Essential for understanding marine ecosystem changes."
  },
  {
    author: {
      name: "Dr. Maria Santos",
      handle: "@fisheries_research_center",
      avatar: "/api/placeholder/64/64"
    },
    text: "Cross-disciplinary correlation analysis between ocean parameters and fish distribution patterns has transformed our sustainable fisheries management approach.",
    href: "https://fisheries-institute.org/maria-santos"
  },
  {
    author: {
      name: "Dr. James Mitchell",
      handle: "@marine_conservation_lab",
      avatar: "/api/placeholder/64/64"
    },
    text: "The molecular biodiversity insights from this platform directly support our coral reef restoration projects. Data-driven conservation at its finest."
  },
  {
    author: {
      name: "Prof. Lakshmi Nair",
      handle: "@cmlre_kochi",
      avatar: "/api/placeholder/64/64"
    },
    text: "CMLRE's collaboration with this platform has accelerated our marine living resources assessment capabilities. The taxonomic database is unparalleled."
  },
  {
    author: {
      name: "Dr. Robert Thompson",
      handle: "@deep_sea_research",
      avatar: "/api/placeholder/64/64"
    },
    text: "The 3D oceanographic visualizations and otolith morphology tools have enhanced our deep-sea biodiversity research beyond expectations."
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof marineResearchTestimonials[0] }) => {
  const CardWrapper = testimonial.href ? 'a' : 'div';
  
  return (
    <CardWrapper
      href={testimonial.href}
      className="relative mx-4 w-80 flex-shrink-0 rounded-xl bg-gradient-to-b from-cyan-50/80 to-blue-50/40 dark:from-slate-800/60 dark:to-blue-900/20 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:from-cyan-100/90 hover:to-blue-100/60 dark:hover:from-slate-700/80 dark:hover:to-blue-800/40 hover:shadow-xl hover:scale-[1.02] border border-white/20 dark:border-slate-700/50"
    >
      <div className="flex items-start space-x-4">
        <Avatar className="h-12 w-12 ring-2 ring-cyan-200 dark:ring-cyan-700">
          <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
          <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white font-semibold">
            {testimonial.author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-slate-900 dark:text-white truncate">
              {testimonial.author.name}
            </h4>
          </div>
          <p className="text-sm text-cyan-700 dark:text-cyan-400 mb-3">
            {testimonial.author.handle}
          </p>
          <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed">
            "{testimonial.text}"
          </blockquote>
        </div>
      </div>
    </CardWrapper>
  );
};

const MarqueRow = ({ testimonials, reverse = false }: { testimonials: typeof marineResearchTestimonials; reverse?: boolean }) => {
  return (
    <div className="relative flex overflow-hidden">
      <div 
        className={`flex animate-marquee gap-4 ${reverse ? 'animate-marquee-reverse' : ''}`}
        style={{ animationDuration: '50s' }}
      >
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.author.name}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

const MarineTestimonials = () => {
  const firstRow = marineResearchTestimonials.slice(0, 3);
  const secondRow = marineResearchTestimonials.slice(3, 6);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-cyan-50/30 to-blue-50/20 dark:via-slate-800/30 dark:to-blue-900/10">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Trusted by </span>
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Leading Marine Researchers
            </span>
            <span className="text-foreground"> Worldwide</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Join renowned oceanographers and marine biologists advancing conservation science through integrated data intelligence
          </p>
        </div>
      </div>

      <div className="relative space-y-6">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cyan-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cyan-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        
        <MarqueRow testimonials={firstRow} />
        <MarqueRow testimonials={secondRow} reverse={true} />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cyan-500/5 dark:to-blue-500/10 pointer-events-none" />
    </section>
  );
};

export default MarineTestimonials;