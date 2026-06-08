import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ── Colour palette ────────────────────────────────────────────────────────────
const COLORS = {
  cyan:    "#06b6d4",
  blue:    "#3b82f6",
  purple:  "#a855f7",
  pink:    "#ec4899",
  amber:   "#f59e0b",
  emerald: "#10b981",
  orange:  "#f97316",
  red:     "#ef4444",
};

// ── Custom Node ──────────────────────────────────────────────────────────────
const ArchNode = ({ data }) => {
  const { label, items, color, icon, sourceHandles = [], targetHandles = [] } = data;
  return (
    <div
      style={{
        background: "#0d1b2e",
        border: `1.5px solid ${color}`,
        borderRadius: 10,
        minWidth: 185,
        boxShadow: `0 0 18px ${color}28, 0 4px 24px #00000060`,
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        background: `linear-gradient(90deg, ${color}cc, ${color}44)`,
        height: 4,
        borderRadius: "8px 8px 0 0",
      }} />

      {/* Header */}
      <div style={{
        padding: "8px 12px 6px",
        borderBottom: `1px solid ${color}33`,
        display: "flex",
        alignItems: "center",
        gap: 7,
      }}>
        {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
        <span style={{
          color,
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          fontFamily: "'Courier New', monospace",
          textTransform: "uppercase",
        }}>
          {label}
        </span>
      </div>

      {/* Bullets */}
      <div style={{ padding: "8px 12px 10px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: i < items.length - 1 ? 5 : 0 }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: color, marginTop: 4, flexShrink: 0,
              boxShadow: `0 0 4px ${color}`,
            }} />
            <span style={{ color: "#cbd5e1", fontSize: 11, lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* React Flow Handles — invisible, used for edges */}
      <Handle type="target" position={Position.Left}   id="l" style={{ opacity: 0, left: -1 }} />
      <Handle type="target" position={Position.Top}    id="t" style={{ opacity: 0, top: -1 }} />
      <Handle type="source" position={Position.Right}  id="r" style={{ opacity: 0, right: -1 }} />
      <Handle type="source" position={Position.Bottom} id="b" style={{ opacity: 0, bottom: -1 }} />
      <Handle type="source" position={Position.Left}   id="sl" style={{ opacity: 0, left: -1 }} />
      <Handle type="source" position={Position.Top}    id="st" style={{ opacity: 0, top: -1 }} />
      <Handle type="target" position={Position.Right}  id="tr" style={{ opacity: 0, right: -1 }} />
      <Handle type="target" position={Position.Bottom} id="tb" style={{ opacity: 0, bottom: -1 }} />
    </div>
  );
};

// ── Custom animated edge with label ──────────────────────────────────────
const AnimatedEdge = ({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, data = {}, markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  const { color = "#64748b", label, dashed } = data;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: color,
          strokeWidth: 1.8,
          strokeDasharray: dashed ? "6 4" : undefined,
          filter: `drop-shadow(0 0 4px ${color}88)`,
        }}
      />
      {/* Animated flow dot */}
      <circle r="4" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "none",
              background: "#0d1b2e",
              border: `1px solid ${color}66`,
              borderRadius: 999,
              padding: "2px 9px",
              fontSize: 9,
              fontWeight: 700,
              color,
              fontFamily: "'Courier New', monospace",
              whiteSpace: "nowrap",
              letterSpacing: "0.04em",
              boxShadow: `0 0 8px ${color}44`,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

const nodeTypes = { archNode: ArchNode };
const edgeTypes = { animated: AnimatedEdge };

// ── Initial nodes ─────────────────────────────────────────────────────────────
// Grid layout — col * 260 row * 180
const initialNodes = [
  {
    id: "preproc",
    type: "archNode",
    position: { x: 0, y: 180 },
    data: {
      label: "Data Preprocessing",
      icon: "🧬",
      color: COLORS.cyan,
      items: ["DNA Filtering", "Adapter Trim & QC", "Standardize Read Lengths"],
    },
  },
  {
    id: "feat",
    type: "archNode",
    position: { x: 280, y: 90 },
    data: {
      label: "Feature Extraction",
      icon: "⚡",
      color: COLORS.blue,
      items: ["Preprocessed Read", "CNN Transformer Embeddings", "Taxonomy Prediction"],
    },
  },
  {
    id: "train",
    type: "archNode",
    position: { x: 280, y: 290 },
    data: {
      label: "Model Training (Offline)",
      icon: "🧠",
      color: COLORS.purple,
      items: ["CNN Extraction", "Transformer Long-Range", "Trained Weights → Saved"],
    },
  },
  {
    id: "clust",
    type: "archNode",
    position: { x: 560, y: 180 },
    data: {
      label: "Clustering & Novelty",
      icon: "🔬",
      color: COLORS.pink,
      items: ["HDBSCAN / Isolation Forest", "Novel Taxa Flagged 🔴", "Known Taxa Classified ✅"],
    },
  },
  {
    id: "valid",
    type: "archNode",
    position: { x: 560, y: -60 },
    data: {
      label: "Expert Validation & DB",
      icon: "🏛️",
      color: COLORS.amber,
      items: ["Expert Species Validation", "Add to SILVA / NCBI / PR2", "Feedback for Retraining"],
    },
  },
  {
    id: "retrain",
    type: "archNode",
    position: { x: 0, y: -60 },
    data: {
      label: "Model Retraining Loop",
      icon: "🔁",
      color: COLORS.orange,
      items: ["Incorporate Validated Taxa", "Continuous Model Improvement"],
    },
  },
  {
    id: "report",
    type: "archNode",
    position: { x: 840, y: -60 },
    data: {
      label: "Reporting & Visualization",
      icon: "📊",
      color: COLORS.emerald,
      items: ["Gen AI Reports 📄", "Taxonomic Charts 📊", "Interactive Dashboard 🖥️"],
    },
  },
];

// ── Initial edges ─────────────────────────────────────────────────────────────
const mkEdge = (id, src, tgt, color, label, dashed = false, srcH = "r", tgtH = "l") => ({
  id,
  source: src, sourceHandle: srcH,
  target: tgt, targetHandle: tgtH,
  type: "animated",
  markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
  data: { color, label, dashed },
});

const initialEdges = [
  // Preprocessing → Feature Extraction
  mkEdge("e-pf",  "preproc", "feat",    COLORS.blue,    "eDNA Reads",       false, "r", "l"),
  // Preprocessing → Model Training
  mkEdge("e-pt",  "preproc", "train",   COLORS.purple,  "Raw Sequences",    false, "r", "l"),
  // Feature Extraction → Clustering
  mkEdge("e-fc",  "feat",    "clust",   COLORS.pink,    "Embeddings",       false, "r", "l"),
  // Model Training → Clustering
  mkEdge("e-tc",  "train",   "clust",   COLORS.purple,  "Trained Weights",  false, "r", "tb"),
  // Clustering → Expert Validation (Novel Taxa)
  mkEdge("e-cv",  "clust",   "valid",   COLORS.orange,  "Novel Taxa 🔴",     false, "st", "tb"),
  // Clustering → Reporting (Known Taxa)
  mkEdge("e-cr",  "clust",   "report",  COLORS.emerald, "Known Taxa ✅",     false, "r", "tb"),
  // Expert Validation → Reporting
  mkEdge("e-vr",  "valid",   "report",  COLORS.amber,   "Validated Data",   false, "r", "l"),
  // Expert Validation → Retraining (feedback — dashed)
  mkEdge("e-vre", "valid",   "retrain", COLORS.orange,  "Feedback Loop 🔁",  true,  "l", "tr"),
  // Retraining → Model Training (dashed)
  mkEdge("e-rt",  "retrain", "train",   COLORS.purple,  "Retrain Signal",   true,  "b", "t"),
];

// ── Diagram Component ───────────────────────────────────────────────────────
const DiagramInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: "100%", height: 540, borderRadius: 12, overflow: "hidden",
      border: "1px solid #1e3a5f" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        style={{ background: "#060d1a" }}
        defaultEdgeOptions={{ type: "animated" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#1e3a5f"
        />
        <Controls
          style={{
            background: "#0d1b2e",
            border: "1px solid #1e3a5f",
            borderRadius: 8,
          }}
        />
        <MiniMap
          style={{
            background: "#0d1b2e",
            border: "1px solid #1e3a5f",
            borderRadius: 8,
          }}
          nodeColor={(n) => n.data?.color ?? "#334155"}
          maskColor="#060d1a99"
        />
      </ReactFlow>
    </div>
  );
};

// ── Exported wrapper ──────────────────────────────────────────────────────────
const SystemArchitectureDiagram = () => (
  <div className="w-full rounded-2xl overflow-hidden border border-slate-700/50"
    style={{ background: "#060d1a" }}>

    {/* Header */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px #06b6d4" }} />
        <span className="text-xs font-bold text-cyan-300 tracking-wider font-mono">MARCHIN — SYSTEM ARCHITECTURE</span>
      </div>
      <span className="text-[10px] text-slate-500 font-mono">drag nodes · scroll to zoom · minimap bottom-right</span>
    </div>

    {/* Legend */}
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-5 py-2.5 border-b border-slate-800/60">
      {[
        { c: COLORS.cyan,    l: "Preprocessing" },
        { c: COLORS.blue,    l: "Feature Extraction" },
        { c: COLORS.purple,  l: "Model Training" },
        { c: COLORS.pink,    l: "Clustering" },
        { c: COLORS.amber,   l: "Validation & DB" },
        { c: COLORS.orange,  l: "Retraining Loop" },
        { c: COLORS.emerald, l: "Reporting" },
      ].map(({ c, l }) => (
        <div key={l} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: c, boxShadow: `0 0 5px ${c}` }} />
          <span className="text-[10px] text-slate-400">{l}</span>
        </div>
      ))}
    </div>

    {/* React Flow canvas */}
    <ReactFlowProvider>
      <DiagramInner />
    </ReactFlowProvider>

    {/* Caption */}
    <div className="text-center py-2.5 border-t border-slate-800">
      <span className="text-[10px] text-slate-600 font-mono">
        Figure 1 · System Architecture of MARCHIN — Interactive Animated Data Flow
      </span>
    </div>
  </div>
);

export default SystemArchitectureDiagram;
