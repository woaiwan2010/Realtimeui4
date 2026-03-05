import React, { useState } from "react";
import { 
  Cpu, 
  Database, 
  Search, 
  CheckCircle2, 
  Clock, 
  PlayCircle, 
  FileText, 
  Layers, 
  Settings2, 
  Box, 
  Zap, 
  Info,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  BarChart3,
  Thermometer
} from "lucide-react";
import { Viewport3D } from "../components/Viewport3D";
import { motion, AnimatePresence } from "motion/react";

export function AutomatedSim() {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    { id: 'plate', label: "AB板刚强度分析", icon: Layers, status: "ready" },
    { id: 'insert', label: "注塑镶件疲劳分析", icon: Zap, status: "ready" },
    { id: 'motor', label: "后模马达扭矩计算", icon: Cpu, status: "pending" },
    { id: 'eject', label: "脱模力自动计算", icon: Box, status: "ready" },
    { id: 'mold', label: "斜顶杆弯曲分析", icon: Layers, status: "ready" },
    { id: 'cool', label: "水路冷却均匀性分析", icon: Thermometer, status: "pending" },
  ];

  const bomData = [
    { part: "Plate_A", material: "Steel P20", qty: 1, type: "模胚", confidence: "98%" },
    { part: "Plate_B", material: "Steel P20", qty: 1, type: "模胚", confidence: "98%" },
    { part: "Core_Insert_01", material: "N5 Steel", qty: 4, type: "镶件", confidence: "92%" },
    { part: "Support_Pillar", material: "Steel 45", qty: 2, type: "支撑件", confidence: "95%" },
    { part: "Ejector_Pin", material: "SKD61", qty: 12, type: "顶针", confidence: "89%" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1F2937] relative">
      {/* Top Controller Area */}
      <div className="h-[280px] bg-[#111827] border-b border-white/5 flex flex-col shrink-0">
        <div className="h-10 flex items-center px-6 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('scenarios')}
              className={`px-4 h-10 text-[11px] font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'scenarios' ? 'border-blue-500 text-blue-400' : 'border-transparent text-white/40 hover:text-white/60'}`}
            >
              分析场景选择
            </button>
            <button 
              onClick={() => setActiveTab('bom')}
              className={`px-4 h-10 text-[11px] font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'bom' ? 'border-blue-500 text-blue-400' : 'border-transparent text-white/40 hover:text-white/60'}`}
            >
              BOM 解析与 AI 识别
            </button>
            <button 
              onClick={() => setActiveTab('status')}
              className={`px-4 h-10 text-[11px] font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'status' ? 'border-blue-500 text-blue-400' : 'border-transparent text-white/40 hover:text-white/60'}`}
            >
              任务进度监控
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'scenarios' && (
            <div className="grid grid-cols-3 gap-4">
              {scenarios.map((scenario) => (
                <button 
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all border text-left group ${
                    selectedScenario === scenario.id 
                      ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    selectedScenario === scenario.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/80'
                  }`}>
                    <scenario.icon size={24} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[13px] font-bold transition-all ${selectedScenario === scenario.id ? 'text-blue-400' : 'text-white/80'}`}>
                      {scenario.label}
                    </span>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                      {scenario.status === 'ready' ? '就绪 (Ready)' : '待配置 (Pending)'}
                    </span>
                  </div>
                  {selectedScenario === scenario.id && (
                    <div className="ml-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'bom' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <Search size={20} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-white/80">AI 零件自动识别已开启</span>
                    <span className="text-[10px] text-white/40 tracking-widest uppercase">已识别 12/15 个关键零件</span>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 transition-all active:scale-95 flex items-center gap-2">
                  <Database size={14} />
                  重新解析 BOM
                </button>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-white/5 text-white/40 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">零件名称</th>
                      <th className="px-4 py-3">识别类型</th>
                      <th className="px-4 py-3">材料</th>
                      <th className="px-4 py-3">数量</th>
                      <th className="px-4 py-3">置信度</th>
                      <th className="px-4 py-3 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                    {bomData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors cursor-pointer group">
                        <td className="px-4 py-3 text-white font-bold">{item.part}</td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">{item.type}</span>
                        </td>
                        <td className="px-4 py-3">{item.material}</td>
                        <td className="px-4 py-3">{item.qty}</td>
                        <td className="px-4 py-3 font-mono text-green-400">{item.confidence}</td>
                        <td className="px-4 py-3 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-blue-400 hover:text-white underline font-bold">修正</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="flex flex-col gap-6 items-center justify-center h-full text-white/40">
              <Clock size={48} strokeWidth={1.5} className="mb-2 opacity-20" />
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-bold text-white/60">暂无正在进行的任务</span>
                <span className="text-[11px] tracking-widest uppercase">请选择场景并点击“启动一键仿真”</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        <Viewport3D title={selectedScenario ? `自动化流程: ${scenarios.find(s => s.id === selectedScenario)?.label}` : "等待场景选择"} />

        {/* Action Button (Bottom Center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            disabled={!selectedScenario}
            className={`flex items-center gap-6 px-10 py-5 rounded-3xl shadow-2xl transition-all active:scale-95 group ${
              selectedScenario 
                ? 'bg-blue-600 hover:bg-blue-700 text-white ring-1 ring-white/20' 
                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
            }`}
          >
            <div className="flex flex-col text-left gap-0.5">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedScenario ? 'text-white/60' : 'text-white/20'}`}>流程驱动式仿真分析</span>
              <span className="text-lg font-bold tracking-tight">启动一键自动化仿真</span>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              selectedScenario ? 'bg-white text-blue-600 shadow-xl group-hover:scale-110' : 'bg-white/5 text-white/10'
            }`}>
              <PlayCircle size={32} />
            </div>
          </motion.button>
        </div>

        {/* Progress Tracker (Right Overlay) */}
        {selectedScenario && (
          <div className="absolute top-6 right-6 w-72 flex flex-col gap-4">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl flex flex-col gap-6 ring-1 ring-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white/40 tracking-widest uppercase">当前分析流程</span>
                <button className="text-white/40 hover:text-white transition-colors"><Settings2 size={14} /></button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "BOM 解析与零件匹配", status: "done" },
                  { label: "分析场景规则加载", status: "done" },
                  { label: "载荷与边界自动施加", status: "current" },
                  { label: "求解计算与结果提取", status: "pending" },
                  { label: "生成标准化分析报告", status: "pending" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                      step.status === 'done' 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : step.status === 'current'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400 animate-pulse'
                        : 'bg-white/5 border-white/10 text-white/20'
                    }`}>
                      {step.status === 'done' ? <CheckCircle2 size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[12px] font-bold transition-all ${
                      step.status === 'pending' ? 'text-white/20' : step.status === 'current' ? 'text-blue-400' : 'text-white/90'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white/40 tracking-widest uppercase">预计耗时</span>
                <span className="text-[11px] font-mono font-bold text-white/80">约 00:08:45</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
