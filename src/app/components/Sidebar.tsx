import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Box, 
  Database, 
  Zap, 
  Layers, 
  Settings2, 
  FileText, 
  ChevronUp, 
  Folder,
  CircleDot,
  Cpu,
  Thermometer,
  Anchor,
  Activity,
  GitBranch,
  Filter,
  MoreVertical,
  Plus
} from "lucide-react";

interface TreeItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  children?: TreeItem[];
  expanded?: boolean;
  status?: "done" | "warning" | "error" | "none";
}

export function Sidebar() {
  const [projectTree, setProjectTree] = useState<TreeItem[]>([
    {
      id: "geom",
      label: "几何模型 (Engine_Assembly)",
      icon: Box,
      expanded: true,
      children: [
        { id: "p1", label: "A板 (Upper_Plate)", status: "done" },
        { id: "p2", label: "B板 (Lower_Plate)", status: "done" },
        { id: "p3", label: "镶件_1 (Core_Insert)", status: "done" },
        { id: "p4", label: "镶件_2 (Cavity_Insert)", status: "done" },
        { id: "p5", label: "支柱 (Support_Pillar)", status: "done" },
      ]
    },
    {
      id: "mat",
      label: "材料属性",
      icon: Database,
      expanded: true,
      children: [
        { id: "m1", label: "Steel P20 (45HRC)", status: "done" },
        { id: "m2", label: "Aluminium 7075", status: "done" },
      ]
    },
    {
      id: "physics",
      label: "物理场: 线性静力分析",
      icon: Zap,
      expanded: true,
      children: [
        {
          id: "bc",
          label: "边界条件",
          icon: Anchor,
          expanded: true,
          children: [
            { id: "bc1", label: "固定约束_1 (底面)", status: "done" },
            { id: "bc2", label: "位移约束_1 (侧向)", status: "none" },
          ]
        },
        {
          id: "load",
          label: "载荷设置",
          icon: Activity,
          expanded: true,
          children: [
            { id: "l1", label: "合模力 (1200 kN)", status: "done" },
            { id: "l2", label: "射出压力 (140 MPa)", status: "done" },
          ]
        },
        {
          id: "contact",
          label: "相互作用",
          icon: GitBranch,
          expanded: false,
          children: [
            { id: "c1", label: "绑定接触 (A-B Plate)" },
            { id: "c2", label: "摩擦接触 (Insert-Cavity)" },
          ]
        }
      ]
    },
    {
      id: "results",
      label: "分析结果",
      icon: FileText,
      expanded: true,
      children: [
        { id: "r1", label: "位移云图 (Displacement)", status: "done" },
        { id: "r2", label: "应力云图 (Von Mises)", status: "done" },
        { id: "r3", label: "安全系数 (Safety Factor)", status: "done" },
      ]
    }
  ]);

  const toggleExpand = (id: string) => {
    const updateTree = (items: TreeItem[]): TreeItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, expanded: !item.expanded };
        }
        if (item.children) {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });
    };
    setProjectTree(updateTree(projectTree));
  };

  const renderTreeItem = (item: TreeItem, level: number = 0) => {
    const Icon = item.icon || CircleDot;
    return (
      <div key={item.id} className="select-none">
        <div 
          className={`flex items-center h-8 gap-1.5 px-2 hover:bg-blue-50 cursor-pointer group rounded-sm transition-all mx-1 mb-0.5 ${
            item.status === 'error' ? 'text-red-600' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => toggleExpand(item.id)}
        >
          {item.children ? (
            item.expanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />
          ) : (
            <span className="w-3.5" />
          )}
          <Icon size={16} strokeWidth={item.icon ? 2 : 1.5} className={item.icon ? "text-blue-600" : "text-gray-400"} />
          <span className="text-[12px] font-medium truncate flex-1">{item.label}</span>
          {item.status === "done" && <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1" />}
          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-600 transition-all">
            <MoreVertical size={12} />
          </button>
        </div>
        {item.children && item.expanded && (
          <div>
            {item.children.map(child => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-9 flex items-center justify-between px-3 border-b border-gray-100 bg-gray-50/50">
        <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">模型树</span>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-200 rounded text-gray-400 transition-colors" title="展开所有">
            <ChevronUp size={14} />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded text-gray-400 transition-colors" title="搜索">
            <Filter size={14} />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded text-gray-400 transition-colors" title="添加分析">
            <Plus size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {projectTree.map(item => renderTreeItem(item))}
      </div>
    </div>
  );
}
