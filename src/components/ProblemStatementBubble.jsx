import React from "react";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProblemStatementBubble = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-[99999] w-14 h-14 rounded-full
        bg-gradient-to-br from-cyan-500 to-blue-700
        shadow-lg shadow-cyan-500/40 border border-cyan-400/30
        flex items-center justify-center
        hover:scale-110 hover:shadow-cyan-500/60 transition-all duration-200"
      onClick={() => navigate("/problem-statement")}
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
  );
};

export default ProblemStatementBubble;
