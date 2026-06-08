import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  cyan:   "#06b6d4",
  blue:   "#3b82f6",
  purple: "#a855f7",
  pink:   "#ec4899",
  amber:  "#f59e0b",
  emerald:"#10b981",
  orange: "#f97316",
  slate:  "#94a3b8",
  bg:     "#0f172a",
  card:   "#1e293b",
  border: "#334155",
};

// ─── Animated moving dot along an SVG path ────────────────────────────────────
const MovingDot = ({ pathId, color, duration, delay, size = 6 }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const pathEl = document.getElementById(pathId);
    if (!pathEl) return;
    const totalLen = pathEl.getTotalLength();
    let cancelled = false;

    const delayTimer = setTimeout(() => {
      if (cancelled) return;
      setVisible(true);
      const animate = (ts) => {
        if (cancelled) return;
        if (!startRef.current) startRef.current = ts;
        const elapsed = (ts - startRef.current) % (duration * 1000);
        const t = elapsed / (duration * 1000);
        const pt = pathEl.getPointAtLength(t * totalLen);
        setPos({ x: pt.x, y: pt.y });
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      cancelled = true;
      clearTimeout(delayTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathId, duration, delay]);

  if (!visible) return null;
  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={size / 2}
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    />
  );
};

// ─── Animated SVG path (draw-on effect) ───────────────────────────────────────
const AnimatedPath = ({ d, color, strokeWidth = 1.5, delay = 0, id }) => (
  <motion.path
    id={id}
    d={d}
    stroke={color}
    strokeWidth={strokeWidth}
    fill="none"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1.2, delay, ease: "easeInOut" }}
  />
);

// ─── Node Block ───────────────────────────────────────────────────────────────
const Node = ({ x, y, w, h, color, title, items, icon, delay = 0, accent }) => (
  <motion.g
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {/* glow */}
    <rect x={x - 2} y={y - 2} width={w + 4} height={h + 4} rx={10}
      fill="none" stroke={color} strokeWidth={0.5} opacity={0.3} />
    {/* card */}
    <rect x={x} y={y} width={w} height={h} rx={8}
      fill={C.card} stroke={color} strokeWidth={1.5} />
    {/* accent top bar */}
    <rect x={x} y={y} width={w} height={4} rx={4}
      fill={accent || color} opacity={0.8} />
    {/* title */}
    <text x={x + w / 2} y={y + 18} textAnchor="middle"
      fill={color} fontSize={9} fontWeight="700" fontFamily="monospace">
      {title}
    </text>
    {/* items */}
    {items.map((item, i) => (
      <g key={i}>
        <circle cx={x + 10} cy={y + 30 + i * 14} r={2.5} fill={color} opacity={0.7} />
        <text x={x + 16} y={y + 34 + i * 14} fill="#cbd5e1" fontSize={7.5} fontFamily="sans-serif">
          {item}
        </text>
      </g>
    ))}
  </motion.g>
);

// ─── Label badge ──────────────────────────────────────────────────────────────
const Label = ({ x, y, text, color, delay = 0 }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
    <rect x={x} y={y} width={text.length * 5.8 + 10} height={14} rx={7}
      fill={color} opacity={0.15} stroke={color} strokeWidth={0.8} />
    <text x={x + 5} y={y + 10} fill={color} fontSize={7} fontWeight="700" fontFamily="monospace">
      {text}
    </text>
  </motion.g>
);

// ─── Pulsing node circle ───────────────────────────────────────────────────────
const PulseNode = ({ cx, cy, color, delay = 0 }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
    <motion.circle cx={cx} cy={cy} r={8} fill={color} opacity={0.15}
      animate={{ r: [8, 14, 8], opacity: [0.15, 0.05, 0.15] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }} />
    <circle cx={cx} cy={cy} r={5} fill={color}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
  </motion.g>
);

// ─── Arrow head marker ────────────────────────────────────────────────────────
const Defs = () => (
  <defs>
    {[
      ["arr-cyan",   C.cyan],
      ["arr-purple", C.purple],
      ["arr-amber",  C.amber],
      ["arr-emerald",C.emerald],
      ["arr-orange", C.orange],
      ["arr-pink",   C.pink],
      ["arr-blue",   C.blue],
      ["arr-slate",  C.slate],
    ].map(([id, color]) => (
      <marker key={id} id={id} markerWidth="6" markerHeight="6"
        refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={color} />
      </marker>
    ))}
  </defs>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const SystemArchitectureDiagram = () => {
  const [phase, setPhase] = useState(0);

  // step through phases for sequential reveal
  useEffect(() => {
    const timers = [0.8, 1.8, 2.6, 3.4, 4.2, 5.0].map((t, i) =>
      setTimeout(() => setPhase(i + 1), t * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // SVG viewport: 780 × 520
  const W = 780, H = 520;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-700/60"
      style={{ background: "#080f1e" }}>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 px-5 pt-4 pb-2">
        {[
          { color: C.cyan,    label: "Preprocessing" },
          { color: C.blue,    label: "Feature Extraction" },
          { color: C.purple,  label: "Model Training" },
          { color: C.pink,    label: "Clustering" },
          { color: C.amber,   label: "Validation Loop" },
          { color: C.emerald, label: "Reporting" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: color,
              boxShadow: `0 0 6px ${color}` }} />
            <span className="text-xs text-slate-400">{label}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
          style={{ display: "block", minWidth: W }}>
          <Defs />

          {/* ── BACKGROUND GRID ── */}
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0 L0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <rect width={W} height={H} fill="url(#grid)" />

          {/* ══════════════════════════════════════════════════
              BLOCK 1 — DATA PREPROCESSING  (left column)
          ══════════════════════════════════════════════════ */}
          {phase >= 1 && (
            <>
              {/* DNA helix icon placeholder */}
              <motion.text x={28} y={52} fontSize={22} initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 52 }} transition={{ duration: 0.6 }}>🧬</motion.text>
              <motion.text x={14} y={68} fontSize={7} fill={C.slate} fontFamily="sans-serif"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                eDNA Sediment
              </motion.text>
              <motion.text x={18} y={77} fontSize={7} fill={C.slate} fontFamily="sans-serif"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                Samples
              </motion.text>

              {/* arrow down to preprocessing */}
              <AnimatedPath id="p-entry" d="M40,80 L40,105" color={C.cyan} delay={0.4}
                strokeWidth={1.5} />
              <motion.path d="M36,103 L40,109 L44,103" stroke={C.cyan} strokeWidth={1.5}
                fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }} />

              <Node x={8} y={108} w={68} h={74} color={C.cyan}
                title="DATA PREPROCESSING"
                items={["DNA Filtering", "Adapter Trim & QC", "Standardize Reads"]}
                delay={0.5} />

              <Label x={10} y={96} text="INPUT" color={C.cyan} delay={0.6} />
            </>
          )}

          {/* ══════════════════════════════════════════════════
              BLOCK 2 — FEATURE EXTRACTION  (bottom-right of preprocessing)
          ══════════════════════════════════════════════════ */}
          {phase >= 2 && (
            <>
              {/* preproc → feature extraction */}
              <AnimatedPath id="p-feat" d="M76,155 L180,155 L180,320 L220,320"
                color={C.blue} delay={0} />
              <MovingDot pathId="p-feat" color={C.blue} duration={2.5} delay={0.3} />
              <MovingDot pathId="p-feat" color={C.cyan} duration={2.5} delay={1.5} />

              <Node x={220} y={295} w={140} h={62} color={C.blue}
                title="FEATURE EXTRACTION"
                items={["Preprocessed Read", "CNN Transformer Embeddings", "Taxonomy Prediction"]}
                delay={0.2} />

              <PulseNode cx={220} cy={326} color={C.blue} delay={0.4} />
              <PulseNode cx={360} cy={326} color={C.blue} delay={0.7} />
            </>
          )}

          {/* ══════════════════════════════════════════════════
              BLOCK 3 — MODEL TRAINING (OFFLINE)  (bottom-center)
          ══════════════════════════════════════════════════ */}
          {phase >= 2 && (
            <>
              {/* preproc → model training */}
              <AnimatedPath id="p-train" d="M76,165 L155,165 L155,400 L200,400"
                color={C.purple} delay={0.1} />
              <MovingDot pathId="p-train" color={C.purple} duration={3} delay={0.6} />
              <MovingDot pathId="p-train" color={C.pink} duration={3} delay={1.8} />

              <Node x={200} y={375} w={145} h={60} color={C.purple}
                title="MODEL TRAINING (OFFLINE)"
                items={["CNN Extraction", "Transformer Long-Range", "Trained Weights"]}
                delay={0.3} />

              <PulseNode cx={200} cy={405} color={C.purple} delay={0.5} />
              <PulseNode cx={345} cy={405} color={C.purple} delay={0.9} />
            </>
          )}

          {/* ══════════════════════════════════════════════════
              BLOCK 4 — CLUSTERING & NOVELTY LAYER  (center)
          ══════════════════════════════════════════════════ */}
          {phase >= 3 && (
            <>
              {/* feature extraction → clustering */}
              <AnimatedPath id="p-clust1"
                d="M360,326 L410,326 L410,250 L430,250"
                color={C.pink} delay={0} />
              <MovingDot pathId="p-clust1" color={C.blue} duration={2} delay={0.2} />

              {/* model training → clustering */}
              <AnimatedPath id="p-clust2"
                d="M345,405 L410,405 L410,275 L430,275"
                color={C.pink} delay={0.1} />
              <MovingDot pathId="p-clust2" color={C.purple} duration={2.2} delay={0.8} />

              <Node x={430} y={225} w={145} h={70} color={C.pink}
                title="CLUSTERING & NOVELTY"
                items={["HDBSCAN / Isolation Forest", "Novel Taxa Flagged 🔴", "Known Taxa Classified ✅"]}
                delay={0.2} />

              <PulseNode cx={430} cy={260} color={C.pink} delay={0.5} />
              <PulseNode cx={575} cy={260} color={C.pink} delay={0.8} />

              {/* Novel taxa split — goes UP */}
              <AnimatedPath id="p-novel"
                d="M502,225 L502,180 L560,180"
                color={C.orange} delay={0.4} />
              <MovingDot pathId="p-novel" color={C.orange} duration={1.8} delay={0.5} size={7} />
              <Label x={505} y={168} text="NOVEL TAXA" color={C.orange} delay={0.8} />

              {/* Known taxa split — goes RIGHT */}
              <AnimatedPath id="p-known"
                d="M575,260 L640,260 L640,320 L660,320"
                color={C.emerald} delay={0.5} />
              <MovingDot pathId="p-known" color={C.emerald} duration={2} delay={0.7} size={7} />
              <Label x={580} y={249} text="KNOWN TAXA" color={C.emerald} delay={0.9} />
            </>
          )}

          {/* ══════════════════════════════════════════════════
              BLOCK 5 — EXPERT VALIDATION & DB  (top-center)
          ══════════════════════════════════════════════════ */}
          {phase >= 4 && (
            <>
              <Node x={200} y={30} w={200} h={70} color={C.amber}
                title="EXPERT VALIDATION & DATABASE"
                items={["Experts Validation", "Add to SILVA / NCBI / PR2", "Feedback for Retraining"]}
                delay={0} />

              {/* novel → validation */}
              <AnimatedPath id="p-val"
                d="M560,180 L620,180 L620,65 L400,65"
                color={C.amber} delay={0.1} />
              <MovingDot pathId="p-val" color={C.amber} duration={2.5} delay={0.2} />
              <MovingDot pathId="p-val" color={C.orange} duration={2.5} delay={1.4} />

              <PulseNode cx={200} cy={65} color={C.amber} delay={0.5} />
              <PulseNode cx={400} cy={65} color={C.amber} delay={0.8} />
            </>
          )}

          {/* ══════════════════════════════════════════════════
              BLOCK 6 — MODEL RETRAINING LOOP  (left-center)
          ══════════════════════════════════════════════════ */}
          {phase >= 5 && (
            <>
              <Node x={8} y={220} w={90} h={60} color={C.amber}
                title="RETRAINING LOOP"
                items={["Validated Taxa", "Continuous Improve"]}
                delay={0} />

              {/* validation → retraining (big curve back left) */}
              <AnimatedPath id="p-retrain"
                d="M200,65 L90,65 L53,65 L53,220"
                color={C.amber} delay={0.2} />
              <MovingDot pathId="p-retrain" color={C.amber} duration={2.8} delay={0.3} />

              {/* retraining → back to model training */}
              <AnimatedPath id="p-loop"
                d="M53,280 L53,390 L200,390"
                color={C.purple} delay={0.3} />
              <MovingDot pathId="p-loop" color={C.purple} duration={2.5} delay={0.6} />

              <Label x={10} y={210} text="🔁 FEEDBACK LOOP" color={C.amber} delay={0.6} />
            </>
          )}

          {/* ══════════════════════════════════════════════════
              BLOCK 7 — REPORTING & VISUALIZATION  (top-right)
          ══════════════════════════════════════════════════ */}
          {phase >= 6 && (
            <>
              <Node x={580} y={30} w={175} h={75} color={C.emerald}
                title="REPORTING & VISUALIZATION"
                items={["Gen AI Reports 📄", "Taxonomic Charts 📊", "Dashboard 🖥"]}
                delay={0} />

              {/* known taxa → reporting */}
              <AnimatedPath id="p-report"
                d="M660,320 L720,320 L720,68 L755,68"
                color={C.emerald} delay={0.1} />
              <MovingDot pathId="p-report" color={C.emerald} duration={2.2} delay={0.2} />
              <MovingDot pathId="p-report" color={C.cyan}   duration={2.2} delay={1.3} />

              {/* validation → reporting (top connection) */}
              <AnimatedPath id="p-val-rep"
                d="M400,52 L580,52"
                color={C.amber} delay={0.3} />
              <MovingDot pathId="p-val-rep" color={C.amber} duration={1.5} delay={0.5} />

              <PulseNode cx={755} cy={68} color={C.emerald} delay={0.4} />

              {/* Output label */}
              <Label x={628} y={18} text="✅ OUTPUT" color={C.emerald} delay={0.7} />
            </>
          )}

          {/* ══════════════════════════════════════════════════
              TITLE
          ══════════════════════════════════════════════════ */}
          <motion.text x={W / 2} y={H - 10} textAnchor="middle"
            fill={C.slate} fontSize={9} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}>
            Figure 1. System Architecture of MARCHIN — Live Animation
          </motion.text>
        </svg>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center justify-center gap-2 pb-4 pt-1">
        {["Input", "Extraction", "Clustering", "Validation", "Retrain", "Output"].map((label, i) => (
          <div key={label} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: phase > i ? C.cyan : C.border,
                boxShadow: phase > i ? `0 0 6px ${C.cyan}` : "none",
              }}
            />
            <span className="text-[9px] text-slate-500 hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemArchitectureDiagram;
