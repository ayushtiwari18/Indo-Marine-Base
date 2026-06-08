import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Waves, ExternalLink, Building2, FlaskConical,
  AlertCircle, CheckCircle, ArrowLeft, Database,
  Globe, FileText, Dna, TrendingDown, ChevronDown,
  Play, Radio, Cpu, Shield, FolderOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const cx = (...args) => args.filter(Boolean).join(" ");

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Counter ───────────────────────────────────────────────────────────────────
const Counter = ({ target, suffix = "", prefix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ── Turtle Migration Map (react-leaflet) ──────────────────────────────────────
// Maharashtra coast: Ratnagiri ~16.99°N, 73.31°E
// Odisha coast: Gahirmatha ~20.75°N, 86.90°E
// Sea route: hugs the coast south → rounds Kanyakumari → up Bay of Bengal
const MH = [16.99, 73.31];
const OD = [20.75, 86.90];
const SEA_ROUTE = [
  [16.99, 73.31],
  [15.50, 73.80],
  [13.00, 74.50],
  [10.50, 75.80],
  [8.30,  77.20],
  [8.08,  77.55],  // Kanyakumari tip
  [8.50,  79.00],
  [10.00, 80.20],
  [12.50, 80.30],
  [14.80, 80.20],
  [17.00, 82.30],
  [19.00, 85.00],
  [20.75, 86.90],
];

const TurtleMap = () => {
  const [routeVisible, setRouteVisible] = useState(false);
  const [odVisible, setOdVisible]       = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setRouteVisible(true), 800);
    const t2 = setTimeout(() => setOdVisible(true),    2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-cyan-500/20"
      style={{ height: 380, position: "relative" }}>
      <MapContainer
        center={[14.0, 79.0]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        {/* Dark ocean tile from CartoDB dark matter */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CARTO"
        />

        {/* Migration sea route */}
        {routeVisible && (
          <Polyline
            positions={SEA_ROUTE}
            pathOptions={{ color: "#f97316", weight: 2.5, dashArray: "8 5", opacity: 0.85 }}
          />
        )}

        {/* Maharashtra dot */}
        <CircleMarker
          center={MH}
          radius={9}
          pathOptions={{ color: "#06b6d4", fillColor: "#06b6d4", fillOpacity: 0.9, weight: 2 }}
        >
          <Tooltip permanent direction="left" className="leaflet-dark-tip">
            <span style={{ color: "#06b6d4", fontWeight: 700, fontSize: 11 }}>Maharashtra</span>
            <br />
            <span style={{ color: "#94a3b8", fontSize: 10 }}>10,000 eggs / yr</span>
          </Tooltip>
        </CircleMarker>

        {/* Odisha dot */}
        {odVisible && (
          <CircleMarker
            center={OD}
            radius={9}
            pathOptions={{ color: "#f97316", fillColor: "#f97316", fillOpacity: 0.9, weight: 2 }}
          >
            <Tooltip permanent direction="right" className="leaflet-dark-tip">
              <span style={{ color: "#f97316", fontWeight: 700, fontSize: 11 }}>Odisha Coast</span>
              <br />
              <span style={{ color: "#94a3b8", fontSize: 10 }}>Sudden shift!</span>
            </Tooltip>
          </CircleMarker>
        )}
      </MapContainer>

      {/* Overlay label */}
      <div style={{
        position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
        background: "#0a1628dd", border: "1px solid #f59e0b55",
        borderRadius: 8, padding: "4px 14px", zIndex: 1000, pointerEvents: "none",
      }}>
        <p style={{ color: "#f59e0b", fontSize: 10, fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
          Sea route: Arabian Sea  Kanyakumari  Bay of Bengal
        </p>
      </div>
    </div>
  );
};

// ── Data Fragmentation visual ──────────────────────────────────────────────────
// Shows all the different file formats researchers deal with — scattered, locked
const FILE_TYPES = [
  { ext: ".fac",   label: "CMLRE Proprietary",   x: "5%",  y: "8%",  c: "#ef4444", note: "Locked servers" },
  { ext: ".fastq", label: "Raw eDNA Reads",       x: "60%", y: "5%",  c: "#a855f7", note: "Hard drives" },
  { ext: ".nc",    label: "NetCDF Climate",        x: "80%", y: "30%", c: "#3b82f6", note: "NOAA / IMD" },
  { ext: ".fasta", label: "Reference Sequences",  x: "10%", y: "52%", c: "#06b6d4", note: "SILVA / NCBI" },
  { ext: ".csv",   label: "Ocean Survey Tables",  x: "55%", y: "58%", c: "#f59e0b", note: "INCOIS / IORA" },
  { ext: ".mat",   label: "MATLAB Oceanography",  x: "30%", y: "72%", c: "#10b981", note: "CMLRE / NIOT" },
  { ext: ".json",  label: "API Exports",           x: "72%", y: "74%", c: "#ec4899", note: "Fragmented APIs" },
  { ext: ".bam",   label: "Aligned Reads",         x: "38%", y: "30%", c: "#f97316", note: "Unprocessed" },
];

const DataFragmentation = () => (
  <div className="relative w-full rounded-2xl overflow-hidden border border-red-500/20"
    style={{ background: "#07080f", height: 280 }}>

    {/* Grid texture */}
    <div className="absolute inset-0" style={{
      backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",
      backgroundSize: "32px 32px",
    }} />

    {/* Centre label */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div className="text-center"
        animate={{ opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 3.5, repeat: Infinity }}>
        <p className="text-red-400 text-sm font-mono font-black tracking-[0.3em]">12 PLATFORMS</p>
        <p className="text-slate-600 text-xs mt-1">No unified access  No common format</p>
      </motion.div>
    </div>

    {/* File chips */}
    {FILE_TYPES.map((f, i) => (
      <motion.div key={f.ext}
        className="absolute"
        style={{ left: f.x, top: f.y }}
        animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.5 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}>
        <div className="rounded-xl px-3 py-2 border"
          style={{ background: f.c + "14", borderColor: f.c + "55", minWidth: 100 }}>
          <p className="font-mono font-black text-sm" style={{ color: f.c }}>{f.ext}</p>
          <p className="text-slate-400 text-xs leading-tight">{f.label}</p>
          <p className="text-xs mt-0.5 font-medium" style={{ color: f.c + "aa" }}>{f.note}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

// ── Data Chaos (orbiting labels) ──────────────────────────────────────────────
const DataChaos = () => {
  const sources = [
    { label: "CMLRE",  x: "6%",  y: "12%", c: "#06b6d4" },
    { label: "INCOIS", x: "70%", y: "6%",  c: "#3b82f6" },
    { label: "IORA",   x: "38%", y: "4%",  c: "#a855f7" },
    { label: "IMD",    x: "83%", y: "44%", c: "#f59e0b" },
    { label: "NOAA",   x: "4%",  y: "58%", c: "#ec4899" },
    { label: "SILVA",  x: "58%", y: "68%", c: "#10b981" },
    { label: "NCBI",   x: "24%", y: "72%", c: "#f97316" },
    { label: ".fac",   x: "48%", y: "38%", c: "#ef4444" },
  ];
  return (
    <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-red-500/20"
      style={{ background: "#0a0f1a" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }} className="text-center">
          <p className="text-red-400 text-sm font-mono font-bold tracking-widest">DATA CHAOS</p>
          <p className="text-slate-600 text-xs mt-1">12 platforms  no unified access</p>
        </motion.div>
      </div>
      {sources.map((s, i) => (
        <motion.div key={s.label}
          className="absolute rounded-lg px-2.5 py-1 text-xs font-bold font-mono border"
          style={{ left: s.x, top: s.y, color: s.c, borderColor: s.c + "55", background: s.c + "12" }}
          animate={{ x: [0, i % 2 === 0 ? 7 : -7, 0], y: [0, i % 3 === 0 ? 5 : -5, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}>
          {s.label}
        </motion.div>
      ))}
    </div>
  );
};

// ── Unified Hub ───────────────────────────────────────────────────────────────
const UnifiedHub = () => {
  const spokes = [
    { label: "Climate",    angle: 0,   c: "#06b6d4" },
    { label: "Pollution",  angle: 60,  c: "#ec4899" },
    { label: "Ocean Data", angle: 120, c: "#3b82f6" },
    { label: "eDNA",       angle: 180, c: "#a855f7" },
    { label: "Currents",   angle: 240, c: "#f59e0b" },
    { label: "Depth",      angle: 300, c: "#10b981" },
  ];
  const R = 80, hcx = 200, hcy = 110;
  return (
    <div className="w-full rounded-2xl border border-cyan-500/20 overflow-hidden"
      style={{ background: "#060d1a", height: 240 }}>
      <svg viewBox="0 0 400 230" className="w-full h-full">
        {spokes.map((s, i) => {
          const rad = (s.angle - 90) * Math.PI / 180;
          const x2 = hcx + R * Math.cos(rad);
          const y2 = hcy + R * Math.sin(rad);
          const lx = hcx + (R + 34) * Math.cos(rad);
          const ly = hcy + (R + 34) * Math.sin(rad);
          return (
            <g key={s.label}>
              <motion.line x1={hcx} y1={hcy} x2={x2} y2={y2}
                stroke={s.c} strokeWidth="1.5" strokeDasharray="3 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.7, delay: i * 0.15 }} />
              <motion.circle cx={x2} cy={y2} r="5" fill={s.c}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.5, type: "spring" }}
                style={{ filter: "drop-shadow(0 0 5px " + s.c + ")" }} />
              <motion.text x={lx} y={ly + 3} textAnchor="middle"
                fill={s.c} fontSize="8" fontWeight="700" fontFamily="system-ui"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.7 }}>{s.label}</motion.text>
            </g>
          );
        })}
        <motion.circle cx={hcx} cy={hcy} r="26" fill="#0d1b2e"
          stroke="#06b6d4" strokeWidth="1.8"
          animate={{ r: [24, 27, 24] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ filter: "drop-shadow(0 0 14px #06b6d4)" }} />
        <text x={hcx} y={hcy - 4} textAnchor="middle" fill="#06b6d4"
          fontSize="8.5" fontWeight="900" fontFamily="'Courier New', monospace">MARCHIN</text>
        <text x={hcx} y={hcy + 8} textAnchor="middle" fill="#94a3b8"
          fontSize="7" fontFamily="system-ui">Unified Hub</text>
        <motion.circle cx={hcx} cy={hcy} r="26" fill="none" stroke="#06b6d4"
          strokeWidth="1" opacity="0.3"
          animate={{ r: [26, 46, 26], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }} />
        <text x={hcx} y="222" textAnchor="middle" fill="#334155"
          fontSize="8" fontFamily="'Courier New', monospace">
          All data sources  unified  real-time
        </text>
      </svg>
    </div>
  );
};

// ── eDNA Scanner ──────────────────────────────────────────────────────────────
const EDNAScanner = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 60);
    return () => clearInterval(t);
  }, []);
  const scanY = (tick * 1.5) % 180;
  const results = [
    { label: "Novel Species",   conf: "94.2%", c: "#f97316" },
    { label: "Cnidaria fam.",   conf: "87.6%", c: "#a855f7" },
    { label: "Abyssal Protist", conf: "91.1%", c: "#06b6d4" },
    { label: "Unknown Taxon",   conf: "78.9%", c: "#ef4444" },
  ];
  const seq = ["A","T","G","C","G","A","T","C","A","G","T","C"];
  const seqColor = { A: "#06b6d4", T: "#ec4899", G: "#10b981", C: "#f59e0b" };
  return (
    <div className="w-full rounded-2xl border border-purple-500/30 overflow-hidden"
      style={{ background: "#060a12" }}>
      <svg viewBox="0 0 560 200" className="w-full" style={{ display: "block" }}>
        <defs>
          <linearGradient id="scanGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <text x="70" y="16" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace">eDNA INPUT</text>
        {Array.from({ length: 11 }).map((_, i) => {
          const y = 24 + i * 15;
          const phase = i * 0.7;
          const x1 = 38 + Math.sin(phase) * 22;
          const x2 = 102 - Math.sin(phase) * 22;
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="#1e3a5f" strokeWidth="1" />
              <circle cx={x1} cy={y} r="3.5" fill="#06b6d4" opacity="0.85" />
              <circle cx={x2} cy={y} r="3.5" fill="#a855f7" opacity="0.85" />
            </g>
          );
        })}
        <rect x="10" y={scanY + 20} width="120" height="20" fill="url(#scanGrad2)" />
        <line x1="10" y1={scanY + 30} x2="130" y2={scanY + 30} stroke="#a855f7" strokeWidth="0.8" opacity="0.6" />
        <text x="270" y="16" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace">SEQUENCE ANALYSIS</text>
        {seq.map((ch, i) => (
          <text key={i} x={152 + i * 20} y="50" fill={seqColor[ch]} fontSize="13" fontWeight="800" fontFamily="'Courier New', monospace">{ch}</text>
        ))}
        <rect x="165" y="60" width="200" height="22" rx="6" fill="#1e1040" stroke="#a855f7" strokeWidth="0.8" />
        <text x="265" y="75" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="700" fontFamily="system-ui">CNN + HDBSCAN Classifier</text>
        {[0.85, 0.60, 0.92, 0.45, 0.78].map((v, i) => (
          <g key={i}>
            <rect x={155 + i * 45} y={92 + (1 - v) * 55} width="36" height={v * 55} rx="3" fill="#a855f7" opacity={0.6} />
            <text x={173 + i * 45} y={90} textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="system-ui">k{i + 1}</text>
          </g>
        ))}
        <text x="270" y="165" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="system-ui">k-mer frequency features</text>
        <motion.line x1="400" y1="100" x2="428" y2="100" stroke="#a855f7" strokeWidth="1.5"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <polygon points="428,96 436,100 428,104" fill="#a855f7" />
        <text x="495" y="16" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace">RESULTS</text>
        {results.map((r, i) => (
          <g key={r.label}>
            <rect x="438" y={24 + i * 42} width="112" height="34" rx="6" fill="#0d1b2e" stroke={r.c} strokeWidth="1" />
            <circle cx="450" cy={24 + i * 42 + 17} r="4" fill={r.c} />
            <text x="458" y={24 + i * 42 + 13} fill={r.c} fontSize="7.5" fontWeight="700" fontFamily="system-ui">{r.label}</text>
            <text x="458" y={24 + i * 42 + 25} fill="#94a3b8" fontSize="7" fontFamily="'Courier New', monospace">conf: {r.conf}</text>
          </g>
        ))}
        <text x="280" y="194" textAnchor="middle" fill="#334155" fontSize="7.5" fontFamily="'Courier New', monospace">
          Deep-water eDNA  6000 m depth  Real-time classification
        </text>
      </svg>
    </div>
  );
};

// ── comparison rows ───────────────────────────────────────────────────────────
const rows = [
  { label: "Deep-sea coverage",   old: "< 0.3%",       newVal: "Reference-free" },
  { label: "Novel taxa",          old: "Unassigned",    newVal: "Detected & flagged" },
  { label: "Analysis time",       old: "6 months",      newVal: "Hours (GPU)" },
  { label: "Database dependency", old: "100% required", newVal: "0% required" },
  { label: "Scalability",         old: "Manual",        newVal: "Cloud auto-scale" },
  { label: "Feedback loop",       old: "None",          newVal: "Continuous retrain" },
];

const ActSection = ({ id, children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section id={id} ref={ref}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={fadeUp} className="mb-24">
      {children}
    </motion.section>
  );
};

const Tag = ({ label, color }) => (
  <span className={cx("text-xs font-bold border rounded-full px-3 py-1", color)}>{label}</span>
);

const GradIconBox = ({ gradient, children, size = "w-10 h-10" }) => (
  <div className={cx(size, "rounded-xl flex items-center justify-center flex-shrink-0")}
    style={{ background: gradient }}>
    {children}
  </div>
);

const GRADIENTS = {
  "purple-indigo": "linear-gradient(135deg,#a855f7,#4f46e5)",
  "cyan-blue":     "linear-gradient(135deg,#06b6d4,#2563eb)",
  "pink-rose":     "linear-gradient(135deg,#ec4899,#f43f5e)",
  "amber-orange":  "linear-gradient(135deg,#f59e0b,#ea580c)",
  "emerald-teal":  "linear-gradient(135deg,#10b981,#0d9488)",
  "blue-indigo":   "linear-gradient(135deg,#3b82f6,#4f46e5)",
  "purple-pink":   "linear-gradient(135deg,#a855f7,#db2777)",
};

// ══════════════════════════════════════════════════════════════════════════════
const ProblemStatement = () => {
  const navigate = useNavigate();

  const ednaCards = [
    { icon: Dna,      title: "Reference-Free CNN",         desc: "K-mer patterns from raw sequences. No SILVA, no PR2.",                   grad: GRADIENTS["purple-indigo"] },
    { icon: Cpu,      title: "GPU-Accelerated Pipeline",   desc: "Millions of reads in parallel. 6 months to hours.",                      grad: GRADIENTS["cyan-blue"] },
    { icon: Radio,    title: "Real-Time Novelty Detection",desc: "HDBSCAN + Isolation Forest: new species flagged instantly.",             grad: GRADIENTS["pink-rose"] },
    { icon: Shield,   title: "Expert Validation Loop",     desc: "Flagged taxa routed to scientists. Confirmed species retrain the model.",  grad: GRADIENTS["amber-orange"] },
    { icon: Globe,    title: "OBIS / NCBI Integration",    desc: "Validated species auto-submitted to global ocean biodiversity databases.", grad: GRADIENTS["emerald-teal"] },
    { icon: FileText, title: "Gen-AI Biodiversity Reports",desc: "Plain-English summaries of every scan: ready for research papers.",      grad: GRADIENTS["blue-indigo"] },
  ];

  const orgItems = [
    { icon: Building2,    label: "Organization", value: "Ministry of Earth Sciences (MoES)",                    grad: GRADIENTS["cyan-blue"] },
    { icon: FlaskConical, label: "Department",   value: "Centre for Marine Living Resources and Ecology (CMLRE)", grad: GRADIENTS["blue-indigo"] },
    { icon: Waves,        label: "Theme",        value: "Deep Ocean Mission Miscellaneous",                       grad: GRADIENTS["purple-pink"] },
  ];

  const datasetLinks = [
    { name: "NCBI BLAST Database",    url: "https://ftp.ncbi.nlm.nih.gov/blast/db/", desc: "Primary reference nucleotide sequences",        grad: GRADIENTS["cyan-blue"] },
    { name: "SILVA rRNA Database",    url: "https://www.arb-silva.de/",              desc: "Ribosomal RNA reference (limited deep-sea)",     grad: GRADIENTS["blue-indigo"] },
    { name: "PR2 Protist Database",   url: "https://pr2-database.org/",              desc: "Eukaryotic 18S rRNA sequences",                 grad: GRADIENTS["purple-pink"] },
    { name: "OBIS Ocean Biodiversity",url: "https://obis.org/",                      desc: "Target integration for validated results",       grad: GRADIENTS["emerald-teal"] },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: "#030712" }}>

      {/* ── ACT 1: HOOK ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 120% 80% at 50% 120%,#0c4a6e44 0%,transparent 70%)" }} />
          <motion.div className="absolute inset-0"
            animate={{ opacity: [0.025, 0.06, 0.025] }} transition={{ duration: 8, repeat: Infinity }}
            style={{
              backgroundImage: "linear-gradient(rgba(6,182,212,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.6) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }} onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-cyan-300 transition-colors mb-14 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </motion.button>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex flex-wrap gap-2 mb-8">
            <Tag label="SIH25042"                  color="bg-orange-500/20 text-orange-300 border-orange-500/30" />
            <Tag label="Smart India Hackathon 2025" color="bg-cyan-500/15 text-cyan-300 border-cyan-500/25" />
            <Tag label="MoES CMLRE"                color="bg-blue-500/15 text-blue-300 border-blue-500/25" />
            <Tag label="Deep Ocean Mission"        color="bg-purple-500/15 text-purple-300 border-purple-500/25" />
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-cyan-400 text-sm font-bold tracking-widest font-mono mb-4 uppercase">
            The Story Behind The Problem
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            <span style={{ background: "linear-gradient(135deg,#e2e8f0,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              10,000 Turtle Eggs.
            </span>
            <br />
            <span style={{ background: "linear-gradient(135deg,#06b6d4,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Then Silence.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="text-slate-400 text-lg max-w-3xl leading-relaxed mb-12">
            Every year, the Maharashtra coastline was home to one of India's most significant
            Olive Ridley nesting grounds. Then one season they were gone.
            Reappearing 1,400 km away on the Odisha coast.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <TurtleMap />
              <p className="text-center text-slate-600 text-xs font-mono mt-2">
                Actual sea route: Arabian Sea  Kanyakumari  Bay of Bengal
              </p>
            </div>
            <div className="space-y-5 pt-4">
              <div className="border-l-2 border-cyan-500 pl-5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Scientists knew something had changed: temperature, currents, pollution.
                  But the data was <span className="text-red-400 font-semibold">scattered across 12 platforms</span>,
                  buried in <span className="text-orange-300 font-mono">.fac files</span> nobody could access.
                </p>
              </div>
              <div className="border-l-2 border-orange-500 pl-5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  To study this shift, researchers needed climatic, pollution, and ocean data together.
                  <span className="text-cyan-300 font-semibold"> No such platform existed.</span>
                </p>
              </div>
              <div className="border-l-2 border-purple-500 pl-5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  And deeper: thousands of eDNA samples at
                  <span className="text-purple-300 font-bold"> 6,000 metres depth</span> sat on hard drives.
                  <span className="text-red-400 font-semibold"> Unanalyzed. Unknown.</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center mt-16 gap-2 text-slate-600">
            <span className="text-xs font-mono tracking-widest">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* ── ACT 2: SCALE ─────────────────────────────────────────────────── */}
      <ActSection id="scale">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-orange-400 text-xs font-bold tracking-widest font-mono mb-3 uppercase">Act 2 The Scale</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">This Is Not Just About Turtles.</h2>
          <p className="text-slate-400 text-base max-w-2xl mb-12">India's Deep Ocean Mission is collecting data at a scale nobody has the tools to process.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {[
              { target: 6000, suffix: "m",     label: "Deepest samples collected",      textC: "text-cyan-300",   borderC: "border-cyan-500/30" },
              { target: 70,   suffix: "%", prefix: "~", label: "Deep-sea species undiscovered", textC: "text-orange-300", borderC: "border-orange-500/30" },
              { target: 274,  suffix: "",       label: "Teams attempted SIH25042",       textC: "text-purple-300", borderC: "border-purple-500/30" },
              { target: 0,    suffix: " tools", label: "Existing tools for novel eDNA",  textC: "text-red-400",    borderC: "border-red-500/30" },
            ].map((s, i) => (
              <div key={i} className={cx("bg-slate-900 border rounded-2xl p-5 text-center", s.borderC)}>
                <p className={cx("text-3xl sm:text-4xl font-black mb-1", s.textC)}>
                  <Counter target={s.target} prefix={s.prefix || ""} suffix={s.suffix} />
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
          <blockquote className="relative border border-slate-700/50 rounded-2xl p-8 bg-slate-900/50">
            <div className="absolute top-5 left-5 text-6xl text-slate-700 font-serif leading-none">&ldquo;</div>
            <p className="relative text-slate-200 text-lg sm:text-xl font-medium leading-relaxed pl-8">
              Creatures nobody has ever seen. Sequences never classified.
            </p>
            <p className="relative text-slate-400 text-lg font-bold pl-8 mt-3">
              They sit in hard drives. <span className="text-red-400">Unanalyzed. Unknown. Forgotten.</span>
            </p>
          </blockquote>
        </div>
      </ActSection>

      {/* ── ACT 3: DATA CHAOS ────────────────────────────────────────────── */}
      <ActSection id="chaos">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-red-400 text-xs font-bold tracking-widest font-mono mb-3 uppercase">Act 3 The Villain</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">The Data Exists. It's Just Invisible.</h2>
          <p className="text-slate-400 text-base max-w-2xl mb-6">CMLRE, INCOIS, IORA, IMD, NOAA: each holds a piece. No platform unifies them.</p>

          {/* File Fragmentation */}
          <div className="mb-6">
            <p className="text-slate-500 text-xs font-mono font-bold tracking-widest uppercase mb-3">Scattered File Formats Across Agencies</p>
            <DataFragmentation />
          </div>

          <div className="mb-10"><DataChaos /></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: TrendingDown, title: "SILVA less than 0.3% deep-sea coverage", desc: "Built for shallow/terrestrial species: deep-sea taxa invisible.",                              textC: "text-red-400",    borderC: "border-red-500/20 bg-red-500/5" },
              { icon: FileText,     title: "6 months per voyage dataset",             desc: "QIIME2 and DADA2 take months on standard compute for a single voyage.",                        textC: "text-orange-400", borderC: "border-orange-500/20 bg-orange-500/5" },
              { icon: AlertCircle,  title: "Unassigned is the most common result",    desc: "60-80% of deep-sea reads return unassigned: biodiversity completely missed.",                  textC: "text-yellow-400", borderC: "border-yellow-500/20 bg-yellow-500/5" },
              { icon: Globe,        title: ".fac files on locked CMLRE servers",      desc: "Proprietary formats, disconnected servers: accessing data requires inter-agency coordination.",textC: "text-purple-400", borderC: "border-purple-500/20 bg-purple-500/5" },
            ].map((pt, i) => (
              <div key={i} className={cx("border rounded-2xl p-5", pt.borderC)}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <pt.icon className={cx("w-5 h-5", pt.textC)} />
                  </div>
                  <div>
                    <h3 className={cx("font-bold text-sm mb-1.5", pt.textC)}>{pt.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ActSection>

      {/* ── ACT 4: SOLUTION ──────────────────────────────────────────────── */}
      <ActSection id="solution">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-emerald-400 text-xs font-bold tracking-widest font-mono mb-3 uppercase">Act 4 The Solution</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            <span style={{ background: "linear-gradient(135deg,#06b6d4,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              MARCHIN Does Not Look Up Answers.
            </span>
            <br /><span className="text-white">It Learns Them.</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mb-12">
            One unified platform: all ocean data, plus AI that classifies deep-sea DNA without a reference database.
          </p>
          <div className="mb-12"><UnifiedHub /></div>
          <div className="rounded-2xl overflow-hidden border border-slate-700/50">
            <div className="grid grid-cols-3 bg-slate-800/60 text-xs font-bold font-mono tracking-wider">
              <div className="py-3 px-4 text-slate-400">CAPABILITY</div>
              <div className="py-3 px-4 text-center text-red-400 border-x border-slate-700/50">QIIME2 / DADA2</div>
              <div className="py-3 px-4 text-center text-cyan-400">MARCHIN</div>
            </div>
            {rows.map((r, i) => (
              <div key={r.label} className={cx("grid grid-cols-3 text-xs border-t border-slate-800", i % 2 === 0 ? "bg-slate-900/30" : "")}>
                <div className="py-3 px-4 text-slate-300 font-medium">{r.label}</div>
                <div className="py-3 px-4 text-center text-red-400 border-x border-slate-800 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />{r.old}
                </div>
                <div className="py-3 px-4 text-center text-emerald-400 flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" />{r.newVal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ActSection>

      {/* ── ACT 5: eDNA SCANNER ──────────────────────────────────────────── */}
      <ActSection id="edna-scanner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-purple-400 text-xs font-bold tracking-widest font-mono mb-3 uppercase">Act 5 Flagship Feature</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">The eDNA Deep-Water Scanner</h2>
          <p className="text-slate-400 text-base max-w-2xl mb-10">
            Upload raw <span className="text-purple-300 font-mono">.fastq / .fasta</span> sequences from any depth.
            MARCHIN classifies, clusters, and flags novel taxa in hours, not months.
          </p>
          <div className="mb-10"><EDNAScanner /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ednaCards.map((card, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/30 transition-all">
                <GradIconBox gradient={card.grad}>
                  <card.icon className="w-5 h-5 text-white" />
                </GradIconBox>
                <h3 className="font-bold text-white text-sm mt-3 mb-1.5">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ActSection>

      {/* ── FINAL: ORG + DATASETS + CTA ──────────────────────────────────── */}
      <ActSection id="refs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Org bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap gap-6 items-center mb-8">
            {orgItems.map((org) => (
              <div key={org.label} className="flex items-center gap-3">
                <GradIconBox gradient={org.grad} size="w-9 h-9">
                  <org.icon className="w-4 h-4 text-white" />
                </GradIconBox>
                <div>
                  <p className="text-xs text-slate-500">{org.label}</p>
                  <p className="text-sm font-semibold text-white">{org.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dataset links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {datasetLinks.map((ref) => (
              <a key={ref.name} href={ref.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-cyan-500/30 transition-all group">
                <GradIconBox gradient={ref.grad} size="w-9 h-9">
                  <Database className="w-4 h-4 text-white" />
                </GradIconBox>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{ref.name}</p>
                  <p className="text-xs text-slate-500">{ref.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg,#0c4a6e22,#1e1b4b22)", border: "1px solid #0ea5e930" }}>
            <p className="text-cyan-400 text-xs font-bold tracking-widest font-mono mb-3">READY TO SEE THE SOLUTION?</p>
            <h3 className="text-2xl font-black text-white mb-3">Explore MARCHIN in Full</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
              System architecture, team, modules, tech stack: everything powering India's first
              reference-free deep-sea eDNA classification platform.
            </p>
            <button onClick={() => navigate("/project-report")}
              className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl text-white text-sm transition-all"
              style={{ background: "linear-gradient(135deg,#0891b2,#1d4ed8)", boxShadow: "0 0 32px #06b6d430" }}>
              <Play className="w-4 h-4" /> View Project Report
            </button>
          </div>
        </div>
      </ActSection>

    </div>
  );
};

export default ProblemStatement;
