"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote, ExternalLink, Star, Waves } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Floating background elements
function TestimonialsFloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="testimonials-float testimonials-float-1"></div>
      <div className="testimonials-float testimonials-float-2"></div>
      <div className="testimonials-float testimonials-float-3"></div>
      <div className="testimonials-float testimonials-float-4"></div>
    </div>
  );
}

const marineResearchTestimonials = [
  {
    author: {
      name: "Dr. Sarah Chen",
      title: "Marine Ecologist",
      institution: "Marine Ecology Lab",
      handle: "@marine_ecology_lab",
      avatar: "/api/placeholder/64/64",
    },
    text: "This integrated platform has revolutionized our species identification workflows. The eDNA analysis tools helped us discover three new species in the Indian Ocean EEZ.",
    rating: 5,
    impact: "3 new species discovered",
    href: "https://research-profile.com/sarah-chen",
  },
  {
    author: {
      name: "Prof. Ahmed Rahman",
      title: "Oceanographer",
      institution: "Oceanographic Institute",
      handle: "@oceanographic_institute",
      avatar: "/api/placeholder/64/64",
    },
    text: "The real-time oceanographic data integration capabilities have enhanced our climate modeling accuracy by 40%. Essential for understanding marine ecosystem changes.",
    rating: 5,
    impact: "40% accuracy improvement",
  },
  {
    author: {
      name: "Dr. Maria Santos",
      title: "Fisheries Scientist",
      institution: "Fisheries Research Center",
      handle: "@fisheries_research_center",
      avatar: "/api/placeholder/64/64",
    },
    text: "Cross-disciplinary correlation analysis between ocean parameters and fish distribution patterns has transformed our sustainable fisheries management approach.",
    rating: 5,
    impact: "Sustainable management",
    href: "https://fisheries-institute.org/maria-santos",
  },
  {
    author: {
      name: "Dr. James Mitchell",
      title: "Conservation Biologist",
      institution: "Marine Conservation Lab",
      handle: "@marine_conservation_lab",
      avatar: "/api/placeholder/64/64",
    },
    text: "The molecular biodiversity insights from this platform directly support our coral reef restoration projects. Data-driven conservation at its finest.",
    rating: 5,
    impact: "Coral reef restoration",
  },
  {
    author: {
      name: "Prof. Lakshmi Nair",
      title: "Senior Researcher",
      institution: "CMLRE Kochi",
      handle: "@cmlre_kochi",
      avatar: "/api/placeholder/64/64",
    },
    text: "CMLRE's collaboration with this platform has accelerated our marine living resources assessment capabilities. The taxonomic database is unparalleled.",
    rating: 5,
    impact: "Taxonomic excellence",
  },
  {
    author: {
      name: "Dr. Robert Thompson",
      title: "Deep Sea Researcher",
      institution: "Deep Sea Research Institute",
      handle: "@deep_sea_research",
      avatar: "/api/placeholder/64/64",
    },
    text: "The 3D oceanographic visualizations and otolith morphology tools have enhanced our deep-sea biodiversity research beyond expectations.",
    rating: 5,
    impact: "Deep-sea discoveries",
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  const CardWrapper = testimonial.href ? motion.a : motion.div;

  return (
    <CardWrapper
      href={testimonial.href}
      target={testimonial.href ? "_blank" : undefined}
      rel={testimonial.href ? "noopener noreferrer" : undefined}
      className="relative mx-4 w-80 flex-shrink-0 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl p-6 shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20 hover:scale-[1.03] border border-cyan-500/20 hover:border-cyan-400/40 group overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Animated border sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Quote className="w-8 h-8 text-cyan-400" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-14 w-14 ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all duration-300">
              <AvatarImage
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-lg">
                {testimonial.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-cyan-100 group-hover:text-white transition-colors duration-300">
                  {testimonial.author.name}
                </h4>
                {testimonial.href && (
                  <ExternalLink className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
                )}
              </div>
              <p className="text-sm text-cyan-300/80 font-medium">
                {testimonial.author.title}
              </p>
              <p className="text-xs text-cyan-400/60 mb-2">
                {testimonial.author.institution}
              </p>
              <p className="text-xs text-cyan-500/80">
                {testimonial.author.handle}
              </p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Testimonial text */}
        <blockquote className="text-cyan-100/90 leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
          "{testimonial.text}"
        </blockquote>

        {/* Impact badge */}
        <div className="flex items-center justify-between">
          <Badge className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50 transition-colors duration-300">
            {testimonial.impact}
          </Badge>
          <Waves className="w-5 h-5 text-cyan-400/40 group-hover:text-cyan-400/60 transition-colors duration-300" />
        </div>
      </div>
    </CardWrapper>
  );
};

const EnhancedMarqueeRow = ({ testimonials, reverse = false, speed = 50 }) => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{
          x: reverse
            ? [0, -100 * testimonials.length]
            : [-100 * testimonials.length, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.author.name}-${index}`}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

const MarineTestimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const firstRow = marineResearchTestimonials.slice(0, 3);
  const secondRow = marineResearchTestimonials.slice(3, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating elements animation
      gsap.to(".testimonials-float", {
        y: "+=30",
        rotation: "+=180",
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/30 to-cyan-950/20"
    >
      {/* Floating background elements */}
      <TestimonialsFloatingElements />

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-blue-900/5"></div>

      <div className="container mx-auto px-4 mb-16">
        <motion.div
          ref={titleRef}
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-cyan-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30 mb-8"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Star className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Researcher Testimonials
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="text-cyan-100">Trusted by </span>
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Leading Marine
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Researchers
            </span>
            <span className="text-cyan-100"> Worldwide</span>
          </h2>

          <p className="text-xl md:text-2xl text-cyan-200/80 leading-relaxed max-w-4xl mx-auto">
            Join renowned oceanographers and marine biologists advancing
            conservation science through integrated data intelligence
          </p>
        </motion.div>
      </div>

      {/* Enhanced Marquee Rows */}
      <div className="relative space-y-8">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

        <EnhancedMarqueeRow testimonials={firstRow} speed={60} />
        <EnhancedMarqueeRow
          testimonials={secondRow}
          reverse={true}
          speed={45}
        />
      </div>

      {/* Stats Section */}
      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Research Partners" },
              { number: "45", label: "Countries" },
              { number: "2M+", label: "Species Records" },
              { number: "99.2%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-cyan-200/80 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cyan-500/5 pointer-events-none" />
    </section>
  );
};

export default MarineTestimonials;
