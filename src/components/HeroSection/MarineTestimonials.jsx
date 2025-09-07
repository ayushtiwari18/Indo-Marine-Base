"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote, ExternalLink, Star, Waves } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  return (
    <div className="bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10">
      {/* Quote icon */}
      <div className="flex justify-end mb-4">
        <Quote className="w-8 h-8 text-cyan-400/30 group-hover:text-cyan-400/60 transition-colors duration-300" />
      </div>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-12 w-12 ring-2 ring-cyan-400/30">
          <AvatarImage
            src={testimonial.author.avatar}
            alt={testimonial.author.name}
          />
          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
            {testimonial.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-white">{testimonial.author.name}</h4>
            {testimonial.href && (
              <ExternalLink className="w-4 h-4 text-cyan-400/60" />
            )}
          </div>
          <p className="text-sm text-slate-300 font-medium">
            {testimonial.author.title}
          </p>
          <p className="text-xs text-slate-400">
            {testimonial.author.institution}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Testimonial text */}
      <blockquote className="text-slate-200 leading-relaxed mb-4">
        "{testimonial.text}"
      </blockquote>

      {/* Impact badge */}
      <div className="flex items-center justify-between">
        <Badge className="bg-slate-700/60 text-cyan-300 border-cyan-500/30">
          {testimonial.impact}
        </Badge>
        <Waves className="w-5 h-5 text-cyan-400/40" />
      </div>
    </div>
  );
};

const MarineTestimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        ".testimonial-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Simple background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 top-20 left-10 animate-pulse"></div>
        <div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/8 bottom-20 right-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <Star className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Researcher Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">Trusted by </span>
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Leading Marine
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Researchers
            </span>
            <span className="text-white"> Worldwide</span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
            Join renowned oceanographers and marine biologists advancing
            conservation science through integrated data intelligence
          </p>
        </div>

        {/* Testimonials Grid - Simple and guaranteed to work */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {marineResearchTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "150+", label: "Research Partners" },
                { number: "45", label: "Countries" },
                { number: "2M+", label: "Species Records" },
                { number: "99.2%", label: "Accuracy Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarineTestimonials;
