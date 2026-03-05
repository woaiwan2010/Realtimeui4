import React, { useState } from "react";
import { Viewport3D } from "../components/Viewport3D";
import { 
  Cpu, 
  Settings2, 
  BarChart3, 
  Grid3X3, 
  Maximize2, 
  ChevronDown, 
  Plus, 
  Search, 
  FileText, 
  LayoutGrid, 
  Zap, 
  Activity, 
  Layers, 
  Database,
  ArrowRight,
  MonitorPlay,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FineSim() {
  const [activeTab, setActiveTab] = useState('mesh');

  return (
    <div className="flex flex-col h-full bg-[#1F2937] relative">
      <Viewport3D title="精细工程仿真分析 (Finite Element Method)" />

      {/* HPC Solver Config (Bottom Center Overlay) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-10 ring-1 ring-white/10"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">高性能求解配置</span>
            <span className="text-sm font-bold text-white tracking-tight">INTESIM-PARA v2.0 (8-Node Cluster)</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">并行线程</span>
              <div className="flex items-center gap-3">
                <input type="range" className="w-24 h-1.5 bg-white/10 rounded-full accent-blue-500" />
                <span className="text-xs font-mono font-bold text-blue-400">32</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">计算精度</span>
              <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] font-bold text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Double Precision</option>
                <option>Mixed Precision</option>
              </select>
            </div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/10 transition-all active:scale-95 flex items-center gap-2">
            <Cpu size={14} />
            提交远程求解
          </button>
        </motion.div>
      </div>

      {/* Analysis Tabs (Top Right Overlay) */}
      <div className="absolute top-6 right-6 w-80 flex flex-col gap-4 pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl flex flex-col gap-6 ring-1 ring-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white/40 tracking-widest uppercase">精细网格配置</span>
            <button className="text-white/40 hover:text-white transition-colors"><Plus size={14} /></button>
          </div>
          <div className="space-y-4">
            {[
              { label: "全局网格尺寸 (Global Mesh Size)", value: "2.5 mm", icon: Grid3X3 },
              { label: "接触面加密 (Contact Inflation)", value: "0.8 mm", icon: Layers },
              { label: "孔特征自动加密 (Hole Refinement)", value: "Enabled", icon: TargetIcon },
              { label: "网格质量评估 (Quality Measure)", value: "Skewness < 0.8", icon: Activity },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white/60 tracking-tight group-hover:text-blue-400">{item.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white/90">{item.value}</span>
                  <div className="p-1.5 bg-white/5 rounded-lg text-white/20 group-hover:text-blue-400">
                    <item.icon size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white/40 tracking-widest uppercase">预估单元总数</span>
            <span className="text-xs font-mono font-bold text-white/80">485,200 TET4</span>
          </div>
        </div>
      </div>

      {/* Report Summary (Top Left Overlay) */}
      <div className="absolute top-6 left-6 flex flex-col gap-4 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
              <FileText size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">标准化报告预览</span>
              <span className="text-sm font-bold text-white">工程验证报告 v1.2</span>
            </div>
          </div>
          <div className="h-px bg-white/10" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">最大应力</span>
              <span className="text-xs font-mono font-bold text-red-400">425 MPa</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">设计容限</span>
              <span className="text-xs font-mono font-bold text-green-400">750 MPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TargetIcon({ size, ...props }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
