import React, { useState } from "react";
import { Viewport3D } from "../components/Viewport3D";
import { 
  Zap, 
  Play, 
  Activity, 
  BarChart3, 
  Thermometer, 
  Settings2, 
  Layers, 
  Grid3X3, 
  Maximize2,
  ChevronDown,
  Info,
  Clock,
  LayoutGrid
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function InstantSim() {
  const [isSolving, setIsSolving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleStartSolve = () => {
    setIsSolving(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsSolving(false);
        setShowResults(true);
      }
    }, 150);
  };

  return (
    <div className="flex flex-col h-full relative">
      <Viewport3D title={showResults ? "仿真结果: Von Mises 应力 (MPa)" : "即时仿真配置"} />

      {/* Solving Overlay */}
      <AnimatePresence>
        {isSolving && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md z-[60] flex flex-col items-center justify-center p-8 text-white"
          >
            <div className="w-full max-w-md flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce shadow-2xl shadow-blue-500/20">
                  <Zap size={32} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">求解计算中...</h2>
                <p className="text-white/60 text-sm">正在使用八叉树网格自适应算法进行实时求解</p>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">剩余时间</span>
                  <span className="text-lg font-mono font-bold tracking-tight">约 {(100 - progress) / 10} 秒</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">迭代步数</span>
                  <span className="text-lg font-mono font-bold tracking-tight">{Math.floor(progress / 2)} / 50</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating UI Control (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {!showResults ? (
          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleStartSolve}
            className="group relative flex items-center gap-4 bg-white/95 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-3xl shadow-2xl transition-all hover:shadow-blue-500/20 active:scale-95 ring-1 ring-black/5"
          >
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">仿真方案准备就绪</span>
              <span className="text-sm font-bold text-gray-900">执行一键即时仿真分析</span>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 transition-all group-hover:bg-blue-700">
              <Play size={24} fill="white" />
            </div>
          </motion.button>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-4 bg-white/95 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-3xl shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">分析已完成</span>
              <span className="text-sm font-bold text-gray-900">结果可视化控制</span>
            </div>
            <div className="w-px h-10 bg-gray-100 mx-2" />
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <BarChart3 size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Thermometer size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Maximize2 size={20} />
              </button>
            </div>
            <div className="w-px h-10 bg-gray-100 mx-2" />
            <button 
              onClick={() => setShowResults(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95"
            >
              修改方案
            </button>
          </motion.div>
        )}
      </div>

      {/* Results Scale (Legend) */}
      <AnimatePresence>
        {showResults && (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="absolute top-6 right-6 flex flex-col items-center gap-3 p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-auto"
          >
            <div className="text-[11px] font-bold text-white/60 tracking-widest uppercase mb-1">Von Mises (MPa)</div>
            <div className="w-6 h-64 bg-gradient-to-t from-blue-600 via-green-400 via-yellow-400 to-red-600 rounded-full border border-white/10" />
            <div className="flex flex-col justify-between h-64 absolute right-14 py-4 text-[11px] font-mono font-bold text-white/80 items-end">
              <span>320.5 (Max)</span>
              <span>240.0</span>
              <span>160.0</span>
              <span>80.0</span>
              <span>0.1 (Min)</span>
            </div>
            <div className="mt-2 w-full pt-2 border-t border-white/10 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-white/40">安全系数</span>
                <span className="text-xs font-bold text-green-400">2.45</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-white/40">最大位移</span>
                <span className="text-xs font-bold text-white">0.042 mm</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Grid Controller (Top Left) */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-4 shadow-2xl">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">背景网格</span>
            <span className="text-sm font-bold text-white">标准 (Standard)</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg pointer-events-auto">
            <button className="px-2 py-1 text-[10px] font-bold text-white/60 hover:bg-white/10 rounded transition-colors">精细</button>
            <button className="px-2 py-1 text-[10px] font-bold text-blue-400 bg-white/10 rounded shadow-sm">标准</button>
            <button className="px-2 py-1 text-[10px] font-bold text-white/60 hover:bg-white/10 rounded transition-colors">极细</button>
          </div>
        </div>
      </div>
    </div>
  );
}
