import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { APIOverview } from "@/components/APIAccess/APIOverview.jsx";
import { EndpointsDocumentation } from "@/components/APIAccess/EndpointsDocumentation";
import { CodeExamples } from "@/components/APIAccess/CodeExamples";
import { AccessControl } from "@/components/APIAccess/AccessControl";
import { APITesting } from "@/components/APIAccess/APITesting";
import { SDKDownloads } from "@/components/APIAccess/SDKDownloads";
import {
  Code2,
  Database,
  TestTube,
  Download,
  Shield,
  Globe,
  Zap,
  ArrowRight,
  Star,
  Users,
} from "lucide-react";

const APIAccess = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Floating elements animation
      gsap.to(".api-float", {
        y: "+=10",
        rotation: "+=90",
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-slate-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-blue-900/5"></div>

        {/* Floating elements - reduced and more subtle */}
        <div className="api-float absolute top-32 left-16 w-12 h-12 bg-gradient-to-br from-cyan-400/5 to-blue-500/3 rounded-full blur-lg"></div>
        <div className="api-float absolute top-64 right-24 w-8 h-8 bg-gradient-to-br from-blue-400/5 to-cyan-500/3 rounded-full blur-lg"></div>
        <div className="api-float absolute bottom-48 left-1/3 w-16 h-16 bg-gradient-to-br from-cyan-300/4 to-blue-400/2 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Compact Header Section */}
        <motion.div
          ref={headerRef}
          className="text-center py-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Code2 className="w-6 h-6 text-white" />
              </motion.div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
              Marine API Hub
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Enterprise-grade marine data API with real-time access to
              oceanographic datasets
            </p>

            {/* Compact Stats */}
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-slate-400">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-400">50+ Endpoints</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-400">10M+ Requests</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              {/* Fixed Tab Navigation - Proper Radix Structure */}
              <div className="mb-8">
                <TabsList className="grid w-full grid-cols-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-1 shadow-xl h-auto">
                  <TabsTrigger
                    value="overview"
                    className="flex flex-col items-center space-y-1 px-3 py-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-medium">Overview</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="endpoints"
                    className="flex flex-col items-center space-y-1 px-3 py-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                  >
                    <Database className="w-4 h-4" />
                    <span className="text-xs font-medium">Endpoints</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="examples"
                    className="flex flex-col items-center space-y-1 px-3 py-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                  >
                    <Code2 className="w-4 h-4" />
                    <span className="text-xs font-medium">Examples</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="testing"
                    className="flex flex-col items-center space-y-1 px-3 py-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                  >
                    <TestTube className="w-4 h-4" />
                    <span className="text-xs font-medium">Testing</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="sdk"
                    className="flex flex-col items-center space-y-1 px-3 py-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-xs font-medium">SDKs</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="access"
                    className="flex flex-col items-center space-y-1 px-3 py-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-medium">Access</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content Container */}
              <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-6 md:p-8">
                  <TabsContent value="overview" className="mt-0 space-y-0">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700/30">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-100">
                          API Overview
                        </h2>
                        <p className="text-sm text-slate-400">
                          Getting started with marine data integration
                        </p>
                      </div>
                    </div>
                    <APIOverview />
                  </TabsContent>

                  <TabsContent value="endpoints" className="mt-0 space-y-0">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700/30">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Database className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-100">
                          API Endpoints
                        </h2>
                        <p className="text-sm text-slate-400">
                          Explore available data endpoints and methods
                        </p>
                      </div>
                    </div>
                    <EndpointsDocumentation />
                  </TabsContent>

                  <TabsContent value="examples" className="mt-0 space-y-0">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700/30">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-100">
                          Code Examples
                        </h2>
                        <p className="text-sm text-slate-400">
                          Ready-to-use code snippets and implementations
                        </p>
                      </div>
                    </div>
                    <CodeExamples />
                  </TabsContent>

                  <TabsContent value="testing" className="mt-0 space-y-0">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700/30">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <TestTube className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-100">
                          API Testing
                        </h2>
                        <p className="text-sm text-slate-400">
                          Test endpoints and validate responses in real-time
                        </p>
                      </div>
                    </div>
                    <APITesting />
                  </TabsContent>

                  <TabsContent value="sdk" className="mt-0 space-y-0">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700/30">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Download className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-100">
                          SDK Downloads
                        </h2>
                        <p className="text-sm text-slate-400">
                          Official SDKs and libraries for all platforms
                        </p>
                      </div>
                    </div>
                    <SDKDownloads />
                  </TabsContent>

                  <TabsContent value="access" className="mt-0 space-y-0">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700/30">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-100">
                          Access Control
                        </h2>
                        <p className="text-sm text-slate-400">
                          Manage API keys, permissions, and rate limits
                        </p>
                      </div>
                    </div>
                    <AccessControl />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </motion.div>
        </div>

        {/* Improved Bottom CTA */}
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <motion.div
            className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 text-center shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-slate-400">
                Trusted by 1000+ developers
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-100 mb-3">
              Ready to explore marine data?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get started with our comprehensive API and join the community
              building the future of ocean research.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-semibold">
                Get API Key
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-xl transition-all duration-300 font-semibold"
              >
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default APIAccess;
