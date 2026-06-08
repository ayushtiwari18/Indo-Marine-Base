import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Waves, BookOpen, ExternalLink, Building2, FlaskConical,
  AlertCircle, CheckCircle, ArrowLeft, Database, Brain,
  Globe, FileText, Microscope, Target, Zap, Dna,
  TrendingDown, ChevronDown, Play, Radio, Cpu, Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { delay: i * 0.06, duration: 0.5 } }),
};

// ── animated counter ──────────────────────────────────────────────────────────
const Counter = ({ target, suffix = "", prefix = "", duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(decimals)));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration, decimals]);
  return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>;
};

// ── India coastline SVG map (turtle migration story) ─────────────────────────
const TurtleMap = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const ts = [800, 2200, 4000, 5800];
    const timers = ts.map((t, i) => setTimeout(() => setStep(i + 1), t));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full" style={{ maxWidth: 480, margin: "0 auto" }}>
      <svg viewBox="0 0 320 400" className="w-full" style={{ filter: "drop-shadow(0 0 32px #06b6d420)" }}>
        {/* Ocean background */}
        <rect width="320" height="400" fill="#060d1a" rx="12" />
        <rect width="320" height="400" fill="url(#oceanGrad)" rx="12" opacity="0.4" />
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="60%" r="70%">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <radialGradient id="glowMH" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowOD" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Simplified India landmass */}
        <path
          d="M80,20 L210,20 L225,40 L240,80 L250,120 L245,160 L255,200
             L240,240 L220,270 L200,300 L185,340 L175,370
             L165,370 L155,340 L145,310 L130,290 L110,260
             L90,230 L75,200 L65,170 L60,140 L65,100 L72,60 Z"
          fill="#1e3a5f" stroke="#2563eb" strokeWidth="1"
          opacity="0.85"
        />
        {/* Bay of Bengal label */}
        <text x="250" y="180" fill="#334155" fontSize="9" fontFamily="system-ui"
          transform="rotate(-30 250 180)">Bay of Bengal</text>
        {/* Arabian Sea label */}
        <text x="30" y="200" fill="#334155" fontSize="8" fontFamily="system-ui"
          transform="rotate(20 30 200)">Arabian Sea</text>

        {/* Maharashtra coast dot */}
        {step >= 1 && (
          <>
            <motion.circle cx="82" cy="185" r="18" fill="url(#glowMH)"
              animate={{ r: [14, 22, 14] }} transition={{ duration: 2, repeat: Infinity }} />
            <circle cx="82" cy="185" r="6" fill="#06b6d4"
              style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }} />
            <motion.text x="18" y="175" fill="#06b6d4" fontSize="8" fontWeight="700"
              fontFamily="system-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}>Maharashtra</motion.text>
            <motion.text x="22" y="186" fill="#94a3b8" fontSize="7"
              fontFamily="system-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}>10,000 eggs/yr</motion.text>
          </>
        )}

        {/* Migration path */}
        {step >= 2 && (
          <motion.path
            d="M84,182 C100,165 130,148 155,138 C175,128 200,130 218,145"
            fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="5 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        )}

        {/* Question mark mid-path */}
        {step >= 2 && (
          <motion.text x="148" y="138" fill="#f59e0b" fontSize="16" fontWeight="900"
            textAnchor="middle" fontFamily="system-ui"
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}>?</motion.text>
        )}

        {/* Odisha coast dot */}
        {step >= 3 && (
          <>
            <motion.circle cx="220" cy="148" r="18" fill="url(#glowOD)"
              animate={{ r: [14, 22, 14] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            <motion.circle cx="220" cy="148" r="6" fill="#f97316"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ filter: "drop-shadow(0 0 8px #f97316)" }} />
            <motion.text x="228" y="143" fill="#f97316" fontSize="8" fontWeight="700"
              fontFamily="system-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}>Odisha</motion.text>
            <motion.text x="228" y="154" fill="#94a3b8" fontSize="7"
              fontFamily="system-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}>Sudden shift!</motion.text>
          </>
        )}

        {/* Caption */}
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <rect x="10" y="350" width="300" height="38" rx="8"
              fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" opacity="0.95" />
            <text x="160" y="364" textAnchor="middle" fill="#f59e0b"
              fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace">
              WHY DID THEY MIGRATE? SCIENTISTS HAD NO DATA.
            </text>
            <text x="160" y="378" textAnchor="middle" fill="#94a3b8"
              fontSize="7" fontFamily="system-ui">
              Climatic, pollution & ocean data — scattered across 12 platforms
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
};

// ── scattered data logos chaos visual ────────────────────────────────────────
const DataChaos = () => {
  const sources = [
    { label: "CMLRE",  x: "8%",  y: "15%", c: "#06b6d4" },
    { label: "INCOIS", x: "72%", y: "8%",  c: "#3b82f6" },
    { label: "IORA",   x: "40%", y: "5%",  c: "#a855f7" },
    { label: "IMD",    x: "85%", y: "45%", c: "#f59e0b" },
    { label: "NOAA",   x: "5%",  y: "60%", c: "#ec4899" },
    { label: "SILVA",  x: "60%", y: "70%", c: "#10b981" },
    { label: "NCBI",   x: "25%", y: "75%", c: "#f97316" },
    { label: ".fac",   x: "50%", y: "40%", c: "#ef4444" },
  ];
  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-red-500/20"
      style={{ background: "#0a0f1a" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-center"
        >
          <p className="text-red-400 text-xs font-mono font-bold tracking-widest">DATA CHAOS</p>
          <p className="text-slate-600 text-xs mt-1">12 platforms · no unified access</p>
        </motion.div>
      </div>
      {sources.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute rounded-lg px-2 py-1 text-xs font-bold font-mono border"
          style={{
            left: s.x, top: s.y,
            color: s.c, borderColor: `${s.c}44`,
            background: `${s.c}0d`,
          }}
          animate={{
            x: [0, (i % 2 === 0 ? 6 : -6), 0],
            y: [0, (i % 3 === 0 ? 5 : -5), 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          {s.label}
        </motion.div>
      ))}
      {/* Red cross lines */}
      {[["10%", "10%", "90%", "90%"], ["90%", "10%", "10%", "90%"]].map((_, i) => (
        <motion.div key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${i === 0 ? 45 : 135}deg, transparent 45%, #ef444408 50%, transparent 55%)`,
          }}
        />
      ))}
    </div>
  );
};

// ── MARCHIN unified hub visual ────────────────────────────────────────────────
const UnifiedHub = () => {
  const spokes = [
    { label: "Climate",    angle: 0,   c: "#06b6d4" },
    { label: "Pollution",  angle: 60,  c: "#ec4899" },
    { label: "Ocean Data", angle: 120, c: "#3b82f6" },
    { label: "eDNA",       angle: 180, c: "#a855f7" },
    { label: "Currents",   angle: 240, c: "#f59e0b" },
    { label: "Depth",      angle: 300, c: "#10b981" },
  ];
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 80, cx = 160, cy = 100;
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/20"
      style={{ background: "#060d1a", height: 220 }}>
      <svg viewBox="0 0 320 200" className="w-full h-full">
        {spokes.map((s, i) => {
          const rad = toRad(s.angle - 90);
          const x2 = cx + R * Math.cos(rad);
          const y2 = cy + R * Math.sin(rad);
          const lx = cx + (R + 28) * Math.cos(rad);
          const ly = cy + (R + 28) * Math.sin(rad);
          return (
            <g key={s.label}>
              <motion.line x1={cx} y1={cy} x2={x2} y2={y2}
                stroke={s.c} strokeWidth="1.5" strokeDasharray="3 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              />
              <motion.circle cx={x2} cy={y2} r="5" fill={s.c}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.5, type: "spring" }}
                style={{ filter: `drop-shadow(0 0 5px ${s.c})` }}
              />
              <motion.text x={lx} y={ly + 3} textAnchor="middle"
                fill={s.c} fontSize="7.5" fontWeight="700" fontFamily="system-ui"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.7 }}>{s.label}</motion.text>
            </g>
          );
        })}
        {/* Central hub */}
        <motion.circle cx={cx} cy={cy} r="22" fill="#0d1b2e"
          stroke="#06b6d4" strokeWidth="1.5"
          animate={{ r: [20, 23, 20] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ filter: "drop-shadow(0 0 12px #06b6d4)" }}
        />
        <text x={cx} y={cy - 3} textAnchor="middle" fill="#06b6d4"
          fontSize="8" fontWeight="900" fontFamily="'Courier New', monospace">MARCHIN</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="#94a3b8"
          fontSize="6.5" fontFamily="system-ui">Unified Hub</text>
        {/* Pulse ring */}
        <motion.circle cx={cx} cy={cy} r="22" fill="none" stroke="#06b6d4"
          strokeWidth="1" opacity="0.3"
          animate={{ r: [22, 40, 22], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Bottom label */}
        <text x="160" y="190" textAnchor="middle" fill="#334155"
          fontSize="8" fontFamily="'Courier New', monospace">
          All data sources unified · real-time access
        </text>
      </svg>
    </div>
  );
};

// ── eDNA Scanner Feature Visual ───────────────────────────────────────────────
const EDNAScanner = () => {
  const [scanLine, setScanLine] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScanLine(p => (p + 1) % 100), 30);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-purple-500/30"
      style={{ background: "#060a12", height: 200 }}>
      <svg viewBox="0 0 320 200" className="w-full h-full">
        <defs>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* DNA helix left */}
        {Array.from({ length: 10 }).map((_, i) => {
          const y = 20 + i * 16;
          const x1 = 30 + Math.sin(i * 0.8) * 18;
          const x2 = 30 - Math.sin(i * 0.8) * 18 + 36;
          return (
            <g key={i}>
              <circle cx={x1} cy={y} r="3" fill="#06b6d4" opacity="0.8"
                style={{ filter: "drop-shadow(0 0 3px #06b6d4)" }} />
              <circle cx={x2} cy={y} r="3" fill="#a855f7" opacity="0.8"
                style={{ filter: "drop-shadow(0 0 3px #a855f7)" }} />
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="#334155" strokeWidth="1" />
            </g>
          );
        })}
        {/* Scan beam */}
        <rect x="0" y={scanLine * 1.8} width="320" height="18"
          fill="url(#scanGrad)" />
        <line x1="0" y1={scanLine * 1.8 + 9} x2="320" y2={scanLine * 1.8 + 9}
          stroke="#a855f7" strokeWidth="0.8" opacity="0.7" />
        {/* Sequence chars */}
        {["A","T","G","C","G","A","T","C","G","A","A","T","G","C","T"].map((ch, i) => (
          <text key={i} x={90 + i * 14} y={90}
            fill={ch === "A" ? "#06b6d4" : ch === "T" ? "#ec4899" : ch === "G" ? "#10b981" : "#f59e0b"}
            fontSize="11" fontFamily="'Courier New', monospace" fontWeight="700"
            opacity={Math.random() > 0.3 ? 1 : 0.4}>
            {ch}
          </text>
        ))}
        {/* Classification results right */}
        {[
          { label: "Novel Species",    conf: "94.2%", c: "#f97316", y: 40 },
          { label: "Cnidaria fam.",    conf: "87.6%", c: "#a855f7", y: 70 },
          { label: "Abyssal Protist",  conf: "91.1%", c: "#06b6d4", y: 100 },
          { label: "Unknown Taxon",    conf: "78.9%", c: "#ef4444", y: 130 },
        ].map((r) => (
          <g key={r.label}>
            <rect x="210" y={r.y - 10} width="100" height="20" rx="4"
              fill="#0d1b2e" stroke={r.c} strokeWidth="0.8" opacity="0.9" />
            <text x="216" y={r.y + 3} fill={r.c} fontSize="7" fontWeight="700"
              fontFamily="system-ui">{r.label}</text>
            <text x="300" y={r.y + 3} fill="#94a3b8" fontSize="7"
              textAnchor="end" fontFamily="'Courier New', monospace">{r.conf}</text>
          </g>
        ))}
        {/* Arrow from DNA to results */}
        <motion.path d="M80,100 L200,100" fill="none" stroke="#a855f7"
          strokeWidth="1.5" markerEnd="url(#arr)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#a855f7" />
          </marker>
        </defs>
        <text x="160" y="95" textAnchor="middle" fill="#a855f7"
          fontSize="7" fontFamily="system-ui">CNN + HDBSCAN</text>
        {/* Footer */}
        <text x="160" y="188" textAnchor="middle" fill="#334155"
          fontSize="8" fontFamily="'Courier New', monospace">
          Deep-water eDNA · 6000m depth · Real-time classification
        </text>
      </svg>
    </div>
  );
};

// ── comparison table ──────────────────────────────────────────────────────────
const rows = [
  { label: "Deep-sea coverage",   old: "< 0.3%",       new: "Reference-free",   win: true },
  { label: "Novel taxa",         old: "Unassigned",    new: "Detected & flagged", win: true },
  { label: "Analysis time",      old: "6 months",      new: "Hours (GPU)",       win: true },
  { label: "Database dependency", old: "100% required", new: "0% required",      win: true },
  { label: "Scalability",        old: "Manual",        new: "Cloud auto-scale",  win: true },
  { label: "Feedback loop",      old: "None",          new: "Continuous retrain", win: true },
];

// ── section wrapper ───────────────────────────────────────────────────────────
const ActSection = ({ id, children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id} ref={ref}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={`mb-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const Tag = ({ label, color }) => (
  <span className={`text-xs font-bold border rounded-full px-3 py-1 ${color}`}>{label}</span>
);

// ══════════════════════════════════════════════════════════════════════════════
const ProblemStatement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white" style={{ background: "#030712" }}>

      {/* ── ACT 1 : THE HOOK ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* cinematic ocean bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 120% 80% at 50% 120%, #0c4a6e44 0%, transparent 70%)",
            }}
          />
          <motion.div className="absolute inset-0"
            animate={{ opacity: [0.03, 0.07, 0.03] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              backgroundImage: "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* floating particles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              style={{
                left: `${5 + i * 5.5}%`,
                top: `${20 + (i % 5) * 14}%`,
                opacity: 0.3,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-cyan-300 transition-colors mb-16 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </motion.button>

          {/* Tags */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex flex-wrap gap-2 mb-10">
            <Tag label="SIH25042" color="bg-orange-500/20 text-orange-300 border-orange-500/30" />
            <Tag label="Smart India Hackathon 2025" color="bg-cyan-500/15 text-cyan-300 border-cyan-500/25" />
            <Tag label="MoES · CMLRE" color="bg-blue-500/15 text-blue-300 border-blue-500/25" />
            <Tag label="Deep Ocean Mission" color="bg-purple-500/15 text-purple-300 border-purple-500/25" />
          </motion.div>

          {/* Dramatic headline */}
          <div className="mb-10">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-cyan-400 text-sm font-bold tracking-[0.25em] font-mono mb-4 uppercase">
              The Story Behind The Problem
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] mb-6">
              <span style={{
                background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>10,000 Turtle Eggs.</span>
              <br />
              <motion.span
                variants={fadeUp} initial="hidden" animate="visible" custom={3}
                style={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>Then — Silence.</motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="text-slate-400 text-lg sm:text-xl max-w-3xl leading-relaxed">
              Every year, the Maharashtra coastline was home to one of India's most significant
              Olive Ridley nesting grounds. Then one season, without warning — they were gone.
              Reappearing 1,400 km away on the Odisha coast.
            </motion.p>
          </div>

          {/* Turtle map + context */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <TurtleMap />
            <div className="space-y-5">
              <div className="border-l-2 border-cyan-500 pl-5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Scientists knew something had changed in the ocean — temperature, currents,
                  pollution levels, maybe all three. But the data they needed was{" "}
                  <span className="text-red-400 font-semibold">scattered across 12 different platforms</span>,
                  buried in <span className="text-orange-300 font-mono">.fac files</span> on CMLRE servers
                  nobody could easily access.
                </p>
              </div>
              <div className="border-l-2 border-orange-500 pl-5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  To study this shift, researchers needed climatic, pollution, and ocean data all in
                  one place — served together, correlated together.
                  <span className="text-cyan-300 font-semibold"> No such platform existed.</span>
                </p>
              </div>
              <div className="border-l-2 border-purple-500 pl-5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  And deeper down — literally — thousands of eDNA samples collected at{" "}
                  <span className="text-purple-300 font-bold">6,000 metres depth</span> during India's
                  Deep Ocean Mission voyages sat on hard drives.
                  <span className="text-red-400 font-semibold"> Unanalyzed. Unknown.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center mt-16 gap-2 text-slate-600">
            <span className="text-xs font-mono tracking-widest">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* ── ACT 2 : THE SCALE ───────────────────────────────────────────────── */}
      <ActSection id="scale">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.p variants={fadeIn} className="text-orange-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">
            Act 2 — The Scale
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl sm:text-4xl font-black text-white mb-3">
            This Isn't Just About Turtles.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-slate-400 text-base max-w-2xl mb-12">
            India's Deep Ocean Mission is collecting data at a scale nobody has the tools to process.
          </motion.p>

          {/* Odometer counters */}
          <motion.div variants={fadeUp} custom={3}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {[
              { prefix: "",  target: 6000,  suffix: "m",   label: "Deepest samples collected",      c: "text-cyan-300",    border: "border-cyan-500/30" },
              { prefix: "~", target: 70,    suffix: "%",   label: "Deep-sea species undiscovered",  c: "text-orange-300", border: "border-orange-500/30" },
              { prefix: "",  target: 274,   suffix: "",    label: "Teams attempted SIH25042",       c: "text-purple-300", border: "border-purple-500/30" },
              { prefix: "",  target: 0,     suffix: "",    label: "Existing tools for novel eDNA",  c: "text-red-400",    border: "border-red-500/30", suffix2: " tools" },
            ].map((s) => (
              <div key={s.label}
                className={`bg-slate-900 border ${s.border} rounded-2xl p-5 text-center`}>
                <p className={`text-3xl sm:text-4xl font-black ${s.c} mb-1`}>
                  <Counter target={s.target} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.blockquote variants={fadeUp} custom={4}
            className="relative border border-slate-700/50 rounded-2xl p-8 bg-slate-900/50">
            <div className="absolute top-6 left-6 text-6xl text-slate-700 font-serif leading-none">&ldquo;</div>
            <p className="relative text-slate-200 text-lg sm:text-xl font-medium leading-relaxed pl-8">
              Every year, India's Deep Ocean Mission collects thousands of eDNA samples from depths
              of 6,000 metres. Creatures nobody has ever seen. Sequences that have never been classified.
            </p>
            <p className="relative text-slate-400 text-lg sm:text-xl font-bold leading-relaxed pl-8 mt-4">
              They sit in hard drives.{" "}
              <span className="text-red-400">Unanalyzed. Unknown. Forgotten.</span>
            </p>
          </motion.blockquote>
        </div>
      </ActSection>

      {/* ── ACT 3 : THE VILLAIN (Data Chaos) ─────────────────────────────── */}
      <ActSection id="chaos">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.p variants={fadeIn} className="text-red-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">
            Act 3 — The Villain
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl sm:text-4xl font-black text-white mb-3">
            The Data Exists. It's Just Invisible.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-slate-400 text-base max-w-2xl mb-10">
            CMLRE, INCOIS, IORA, IMD, NOAA — each holds a piece of the puzzle.
            No single platform brings them together.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mb-10">
            <DataChaos />
          </motion.div>

          <motion.div variants={fadeUp} custom={4}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                icon: TrendingDown,
                title: "SILVA has < 0.3% deep-sea coverage",
                desc: "The world's most-used DNA reference database was built for shallow-water and terrestrial species. Deep-sea organisms are virtually invisible to it.",
                c: "text-red-400", border: "border-red-500/20 bg-red-500/5",
              },
              {
                icon: FileText,
                title: "6 months per voyage dataset",
                desc: "QIIME2 and DADA2 pipelines, running on standard compute, take months to process a single research voyage worth of eDNA sequences.",
                c: "text-orange-400", border: "border-orange-500/20 bg-orange-500/5",
              },
              {
                icon: AlertCircle,
                title: "\"Unassigned\" is the most common result",
                desc: "When reference databases don't recognize a sequence, they return \"unassigned.\" For deep-sea samples, this is often 60–80% of all reads.",
                c: "text-yellow-400", border: "border-yellow-500/20 bg-yellow-500/5",
              },
              {
                icon: Globe,
                title: ".fac files on locked CMLRE servers",
                desc: "Raw oceanographic data is stored in proprietary formats across disconnected servers. Accessing it requires manual coordination across government agencies.",
                c: "text-purple-400", border: "border-purple-500/20 bg-purple-500/5",
              },
            ].map((pt, i) => (
              <motion.div key={pt.title} variants={fadeUp} custom={i}
                className={`border rounded-2xl p-5 ${pt.border}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <pt.icon className={`w-5 h-5 ${pt.c}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm mb-1.5 ${pt.c}`}>{pt.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ActSection>

      {/* ── ACT 4 : THE SOLUTION ─────────────────────────────────────────── */}
      <ActSection id="solution">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.p variants={fadeIn} className="text-emerald-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">
            Act 4 — The Solution
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl sm:text-4xl font-black mb-3">
            <span style={{
              background: "linear-gradient(135deg, #06b6d4, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>MARCHIN Doesn't Look Up Answers.</span>
            <br />
            <span className="text-white">It Learns Them.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-slate-400 text-base max-w-2xl mb-12">
            One unified platform that collects all ocean data — and an AI that classifies
            deep-sea DNA without needing a reference database.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mb-12">
            <UnifiedHub />
          </motion.div>

          {/* Old vs New comparison */}
          <motion.div variants={fadeUp} custom={4} className="rounded-2xl overflow-hidden border border-slate-700/50">
            <div className="grid grid-cols-3 bg-slate-800/60 text-xs font-bold font-mono tracking-wider">
              <div className="py-3 px-4 text-slate-400">CAPABILITY</div>
              <div className="py-3 px-4 text-center text-red-400 border-x border-slate-700/50">QIIME2 / DADA2</div>
              <div className="py-3 px-4 text-center text-cyan-400">MARCHIN</div>
            </div>
            {rows.map((r, i) => (
              <div key={r.label}
                className={`grid grid-cols-3 text-xs border-t border-slate-800 ${i % 2 === 0 ? "bg-slate-900/30" : ""}`}>
                <div className="py-3 px-4 text-slate-300 font-medium">{r.label}</div>
                <div className="py-3 px-4 text-center text-red-400 border-x border-slate-800 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {r.old}
                </div>
                <div className="py-3 px-4 text-center text-emerald-400 flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" />
                  {r.new}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </ActSection>

      {/* ── ACT 5 : eDNA SCANNER ─────────────────────────────────────────── */}
      <ActSection id="edna-scanner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.p variants={fadeIn}
            className="text-purple-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">
            Act 5 — Flagship Feature
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl sm:text-4xl font-black text-white mb-3">
            The eDNA Deep-Water Scanner
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-slate-400 text-base max-w-2xl mb-10">
            Upload raw <span className="text-purple-300 font-mono">.fastq / .fasta</span> sequences
            collected from any depth. MARCHIN classifies, clusters, and flags novel taxa — in hours, not months.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mb-10">
            <EDNAScanner />
          </motion.div>

          <motion.div variants={fadeUp} custom={4}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Dna,
                title: "Reference-Free Classification",
                desc: "CNN reads k-mer patterns directly from raw sequences. No SILVA, no PR2 needed.",
                c: "from-purple-500 to-indigo-600",
              },
              {
                icon: Cpu,
                title: "GPU-Accelerated Pipeline",
                desc: "Millions of reads processed in parallel. What took 6 months now takes hours.",
                c: "from-cyan-500 to-blue-600",
              },
              {
                icon: Radio,
                title: "Real-Time Novelty Detection",
                desc: "HDBSCAN + Isolation Forest flag sequences that belong to potentially new species.",
                c: "from-pink-500 to-rose-600",
              },
              {
                icon: Shield,
                title: "Expert Validation Loop",
                desc: "Flagged taxa routed to scientists for validation. Confirmed species added to the model.",
                c: "from-amber-500 to-orange-600",
              },
              {
                icon: Globe,
                title: "OBIS / NCBI Integration",
                desc: "Validated species automatically submitted to global ocean biodiversity databases.",
                c: "from-emerald-500 to-teal-600",
              },
              {
                icon: FileText,
                title: "Gen-AI Biodiversity Reports",
                desc: "AI-generated plain-English summaries of each scan — ready for research papers.",
                c: "from-blue-500 to-indigo-600",
              },
            ].map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} custom={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/30 transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.c} flex items-center justify-center mb-3`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ActSection>

      {/* ── ACT 6 : THE PROOF ───────────────────────────────────────────── */}
      <ActSection id="proof">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.p variants={fadeIn}
            className="text-cyan-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">
            Act 6 — Why It Works
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl sm:text-4xl font-black text-white mb-10">
            The Feedback Loop That Makes MARCHIN Smarter Every Voyage.
          </motion.h2>

          <motion.div variants={fadeUp} custom={2}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              { no:"01", title:"CNN reads DNA like a fingerprint",       desc:"Convolutional layers detect biological motifs from raw k-mer encoded sequences — no alignment needed.",          c:"from-cyan-500 to-blue-600" },
              { no:"02", title:"HDBSCAN finds unknown families",          desc:"Unsupervised density-based clustering groups similar sequences and surfaces novel taxa nobody knew existed.",     c:"from-purple-500 to-indigo-600" },
              { no:"03", title:"Every validation makes it smarter",       desc:"Each species confirmed by scientists feeds back into training data — accuracy improves with every voyage.",       c:"from-emerald-500 to-teal-600" },
              { no:"04", title:"Cloud-native at any scale",               desc:"AWS S3 + Docker + GPU cluster handles petabytes of FASTQ files. Scales from one voyage to the entire mission.",   c:"from-amber-500 to-orange-600" },
              { no:"05", title:"One dashboard, all ocean data",           desc:"Climate, pollution, currents, eDNA — all unified for scientists and policy-makers in one interactive view.",      c:"from-pink-500 to-rose-600" },
              { no:"06", title:"SIH25042 — 274 teams, zero full solutions", desc:"We built what nobody else could: a reference-free, cloud-scale, continuously improving deep-sea eDNA platform.", c:"from-blue-500 to-indigo-600" },
            ].map((item, i) => (
              <motion.div key={item.no} variants={fadeUp} custom={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/20 transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.c} flex items-center justify-center text-sm font-extrabold text-white mb-3 flex-shrink-0`}>
                  {item.no}
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Org bar */}
          <motion.div variants={fadeUp} custom={3}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap gap-6 items-center mb-8">
            {[
              { icon: Building2, label:"Organization",  value:"Ministry of Earth Sciences (MoES)",               c:"from-cyan-500 to-blue-600" },
              { icon: FlaskConical, label:"Department", value:"Centre for Marine Living Resources & Ecology (CMLRE)", c:"from-blue-500 to-indigo-600" },
              { icon: Waves, label:"Theme",             value:"Deep Ocean Mission · Miscellaneous",               c:"from-purple-500 to-pink-600" },
            ].map((org) => (
              <div key={org.label} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${org.c} flex items-center justify-center flex-shrink-0`}>
                  <org.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{org.label}</p>
                  <p className="text-sm font-semibold text-white">{org.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dataset links */}
          <motion.div variants={fadeUp} custom={4}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { name:"NCBI BLAST Database",    url:"https://ftp.ncbi.nlm.nih.gov/blast/db/", c:"from-cyan-500 to-blue-600",    desc:"Primary reference nucleotide sequences" },
              { name:"SILVA rRNA Database",     url:"https://www.arb-silva.de/",              c:"from-blue-500 to-indigo-600",  desc:"Ribosomal RNA reference (limited deep-sea)" },
              { name:"PR2 Protist Database",    url:"https://pr2-database.org/",              c:"from-purple-500 to-pink-600",  desc:"Eukaryotic 18S rRNA marker sequences" },
              { name:"OBIS Ocean Biodiversity", url:"https://obis.org/",                      c:"from-emerald-500 to-teal-600", desc:"Target integration platform for results" },
            ].map((ref) => (
              <a key={ref.name} href={ref.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-cyan-500/30 transition-all group">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${ref.c} flex items-center justify-center flex-shrink-0`}>
                  <Database className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{ref.name}</p>
                  <p className="text-xs text-slate-500">{ref.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} custom={5}
            className="rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, #0c4a6e22, #1e1b4b22)", border:"1px solid #0ea5e930" }}>
            <p className="text-cyan-400 text-xs font-bold tracking-[0.25em] font-mono mb-3">READY TO SEE THE SOLUTION?</p>
            <h3 className="text-2xl font-black text-white mb-3">Explore MARCHIN in Full</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
              System architecture, team, modules, tech stack — everything that powers India's
              first reference-free deep-sea eDNA classification platform.
            </p>
            <button
              onClick={() => navigate("/project-report")}
              className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl text-white text-sm transition-all"
              style={{
                background: "linear-gradient(135deg, #0891b2, #1d4ed8)",
                boxShadow: "0 0 32px #06b6d430",
              }}
            >
              <Play className="w-4 h-4" />
              View Project Report →
            </button>
          </motion.div>
        </div>
      </ActSection>

    </div>
  );
};

export default ProblemStatement;
