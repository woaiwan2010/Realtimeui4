import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from "react-resizable-panels";
import { 
  Search, 
  Settings, 
  User, 
  HelpCircle, 
  LayoutGrid, 
  FolderOpen, 
  Save, 
  Undo2, 
  Redo2,
  Box,
  Zap,
  Cpu,
  BarChart3,
  Minimize2,
  Maximize2,
  Layers,
  FileText
} from "lucide-react";
import { Ribbon } from "./Ribbon";
import { Sidebar } from "./Sidebar";
import { PropertyPanel } from "./PropertyPanel";
import { WelcomeGuide } from "./WelcomeGuide";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState(location.pathname === "/" ? "/model-processing" : location.pathname);

  const tabs = [
    { id: "/model-processing", label: "模型处理", icon: Box },
    { id: "/instant-sim", label: "即时仿真", icon: Zap },
    { id: "/automated-sim", label: "自动化仿真", icon: Cpu },
    { id: "/fine-sim", label: "精细仿真", icon: BarChart3 },
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    navigate(id);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F3F4F6] text-[#1F2937] font-sans">
      {/* Top Navigation Bar */}
      <header className="h-12 bg-[#2563EB] text-white flex items-center justify-between px-4 shrink-0 shadow-md z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#2563EB] font-bold text-lg">I</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">INTESIM</h1>
          </div>
          <div className="h-6 w-px bg-white/20 mx-2" />
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 h-12 flex items-center gap-2 transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? "border-white bg-white/10" 
                    : "border-transparent hover:bg-white/5"
                }`}
              >
                <tab.icon size={18} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input 
              type="text" 
              placeholder="搜索功能或帮助..." 
              className="bg-white/10 border border-white/20 rounded-md py-1 pl-9 pr-3 text-sm focus:outline-none focus:bg-white/20 transition-all w-64"
            />
          </div>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-2 bg-white/10 pl-2 pr-1 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
            <span className="text-xs font-medium">工程师张三</span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <User size={14} />
            </div>
          </div>
        </div>
      </header>

      {/* Main UI Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Ribbon Toolbar */}
        <Ribbon activeTab={activeTab} />

        {/* Resizable Workspaces */}
        <PanelGroup direction="horizontal" className="flex-1">
          {/* Left Sidebar: Operation Tree */}
          <Panel defaultSize={20} minSize={15} className="bg-white border-r border-gray-200">
            <Sidebar />
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-gray-100 hover:bg-blue-100 cursor-col-resize transition-colors border-x border-gray-200" />

          {/* Main Viewport */}
          <Panel defaultSize={60}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={75} className="relative bg-[#2C2E33]">
                {/* 3D Content Outlet */}
                <Outlet />
              </Panel>
              
              <PanelResizeHandle className="h-1.5 bg-gray-100 hover:bg-blue-100 cursor-row-resize transition-colors border-y border-gray-200" />

              {/* Bottom Console / Output */}
              <Panel defaultSize={25} minSize={10} className="bg-white border-t border-gray-200">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 px-4 h-8 border-b border-gray-100 bg-gray-50">
                    <button className="text-xs font-semibold border-b-2 border-blue-600 h-full px-2">输出</button>
                    <button className="text-xs font-medium text-gray-500 hover:text-gray-700 h-full px-2">错误 (0)</button>
                    <button className="text-xs font-medium text-gray-500 hover:text-gray-700 h-full px-2">日志</button>
                  </div>
                  <div className="flex-1 overflow-auto p-4 font-mono text-[11px] text-gray-700 space-y-1">
                    <p className="text-blue-600">[INFO] INTESIM System Startup Success.</p>
                    <p>[INFO] Loading geometry engine...</p>
                    <p>[INFO] Octree background grid initialized (Standard size).</p>
                    <p>[SUCCESS] Model "Engine_Assembly.step" imported successfully.</p>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-gray-100 hover:bg-blue-100 cursor-col-resize transition-colors border-x border-gray-200" />

          {/* Right Sidebar: Property Panel */}
          <Panel defaultSize={20} minSize={15} className="bg-white border-l border-gray-200">
            <PropertyPanel />
          </Panel>
        </PanelGroup>
      </div>

      {/* Footer / Status Bar */}
      <footer className="h-6 bg-white border-t border-gray-200 flex items-center justify-between px-3 text-[11px] text-gray-500 shrink-0 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-200" />
            <span>就绪</span>
          </div>
          <div className="h-3 w-px bg-gray-300" />
          <span>单位: mm-kg-s-°C</span>
          <div className="h-3 w-px bg-gray-300" />
          <span>坐标: (124.5, -45.2, 0.0)</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-24 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-blue-500" />
            </div>
            <span>内存: 4.2GB / 16GB</span>
          </div>
          <div className="h-3 w-px bg-gray-300" />
          <span>版本: 2026.1.0-RC1</span>
        </div>
      </footer>

      {showWelcome && <WelcomeGuide onClose={() => setShowWelcome(false)} />}
    </div>
  );
}
