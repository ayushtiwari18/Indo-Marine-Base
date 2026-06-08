import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  cyan:    "#06b6d4",
  blue:    "#3b82f6",
  purple:  "#a855f7",
  pink:    "#ec4899",
  amber:   "#f59e0b",
  emerald: "#10b981",
  orange:  "#f97316",
  slate:   "#64748b",
  slateLight: "#94a3b8",
};

// ── Moving dot along an SVG path ───────────────────────────────────────────
const MovingDot = ({ pathId, color, duration, delay, r = 4 }) => {
  const [pos, setPos]       = useState(null);
  const rafRef              = useRef(null);
  const startRef            = useRef(null);

  useEffect(() => {
    const el = document.getElementById(pathId);
    if (!el) return;
    const len = el.getTotalLength();
    let cancelled = false;

    const tid = setTimeout(() => {
      if (cancelled) return;
      const tick = (ts) => {
        if (cancelled) return;
        if (!startRef.current) startRef.current = ts;
        const t  = ((ts - startRef.current) % (duration * 1000)) / (duration * 1000);
        const pt = el.getPointAtLength(t * len);
        setPos({ x: pt.x, y: pt.y });
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      cancelled = true;
      clearTimeout(tid);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathId, duration, delay]);

  if (!pos) return null;
  return (
    <circle cx={pos.x} cy={pos.y} r={r} fill={color}
      style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
  );
};

// ── Draw-on animated path ──────────────────────────────────────────────────
const Wire = ({ id, d, color, delay = 0, width = 1.5, dashed = false }) => (
  <motion.path
    id={id} d={d}
    stroke={color} strokeWidth={width} fill="none" strokeLinecap="round"
    strokeDasharray={dashed ? "5 4" : undefined}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1, delay, ease: "easeInOut" }}
  />
);

// ── Arrowhead marker defs ──────────────────────────────────────────────────
const Defs = () => (
  <defs>
    {[
      ["arr-cyan",    C.cyan],
      ["arr-blue",    C.blue],
      ["arr-purple",  C.purple],
      ["arr-pink",    C.pink],
      ["arr-amber",   C.amber],
      ["arr-emerald", C.emerald],
      ["arr-orange",  C.orange],
    ].map(([id, col]) => (
      <marker key={id} id={id} markerWidth="7" markerHeight="7"
        refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7 Z" fill={col} />
      </marker>
    ))}
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 L0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
    </pattern>
  </defs>
);

// ── Block component ────────────────────────────────────────────────────────
// x,y = top-left corner; w,h = size; items = bullet strings
const Block = ({ x, y, w, h, color, label, items, delay = 0 }) => {
  const pad = 10;
  const titleY = y + 18;
  const lineY  = y + 24;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9, originX: x + w / 2, originY: y + h / 2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {/* outer glow */}
      <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={11}
        fill="none" stroke={color} strokeWidth={0.5} opacity={0.25} />
      {/* card */}
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill="#111827" stroke={color} strokeWidth={1.6} />
      {/* top accent bar */}
      <rect x={x} y={y} width={w} height={5} rx={[4, 4, 0, 0]}
        fill={color} opacity={0.85} />
      {/* label */}
      <text x={x + w / 2} y={titleY} textAnchor="middle"
        fill={color} fontSize={8.5} fontWeight="700" fontFamily="'Courier New', monospace"
        letterSpacing="0.5">
        {label}
      </text>
      {/* divider */}
      <line x1={x + pad} y1={lineY} x2={x + w - pad} y2={lineY}
        stroke={color} strokeWidth={0.5} opacity={0.4} />
      {/* bullets */}
      {items.map((txt, i) => (
        <g key={i}>
          <circle cx={x + pad + 4} cy={y + 32 + i * 15} r={2.5}
            fill={color} opacity={0.8} />
          <text x={x + pad + 11} y={y + 36 + i * 15}
            fill="#cbd5e1" fontSize={7.5} fontFamily="system-ui, sans-serif">
            {txt}
          </text>
        </g>
      ))}
    </motion.g>
  );
};

// ── Pill badge ─────────────────────────────────────────────────────────────
const Badge = ({ x, y, text, color, delay = 0 }) => {
  const w = text.length * 5.6 + 12;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      <rect x={x} y={y} width={w} height={14} rx={7}
        fill={color} opacity={0.15} stroke={color} strokeWidth={0.8} />
      <text x={x + 6} y={y + 10} fill={color}
        fontSize={7} fontWeight="700" fontFamily="'Courier New', monospace">
        {text}
      </text>
    </motion.g>
  );
};

// ── Pulse circle ──────────────────────────────────────────────────────────
const Pulse = ({ cx, cy, color, delay = 0 }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
    <motion.circle cx={cx} cy={cy} r={7} fill={color} opacity={0.12}
      animate={{ r: [7, 13, 7], opacity: [0.12, 0.04, 0.12] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay }} />
    <circle cx={cx} cy={cy} r={4} fill={color}
      style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
  </motion.g>
);

// ══════════════════════════════════════════════════════════════════════════
//  LAYOUT  (all coordinates on a 900 × 560 canvas)
//
//  Column guide (x centres):
//    Col A  =  80    (Preprocessing)
//    Col B  =  310   (Feature Extraction / Model Training)
//    Col C  =  530   (Clustering)
//    Col D  =  750   (Reporting)
//
//  Row guide (y centres):
//    Row 1  =  70    (Expert Validation + Reporting)
//    Row 2  =  210   (Retraining)
//    Row 3  =  300   (Preprocessing)
//    Row 4  =  380   (Feature Extraction)
//    Row 5  =  460   (Model Training)
//
// Connections are strictly horizontal or vertical — zero diagonal crossings.
// ══════════════════════════════════════════════════════════════════════════

// Block dimensions
const BW = 160;  // standard block width
const BH_3 = 72; // 3-item block height
const BH_2 = 58; // 2-item block height

// Block anchor (top-left) helpers
const bx = (cx) => cx - BW / 2;
const by = (cy, h) => cy - h / 2;

// Named centre-points
const POS = {
  //         cx    cy
  preproc:  [  80,  310 ],
  feat:     [ 310,  390 ],
  train:    [ 310,  470 ],  // shifted lower to avoid overlap
  clust:    [ 530,  310 ],
  valid:    [ 410,   80 ],
  retrain:  [  80,  190 ],
  report:   [ 730,   80 ],
};

// Helper: right-edge x of a block centred at cx
const RE = (cx) => cx + BW / 2;
// Helper: left-edge x
const LE = (cx) => cx - BW / 2;
// Helper: bottom-edge y
const BE = (cy, h) => cy + h / 2;
// Helper: top-edge y
const TE = (cy, h) => cy - h / 2;

const SystemArchitectureDiagram = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const ts = [0.6, 1.4, 2.2, 3.0, 3.8, 4.6];
    const timers = ts.map((t, i) => setTimeout(() => setPhase(i + 1), t * 1000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const W = 900, H = 560;

  // Unpack positions
  const [pX, pY] = POS.preproc;
  const [fX, fY] = POS.feat;
  const [tX, tY] = POS.train;
  const [cX, cY] = POS.clust;
  const [vX, vY] = POS.valid;
  const [rX, rY] = POS.retrain;
  const [rpX, rpY] = POS.report;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-700/50"
      style={{ background: "#060d1a" }}>

      {/* ── Legend ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 px-5 pt-4 pb-3 border-b border-slate-800">
        {[
          { c: C.cyan,    l: "Preprocessing" },
          { c: C.blue,    l: "Feature Extraction" },
          { c: C.purple,  l: "Model Training" },
          { c: C.pink,    l: "Clustering" },
          { c: C.amber,   l: "Validation Loop" },
          { c: C.emerald, l: "Reporting" },
        ].map(({ c, l }) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
            <span className="text-[11px] text-slate-400">{l}</span>
          </div>
        ))}
      </div>

      {/* ── SVG ────────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ display: "block", width: "100%", minWidth: "640px", height: "auto" }}
        >
          <Defs />
          <rect width={W} height={H} fill="url(#grid)" />

          {/* ── PHASE 1 : PREPROCESSING ─────────────────────────────── */}
          {phase >= 1 && (
            <>
              {/* DNA label */}
              <motion.text x={pX} y={pY - BH_3 / 2 - 28} textAnchor="middle"
                fill={C.slateLight} fontSize={9} fontFamily="system-ui"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                🧬 eDNA Sediment Samples
              </motion.text>
              {/* entry arrow */}
              <Wire id="w-entry" d={`M${pX},${pY - BH_3/2 - 14} L${pX},${pY - BH_3/2}`}
                color={C.cyan} delay={0.2} />

              <Block x={bx(pX)} y={by(pY, BH_3)} w={BW} h={BH_3}
                color={C.cyan} label="DATA PREPROCESSING"
                items={["DNA Filtering", "Adapter Trim & QC", "Standardize Reads"]}
                delay={0.3} />
              <Badge x={pX - 18} y={pY - BH_3/2 - 22} text="INPUT"
                color={C.cyan} delay={0.5} />
            </>
          )}

          {/* ── PHASE 2 : FEATURE EXTRACTION & MODEL TRAINING ──────── */}
          {phase >= 2 && (
            <>
              {/* preproc → right → down → Feature Extraction (orthogonal) */}
              <Wire id="w-p-feat"
                d={`M${RE(pX)},${pY} L${LE(fX)},${pY} L${LE(fX)},${fY}`}
                color={C.blue} delay={0} />
              <MovingDot pathId="w-p-feat" color={C.blue} duration={2.4} delay={0.4} />
              <MovingDot pathId="w-p-feat" color={C.cyan} duration={2.4} delay={1.6} />

              <Block x={bx(fX)} y={by(fY, BH_3)} w={BW} h={BH_3}
                color={C.blue} label="FEATURE EXTRACTION"
                items={["Preprocessed Read", "CNN Transformer Embeds", "Taxonomy Prediction"]}
                delay={0.1} />

              {/* preproc → right (lower lane) → Model Training */}
              <Wire id="w-p-train"
                d={`M${RE(pX)},${pY + 18} L${fX - BW/2 - 30},${pY + 18} L${fX - BW/2 - 30},${tY} L${LE(tX)},${tY}`}
                color={C.purple} delay={0.1} />
              <MovingDot pathId="w-p-train" color={C.purple} duration={2.8} delay={0.7} />
              <MovingDot pathId="w-p-train" color={C.pink}   duration={2.8} delay={1.9} />

              <Block x={bx(tX)} y={by(tY, BH_3)} w={BW} h={BH_3}
                color={C.purple} label="MODEL TRAINING (OFFLINE)"
                items={["CNN Extraction", "Transformer Long-Range", "Trained Weights"]}
                delay={0.2} />
            </>
          )}

          {/* ── PHASE 3 : CLUSTERING ────────────────────────────────── */}
          {phase >= 3 && (
            <>
              {/* Feature Extraction → right → Clustering */}
              <Wire id="w-feat-clust"
                d={`M${RE(fX)},${fY} L${LE(cX)},${fY} L${LE(cX)},${cY}`}
                color={C.pink} delay={0} />
              <MovingDot pathId="w-feat-clust" color={C.blue} duration={2} delay={0.3} />

              {/* Model Training → right → up → Clustering */}
              <Wire id="w-train-clust"
                d={`M${RE(tX)},${tY} L${cX},${tY} L${cX},${BE(cY, BH_3)}`}
                color={C.purple} delay={0.1} />
              <MovingDot pathId="w-train-clust" color={C.purple} duration={2.4} delay={0.9} />

              <Block x={bx(cX)} y={by(cY, BH_3)} w={BW} h={BH_3}
                color={C.pink} label="CLUSTERING & NOVELTY"
                items={["HDBSCAN / Isolation Forest", "Novel Taxa Flagged 🔴", "Known Taxa Classified ✅"]}
                delay={0.2} />

              {/* Novel taxa → straight up from cluster top */}
              <Wire id="w-novel"
                d={`M${cX - 25},${TE(cY, BH_3)} L${cX - 25},${BE(vY, BH_3)}`}
                color={C.orange} delay={0.4} />
              <MovingDot pathId="w-novel" color={C.orange} duration={1.8} delay={0.5} r={5} />
              <Badge x={cX - 55} y={TE(cY, BH_3) - 22} text="NOVEL TAXA"
                color={C.orange} delay={0.8} />

              {/* Known taxa → right from cluster */}
              <Wire id="w-known"
                d={`M${RE(cX)},${cY} L${rpX - BW/2},${cY} L${rpX - BW/2},${BE(rpY, BH_3)}`}
                color={C.emerald} delay={0.5} />
              <MovingDot pathId="w-known" color={C.emerald} duration={2} delay={0.7} r={5} />
              <Badge x={RE(cX) + 4} y={cY - 8} text="KNOWN TAXA"
                color={C.emerald} delay={0.9} />
            </>
          )}

          {/* ── PHASE 4 : EXPERT VALIDATION ─────────────────────────── */}
          {phase >= 4 && (
            <>
              <Block x={bx(vX)} y={by(vY, BH_3)} w={BW} h={BH_3}
                color={C.amber} label="EXPERT VALIDATION & DB"
                items={["Experts Validation", "Add to SILVA/NCBI/PR2", "Feedback for Retraining"]}
                delay={0} />

              {/* validation → right → Reporting (top wire) */}
              <Wire id="w-val-rep"
                d={`M${RE(vX)},${vY} L${LE(rpX)},${vY}`}
                color={C.amber} delay={0.2} />
              <MovingDot pathId="w-val-rep" color={C.amber} duration={1.6} delay={0.4} />
            </>
          )}

          {/* ── PHASE 5 : RETRAINING LOOP ───────────────────────────── */}
          {phase >= 5 && (
            <>
              <Block x={bx(rX)} y={by(rY, BH_2)} w={BW} h={BH_2}
                color={C.amber} label="RETRAINING LOOP"
                items={["Incorporate Validated Taxa", "Continuous Improvement"]}
                delay={0} />

              {/* validation → left → up → Retraining (left-side highway) */}
              <Wire id="w-val-ret"
                d={`M${LE(vX)},${vY} L${30},${vY} L${30},${rY}`}
                color={C.amber} delay={0.1} dashed />
              <MovingDot pathId="w-val-ret" color={C.amber} duration={2.5} delay={0.3} />
              <Badge x={4} y={vY - 24} text="🔁 FEEDBACK LOOP"
                color={C.amber} delay={0.7} />

              {/* Retraining → down → Model Training */}
              <Wire id="w-ret-train"
                d={`M${rX},${BE(rY, BH_2)} L${rX},${tY} L${LE(tX)},${tY}`}
                color={C.purple} delay={0.2} dashed />
              <MovingDot pathId="w-ret-train" color={C.purple} duration={2.8} delay={0.6} />

              <Pulse cx={rX} cy={rY} color={C.amber} delay={0.5} />
            </>
          )}

          {/* ── PHASE 6 : REPORTING ─────────────────────────────────── */}
          {phase >= 6 && (
            <>
              <Block x={bx(rpX)} y={by(rpY, BH_3)} w={BW} h={BH_3}
                color={C.emerald} label="REPORTING & VISUALIZATION"
                items={["Gen AI Reports 📄", "Taxonomic Charts 📊", "Dashboard 🖥"]}
                delay={0} />

              <Pulse cx={rpX} cy={rpY} color={C.emerald} delay={0.4} />
              <Badge x={rpX + BW/2 - 52} y={by(rpY, BH_3) - 18}
                text="✅ OUTPUT" color={C.emerald} delay={0.7} />
            </>
          )}

          {/* ── Pulse nodes on key junctions ────────────────────────── */}
          {phase >= 2 && <Pulse cx={RE(pX)} cy={pY} color={C.cyan} delay={0.6} />}
          {phase >= 3 && <Pulse cx={cX} cy={cY} color={C.pink} delay={0.5} />}
          {phase >= 4 && <Pulse cx={vX} cy={vY} color={C.amber} delay={0.4} />}

          {/* ── Caption ─────────────────────────────────────────────── */}
          <motion.text x={W / 2} y={H - 8} textAnchor="middle"
            fill={C.slate} fontSize={9} fontFamily="'Courier New', monospace"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.2 }}>
            Figure 1 · System Architecture of MARCHIN — Animated Data Flow
          </motion.text>
        </svg>
      </div>

      {/* ── Phase progress bar ──────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-3 py-3 border-t border-slate-800">
        {["Input","Extraction","Clustering","Validation","Retrain","Output"].map((lbl, i) => (
          <div key={lbl} className="flex items-center gap-1.5">
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: phase > i ? C.cyan : "#334155",
                boxShadow: phase > i ? `0 0 8px ${C.cyan}` : "none",
              }}
              transition={{ duration: 0.4 }}
            />
            <span className="text-[10px] text-slate-500 hidden sm:inline">{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemArchitectureDiagram;
