"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  BarChart3,
  Brain,
  Code,
  FileText,
  Fish,
  Search,
  Map,
  Microscope,
  Cpu,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Memoized navigation items with improved professional naming
  const navigationItems = React.useMemo(
    () => [
      {
        name: "Data Explorer",
        description: "Browse and analyze marine datasets",
        items: [
          {
            name: "Browse Datasets",
            href: "/datasets",
            icon: Database,
            description: "Explore available datasets",
          },
          {
            name: "Species Database",
            href: "/species-database",
            icon: Fish,
            description: "Marine species catalog",
          },
          {
            name: "Advanced Search",
            href: "/data-explorer",
            icon: Search,
            description: "Powerful search tools",
          },
        ],
      },
      {
        name: "Visualization",
        description: "Interactive data visualization tools",
        items: [
          {
            name: "Interactive Maps",
            href: "/visualization",
            icon: Map,
            description: "Geospatial data visualization",
          },
          {
            name: "Data Visualization",
            href: "/visualization-tool",
            icon: FlaskConical,
            description: "Custom chart builder",
          },
          {
            name: "Analytics Dashboard",
            href: "/analytics",
            icon: BarChart3,
            description: "Statistical analysis",
          },
        ],
      },
      {
        name: "Research Hub",
        description: "AI-powered research tools",
        items: [
          {
            name: "AI Tools",
            href: "/ai-tools",
            icon: Brain,
            description: "Machine learning tools",
          },
          {
            name: "Research Tools",
            href: "/research-tools",
            icon: Microscope,
            description: "Scientific research aids",
          },
          {
            name: "Model Training",
            href: "/ml-training",
            icon: Cpu,
            description: "Train custom models",
          },
        ],
      },
      {
        name: "Collaboration",
        description: "Team collaboration workspace",
        items: [
          {
            name: "Projects",
            href: "/projects",
            icon: BookOpen,
            description: "Manage research projects",
          },
          {
            name: "Publications",
            href: "/publications",
            icon: FileText,
            description: "Research publications",
          },
          {
            name: "Team Workspace",
            href: "/collaborations",
            icon: Users,
            description: "Collaborate with teams",
          },
        ],
      },
      {
        name: "API",
        description: "Developer resources and documentation",
        items: [
          {
            name: "API Access",
            href: "/api-access",
            icon: Code,
            description: "RESTful API endpoints",
          },
          {
            name: "Documentation",
            href: "/documentation",
            icon: FileText,
            description: "Technical documentation",
          },
        ],
      },
    ],
    []
  );

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback((index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  }, []);

  const handleNavigation = useCallback(
    (href) => {
      navigate(href);
      setIsOpen(false);
      setActiveDropdown(null);
    },
    [navigate]
  );

  const isActiveRoute = useCallback(
    (href) => {
      return location.pathname === href;
    },
    [location.pathname]
  );

  // Professional CSS Classes
  const navbarClasses = `
    fixed top-0 left-0 right-0 z-[9999] 
    transition-all duration-500 ease-out
    ${
      isScrolled
        ? "bg-slate-900/96 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/5"
        : "bg-slate-900/88 backdrop-blur-lg border-b border-cyan-500/10"
    }
  `;

  const logoContainerClasses =
    "flex items-center space-x-3 cursor-pointer group";

  const logoClasses = `
    w-11 h-11 sm:w-12 sm:h-12 
    rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700
    flex items-center justify-center shadow-lg
    group-hover:shadow-cyan-500/30 transition-all duration-300
    border border-cyan-400/20
  `;

  // Update the dropdownClasses with better opacity and contrast
  const dropdownClasses = `
  absolute top-full left-0 mt-3 
  w-72 sm:w-80
  bg-slate-800 backdrop-blur-xl 
  rounded-2xl border border-cyan-500/30 
  shadow-2xl shadow-black/20
  overflow-hidden z-[10000]
  ring-1 ring-slate-600/80
`;

  const mobileMenuClasses = `
  lg:hidden bg-slate-800 backdrop-blur-xl 
  rounded-2xl mt-4 mb-4 mx-4 
  border border-cyan-500/30 
  shadow-2xl shadow-black/20
  overflow-hidden
  ring-1 ring-slate-600/80
`;

  return (
    <motion.nav
      ref={navRef}
      className={navbarClasses}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Professional Logo Section */}
          <motion.div
            className={logoContainerClasses}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleNavigation("/")}
          >
            <div className="relative">
              <motion.div
                className={logoClasses}
                whileHover={{ rotate: 15, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Waves className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
              </motion.div>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                  Indo Marine Base
                </h1>
                <p className="text-xs font-medium text-cyan-400/90 tracking-wide uppercase">
                  Research Platform
                </p>
              </div>
            </div>
          </motion.div>

          {/* Professional Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.items ? (
                  <>
                    <button
                      className="flex items-center space-x-2 text-slate-200 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-slate-800/40 font-medium text-sm tracking-wide"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onClick={() => toggleDropdown(index)}
                    >
                      <span className="font-semibold">{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          className={dropdownClasses}
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="p-2">
                            <div className="px-4 py-3 border-b border-slate-600/60 bg-slate-750/50">
                              <h3 className="text-sm font-semibold text-white tracking-wide">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-300 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                            <div className="py-2 bg-slate-800">
                              {item.items.map((subItem, subIndex) => (
                                <motion.button
                                  key={subItem.name}
                                  onClick={() => handleNavigation(subItem.href)}
                                  className={`
            flex items-start space-x-3 px-4 py-3 w-full text-left rounded-lg mx-1
            transition-all duration-200 group
            ${
              isActiveRoute(subItem.href)
                ? "text-cyan-300 bg-cyan-600/20 border border-cyan-500/30"
                : "text-slate-100 hover:text-white hover:bg-slate-700/60"
            }
          `}
                                  whileHover={{ x: 2 }}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.03 }}
                                >
                                  <subItem.icon className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">
                                      {subItem.name}
                                    </div>
                                    <div className="text-xs text-slate-300 mt-0.5">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      transition-all duration-200 font-semibold relative group px-4 py-3 rounded-lg text-sm tracking-wide
                      ${
                        isActiveRoute(item.href)
                          ? "text-cyan-300 bg-slate-800/40"
                          : "text-slate-200 hover:text-white hover:bg-slate-800/40"
                      }
                    `}
                  >
                    {item.name}
                    <span
                      className={`
                        absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
                        transition-all duration-300 rounded-full
                        ${
                          isActiveRoute(item.href)
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                        }
                      `}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Professional Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 font-medium text-sm px-4 py-2 h-9"
              onClick={() => handleNavigation("/login")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium text-sm px-5 py-2 h-9 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 border border-cyan-500/20"
              onClick={() => handleNavigation("/register")}
            >
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium text-sm px-5 py-2 h-9 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 border border-emerald-500/20"
              onClick={() => handleNavigation("/admin-dashboard")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-300 hover:text-white hover:bg-slate-700/50 p-2 h-10 w-10"
              onClick={() => handleNavigation("/login")}
            >
              <LogIn className="w-5 h-5" />
            </Button>

            <motion.button
              className="p-2 h-10 w-10 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Professional Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={mobileMenuClasses}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.items ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="flex items-center justify-between w-full text-left text-slate-200 hover:text-white hover:bg-slate-700/30 transition-all duration-200 py-3 px-3 rounded-lg font-medium"
                        >
                          <span className="font-semibold">{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              className="ml-4 mt-2 space-y-1 border-l-2 border-cyan-500/20 pl-4"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.items.map((subItem, subIndex) => (
                                <motion.button
                                  key={subItem.name}
                                  onClick={() => handleNavigation(subItem.href)}
                                  className={`
                                    flex items-center space-x-3 py-3 px-3 w-full text-left rounded-lg
                                    transition-all duration-200
                                    ${
                                      isActiveRoute(subItem.href)
                                        ? "text-cyan-300 bg-cyan-500/10"
                                        : "text-slate-200 hover:text-white hover:bg-slate-700/30"
                                    }
                                  `}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.03 }}
                                >
                                  <subItem.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">
                                      {subItem.name}
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className={`
                          flex items-center space-x-3 py-3 px-3 w-full text-left rounded-lg
                          transition-all duration-200 font-medium
                          ${
                            isActiveRoute(item.href)
                              ? "text-cyan-300 bg-cyan-500/10"
                              : "text-slate-200 hover:text-white hover:bg-slate-700/30"
                          }
                        `}
                      >
                        {item.icon && (
                          <item.icon className="w-4 h-4 text-cyan-400" />
                        )}
                        <span className="font-semibold">{item.name}</span>
                      </button>
                    )}
                  </motion.div>
                ))}

                {/* Professional Mobile Auth Buttons */}
                <motion.div
                  className="pt-4 space-y-2 border-t border-slate-700/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/40 md:hidden font-medium"
                    onClick={() => handleNavigation("/login")}
                  >
                    <LogIn className="w-4 h-4 mr-3" />
                    Login
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-medium"
                    onClick={() => handleNavigation("/register")}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Sign Up
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium"
                    onClick={() => handleNavigation("/admin-dashboard")}
                  >
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Dashboard
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
