import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Waves,
  Users,
  Cpu,
  Database,
  Globe,
  BookOpen,
  GitBranch,
  Server,
  Brain,
  BarChart3,
  Cloud,
  Code,
  FlaskConical,
  Microscope,
  Award,
  Calendar,
  CheckCircle,
  ExternalLink,
  Layers,
} from "lucide-react";
import SystemArchitectureDiagram from "../components/SystemArchitectureDiagram";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const teamMembers = [
  {
    name: "Archi Jain",
    roll: "0206CS221055",
    role: "Research Lead & Backend Developer",
    initials: "AJ",
    color: "from-purple-500 to-indigo-600",
    modules: ["Research & Data Collection", "Preprocessing QC", "Backend APIs"],
  },
  {
    name: "Anushka Bhatt",
    roll: "0206CS221051",
    role: "ML Model Development",
    initials: "AB",
    color: "from-pink-500 to-rose-600",
    modules: ["CNN / Transformer Training", "Clustering & Novelty Detection", "Documentation"],
  },
  {
    name: "Ayush Tiwari",
    roll: "0206CS221074",
    role: "FastAPI Backend & Generative AI Engineer",
    initials: "AT",
    color: "from-cyan-500 to-blue-600",
    modules: ["AI Model Development", "FastAPI Backend", "DevOps & Deployment"],
  },
  {
    name: "Akruti Gupta",
    roll: "0206CS221025",
    role: "Tableau Expert & Data Visualization Specialist",
    initials: "AG",
    color: "from-amber-500 to-orange-600",
    modules: ["Preprocessing QC", "Visualization Dashboard", "Documentation"],
  },
  {
    name: "Ayush Tiwari",
    roll: "0206CS221075",
    role: "Frontend Developer & DevOps Engineer",
    initials: "AT",
    color: "from-emerald-500 to-teal-600",
    modules: ["Frontend (React + Tailwind)", "Visualization Dashboard", "Cloud Deployment"],
  },
];

const techStack = [
  { name: "React.js",    icon: Code,        color: "text-cyan-400",    bg: "bg-cyan-500/10 border-cyan-500/20" },
  { name: "Python",      icon: FlaskConical, color: "text-yellow-400",  bg: "bg-yellow-500/10 border-yellow-500/20" },
  { name: "FastAPI",     icon: Server,       color: "text-green-400",   bg: "bg-green-500/10 border-green-500/20" },
  { name: "TensorFlow",  icon: Brain,        color: "text-orange-400",  bg: "bg-orange-500/10 border-orange-500/20" },
  { name: "PyTorch",     icon: Brain,        color: "text-red-400",     bg: "bg-red-500/10 border-red-500/20" },
  { name: "HDBSCAN",     icon: Microscope,   color: "text-purple-400",  bg: "bg-purple-500/10 border-purple-500/20" },
  { name: "PostgreSQL",  icon: Database,     color: "text-blue-400",    bg: "bg-blue-500/10 border-blue-500/20" },
  { name: "Docker",      icon: Layers,       color: "text-sky-400",     bg: "bg-sky-500/10 border-sky-500/20" },
  { name: "AWS S3",      icon: Cloud,        color: "text-amber-400",   bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Tailwind CSS",icon: Code,        color: "text-teal-400",    bg: "bg-teal-500/10 border-teal-500/20" },
  { name: "Tableau",     icon: BarChart3,    color: "text-indigo-400",  bg: "bg-indigo-500/10 border-indigo-500/20" },
  { name: "Netlify",     icon: Globe,        color: "text-lime-400",    bg: "bg-lime-500/10 border-lime-500/20" },
];

const modules = [
  {
    no: "01",
    title: "Research & Data Preprocessing",
    team: "Archi Jain, Akruti Gupta",
    color: "from-purple-500 to-indigo-600",
    tasks: ["Collect & curate marine eDNA datasets", "Filter low-quality / duplicate reads", "Adapter trimming via FastQC & Cutadapt", "Prepare clean FASTA datasets for AI training"],
  },
  {
    no: "02",
    title: "ML Model Development (CNN)",
    team: "Anushka Bhatt, Ayush Tiwari (74)",
    color: "from-pink-500 to-rose-600",
    tasks: ["Design & train CNN / Transformer models", "Generate feature embeddings", "TensorFlow, PyTorch, Scikit-learn", "Hyperparameter tuning for accuracy"],
  },
  {
    no: "03",
    title: "Clustering & Novelty Detection",
    team: "Anushka Bhatt, Archi Jain",
    color: "from-cyan-500 to-blue-600",
    tasks: ["HDBSCAN & Isolation Forest clustering", "Detect novel taxa absent from databases", "Expert validation pipeline", "Manage retraining cycles"],
  },
  {
    no: "04",
    title: "Visualization & Analytics Dashboard",
    team: "Akruti Gupta, Ayush Tiwari (75)",
    color: "from-amber-500 to-orange-600",
    tasks: ["Biodiversity dashboards (Streamlit, Tableau)", "Interactive taxonomic charts & maps", "Gen-AI auto report generation", "D3.js & React integration"],
  },
  {
    no: "05",
    title: "Backend, DevOps & Deployment",
    team: "Ayush Tiwari (74), Ayush Tiwari (75)",
    color: "from-emerald-500 to-teal-600",
    tasks: ["FastAPI — connect AI model to frontend", "Docker containerisation", "AWS S3 + Netlify cloud deployment", "CI/CD pipelines & scalability"],
  },
];

const timeline = [
  { phase: "Research & Requirement Study",         days: 12, teams: "Research + AI Teams" },
  { phase: "System Design & Architecture",          days: 22, teams: "All Teams" },
  { phase: "Model Development & Feature Extraction",days: 30, teams: "AI + Research Teams" },
  { phase: "Clustering & Novelty Detection",        days: 10, teams: "AI + Validation Teams" },
  { phase: "Visualization & Dashboard",             days: 10, teams: "Visualization + Backend" },
  { phase: "Testing & Bug Fixing",                  days: 10, teams: "DevOps + AI Teams" },
  { phase: "Documentation & Reporting",             days: 10, teams: "Research + Visualization" },
  { phase: "Deployment & UAT",                      days: 10, teams: "DevOps + Frontend Teams" },
  { phase: "Project Management & Coordination",     days:  6, teams: "All Teams" },
];

const ProjectReport = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview",  label: "Overview" },
    { id: "system",    label: "System Design" },
    { id: "team",      label: "Team" },
    { id: "modules",   label: "Modules" },
    { id: "stack",     label: "Tech Stack" },
    { id: "timeline",  label: "Timeline" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-10 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 text-sm text-cyan-300 mb-6">
            <Award className="w-4 h-4" />
            SIH 2025 — Problem Statement #SIH25042
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent leading-tight mb-4">
            MARCHIN
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-2">
            Marine AI Research for Conservation and Habitat Inference Network
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="text-sm text-slate-400 mb-8">
            Gyan Ganga Institute of Technology Sciences, Jabalpur · RGPV, Bhopal · April 2026
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Brain,      label: "Deep Learning CNN" },
              { icon: Microscope, label: "HDBSCAN Clustering" },
              { icon: Waves,      label: "eDNA Analysis" },
              { icon: Globe,      label: "Deep Ocean Mission" },
            ].map((badge) => (
              <span key={badge.label}
                className="inline-flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/60 rounded-full px-3 py-1.5 text-xs text-slate-300">
                <badge.icon className="w-3.5 h-3.5 text-cyan-400" />
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tab Nav */}
      <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <motion.section variants={fadeUp} initial="hidden" animate="visible">
            <SectionHeader icon={BookOpen} title="Project Abstract" />
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              India's vast oceans are home to a hidden world of biodiversity, much of which remains unexplored due to the
              challenges of deep-sea research. <span className="text-cyan-300 font-semibold">MARCHIN</span> introduces an
              AI-driven eDNA analysis system that uses deep learning (CNN) and unsupervised clustering (HDBSCAN) to analyze
              environmental DNA sequences collected from deep-sea sediments and water samples. Instead of depending on
              reference databases, the model learns directly from raw genetic data — identifying patterns that represent
              both known and unknown species. The system processes thousands of DNA sequences rapidly, detects novel taxa,
              estimates their abundance, and visualizes biodiversity patterns across regions. This innovation contributes
              to India's Deep Ocean Mission and supports global goals of ocean conservation under the{" "}
              <span className="text-blue-300">UN Decade of Ocean Science for Sustainable Development 2021–2030.</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { label: "Problem Statement", value: "SIH25042",        sub: "Smart India Hackathon 2025" },
                { label: "Organization",      value: "MoES / CMLRE",    sub: "Ministry of Earth Sciences" },
                { label: "Guide",             value: "Dr. Ashish Mishra",sub: "Dept. of CSE, GGITS Jabalpur" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                  <p className="font-bold text-white text-base">{item.value}</p>
                  <p className="text-xs text-cyan-400 mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* AI Pipeline steps */}
            <div className="mt-8">
              <h3 className="text-base font-semibold text-slate-200 mb-4">AI Pipeline</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { step: "1", label: "Preprocessing",        desc: "Clean & filter raw DNA reads" },
                  { step: "2", label: "Encoding",             desc: "K-mer encoding to numerical values" },
                  { step: "3", label: "CNN Feature Extraction",desc: "Detect biological motifs & patterns" },
                  { step: "4", label: "HDBSCAN Clustering",   desc: "Group sequences, detect novel species" },
                  { step: "5", label: "Visualization",        desc: "Biodiversity charts & reports" },
                ].map((s) => (
                  <div key={s.step} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 text-center">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white mx-auto mb-2">
                      {s.step}
                    </div>
                    <p className="text-xs font-semibold text-slate-200">{s.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── SYSTEM DESIGN ── */}
        {activeTab === "system" && (
          <motion.section variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
            <SectionHeader icon={Layers} title="System Architecture — Live Animation" />
            <p className="text-slate-400 text-sm -mt-4">
              The diagram below animates the exact MARCHIN data flow — from raw eDNA sediment samples through
              AI processing to the final biodiversity dashboard, including the expert validation feedback loop.
            </p>

            {/* ✨ ANIMATED DIAGRAM */}
            <SystemArchitectureDiagram />

            {/* Architecture advantages */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 mt-4">
              <h3 className="text-base font-semibold text-slate-200 mb-4">Architecture Highlights</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Modular & independently updatable",
                  "Scalable to millions of sequences",
                  "Database isolated from user access",
                  "Easy debugging & API integration",
                  "GPU-accelerated parallel processing",
                  "Continuous learning & retraining loop",
                ].map((adv) => (
                  <div key={adv} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── TEAM ── */}
        {activeTab === "team" && (
          <motion.section variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={Users} title="Team Overview" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamMembers.map((member, i) => (
                <motion.div key={member.roll} variants={fadeUp} initial="hidden" animate="visible" custom={i}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-xl font-extrabold text-white shadow-lg flex-shrink-0`}>
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">{member.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{member.roll}</p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-cyan-300 mb-3 leading-snug">{member.role}</p>
                  <div className="space-y-1.5">
                    {member.modules.map((mod) => (
                      <div key={mod} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span className="text-xs text-slate-300">{mod}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-slate-800/60 to-blue-950/40 border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Academic Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {[
                  { label: "Project Guide", value: "Dr. Ashish Mishra",  sub: "Dept. of CSE" },
                  { label: "Institute",    value: "GGITS, Jabalpur",     sub: "Gyan Ganga Institute of Technology Sciences" },
                  { label: "University",   value: "RGPV, Bhopal",        sub: "Rajiv Gandhi Proudyogiki Vishwavidyalaya" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="font-bold text-white text-sm mt-1">{item.value}</p>
                    <p className="text-xs text-blue-300 mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── MODULES ── */}
        {activeTab === "modules" && (
          <motion.section variants={fadeUp} initial="hidden" animate="visible" className="space-y-5">
            <SectionHeader icon={GitBranch} title="Project Modules" />
            {modules.map((mod, i) => (
              <motion.div key={mod.no} variants={fadeUp} initial="hidden" animate="visible" custom={i}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex gap-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-base font-extrabold text-white flex-shrink-0`}>
                  {mod.no}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-base mb-1">{mod.title}</h3>
                  <p className="text-xs text-cyan-400 mb-3">{mod.team}</p>
                  <ul className="space-y-1.5">
                    {mod.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* ── TECH STACK ── */}
        {activeTab === "stack" && (
          <motion.section variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={Cpu} title="Technology Stack" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {techStack.map((tech, i) => (
                <motion.div key={tech.name} variants={fadeUp} initial="hidden" animate="visible" custom={i}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${tech.bg} transition-all duration-200 hover:scale-105`}>
                  <tech.icon className={`w-5 h-5 ${tech.color} flex-shrink-0`} />
                  <span className="text-sm font-semibold text-slate-200">{tech.name}</span>
                </motion.div>
              ))}
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Collaboration & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["GitHub", "Trello", "Notion", "Slack", "Google Meet", "FastQC", "Cutadapt", "Biopython", "UMAP", "Streamlit"].map(
                  (tool) => (
                    <span key={tool} className="text-xs bg-slate-700/60 border border-slate-600/50 text-slate-300 rounded-full px-3 py-1.5">
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── TIMELINE ── */}
        {activeTab === "timeline" && (
          <motion.section variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={Calendar} title="Project Timeline — 120 Working Days" />
            <div className="space-y-3">
              {timeline.map((phase, i) => (
                <motion.div key={phase.phase} variants={fadeUp} initial="hidden" animate="visible" custom={i}
                  className="flex gap-4 items-start">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    {i < timeline.length - 1 && <div className="w-0.5 h-6 bg-slate-700 mt-1" />}
                  </div>
                  <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 -mt-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white text-sm">{phase.phase}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{phase.teams}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 rounded-full px-3 py-1">
                        {phase.days}d
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        style={{ width: `${(phase.days / 30) * 100}%` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5 text-center">
              <p className="text-2xl font-extrabold text-cyan-300">120</p>
              <p className="text-sm text-slate-400">Total Working Days</p>
              <p className="text-xs text-slate-500 mt-1">Across 5 specialized teams with parallel sprints</p>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
  </div>
);

export default ProjectReport;
