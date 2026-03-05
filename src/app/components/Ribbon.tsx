import React, { useState } from "react";
import { 
  FilePlus, 
  FolderOpen, 
  Save, 
  Undo2, 
  Redo2,
  Trash2,
  Scissors,
  Copy,
  PlusCircle,
  Play,
  Settings,
  Grid3X3,
  Box,
  Layers,
  ChevronDown,
  Wand2,
  Zap,
  Cpu,
  BarChart3,
  Eye,
  EyeOff,
  Maximize2,
  Database,
  Search,
  CheckCircle2,
  Clock,
  PlayCircle,
  FileText,
  MousePointer2,
  Rotate3d,
  Move3d,
  ZoomIn,
  Grid
} from "lucide-react";

interface RibbonProps {
  activeTab: string;
}

export function Ribbon({ activeTab }: RibbonProps) {
  const [activeGroup, setActiveGroup] = useState(0);

  const getToolGroups = () => {
    switch (activeTab) {
      case "/model-processing":
        return [
          {
            label: "导入与文件",
            tools: [
              { icon: FilePlus, label: "新建工程" },
              { icon: FolderOpen, label: "导入模型" },
              { icon: Save, label: "保存" },
            ]
          },
          {
            label: "几何清理",
            tools: [
              { icon: Wand2, label: "一键清理" },
              { icon: Scissors, label: "干涉检查" },
              { icon: Trash2, label: "倒角去除" },
              { icon: Layers, label: "批量修复" },
            ]
          },
          {
            label: "几何建模",
            tools: [
              { icon: PlusCircle, label: "拉伸" },
              { icon: Rotate3d, label: "旋转" },
              { icon: Box, label: "布尔操作" },
            ]
          },
          {
            label: "网格划分",
            tools: [
              { icon: Grid3X3, label: "自动划分" },
              { icon: Settings, label: "划分设置" },
            ]
          }
        ];
      case "/instant-sim":
        return [
          {
            label: "分析设置",
            tools: [
              { icon: Zap, label: "即时结构" },
              { icon: Zap, label: "即时热场" },
              { icon: Zap, label: "热应力" },
            ]
          },
          {
            label: "载荷约束",
            tools: [
              { icon: PlusCircle, label: "固定支撑" },
              { icon: PlusCircle, label: "集中力" },
              { icon: PlusCircle, label: "远程位移" },
              { icon: PlusCircle, label: "保压压力" },
            ]
          },
          {
            label: "网格质量",
            tools: [
              { icon: Grid, label: "背景网格" },
              { icon: Eye, label: "网格可见" },
            ]
          },
          {
            label: "求解",
            tools: [
              { icon: Play, label: "快速计算", primary: true },
              { icon: Clock, label: "进度监控" },
            ]
          }
        ];
      case "/automated-sim":
        return [
          {
            label: "BOM管理",
            tools: [
              { icon: Database, label: "导入BOM" },
              { icon: Search, label: "AI识别" },
              { icon: Layers, label: "图层解析" },
            ]
          },
          {
            label: "自动流程",
            tools: [
              { icon: PlayCircle, label: "一键分析", primary: true },
              { icon: CheckCircle2, label: "场景匹配" },
              { icon: Settings, label: "流程设置" },
            ]
          },
          {
            label: "报告生成",
            tools: [
              { icon: FileText, label: "生成报告" },
              { icon: FileText, label: "导出Excel" },
            ]
          }
        ];
      case "/fine-sim":
        return [
          {
            label: "高阶物理场",
            tools: [
              { icon: BarChart3, label: "非线性静力" },
              { icon: BarChart3, label: "瞬态热分析" },
              { icon: BarChart3, label: "疲劳分析" },
            ]
          },
          {
            label: "精细网格",
            tools: [
              { icon: Grid3X3, label: "局部加密" },
              { icon: Grid3X3, label: "网格度量" },
            ]
          },
          {
            label: "高性能求解",
            tools: [
              { icon: Cpu, label: "远程求解" },
              { icon: Settings, label: "求解器配置" },
            ]
          }
        ];
      default:
        return [];
    }
  };

  const groups = getToolGroups();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm flex items-center h-[104px] px-4 gap-6 shrink-0 z-40 overflow-x-auto no-scrollbar">
      {/* Undo/Redo/Quick Actions */}
      <div className="flex flex-col justify-center gap-2 pr-4 border-r border-gray-100">
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors" title="撤消 (Ctrl+Z)">
          <Undo2 size={18} />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors" title="重做 (Ctrl+Y)">
          <Redo2 size={18} />
        </button>
      </div>

      {groups.map((group, groupIdx) => (
        <div key={groupIdx} className="flex flex-col h-full py-2">
          <div className="flex-1 flex items-center gap-1">
            {group.tools.map((tool, toolIdx) => (
              <button
                key={toolIdx}
                className={`flex flex-col items-center justify-center gap-1.5 w-[72px] h-[64px] rounded transition-all group ${
                  tool.primary 
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-sm border border-blue-100" 
                    : "hover:bg-gray-50 text-gray-600 hover:text-blue-600"
                }`}
              >
                <div className={`p-1 rounded-md transition-colors ${tool.primary ? "bg-blue-100" : "group-hover:bg-blue-50"}`}>
                  <tool.icon size={20} strokeWidth={tool.primary ? 2.5 : 2} />
                </div>
                <span className="text-[11px] font-medium leading-none text-center px-1 truncate w-full">
                  {tool.label}
                </span>
              </button>
            ))}
          </div>
          <div className="h-4 flex items-center justify-center mt-1">
            <span className="text-[10px] text-gray-400 font-medium tracking-tight uppercase px-2 py-0.5 bg-gray-50 rounded">
              {group.label}
            </span>
          </div>
        </div>
      ))}

      {/* View Tools - Static for all simulation modes */}
      <div className="h-full border-l border-gray-100 flex flex-col py-2 px-4 ml-auto">
        <div className="flex-1 flex items-center gap-1">
          <button className="flex flex-col items-center justify-center gap-1.5 w-12 h-[64px] rounded hover:bg-gray-50 text-gray-500 hover:text-blue-600">
            <Eye size={18} />
            <span className="text-[10px]">显示</span>
          </button>
          <div className="grid grid-cols-2 gap-1 p-1">
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500"><Rotate3d size={14} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500"><Move3d size={14} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500"><ZoomIn size={14} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500"><Maximize2 size={14} /></button>
          </div>
        </div>
        <div className="h-4 flex items-center justify-center mt-1">
          <span className="text-[10px] text-gray-400 font-medium tracking-tight uppercase px-2 py-0.5 bg-gray-50 rounded">
            视图
          </span>
        </div>
      </div>
    </div>
  );
}
