"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Waves,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  ArrowRight,
  Database,
  FlaskConical,
  Users,
  BookOpen,
  Shield,
  Globe,
  Heart,
} from "lucide-react";

// Floating footer elements
function FooterFloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      <div className="footer-float footer-float-1"></div>
      <div className="footer-float footer-float-2"></div>
      <div className="footer-float footer-float-3"></div>
    </div>
  );
}

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating elements animation
      gsap.to(".footer-float", {
        y: "+=20",
        rotation: "+=180",
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 4,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    platform: [
      { name: "Data Dashboard", href: "#dashboard", icon: Database },
      { name: "Species Database", href: "#species", icon: FlaskConical },
      { name: "Research Tools", href: "#tools", icon: BookOpen },
      { name: "API Access", href: "#api", icon: Globe },
    ],
    research: [
      { name: "Publications", href: "#publications", icon: BookOpen },
      { name: "Collaborations", href: "#collaborations", icon: Users },
      { name: "Timeline", href: "#timeline", icon: FlaskConical },
      { name: "Partners", href: "#partners", icon: Users },
    ],
    support: [
      { name: "Documentation", href: "#docs", icon: BookOpen },
      { name: "Privacy Policy", href: "#privacy", icon: Shield },
      { name: "Terms of Service", href: "#terms", icon: Shield },
      { name: "Contact Us", href: "#contact", icon: Mail },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* Floating background elements */}
      <FooterFloatingElements />

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            className="footer-section lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Waves className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  Marine Intelligence
                </h2>
                <p className="text-xs text-cyan-400/80">Research Platform</p>
              </div>
            </div>

            <p className="text-cyan-200/80 mb-6 leading-relaxed">
              Empowering marine biodiversity research through AI-driven
              oceanographic data integration and advanced analytics.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-100">
                Stay Updated
              </h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-slate-800/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/60 focus:border-cyan-400"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 px-4"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Platform Links */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-cyan-100 mb-6">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="flex items-center space-x-3 text-cyan-200/80 hover:text-cyan-300 transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <link.icon className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Research Links */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-cyan-100 mb-6">
              Research
            </h3>
            <ul className="space-y-3">
              {footerLinks.research.map((link, index) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="flex items-center space-x-3 text-cyan-200/80 hover:text-cyan-300 transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <link.icon className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Contact */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-cyan-100 mb-6">
              Support
            </h3>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-cyan-200/80">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">contact@marineintel.org</span>
              </div>
              <div className="flex items-center space-x-3 text-cyan-200/80">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">+91 (0)484-239-xxxx</span>
              </div>
              <div className="flex items-center space-x-3 text-cyan-200/80">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">Kochi, Kerala, India</span>
              </div>
            </div>

            {/* Support Links */}
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="flex items-center space-x-3 text-cyan-200/80 hover:text-cyan-300 transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <link.icon className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-section border-t border-cyan-500/20 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
        >
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-cyan-200/60">
            <span>&copy; 2025 Marine Intelligence Platform.</span>
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>for ocean conservation.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-cyan-400/60 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-cyan-400/60 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2"
            whileHover={{ y: -2 }}
          >
            <span className="text-sm">Back to top</span>
            <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
