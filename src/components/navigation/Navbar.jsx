"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Waves,
  ChevronDown,
  User,
  LogIn,
  Database,
  FlaskConical,
  Users,
  BookOpen,
  Mail,
  BarChart3,
  Brain,
  Code,
  Settings,
  FileText,
  Globe,
  Info,
  Phone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navigationItems = [
    {
      name: "Platform",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Datasets", href: "/datasets", icon: Database },
        { name: "Visualization", href: "/visualization", icon: FlaskConical },
        { name: "AI Tools", href: "/ai-tools", icon: Brain },
        { name: "API Access", href: "/api-access", icon: Code },
      ],
    },
    {
      name: "Research",
      items: [
        { name: "Data Visualization Tool", href: "/visualization-tool", icon: FlaskConical },
        { name: "Publications", href: "/publications", icon: FileText },
        { name: "Collaborations", href: "/collaborations", icon: Users },
        { name: "Projects", href: "/projects", icon: BookOpen },
        { name: "Outreach", href: "/outreach", icon: Globe },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleNavigation = (href) => {
    navigate(href);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleNavigation("/")}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Waves className="w-7 h-7 text-white" />
              </motion.div>
              <div className="absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-0 hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Marine Intelligence
              </h1>
              <p className="text-xs text-cyan-400/80">Research Platform</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.items ? (
                  <>
                    <button
                      className="flex items-center space-x-1 text-cyan-100 hover:text-cyan-300 transition-colors duration-300 py-2"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setActiveDropdown(index)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.items.map((subItem, subIndex) => (
                            <motion.button
                              key={subItem.name}
                              onClick={() => handleNavigation(subItem.href)}
                              className={`flex items-center space-x-3 px-6 py-4 w-full text-left transition-all duration-300 border-b border-cyan-500/10 last:border-b-0 ${
                                isActiveRoute(subItem.href)
                                  ? "text-cyan-300 bg-cyan-500/20"
                                  : "text-cyan-100 hover:text-white hover:bg-cyan-500/10"
                              }`}
                              whileHover={{ x: 5 }}
                            >
                              <subItem.icon className="w-5 h-5 text-cyan-400" />
                              <span>{subItem.name}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`transition-colors duration-300 font-medium relative group ${
                      isActiveRoute(item.href)
                        ? "text-cyan-300"
                        : "text-cyan-100 hover:text-cyan-300"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                        isActiveRoute(item.href)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all duration-300"
              onClick={() => handleNavigation("/login")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              onClick={() => handleNavigation("/register")}
            >
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-slate-800/95 backdrop-blur-xl rounded-2xl mt-4 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <div key={item.name}>
                    {item.items ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="flex items-center justify-between w-full text-left text-cyan-100 hover:text-cyan-300 transition-colors duration-300 py-2"
                        >
                          <span className="font-medium">{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              className="ml-4 mt-2 space-y-2"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              {item.items.map((subItem) => (
                                <button
                                  key={subItem.name}
                                  onClick={() => handleNavigation(subItem.href)}
                                  className={`flex items-center space-x-3 py-2 w-full text-left transition-colors duration-300 ${
                                    isActiveRoute(subItem.href)
                                      ? "text-cyan-300"
                                      : "text-cyan-200 hover:text-white"
                                  }`}
                                >
                                  <subItem.icon className="w-4 h-4 text-cyan-400" />
                                  <span>{subItem.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className={`block py-2 w-full text-left transition-colors duration-300 font-medium ${
                          isActiveRoute(item.href)
                            ? "text-cyan-300"
                            : "text-cyan-100 hover:text-cyan-300"
                        }`}
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-3 border-t border-cyan-500/20">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-cyan-300 hover:text-white hover:bg-cyan-500/10"
                    onClick={() => handleNavigation("/login")}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white"
                    onClick={() => handleNavigation("/register")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
