import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ExternalLink, ChevronDown, ChevronUp, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProblemStatementBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "background",
      title: "Background",
      content:
        "The deep ocean, encompassing vast and remote ecosystems like abyssal plains, hydrothermal vents, and seamounts, harbors a significant portion of global biodiversity, much of which remains undiscovered due to its inaccessibility. Environmental DNA (eDNA) has emerged as a powerful, non-invasive tool for studying these ecosystems by capturing genetic traces of organisms from environmental samples, such as seawater or sediment, without the need for physical collection or disturbance of fragile habitats. By targeting marker genes like 18S rRNA or COI, eDNA enables the detection of diverse eukaryotic taxa, including protists, cnidarians, and rare metazoans.",
    },
    {
      id: "description",
      title: "Problem Description",
      content:
        "The Centre for Marine Living Resources and Ecology (CMLRE) undertakes routine voyages to the deep sea and collects sediment and water samples for biodiversity assessment. However, assigning raw eDNA sequencing reads to eukaryotic taxa presents significant challenges — primarily due to poor representation of deep-sea organisms in reference databases like SILVA, PR2, or NCBI. Traditional bioinformatic pipelines (QIIME2, DADA2, mothur) rely heavily on sequence alignment to incomplete databases, which limits the discovery of new species and hinders accurate biodiversity assessments.",
    },
    {
      id: "solution",
      title: "Expected Solution",
      content:
        "An AI-driven pipeline that uses deep learning (CNN) and unsupervised learning (HDBSCAN) to identify eukaryotic taxa and assess biodiversity directly from raw eDNA reads. The solution should classify sequences, annotate and estimate abundance, minimize reliance on reference databases, reduce computational time, and enable the discovery of novel taxa and ecological insights in deep-sea ecosystems.",
    },
  ];

  return (
    <>
      {/* Floating Bubble Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[99999] w-14 h-14 rounded-full 
          bg-gradient-to-br from-cyan-500 to-blue-700 
          shadow-lg shadow-cyan-500/40 border border-cyan-400/30
          flex items-center justify-center
          hover:scale-110 hover:shadow-cyan-500/60 transition-all duration-200"
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.95 }}
        title="View Problem Statement SIH25042"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(6, 182, 212, 0.4)",
            "0 0 0 12px rgba(6, 182, 212, 0)",
            "0 0 0 0 rgba(6, 182, 212, 0)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      >
        <Waves className="w-6 h-6 text-white" />

        {/* PS Badge */}
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-slate-900">
          PS
        </span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
                bg-slate-900 rounded-2xl border border-cyan-500/30
                shadow-2xl shadow-cyan-500/10 z-10"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-cyan-500/20 px-6 py-4 rounded-t-2xl z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full px-2 py-0.5">
                          SIH25042
                        </span>
                        <span className="text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-2 py-0.5">
                          Software
                        </span>
                        <span className="text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-2 py-0.5">
                          Miscellaneous
                        </span>
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug">
                        Identifying Taxonomy and Assessing Biodiversity from eDNA Datasets
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                {/* Org Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Organization</p>
                    <p className="text-sm font-semibold text-white">Ministry of Earth Sciences</p>
                    <p className="text-xs text-cyan-400 mt-0.5">MoES</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Department</p>
                    <p className="text-sm font-semibold text-white">CMLRE</p>
                    <p className="text-xs text-cyan-400 mt-0.5">Centre for Marine Living Resources & Ecology</p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-3 border border-cyan-500/20 text-center">
                    <p className="text-lg font-bold text-cyan-300">274</p>
                    <p className="text-xs text-slate-400">Ideas Submitted</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-3 border border-blue-500/20 text-center">
                    <p className="text-lg font-bold text-blue-300">500</p>
                    <p className="text-xs text-slate-400">Max Ideas</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl p-3 border border-orange-500/20 text-center">
                    <p className="text-lg font-bold text-orange-300">SIH</p>
                    <p className="text-xs text-slate-400">2025 Edition</p>
                  </div>
                </div>

                {/* Accordion Sections */}
                <div className="space-y-2">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className="border border-slate-700/60 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="flex items-center justify-between w-full px-4 py-3 
                          bg-slate-800/50 hover:bg-slate-700/50 transition-colors
                          text-left"
                      >
                        <span className="text-sm font-semibold text-slate-200">
                          {section.title}
                        </span>
                        {expandedSection === section.id ? (
                          <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedSection === section.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-4 py-3 bg-slate-900/50 text-sm text-slate-300 leading-relaxed">
                              {section.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Dataset Link */}
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-2">Reference Dataset</p>
                  <a
                    href="https://ftp.ncbi.nlm.nih.gov/blast/db/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    NCBI BLAST Database (ftp.ncbi.nlm.nih.gov)
                  </a>
                </div>

                {/* Footer CTA */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/project-report");
                    }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold
                      bg-gradient-to-r from-cyan-600 to-blue-700
                      hover:from-cyan-500 hover:to-blue-600
                      text-white border border-cyan-500/20
                      shadow-lg shadow-cyan-500/20
                      transition-all duration-200"
                  >
                    View Project Report
                  </button>
                  <a
                    href="https://sih.gov.in/sih2025PS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                      bg-slate-700/60 hover:bg-slate-600/60
                      text-slate-200 border border-slate-600/50
                      transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    SIH Portal
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProblemStatementBubble;
