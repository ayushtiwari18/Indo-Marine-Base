"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function PlatformSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-cyan-950"
    >
      {/* CSS-only background elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="bg-floating-sphere bg-floating-sphere-1"></div>
        <div className="bg-floating-sphere bg-floating-sphere-2"></div>
        <div className="bg-floating-sphere bg-floating-sphere-3"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
          >
            <span className="text-cyan-100">Powered by AI and </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Marine Science
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
            {[
              {
                title: "Oceanographic Dashboard",
                description: "Real-time species identification & monitoring",
                icon: "📊",
              },
              {
                title: "eDNA Analysis Interface",
                description: "Molecular biodiversity visualization",
                icon: "🧬",
              },
            ].map((card, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="ocean-card group relative bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h4 className="text-2xl font-bold text-cyan-100 mb-4">
                  {card.title}
                </h4>
                <p className="text-cyan-200/80 text-lg">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Button className="ocean-btn-primary group px-10 py-6 text-xl font-semibold">
              <span className="relative z-10">Explore Platform Features</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
