"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const OCEAN_COLORS = ["#0ea5e9", "#06b6d4", "#0284c7", "#0891b2"];

function CSSStarField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="stars-layer-1"></div>
      <div className="stars-layer-2"></div>
      <div className="stars-layer-3"></div>
    </div>
  );
}

function CSSFloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      <div className="floating-sphere floating-sphere-1"></div>
      <div className="floating-sphere floating-sphere-2"></div>
      <div className="floating-sphere floating-sphere-3"></div>
      <div className="floating-sphere floating-sphere-4"></div>
      <div className="floating-sphere floating-sphere-5"></div>
    </div>
  );
}

export function OceanHeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const color = useMotionValue(OCEAN_COLORS[0]);

  useEffect(() => {
    animate(color, OCEAN_COLORS, {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 0%, #0f172a 50%, ${color}),
    radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)
  `;

  const primaryBorder = useMotionTemplate`1px solid ${color}`;
  const primaryBoxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations with proper delays
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );

      // Reduced scroll effects to prevent overlapping
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          gsap.to(containerRef.current, {
            y: progress * -50,
            duration: 0.3,
            ease: "none",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundImage }}
      className="relative flex items-center justify-center min-h-screen w-full overflow-hidden px-4 text-cyan-50"
    >
      {/* Background Elements */}
      <CSSStarField />
      <CSSFloatingElements />

      {/* Sparkles */}
      <div className="absolute inset-0 opacity-60">
        <SparklesCore
          id="oceanSparkles"
          background="transparent"
          minSize={0.8}
          maxSize={2.2}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#22d3ee"
          speed={0.6}
        />
      </div>

      {/* Content - Fixed spacing and overlapping */}
      <div className="relative z-20 flex flex-col items-center max-w-6xl mx-auto text-center space-y-8">
        {/* Status Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block rounded-full bg-cyan-600/30 backdrop-blur-sm px-6 py-3 text-sm font-medium border border-cyan-400/20"
        >
          🌊 Platform Now Live!
        </motion.span>

        {/* Main Title - Fixed responsive sizing */}
        <h1
          ref={titleRef}
          className="bg-gradient-to-br from-cyan-100 via-cyan-200 to-blue-300 bg-clip-text text-transparent font-bold leading-tight
            text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            max-w-5xl"
        >
          Marine Data Intelligence Platform
        </h1>

        {/* Subtitle - Proper spacing */}
        <h2
          ref={subtitleRef}
          className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-semibold
            text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
            max-w-4xl"
        >
          AI-Powered Ocean Research
        </h2>

        {/* Description - Better spacing */}
        <p
          ref={descriptionRef}
          className="text-cyan-100/90 font-light leading-relaxed max-w-3xl
            text-base sm:text-lg md:text-xl
            px-4"
        >
          Empowering marine biodiversity research through AI-driven
          oceanographic, fisheries, and molecular data integration for
          sustainable ocean management.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-2xl pt-4"
        >
          <motion.button
            style={{
              border: primaryBorder,
              boxShadow: primaryBoxShadow,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-slate-900/20 backdrop-blur-sm px-8 py-4 text-base sm:text-lg font-semibold text-cyan-50 transition-all duration-300 hover:bg-slate-900/40"
          >
            <span className="relative z-10">Explore Data Platform</span>
            <FiArrowRight className="transition-transform group-hover:-rotate-45" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-transparent border-2 border-cyan-300/50 backdrop-blur-sm px-8 py-4 text-base sm:text-lg font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-300/10 hover:border-cyan-300"
          >
            <FiPlay className="transition-transform group-hover:scale-110" />
            <span>View Demo</span>
          </motion.button>
        </div>
      </div>

      {/* Seamless bottom transition - NO WHITE GAPS */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </motion.section>
  );
}
