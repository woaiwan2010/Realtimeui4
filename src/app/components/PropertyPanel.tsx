import React, { useState } from "react";
import { 
  Info, 
  Settings2, 
  Database, 
  Activity, 
  Maximize2, 
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Lock,
  Search,
  CheckCircle2,
  Clock,
  PlayCircle,
  FileText
} from "lucide-react";

export function PropertyPanel() {
  const [activeTab, setActiveTab] = useState('props');

  const [simulationParams, setSimulationParams] = useState({
    name: "线性静力分析_1",
    solver: "INTESIM-SOLV v3.5",
    iterations: 50,
    tolerance: 1e-6,
    adaptive: true,
    parallel: 8,
    unitSystem: "mm-kg-s",
    material: "Steel P20",
    meshType: "Auto-Tetrahedral",
    qualityCheck: "Jacobian > 0.7",
  });

  const [activeSection, setActiveSection] = useState<string[]>(['basic', 'physics', 'solver']);

  const toggleSection = (id: string) => {
    setActiveSection(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <div className="border-b border-gray-100">
      <button 
        onClick={() => toggleSection(id)}
        className="w-full h-9 flex items-center justify-between px-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {activeSection.includes(id) ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
          <span className="text-[12px] font-bold text-gray-700 tracking-wide">{title}</span>
        </div>
        <Lock size={12} className="text-gray-300" />
      </button>
      {activeSection.includes(id) && (
        <div className="p-3 space-y-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );

  const PropRow = ({ label, value, type = 'text', onChange }: { label: string, value: any, type?: string, onChange?: (val: any) => void }) => (
    <div className="flex items-center justify-between gap-4">
      <label className="text-[11px] text-gray-500 font-medium whitespace-nowrap">{label}</label>
      {type === 'text' && (
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange?.(e.target.value)}
          className="w-32 h-7 bg-gray-50 border border-gray-200 rounded px-2 text-[11px] text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all text-right"
        />
      )}
      {type === 'select' && (
        <select className="w-32 h-7 bg-gray-50 border border-gray-200 rounded px-1.5 text-[11px] text-gray-800 focus:outline-none focus:border-blue-400 transition-all text-right">
          <option>{value}</option>
          <option>Option B</option>
          <option>Option C</option>
        </select>
      )}
      {type === 'boolean' && (
        <div 
          onClick={() => onChange?.(!value)}
          className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${value ? 'left-5.5' : 'left-0.5'}`} />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="h-9 flex items-center px-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setActiveTab('props')}
            className={`px-3 h-9 text-[11px] font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'props' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            属性
          </button>
          <button 
            onClick={() => setActiveTab('details')}
            className={`px-3 h-9 text-[11px] font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'details' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            详细信息
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'props' ? (
          <div className="flex flex-col">
            <Section id="basic" title="基础设置">
              <PropRow label="分析名称" value={simulationParams.name} />
              <PropRow label="求解器版本" value={simulationParams.solver} />
              <PropRow label="单位制" value={simulationParams.unitSystem} type="select" />
            </Section>

            <Section id="physics" title="物理场参数">
              <PropRow label="主材料" value={simulationParams.material} type="select" />
              <PropRow label="网格划分方式" value={simulationParams.meshType} type="select" />
              <PropRow label="自适应网格" value={simulationParams.adaptive} type="boolean" />
            </Section>

            <Section id="solver" title="求解器配置">
              <PropRow label="最大迭代步数" value={simulationParams.iterations} />
              <PropRow label="收敛容差" value={simulationParams.tolerance} />
              <PropRow label="并行核心数" value={simulationParams.parallel} />
            </Section>
            
            <div className="p-4 mt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-xs font-bold shadow-md shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95">
                <PlayCircle size={14} />
                立即计算
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-[11px] text-gray-500 italic">
            请从模型树中选择一个对象以查看详细详细信息。
          </div>
        )}
      </div>

      <div className="h-24 p-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-start gap-2">
          <Info size={14} className="text-blue-500 mt-0.5" />
          <div className="flex-1 space-y-1">
            <span className="text-[11px] font-bold text-gray-700">���能说明</span>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              自适应网格加密 (Adaptive Meshing) 将根据物理场梯度自动细化网格，以在最小化计算成本的同时提高关键区域的精度。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
