import React, { useState } from "react";
import { Viewport3D } from "../components/Viewport3D";
import { 
  Box, 
  Layers, 
  Zap, 
  Trash2, 
  Wand2, 
  Scissors, 
  PlusCircle, 
  Database,
  Search,
  CheckCircle2,
  Clock,
  PlayCircle,
  FileText,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";

export function ModelProcessing() {
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = [
    { label: "导入模型", icon: FileText, status: "done" },
    { label: "几何清理", icon: Wand2, status: "current" },
    { label: "干涉检查", icon: Scissors, status: "pending" },
    { label: "网格划分", icon: Box, status: "pending" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Workflow Navigation */}
      <div className="h-12 border-b border-white/10 flex items-center px-6 gap-8 bg-[#1F2937] shrink-0">
        {workflowSteps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveStep(idx)}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all ${
              step.status === 'done' 
                ? 'bg-green-600 border-green-600 text-white' 
                : step.status === 'current'
                ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                : 'bg-white/5 border-white/20 text-white/40 group-hover:border-white/40'
            }`}>
              {step.status === 'done' ? <CheckCircle2 size={12} /> : idx + 1}
            </div>
            <span className={`text-xs font-bold tracking-tight transition-all ${
              step.status === 'pending' ? 'text-white/40 group-hover:text-white/60' : 'text-white/90'
            }`}>
              {step.label}
            </span>
            {idx < workflowSteps.length - 1 && <div className="w-8 h-px bg-white/10 ml-4" />}
          </div>
        ))}
      </div>

      <div className="flex-1 relative">
        <Viewport3D title="几何处理与网格划分" />
        
        {/* Floating Tool Overlay (Bottom Center) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-8 ring-1 ring-black/5"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">当前操作</span>
              <span className="text-sm font-bold text-gray-900">批量几何清理 (Batch Cleanup)</span>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm transition-all hover:bg-blue-600 hover:text-white cursor-pointer active:scale-95 group relative">
                  <Wand2 size={20} />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wide uppercase">一键修复</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shadow-sm transition-all hover:bg-blue-600 hover:text-white cursor-pointer active:scale-95 group relative">
                  <Trash2 size={20} />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wide uppercase">移除细节</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shadow-sm transition-all hover:bg-blue-600 hover:text-white cursor-pointer active:scale-95 group relative">
                  <Scissors size={20} />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wide uppercase">干涉检测</div>
                </div>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
              应用设置
            </button>
          </motion.div>
        </div>

        {/* Info Panel (Top Left Overlay) */}
        <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <Database size={20} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">几何统计</span>
                <span className="text-sm font-bold text-white">52 个实体, 1204 个面</span>
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-8">
                <span className="text-[11px] text-white/60">重复面 (Duplicated)</span>
                <span className="text-[11px] font-mono text-red-400">12 个发现</span>
              </div>
              <div className="flex items-center justify-between gap-8">
                <span className="text-[11px] text-white/60">小面 (Tiny Faces)</span>
                <span className="text-[11px] font-mono text-yellow-400">42 个发现</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
