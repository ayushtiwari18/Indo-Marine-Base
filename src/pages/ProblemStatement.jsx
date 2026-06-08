import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Waves,
  BookOpen,
  ExternalLink,
  Building2,
  FlaskConical,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Database,
  Brain,
  Globe,
  FileText,
  Microscope,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

const ProblemStatement = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("background");

  const sections = [
    { id: "background", label: "Background", icon: Globe },
    { id: "description", label: "Problem", icon: AlertCircle },
    { id: "solution", label: "Expected Solution", icon: Lightbulb },
    { id: "challenges", label: "Key Challenges", icon: Target },
    { id: "dataset", label: "Dataset & Links", icon: Database },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-10 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-3xl animate-pulse delay-1000" />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <motion.button
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          {/* Badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex flex-wrap gap-2 mb-5"
          >
            {[
              { label: "SIH25042", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
              { label: "Software", color: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
              { label: "Miscellaneous", color: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
              { label: "SIH 2025", color: "bg-purple-500/15 text-purple-300 border-purple-500/25" },
            ].map((b) => (
              <span
                key={b.label}
                className={`text-xs font-bold border rounded-full px-3 py-1 ${b.color}`}
              >
                {b.label}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4
              bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent"
          >
            Identifying Taxonomy and Assessing Biodiversity from eDNA Datasets
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-slate-400 text-sm sm:text-base max-w-3xl mb-8"
          >
            A Smart India Hackathon 2025 problem statement issued by the{" "}
            <span className="text-cyan-300 font-semibold">Ministry of Earth Sciences (MoES)</span> through the{" "}
            <span className="text-blue-300 font-semibold">
              Centre for Marine Living Resources and Ecology (CMLRE)
            </span>.
          </motion.p>

          {/* Stat Cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {[
              { label: "PS Number", value: "SIH25042", color: "text-orange-300" },
              { label: "Ideas Submitted", value: "274 / 500", color: "text-cyan-300" },
              { label: "Category", value: "Software", color: "text-blue-300" },
              { label: "Deadline", value: "7 Oct 2025", color: "text-purple-300" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center"
              >
                <p className={`text-base sm:text-lg font-extrabold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Org Info Bar ────────────────────────────────────── */}
      <div className="bg-slate-800/60 border-y border-slate-700/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Organization</p>
                <p className="text-sm font-semibold text-white">Ministry of Earth Sciences (MoES)</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Department</p>
                <p className="text-sm font-semibold text-white">Centre for Marine Living Resources and Ecology</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Waves className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Theme</p>
                <p className="text-sm font-semibold text-white">Miscellaneous / Deep Ocean Mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Nav ─────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === sec.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <sec.icon className="w-3.5 h-3.5" />
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* BACKGROUND */}
        {activeSection === "background" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={Globe} title="Background" />

            <div className="prose prose-invert max-w-none">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
                <p>
                  The <span className="text-cyan-300 font-semibold">deep ocean</span>, encompassing vast and remote
                  ecosystems like abyssal plains, hydrothermal vents, and seamounts, harbors a significant portion
                  of global biodiversity — much of which remains undiscovered due to its inaccessibility.
                  Understanding deep-sea biodiversity is critical for elucidating ecological interactions
                  (e.g., food webs, nutrient cycling), informing conservation strategies for vulnerable marine
                  habitats, and identifying novel eukaryotic species with potential biotechnological or ecological significance.
                </p>
                <p>
                  <span className="text-blue-300 font-semibold">Environmental DNA (eDNA)</span> has emerged as a
                  powerful, non-invasive tool for studying these ecosystems by capturing genetic traces of organisms
                  from environmental samples — such as seawater or sediment — without the need for physical collection
                  or disturbance of fragile habitats. By targeting marker genes like{" "}
                  <span className="text-cyan-400 font-mono text-sm">18S rRNA</span> or{" "}
                  <span className="text-cyan-400 font-mono text-sm">COI</span>, eDNA enables the detection of diverse
                  eukaryotic taxa, including protists, cnidarians, and rare metazoans, offering insights into species
                  richness and community structure.
                </p>
              </div>
            </div>

            {/* Context cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Waves,
                  title: "Deep Ocean Mission",
                  desc: "India's national mission to explore and harness the deep ocean for resources and biodiversity.",
                  color: "from-cyan-500 to-blue-600",
                },
                {
                  icon: Microscope,
                  title: "eDNA Technology",
                  desc: "Non-invasive genetic sampling from water and sediment — no need to physically capture organisms.",
                  color: "from-purple-500 to-indigo-600",
                },
                {
                  icon: Globe,
                  title: "UN Ocean Decade",
                  desc: "UN Decade of Ocean Science for Sustainable Development 2021–2030 global framework.",
                  color: "from-emerald-500 to-teal-600",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i + 1}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PROBLEM DESCRIPTION */}
        {activeSection === "description" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={AlertCircle} title="Problem Description" />

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
              <p>
                The <span className="text-cyan-300 font-semibold">Centre for Marine Living Resources and Ecology (CMLRE)</span>{" "}
                undertakes routine voyages to the deep sea and collects sediment and water samples from hotspot regions
                for biodiversity assessment and ecosystem monitoring. The water and sediment samples are used to extract
                eDNA and subject to high-throughput sequencing.
              </p>
              <p>
                However, assigning raw eDNA sequencing reads to eukaryotic taxa or inferring their ecological roles
                presents significant challenges, primarily due to the{" "}
                <span className="text-orange-300 font-semibold">poor representation of deep-sea organisms</span>{" "}
                in reference databases like SILVA, PR2, or NCBI. These databases, built primarily from well-studied
                terrestrial or shallow-water species, lack comprehensive sequences for deep-sea eukaryotes, leading
                to misclassifications, unassigned reads, or underestimation of biodiversity.
              </p>
              <p>
                Traditional bioinformatic pipelines for eDNA analysis, such as those implemented in{" "}
                <span className="text-slate-200 font-mono text-sm">QIIME2</span>,{" "}
                <span className="text-slate-200 font-mono text-sm">DADA2</span>, or{" "}
                <span className="text-slate-200 font-mono text-sm">mothur</span>, rely heavily on sequence alignment
                or mapping to these databases — which is inadequate for novel or divergent deep-sea taxa. This
                dependency limits the discovery of new species and hinders accurate biodiversity assessments,
                critical for conservation in rapidly changing deep-sea environments.
              </p>
            </div>

            {/* Pain points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Incomplete Reference Databases",
                  desc: "SILVA, PR2, NCBI are biased toward shallow-water / terrestrial species — deep-sea taxa are underrepresented.",
                  color: "border-red-500/30 bg-red-500/5",
                  dot: "bg-red-400",
                },
                {
                  title: "High Computational Cost",
                  desc: "Sequence alignment-based methods (QIIME2, DADA2) are slow and resource-heavy for large eDNA datasets.",
                  color: "border-orange-500/30 bg-orange-500/5",
                  dot: "bg-orange-400",
                },
                {
                  title: "Misclassification & Unassigned Reads",
                  desc: "Missing reference data causes inaccurate classification or completely unassigned sequences.",
                  color: "border-yellow-500/30 bg-yellow-500/5",
                  dot: "bg-yellow-400",
                },
                {
                  title: "Slow Manual Validation",
                  desc: "Delays biodiversity mapping and reporting, making it impractical for real-time conservation decisions.",
                  color: "border-purple-500/30 bg-purple-500/5",
                  dot: "bg-purple-400",
                },
              ].map((pt, i) => (
                <motion.div
                  key={pt.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i + 1}
                  className={`border rounded-2xl p-5 ${pt.color}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full ${pt.dot} mt-1.5 flex-shrink-0`} />
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">{pt.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* EXPECTED SOLUTION */}
        {activeSection === "solution" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={Lightbulb} title="Expected Solution" />

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              To address the challenges of poor database representation and computational time in deep-sea eDNA analysis,
              the proposed solution is an{" "}
              <span className="text-cyan-300 font-semibold">AI-driven pipeline</span>{" "}
              that uses deep learning and unsupervised learning to identify eukaryotic taxa and assess biodiversity
              directly from raw eDNA reads. The solution should be able to classify the sequences, annotate and
              estimate abundance — minimizing reliance on reference databases, reducing computational time, and
              enabling the discovery of novel taxa.
            </div>

            {/* Solution pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Brain,
                  title: "Deep Learning (CNN)",
                  desc: "Convolutional Neural Networks extract biological motifs and patterns directly from raw DNA sequences.",
                  color: "from-cyan-500 to-blue-600",
                },
                {
                  icon: Microscope,
                  title: "HDBSCAN Clustering",
                  desc: "Unsupervised clustering to group similar sequences and detect novel taxa absent from databases.",
                  color: "from-purple-500 to-indigo-600",
                },
                {
                  icon: Target,
                  title: "Database-Free Classification",
                  desc: "AI learns directly from raw genetic data — no dependence on incomplete reference databases.",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  icon: FlaskConical,
                  title: "Abundance Estimation",
                  desc: "Estimate relative abundance of species from cluster sizes and sequence counts.",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  icon: Globe,
                  title: "Biodiversity Visualization",
                  desc: "Interactive dashboards showing taxonomic distribution, cluster maps, and ecological summaries.",
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  icon: FileText,
                  title: "Auto Report Generation",
                  desc: "Gen-AI powered summaries convert raw results into readable biodiversity insights for researchers.",
                  color: "from-pink-500 to-rose-600",
                },
              ].map((pill, i) => (
                <motion.div
                  key={pill.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-cyan-500/30 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pill.color} flex items-center justify-center mb-3`}>
                    <pill.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1.5">{pill.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* KEY CHALLENGES */}
        {activeSection === "challenges" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={Target} title="Key Challenges Our Solution Addresses" />

            <div className="space-y-3">
              {[
                {
                  no: "01",
                  challenge: "Reference Database Dependency",
                  how: "CNN-based reference-free learning directly from raw k-mer encoded DNA sequences.",
                  color: "from-cyan-500 to-blue-600",
                },
                {
                  no: "02",
                  challenge: "Novel Species Discovery",
                  how: "HDBSCAN + Isolation Forest detect outlier sequences that represent new or rare taxa.",
                  color: "from-purple-500 to-indigo-600",
                },
                {
                  no: "03",
                  challenge: "Computational Speed",
                  how: "GPU-accelerated deep learning + cloud pipeline (AWS S3, Docker) for parallel processing of millions of reads.",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  no: "04",
                  challenge: "Data Volume & Scalability",
                  how: "Cloud-native architecture with AWS S3 storage handles FASTQ/FASTA files at scale.",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  no: "05",
                  challenge: "Result Interpretability",
                  how: "Interactive Tableau/D3.js dashboards + Gen-AI auto-summaries make results accessible to non-technical researchers.",
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  no: "06",
                  challenge: "Continuous Improvement",
                  how: "Feedback loop: validated species are added back to training data, improving model accuracy over time.",
                  color: "from-pink-500 to-rose-600",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.no}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="flex gap-4 items-start bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0`}>
                    {item.no}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1">{item.challenge}</h3>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-300 leading-relaxed">{item.how}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DATASET & LINKS */}
        {activeSection === "dataset" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <SectionHeader icon={Database} title="Dataset & Reference Links" />

            {/* Primary dataset */}
            <div className="bg-gradient-to-br from-slate-800/60 to-blue-950/40 border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-base mb-1">NCBI BLAST Database</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    The primary reference dataset provided with this problem statement. Contains nucleotide sequences
                    for BLAST similarity searches — used as partial reference for known taxa.
                  </p>
                  <a
                    href="https://ftp.ncbi.nlm.nih.gov/blast/db/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-sm font-medium px-4 py-2 rounded-xl transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Dataset — ftp.ncbi.nlm.nih.gov/blast/db/
                  </a>
                </div>
              </div>
            </div>

            {/* Other reference tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "SILVA Database",
                  desc: "Ribosomal RNA sequence database — one of the main existing references (with limitations for deep-sea taxa).",
                  url: "https://www.arb-silva.de/",
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  name: "PR2 Database",
                  desc: "Protist Ribosomal Reference database — reference for eukaryotic 18S rRNA marker gene sequences.",
                  url: "https://pr2-database.org/",
                  color: "from-purple-500 to-pink-600",
                },
                {
                  name: "QIIME2",
                  desc: "Traditional bioinformatic pipeline that MARCHIN aims to improve upon with AI-driven methods.",
                  url: "https://qiime2.org/",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  name: "OBIS — Ocean Biodiversity",
                  desc: "Ocean Biodiversity Information System — target integration platform for validated MARCHIN results.",
                  url: "https://obis.org/",
                  color: "from-amber-500 to-orange-600",
                },
              ].map((ref, i) => (
                <motion.div
                  key={ref.name}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ref.color} flex items-center justify-center mb-3`}>
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{ref.name}</h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{ref.desc}</p>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit →
                  </a>
                </motion.div>
              ))}
            </div>

            {/* SIH Portal link */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Official SIH 2025 Portal</h3>
                <p className="text-xs text-slate-400">View the original problem statement listing on the Smart India Hackathon website.</p>
              </div>
              <a
                href="https://sih.gov.in/sih2025PS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                SIH Portal
              </a>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-12 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-bold text-white text-base">See Our Solution — MARCHIN</h3>
            <p className="text-sm text-slate-400 mt-1">View the full project report including system design, team, and architecture.</p>
          </div>
          <button
            onClick={() => navigate("/project-report")}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            View Project Report →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-2">
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
  </div>
);

export default ProblemStatement;
