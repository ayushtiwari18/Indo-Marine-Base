import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Waves, BookOpen, ExternalLink, Building2, FlaskConical,
  AlertCircle, CheckCircle, ArrowLeft, Database,
  Globe, FileText, Dna, TrendingDown, ChevronDown,
  Play, Radio, Cpu, Shield, ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

// ── Odometer counter ──────────────────────────────────────────────────────────
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

// ── PROPER India map — Maharashtra (west) → route around southern tip → Odisha (east) ─
//
// India outline traced from real geography on a 400×460 canvas:
//   Maharashtra coast ≈ (68, 200)  — west coast, ~18°N
//   Southern tip      ≈ (175, 420) — Kanyakumari
//   Odisha coast      ≈ (290, 160) — east coast, ~20°N
//
// The turtle migration route goes SOUTH along the west coast,
// rounds the tip, then NORTH along the east coast through open water —
// entirely in the sea, never crossing land.
const TurtleMap = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const ts = [600, 2000, 3800, 5600];
    const timers = ts.map((t, i) => setTimeout(() => setStep(i + 1), t));
    return () => timers.forEach(clearTimeout);
  }, []);

  // India landmass path — clockwise from NW corner
  // West coast runs roughly x=60–80, East coast x=270–310
  const indiaPath = `
    M 95,30
    L 170,28 L 195,40 L 210,55
    L 295,70 L 310,90 L 308,120
    L 300,150 L 295,160
    L 285,185 L 280,210
    L 290,240 L 285,270
    L 270,295 L 255,315
    L 240,340 L 220,365
    L 200,390 L 185,415
    L 175,430
    L 165,415 L 150,390
    L 130,360 L 110,335
    L 90,305 L 75,275
    L 65,245 L 60,215
    L 58,185 L 62,155
    L 65,130 L 68,105
    L 72,80 L 80,58
    Z
  `;

  // Migration route — entirely through sea (outside India landmass)
  // Start: Maharashtra coast = west coast at ~(58, 200)
  // Go south through Arabian Sea curving west of India's tip
  // Round southern tip at ~(155, 445)
  // Come north through Bay of Bengal to Odisha ~(295, 162)
  const migrationPath = `
    M 55,198
    C 45,240 40,290 50,340
    C 58,380 80,415 130,440
    C 155,450 175,448 200,438
    C 230,425 260,400 278,370
    C 295,340 300,290 300,250
    C 300,215 298,185 298,163
  `;

  // Maharashtra label position (west coast)
  const mhX = 30, mhY = 200;
  // Maharashtra dot (on west coastline)
  const mhDotX = 57, mhDotY = 198;
  // Odisha dot (on east coastline)
  const odDotX = 298, odDotY = 163;
  // Odisha label
  const odX = 308, odY = 158;

  return (
    <div className="relative w-full" style={{ maxWidth: 440, margin: "0 auto" }}>
      <svg viewBox="0 0 400 470" className="w-full"
        style={{ filter: "drop-shadow(0 0 24px #06b6d418)" }}>
        <defs>
          <radialGradient id="seaGrad" cx="50%" cy="70%" r="70%">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <radialGradient id="glowMH" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowOD" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <filter id="mapGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Full background = ocean */}
        <rect width="400" height="470" fill="url(#seaGrad)" rx="14" />

        {/* Ocean shimmer lines */}
        {[80, 150, 220, 300, 370].map((y) => (
          <motion.line key={y} x1="10" y1={y} x2="390" y2={y}
            stroke="#0ea5e9" strokeWidth="0.4" opacity="0.08"
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 4 + y / 100, repeat: Infinity, delay: y / 200 }}
          />
        ))}

        {/* ── India landmass ── */}
        <path d={indiaPath} fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2"
          opacity="0.92" />
        {/* Subtle terrain texture */}
        <path d={indiaPath} fill="none" stroke="#60a5fa" strokeWidth="0.4"
          opacity="0.15" />

        {/* Ocean labels */}
        <text x="22" y="260" fill="#1d4ed8" fontSize="8.5" fontFamily="system-ui"
          fontStyle="italic" opacity="0.7"
          transform="rotate(-75 22 260)">Arabian Sea</text>
        <text x="348" y="240" fill="#1d4ed8" fontSize="8.5" fontFamily="system-ui"
          fontStyle="italic" opacity="0.7"
          transform="rotate(75 348 240)">Bay of Bengal</text>
        <text x="200" y="462" fill="#1d4ed8" fontSize="8" fontFamily="system-ui"
          fontStyle="italic" opacity="0.6" textAnchor="middle">Indian Ocean</text>

        {/* State labels inside land */}
        <text x="130" y="120" fill="#93c5fd" fontSize="8" fontFamily="system-ui"
          opacity="0.5" textAnchor="middle">India</text>

        {/* ── STEP 1: Maharashtra dot ── */}
        {step >= 1 && (
          <>
            <motion.circle cx={mhDotX} cy={mhDotY} r="16" fill="url(#glowMH)"
              animate={{ r: [12, 20, 12] }} transition={{ duration: 2, repeat: Infinity }} />
            <circle cx={mhDotX} cy={mhDotY} r="5.5" fill="#06b6d4"
              style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }} />
            {/* Label box */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <rect x="2" y={mhY - 22} width="88" height="32" rx="5"
                fill="#0c1a2e" stroke="#06b6d4" strokeWidth="0.8" opacity="0.95" />
              <text x="8" y={mhY - 9} fill="#06b6d4" fontSize="8" fontWeight="700"
                fontFamily="system-ui">Maharashtra</text>
              <text x="8" y={mhY + 3} fill="#94a3b8" fontSize="7"
                fontFamily="system-ui">10,000 eggs / yr 🐢</text>
            </motion.g>
          </>
        )}

        {/* ── STEP 2: Migration route draws (through sea only) ── */}
        {step >= 2 && (
          <>
            <motion.path d={migrationPath}
              fill="none" stroke="#f97316" strokeWidth="2.2" strokeDasharray="7 4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Animated turtle dot moving along path */}
            <motion.circle r="5" fill="#f97316"
              style={{ filter: "drop-shadow(0 0 6px #f97316)" }}
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              style={{ offsetPath: `path('${migrationPath.replace(/\n\s+/g, " ").trim()}')` }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Question mark near southern tip */}
            <motion.text x="145" y="455" fill="#f59e0b" fontSize="18" fontWeight="900"
              textAnchor="middle"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, type: "spring" }}>?</motion.text>
          </>
        )}

        {/* ── STEP 3: Odisha dot ── */}
        {step >= 3 && (
          <>
            <motion.circle cx={odDotX} cy={odDotY} r="16" fill="url(#glowOD)"
              animate={{ r: [12, 20, 12] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            <motion.circle cx={odDotX} cy={odDotY} r="5.5" fill="#f97316"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 280 }}
              style={{ filter: "drop-shadow(0 0 8px #f97316)" }} />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <rect x="308" y={odY - 14} width="82" height="30" rx="5"
                fill="#0c1a2e" stroke="#f97316" strokeWidth="0.8" opacity="0.95" />
              <text x="314" y={odY - 2} fill="#f97316" fontSize="8" fontWeight="700"
                fontFamily="system-ui">Odisha Coast</text>
              <text x="314" y={odY + 10} fill="#94a3b8" fontSize="7"
                fontFamily="system-ui">Sudden shift! ⚠️</text>
            </motion.g>
          </>
        )}

        {/* ── STEP 4: Bottom caption ── */}
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <rect x="20" y="332" width="360" height="38" rx="8"
              fill="#0a1628" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="200" y="347" textAnchor="middle" fill="#f59e0b"
              fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace">
              WHY DID THEY MIGRATE? SCIENTISTS HAD NO DATA.
            </text>
            <text x="200" y="362" textAnchor="middle" fill="#94a3b8"
              fontSize="7" fontFamily="system-ui">
              Climate + pollution + ocean data scattered across 12 platforms
            </text>
          </motion.g>
        )}

        {/* Route direction arrow near midpoint */}
        {step >= 2 && (
          <motion.text x="28" y="355" fill="#f97316" fontSize="9"
            fontFamily="system-ui" opacity="0.6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
            transition={{ delay: 1.8 }}>↓ sea route</motion.text>
        )}
      </svg>
    </div>
  );
};

// ── Data Chaos visual ─────────────────────────────────────────────────────────
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
          <p className="text-slate-600 text-xs mt-1">12 platforms · no unified access</p>
        </motion.div>
      </div>
      {sources.map((s, i) => (
        <motion.div key={s.label}
          className="absolute rounded-lg px-2.5 py-1 text-xs font-bold font-mono border"
          style={{ left: s.x, top: s.y, color: s.c, borderColor: `${s.c}55`, background: `${s.c}12` }}
          animate={{ x: [0, i%2===0?7:-7, 0], y: [0, i%3===0?5:-5, 0], opacity: [0.7,1,0.7] }}
          transition={{ duration: 2.4+i*0.3, repeat: Infinity, ease: "easeInOut" }}>
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
  const R = 80, cx = 200, cy = 110;
  return (
    <div className="w-full rounded-2xl border border-cyan-500/20 overflow-hidden"
      style={{ background: "#060d1a", height: 240 }}>
      <svg viewBox="0 0 400 230" className="w-full h-full">
        {spokes.map((s, i) => {
          const rad = (s.angle - 90) * Math.PI / 180;
          const x2 = cx + R * Math.cos(rad);
          const y2 = cy + R * Math.sin(rad);
          const lx = cx + (R + 34) * Math.cos(rad);
          const ly = cy + (R + 34) * Math.sin(rad);
          return (
            <g key={s.label}>
              <motion.line x1={cx} y1={cy} x2={x2} y2={y2}
                stroke={s.c} strokeWidth="1.5" strokeDasharray="3 2"
                initial={{ pathLength:0, opacity:0 }}
                animate={{ pathLength:1, opacity:0.7 }}
                transition={{ duration:0.7, delay:i*0.15 }} />
              <motion.circle cx={x2} cy={y2} r="5" fill={s.c}
                initial={{ scale:0 }} animate={{ scale:1 }}
                transition={{ delay:i*0.15+0.5, type:"spring" }}
                style={{ filter:`drop-shadow(0 0 5px ${s.c})` }} />
              <motion.text x={lx} y={ly+3} textAnchor="middle"
                fill={s.c} fontSize="8" fontWeight="700" fontFamily="system-ui"
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:i*0.15+0.7 }}>{s.label}</motion.text>
            </g>
          );
        })}
        <motion.circle cx={cx} cy={cy} r="26" fill="#0d1b2e"
          stroke="#06b6d4" strokeWidth="1.8"
          animate={{ r:[24,27,24] }} transition={{ duration:2.5, repeat:Infinity }}
          style={{ filter:"drop-shadow(0 0 14px #06b6d4)" }} />
        <text x={cx} y={cy-4} textAnchor="middle" fill="#06b6d4"
          fontSize="8.5" fontWeight="900" fontFamily="'Courier New', monospace">MARCHIN</text>
        <text x={cx} y={cy+8} textAnchor="middle" fill="#94a3b8"
          fontSize="7" fontFamily="system-ui">Unified Hub</text>
        <motion.circle cx={cx} cy={cy} r="26" fill="none" stroke="#06b6d4"
          strokeWidth="1" opacity="0.3"
          animate={{ r:[26,46,26], opacity:[0.3,0,0.3] }}
          transition={{ duration:2.5, repeat:Infinity }} />
        <text x={cx} y="222" textAnchor="middle" fill="#334155"
          fontSize="8" fontFamily="'Courier New', monospace">
          All data sources · unified · real-time
        </text>
      </svg>
    </div>
  );
};

// ── eDNA Scanner — FIXED: 3-column layout, no overlap ─────────────────────────
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
  const seqColor = {A:"#06b6d4",T:"#ec4899",G:"#10b981",C:"#f59e0b"};

  return (
    <div className="w-full rounded-2xl border border-purple-500/30 overflow-hidden"
      style={{ background: "#060a12" }}>
      <svg viewBox="0 0 560 200" className="w-full" style={{ display:"block" }}>
        <defs>
          <linearGradient id="scanGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── COL 1: DNA Helix (x: 10–130) ── */}
        <text x="70" y="16" textAnchor="middle" fill="#a855f7"
          fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace"
          letterSpacing="1">eDNA INPUT</text>
        {Array.from({ length: 11 }).map((_, i) => {
          const y = 24 + i * 15;
          const phase = i * 0.7;
          const x1 = 38 + Math.sin(phase) * 22;
          const x2 = 102 - Math.sin(phase) * 22;
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="#1e3a5f" strokeWidth="1" />
              <circle cx={x1} cy={y} r="3.5" fill="#06b6d4" opacity="0.85"
                style={{ filter:"drop-shadow(0 0 3px #06b6d4)" }} />
              <circle cx={x2} cy={y} r="3.5" fill="#a855f7" opacity="0.85"
                style={{ filter:"drop-shadow(0 0 3px #a855f7)" }} />
            </g>
          );
        })}
        {/* Scan beam over helix */}
        <rect x="10" y={scanY + 20} width="120" height="20" fill="url(#scanGrad2)" />
        <line x1="10" y1={scanY + 30} x2="130" y2={scanY + 30}
          stroke="#a855f7" strokeWidth="0.8" opacity="0.6" />

        {/* ── COL 2: Sequence + label (x: 145–395) ── */}
        <text x="270" y="16" textAnchor="middle" fill="#94a3b8"
          fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace"
          letterSpacing="1">SEQUENCE ANALYSIS</text>
        {/* sequence row */}
        {seq.map((ch, i) => (
          <text key={i} x={152 + i * 20} y="50"
            fill={seqColor[ch]} fontSize="13" fontWeight="800"
            fontFamily="'Courier New', monospace">
            {ch}
          </text>
        ))}
        {/* CNN label */}
        <rect x="165" y="60" width="200" height="22" rx="6"
          fill="#1e1040" stroke="#a855f7" strokeWidth="0.8" />
        <text x="265" y="75" textAnchor="middle" fill="#a855f7"
          fontSize="8" fontWeight="700" fontFamily="system-ui"
          letterSpacing="0.5">CNN + HDBSCAN Classifier</text>
        {/* k-mer bars */}
        {[0.85,0.60,0.92,0.45,0.78].map((v,i) => (
          <g key={i}>
            <rect x={155 + i*45} y={92} width="36" height={v * 55 + 0}
              rx="3" fill="#a855f7" opacity={0.15 + v * 0.25} />
            <rect x={155 + i*45} y={92 + (1-v)*55} width="36" height={v*55}
              rx="3" fill="#a855f7" opacity={0.6}
              style={{ filter:"drop-shadow(0 0 4px #a855f777)" }} />
            <text x={173 + i*45} y={90} textAnchor="middle"
              fill="#94a3b8" fontSize="6" fontFamily="system-ui">
              k{i+1}
            </text>
          </g>
        ))}
        <text x="270" y="165" textAnchor="middle" fill="#64748b"
          fontSize="7" fontFamily="system-ui">k-mer frequency features</text>

        {/* Arrow */}
        <motion.line x1="400" y1="100" x2="428" y2="100"
          stroke="#a855f7" strokeWidth="1.5"
          animate={{ opacity:[0.4,1,0.4] }}
          transition={{ duration:1.2, repeat:Infinity }} />
        <polygon points="428,96 436,100 428,104" fill="#a855f7" />

        {/* ── COL 3: Results (x: 440–550) ── */}
        <text x="495" y="16" textAnchor="middle" fill="#10b981"
          fontSize="8" fontWeight="700" fontFamily="'Courier New', monospace"
          letterSpacing="1">RESULTS</text>
        {results.map((r, i) => (
          <g key={r.label}>
            <rect x="438" y={24 + i * 42} width="112" height="34" rx="6"
              fill="#0d1b2e" stroke={r.c} strokeWidth="1" />
            <circle cx="450" cy={24 + i * 42 + 17} r="4" fill={r.c}
              style={{ filter:`drop-shadow(0 0 4px ${r.c})` }} />
            <text x="458" y={24 + i * 42 + 13} fill={r.c}
              fontSize="7.5" fontWeight="700" fontFamily="system-ui">{r.label}</text>
            <text x="458" y={24 + i * 42 + 25} fill="#94a3b8"
              fontSize="7" fontFamily="'Courier New', monospace">conf: {r.conf}</text>
          </g>
        ))}

        {/* Bottom caption */}
        <text x="280" y="194" textAnchor="middle" fill="#334155"
          fontSize="7.5" fontFamily="'Courier New', monospace">
          Deep-water eDNA · 6000 m depth · Real-time classification
        </text>
      </svg>
    </div>
  );
};

// ── GIF / Demo section ────────────────────────────────────────────────────────
const GifSection = ({ gifSrc }) => (
  <div className="w-full rounded-2xl overflow-hidden border border-cyan-500/20"
    style={{ background: "#060d1a" }}>
    {gifSrc ? (
      <img src={gifSrc} alt="MARCHIN demo" className="w-full h-auto" />
    ) : (
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
          <ImageIcon className="w-7 h-7 text-slate-500" />
        </div>
        <div className="text-center">
          <p className="text-slate-300 font-bold text-sm mb-1">Demo GIF</p>
          <p className="text-slate-500 text-xs max-w-xs">
            Drop your GIF path into <code className="text-cyan-400 bg-slate-800 px-1 rounded">gifSrc</code> prop
            in <code className="text-cyan-400 bg-slate-800 px-1 rounded">GifSection</code> to display here.
          </p>
          <p className="text-slate-600 text-xs mt-3 font-mono">
            e.g. gifSrc="/assets/marchin-demo.gif"
          </p>
        </div>
        <div className="flex gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{animationDelay:"0s"}} />
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{animationDelay:"0.15s"}} />
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{animationDelay:"0.3s"}} />
        </div>
      </div>
    )}
  </div>
);

// ── Comparison rows ───────────────────────────────────────────────────────────
const rows = [
  { label: "Deep-sea coverage",    old: "< 0.3%",       new_: "Reference-free" },
  { label: "Novel taxa",          old: "Unassigned",    new_: "Detected & flagged" },
  { label: "Analysis time",       old: "6 months",      new_: "Hours (GPU)" },
  { label: "Database dependency", old: "100% required", new_: "0% required" },
  { label: "Scalability",         old: "Manual",        new_: "Cloud auto-scale" },
  { label: "Feedback loop",       old: "None",          new_: "Continuous retrain" },
];

// ── Act section wrapper ───────────────────────────────────────────────────────
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
  <span className={`text-xs font-bold border rounded-full px-3 py-1 ${color}`}>{label}</span>
);

// ══════════════════════════════════════════════════════════════════════════════
const ProblemStatement = () => {
  const navigate = useNavigate();
  // ⬇ Set your GIF path here once you have the file in /public/assets/
  const DEMO_GIF = null; // e.g. "/assets/marchin-demo.gif"

  return (
    <div className="min-h-screen text-white" style={{ background: "#030712" }}>

      {/* ══ ACT 1 : THE HOOK ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 120% 80% at 50% 120%, #0c4a6e44 0%, transparent 70%)" }} />
          <motion.div className="absolute inset-0"
            animate={{ opacity: [0.025, 0.06, 0.025] }} transition={{ duration: 8, repeat: Infinity }}
            style={{
              backgroundImage: "linear-gradient(rgba(6,182,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,1) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-cyan-400"
              style={{ left:`${5+i*6}%`, top:`${18+(i%5)*15}%`, opacity:0.25 }}
              animate={{ y:[-8,8,-8], opacity:[0.12,0.45,0.12] }}
              transition={{ duration:3+i*0.4, repeat:Infinity, delay:i*0.2 }} />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <motion.button initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.5 }} onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-cyan-300 transition-colors mb-14 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </motion.button>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex flex-wrap gap-2 mb-8">
            <Tag label="SIH25042"                 color="bg-orange-500/20 text-orange-300 border-orange-500/30" />
            <Tag label="Smart India Hackathon 2025" color="bg-cyan-500/15 text-cyan-300 border-cyan-500/25" />
            <Tag label="MoES · CMLRE"              color="bg-blue-500/15 text-blue-300 border-blue-500/25" />
            <Tag label="Deep Ocean Mission"        color="bg-purple-500/15 text-purple-300 border-purple-500/25" />
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-cyan-400 text-sm font-bold tracking-[0.25em] font-mono mb-4 uppercase">
            The Story Behind The Problem
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] mb-6">
            <span style={{ background:"linear-gradient(135deg,#e2e8f0,#94a3b8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              10,000 Turtle Eggs.
            </span>
            <br />
            <span style={{ background:"linear-gradient(135deg,#06b6d4,#3b82f6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Then — Silence.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="text-slate-400 text-lg max-w-3xl leading-relaxed mb-12">
            Every year, the Maharashtra coastline was home to one of India's most significant
            Olive Ridley nesting grounds. Then one season — they were gone.
            Reappearing 1,400 km away on the Odisha coast.
          </motion.p>

          {/* Map + story side by side */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <TurtleMap />
              <p className="text-center text-slate-600 text-xs font-mono mt-2">
                Route: Arabian Sea → tip of India → Bay of Bengal
              </p>
            </div>
            <div className="space-y-5 pt-4">
              {[
                { border:"border-cyan-500",   text: <>Scientists knew something had changed — temperature, currents, pollution. But the data was <span className="text-red-400 font-semibold">scattered across 12 platforms</span>, buried in <span className="text-orange-300 font-mono">.fac files</span> nobody could access.</> },
                { border:"border-orange-500", text: <>To study this shift, researchers needed climatic, pollution, and ocean data together. <span className="text-cyan-300 font-semibold">No such platform existed.</span></> },
                { border:"border-purple-500", text: <>And deeper — literally — thousands of eDNA samples at <span className="text-purple-300 font-bold">6,000 metres depth</span> sat on hard drives. <span className="text-red-400 font-semibold">Unanalyzed. Unknown.</span></> },
              ].map((item, i) => (
                <div key={i} className={`border-l-2 ${item.border} pl-5`}>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
            className="flex flex-col items-center mt-16 gap-2 text-slate-600">
            <span className="text-xs font-mono tracking-widest">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* ══ ACT 2 : THE SCALE ═══════════════════════════════════════════════ */}
      <ActSection id="scale">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-orange-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">Act 2 — The Scale</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">This Isn't Just About Turtles.</h2>
          <p className="text-slate-400 text-base max-w-2xl mb-12">India's Deep Ocean Mission is collecting data at a scale nobody has the tools to process.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {[
              { target:6000, suffix:"m",  label:"Deepest samples collected",     c:"text-cyan-300",    border:"border-cyan-500/30" },
              { prefix:"~", target:70, suffix:"%", label:"Deep-sea species undiscovered",c:"text-orange-300",border:"border-orange-500/30" },
              { target:274, suffix:"",   label:"Teams attempted SIH25042",       c:"text-purple-300", border:"border-purple-500/30" },
              { target:0,   suffix:" tools", label:"Existing tools for novel eDNA",c:"text-red-400",   border:"border-red-500/30" },
            ].map((s,i) => (
              <div key={i} className={`bg-slate-900 border ${s.border} rounded-2xl p-5 text-center`}>
                <p className={`text-3xl sm:text-4xl font-black ${s.c} mb-1`}>
                  <Counter target={s.target} prefix={s.prefix||""} suffix={s.suffix} />
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

      {/* ══ ACT 3 : DATA CHAOS ══════════════════════════════════════════════ */}
      <ActSection id="chaos">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-red-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">Act 3 — The Villain</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">The Data Exists. It's Just Invisible.</h2>
          <p className="text-slate-400 text-base max-w-2xl mb-10">CMLRE, INCOIS, IORA, IMD, NOAA — each holds a piece. No platform unifies them.</p>
          <div className="mb-10"><DataChaos /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon:TrendingDown, title:"SILVA < 0.3% deep-sea coverage",         desc:"Built for shallow/terrestrial species — deep-sea taxa invisible.",                              c:"text-red-400",    border:"border-red-500/20 bg-red-500/5" },
              { icon:FileText,     title:"6 months per voyage dataset",            desc:"QIIME2 / DADA2 take months on standard compute for a single voyage.",                          c:"text-orange-400", border:"border-orange-500/20 bg-orange-500/5" },
              { icon:AlertCircle,  title:'"Unassigned" most common result',       desc:"60–80% of deep-sea reads return unassigned — biodiversity completely missed.",                   c:"text-yellow-400", border:"border-yellow-500/20 bg-yellow-500/5" },
              { icon:Globe,        title:".fac files on locked CMLRE servers",    desc:"Proprietary formats, disconnected servers — accessing data requires inter-agency coordination.", c:"text-purple-400", border:"border-purple-500/20 bg-purple-500/5" },
            ].map((pt,i) => (
              <div key={i} className={`border rounded-2xl p-5 ${pt.border}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <pt.icon className={`w-5 h-5 ${pt.c}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm mb-1.5 ${pt.c}`}>{pt.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ActSection>

      {/* ══ ACT 4 : THE SOLUTION ════════════════════════════════════════════ */}
      <ActSection id="solution">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">Act 4 — The Solution</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            <span style={{ background:"linear-gradient(135deg,#06b6d4,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>MARCHIN Doesn't Look Up Answers.</span>
            <br /><span className="text-white">It Learns Them.</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mb-12">One unified platform — all ocean data, plus AI that classifies deep-sea DNA without a reference database.</p>
          <div className="mb-12"><UnifiedHub /></div>
          <div className="rounded-2xl overflow-hidden border border-slate-700/50">
            <div className="grid grid-cols-3 bg-slate-800/60 text-xs font-bold font-mono tracking-wider">
              <div className="py-3 px-4 text-slate-400">CAPABILITY</div>
              <div className="py-3 px-4 text-center text-red-400 border-x border-slate-700/50">QIIME2 / DADA2</div>
              <div className="py-3 px-4 text-center text-cyan-400">MARCHIN</div>
            </div>
            {rows.map((r,i) => (
              <div key={r.label} className={`grid grid-cols-3 text-xs border-t border-slate-800 ${i%2===0?"bg-slate-900/30":""`}>
                <div className="py-3 px-4 text-slate-300 font-medium">{r.label}</div>
                <div className="py-3 px-4 text-center text-red-400 border-x border-slate-800 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />{r.old}
                </div>
                <div className="py-3 px-4 text-center text-emerald-400 flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" />{r.new_}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ActSection>

      {/* ══ ACT 5 : eDNA SCANNER ════════════════════════════════════════════ */}
      <ActSection id="edna-scanner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-purple-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">Act 5 — Flagship Feature</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">The eDNA Deep-Water Scanner</h2>
          <p className="text-slate-400 text-base max-w-2xl mb-10">
            Upload raw <span className="text-purple-300 font-mono">.fastq / .fasta</span> sequences from any depth.
            MARCHIN classifies, clusters, and flags novel taxa — in hours, not months.
          </p>
          <div className="mb-10"><EDNAScanner /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon:Dna,      title:"Reference-Free CNN",        desc:"K-mer patterns from raw sequences. No SILVA, no PR2.",                   c:"from-purple-500 to-indigo-600" },
              { icon:Cpu,      title:"GPU-Accelerated Pipeline",   desc:"Millions of reads in parallel. 6 months → hours.",                       c:"from-cyan-500 to-blue-600" },
              { icon:Radio,    title:"Real-Time Novelty Detection",desc:"HDBSCAN + Isolation Forest — new species flagged instantly.",             c:"from-pink-500 to-rose-600" },
              { icon:Shield,   title:"Expert Validation Loop",     desc:"Flagged taxa routed to scientists. Confirmed species retrain the model.",  c:"from-amber-500 to-orange-600" },
              { icon:Globe,    title:"OBIS / NCBI Integration",    desc:"Validated species auto-submitted to global ocean biodiversity databases.", c:"from-emerald-500 to-teal-600" },
              { icon:FileText, title:"Gen-AI Biodiversity Reports",desc:"Plain-English summaries of every scan — ready for research papers.",      c:"from-blue-500 to-indigo-600" },
            ].map((card,i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/30 transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.c} flex items-center justify-center mb-3`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ActSection>

      {/* ══ DEMO GIF SECTION ════════════════════════════════════════════════ */}
      <ActSection id="demo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-pink-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">Live Demo</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">See MARCHIN in Action</h2>
          <p className="text-slate-400 text-base max-w-2xl mb-8">
            Watch the pipeline classify deep-sea eDNA sequences in real time —
            from raw .fastq upload to biodiversity report.
          </p>
          <GifSection gifSrc={DEMO_GIF} />
        </div>
      </ActSection>

      {/* ══ ACT 6 : THE PROOF ═══════════════════════════════════════════════ */}
      <ActSection id="proof">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] font-mono mb-3 uppercase">Act 6 — Why It Works</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-10">The Feedback Loop That Makes MARCHIN Smarter Every Voyage.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              { no:"01", title:"CNN reads DNA like a fingerprint",         desc:"Convolutional layers detect motifs from k-mer encoded sequences — no alignment needed.",    c:"from-cyan-500 to-blue-600" },
              { no:"02", title:"HDBSCAN finds unknown families",            desc:"Density-based clustering groups similar sequences and surfaces novel taxa.",               c:"from-purple-500 to-indigo-600" },
              { no:"03", title:"Every validation makes it smarter",         desc:"Confirmed species feed back into training data — accuracy grows with every voyage.",       c:"from-emerald-500 to-teal-600" },
              { no:"04", title:"Cloud-native at any scale",                 desc:"AWS S3 + Docker + GPU handles petabytes. Scales from one voyage to the entire mission.",    c:"from-amber-500 to-orange-600" },
              { no:"05", title:"One dashboard, all ocean data",             desc:"Climate, pollution, currents, eDNA — unified for scientists and policy-makers.",           c:"from-pink-500 to-rose-600" },
              { no:"06", title:"274 teams. Zero full solutions before us.", desc:"We built what nobody else could: reference-free, cloud-scale, continuously improving.",    c:"from-blue-500 to-indigo-600" },
            ].map((item,i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/20 transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.c} flex items-center justify-center text-sm font-extrabold text-white mb-3`}>
                  {item.no}
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Org bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap gap-6 items-center mb-8">
            {[
              { icon:Building2,   label:"Organization", value:"Ministry of Earth Sciences (MoES)",                c:"from-cyan-500 to-blue-600" },
              { icon:FlaskConical,label:"Department",   value:"Centre for Marine Living Resources & Ecology (CMLRE)",c:"from-blue-500 to-indigo-600" },
              { icon:Waves,       label:"Theme",        value:"Deep Ocean Mission · Miscellaneous",                c:"from-purple-500 to-pink-600" },
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
          </div>

          {/* Dataset links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { name:"NCBI BLAST Database",    url:"https://ftp.ncbi.nlm.nih.gov/blast/db/",c:"from-cyan-500 to-blue-600",    desc:"Primary reference nucleotide sequences" },
              { name:"SILVA rRNA Database",     url:"https://www.arb-silva.de/",             c:"from-blue-500 to-indigo-600",  desc:"Ribosomal RNA reference (limited deep-sea)" },
              { name:"PR2 Protist Database",    url:"https://pr2-database.org/",             c:"from-purple-500 to-pink-600",  desc:"Eukaryotic 18S rRNA sequences" },
              { name:"OBIS Ocean Biodiversity", url:"https://obis.org/",                     c:"from-emerald-500 to-teal-600", desc:"Target integration for validated results" },
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
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center"
            style={{ background:"linear-gradient(135deg,#0c4a6e22,#1e1b4b22)", border:"1px solid #0ea5e930" }}>
            <p className="text-cyan-400 text-xs font-bold tracking-[0.25em] font-mono mb-3">READY TO SEE THE SOLUTION?</p>
            <h3 className="text-2xl font-black text-white mb-3">Explore MARCHIN in Full</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
              System architecture, team, modules, tech stack — everything powering India's first
              reference-free deep-sea eDNA classification platform.
            </p>
            <button onClick={() => navigate("/project-report")}
              className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl text-white text-sm transition-all"
              style={{ background:"linear-gradient(135deg,#0891b2,#1d4ed8)", boxShadow:"0 0 32px #06b6d430" }}>
              <Play className="w-4 h-4" /> View Project Report →
            </button>
          </div>
        </div>
      </ActSection>

    </div>
  );
};

export default ProblemStatement;
