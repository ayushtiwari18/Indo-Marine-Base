"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// Ocean color palette for aurora effect
const OCEAN_COLORS = ["#0ea5e9", "#06b6d4", "#0284c7", "#0891b2"];

// CSS-only animated stars
function CSSStarField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="stars-layer-1"></div>
      <div className="stars-layer-2"></div>
      <div className="stars-layer-3"></div>
    </div>
  );
}

// CSS-only floating ocean elements
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
  const ctaRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Framer Motion color animation
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
      // Enhanced entrance animations
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { y: 120, opacity: 0, scale: 0.7, rotationX: -15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.6,
          ease: "power3.out",
          delay: 0.3,
        }
      )
        .fromTo(
          subtitleRef.current,
          { y: 80, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          "-=1.2"
        )
        .fromTo(
          ctaRef.current,
          { y: 60, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
          "-=0.8"
        );

      // Advanced scroll-triggered effects
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          gsap.to(containerRef.current, {
            y: progress * -150,
            rotationX: progress * 5,
            duration: 0.3,
            ease: "none",
          });

          gsap.to(titleRef.current, {
            y: progress * -80,
            opacity: 1 - progress * 0.8,
            duration: 0.3,
            ease: "none",
          });
        },
      });

      // Floating animation for title
      gsap.to(titleRef.current, {
        y: "+=15",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-6 py-24 text-cyan-50"
    >
      {/* CSS Star Field */}
      <CSSStarField />

      {/* CSS-only floating elements */}
      <CSSFloatingElements />

      {/* Enhanced Sparkles */}
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

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center max-w-7xl mx-auto">
        {/* Status Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-block rounded-full bg-cyan-600/30 backdrop-blur-sm px-4 py-2 text-sm font-medium border border-cyan-400/20"
        >
          🌊 Platform Now Live!
        </motion.span>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="max-w-6xl bg-gradient-to-br from-cyan-100 via-cyan-200 to-blue-300 bg-clip-text text-center text-4xl font-bold leading-tight text-transparent sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight mb-8"
        >
          Marine Data Intelligence Platform
        </h1>

        {/* Subtitle */}
        <h2
          ref={subtitleRef}
          className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent opacity-90"
        >
          AI-Powered Ocean Research
        </h2>

        {/* Animated Wave Separator */}
        <div className="relative w-full max-w-4xl mx-auto h-12 mb-12">
          <div className="ocean-wave-line"></div>
          <div className="ocean-wave-glow"></div>
        </div>

        {/* Description */}
        <p className="my-8 max-w-4xl text-center text-lg leading-relaxed md:text-xl md:leading-relaxed text-cyan-100/90 font-light">
          Empowering marine biodiversity research through AI-driven
          oceanographic, fisheries, and molecular data integration for
          sustainable ocean management.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            style={{
              border: primaryBorder,
              boxShadow: primaryBoxShadow,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex w-fit items-center gap-2 rounded-full bg-slate-900/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-cyan-50 transition-all duration-300 hover:bg-slate-900/40"
          >
            <span className="relative z-10">Explore Data Platform</span>
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex w-fit items-center gap-2 rounded-full bg-transparent border-2 border-cyan-300/50 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-300/10 hover:border-cyan-300"
          >
            <FiPlay className="transition-transform group-hover:scale-110" />
            <span>View Demo</span>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
    </motion.section>
  );
}
