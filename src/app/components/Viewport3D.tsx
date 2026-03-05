import React, { useState } from "react";
import { 
  Rotate3d, 
  Move3d, 
  ZoomIn, 
  Maximize2, 
  ChevronDown, 
  Box, 
  BoxSelect, 
  Layers, 
  LayoutGrid, 
  Eye, 
  EyeOff,
  Compass,
  ArrowRight,
  HelpCircle,
  MoreHorizontal,
  Info
} from "lucide-react";
import { motion } from "motion/react";

interface Viewport3DProps {
  title?: string;
  showOverlay?: boolean;
}

export function Viewport3D({ title, showOverlay = true }: Viewport3DProps) {
  const [viewMode, setViewMode] = useState('shaded');
  const [backgroundGrid, setBackgroundGrid] = useState(true);

  return (
    <div className="relative w-full h-full bg-[#2C2E33] flex items-center justify-center overflow-hidden">
      {/* Background Grid Simulation */}
      {backgroundGrid && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px' 
          }}
        />
      )}

      {/* Placeholder 3D Model Image */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-[85%] h-[85%] relative flex items-center justify-center pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-contain mix-blend-screen opacity-40 rounded-3xl"
          alt="3D CAD Model Simulation"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[400px] border-2 border-blue-500/20 rounded-full blur-3xl bg-blue-500/5" />
        </div>
      </motion.div>

      {/* Floating Toolbar (Top Left) */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-lg shadow-2xl">
          <button className="p-2 hover:bg-white/10 rounded-md text-white/80 transition-colors" title="旋转视图">
            <Rotate3d size={18} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-md text-white/80 transition-colors" title="平移视图">
            <Move3d size={18} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-md text-white/80 transition-colors" title="缩放视图">
            <ZoomIn size={18} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button className="p-2 hover:bg-white/10 rounded-md text-white/80 transition-colors" title="适应窗口">
            <Maximize2 size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-lg shadow-2xl">
          <button 
            onClick={() => setViewMode('shaded')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'shaded' ? 'bg-blue-600 text-white' : 'text-white/60 hover:bg-white/10'}`}
            title="实体显示"
          >
            <Box size={18} />
          </button>
          <button 
            onClick={() => setViewMode('wireframe')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'wireframe' ? 'bg-blue-600 text-white' : 'text-white/60 hover:bg-white/10'}`}
            title="线框显示"
          >
            <BoxSelect size={18} />
          </button>
          <button 
            onClick={() => setBackgroundGrid(!backgroundGrid)}
            className={`p-2 rounded-md transition-colors ${backgroundGrid ? 'text-blue-400' : 'text-white/60 hover:bg-white/10'}`}
            title="背景网格开关"
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Navigation View Cube (Top Right) */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-3 pointer-events-auto">
        <div className="w-24 h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl flex items-center justify-center relative cursor-grab active:cursor-grabbing group">
          {/* Mock View Cube */}
          <div className="w-14 h-14 bg-blue-600/20 border border-blue-400/40 transform rotate-x-45 rotate-y-45 flex items-center justify-center text-[10px] font-bold text-white/90">
            FRONT
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-full border border-blue-500/20 scale-110 rounded-xl" />
          </div>
          <div className="absolute bottom-1 right-1">
            <Compass size={14} className="text-white/40" />
          </div>
        </div>
        
        <div className="flex flex-col gap-1 w-full">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1.5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
            <span className="text-[10px] font-bold text-white/60 tracking-wider">当前视角</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">ISO-1</span>
          </div>
        </div>
      </div>

      {/* Axis Gizmo (Bottom Left) */}
      <div className="absolute bottom-4 left-4 w-20 h-20 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute bottom-0 left-0 w-12 h-px bg-red-500 origin-left">
            <span className="absolute left-14 -top-2.5 text-[10px] font-bold text-red-500">X</span>
          </div>
          <div className="absolute bottom-0 left-0 w-px h-12 bg-green-500 origin-bottom">
            <span className="absolute -top-4 -left-1 text-[10px] font-bold text-green-500">Y</span>
          </div>
          <div className="absolute bottom-0 left-0 w-12 h-px bg-blue-500 origin-left transform -rotate-45">
            <span className="absolute left-14 -top-2.5 text-[10px] font-bold text-blue-400">Z</span>
          </div>
        </div>
      </div>

      {/* Bottom Overlay Info */}
      {showOverlay && (
        <div className="absolute bottom-4 right-4 flex gap-4 items-end pointer-events-none">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-4 shadow-2xl">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">物理场</span>
              <span className="text-sm font-bold text-white tracking-tight">{title || "未定义场景"}</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">状态</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-sm font-bold text-green-400 tracking-tight">就绪</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu Simulation (Hidden by default, shown on Right Click) */}
      <div className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100 p-1 flex-col z-50 overflow-hidden">
        <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">右键加载菜单</div>
        <button className="w-full h-8 flex items-center px-3 gap-2 hover:bg-blue-600 hover:text-white text-gray-700 text-xs font-medium rounded-lg transition-colors">
          <Rotate3d size={14} /> 施加固定约束
        </button>
        <button className="w-full h-8 flex items-center px-3 gap-2 hover:bg-blue-600 hover:text-white text-gray-700 text-xs font-medium rounded-lg transition-colors">
          <Move3d size={14} /> 施加压力载荷
        </button>
        <button className="w-full h-8 flex items-center px-3 gap-2 hover:bg-blue-600 hover:text-white text-gray-700 text-xs font-medium rounded-lg transition-colors">
          <Layers size={14} /> 测量几何
        </button>
        <div className="h-px bg-gray-100 my-1 mx-2" />
        <button className="w-full h-8 flex items-center px-3 gap-2 hover:bg-red-50 text-red-600 text-xs font-medium rounded-lg transition-colors">
          <EyeOff size={14} /> 隐藏对象
        </button>
      </div>
    </div>
  );
}
