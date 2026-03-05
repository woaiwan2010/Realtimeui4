import { motion } from "motion/react";
import { Link } from "react-router";
import { Play, FileText, ArrowRight, Layers, Zap, Cpu, Settings, HelpCircle, Box } from "lucide-react";

export default function Welcome() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const cases = [
    { title: "发动机缸体热分析", image: "figma:asset/engine_block.png", desc: "稳态热分析" },
    { title: "涡轮叶片应力", image: "figma:asset/turbine.png", desc: "结构静力学" },
    { title: "PCB板跌落测试", image: "figma:asset/pcb_drop.png", desc: "显式动力学" },
    { title: "汽车连杆疲劳", image: "figma:asset/conrod.png", desc: "疲劳寿命" },
    { title: "手机外壳注塑", image: "figma:asset/phone_mold.png", desc: "模流分析" },
    { title: "散热器优化", image: "figma:asset/heatsink.png", desc: "热流耦合" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">INTESIM <span className="font-light text-slate-400">高易用结构仿真软件</span></h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <HelpCircle size={20} />
            <span>帮助中心</span>
          </button>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <Settings size={20} />
            <span>设置</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-12">
          
          {/* Hero Section */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-16"
          >
            <motion.h2 variants={item} className="text-4xl font-light mb-6">欢迎使用新一代仿真平台</motion.h2>
            <motion.p variants={item} className="text-xl text-slate-400 max-w-2xl mb-8">
              无需网格划分，面向设计工程师的即时仿真工具。支持模型处理、即时仿真与自动化仿真流程无缝切换。
            </motion.p>
            
            <motion.div variants={item} className="flex gap-4">
              <Link to="/workspace" className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-3 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40">
                <Box size={20} />
                <span>开始新项目</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold flex items-center gap-3 transition-all border border-slate-700">
                <FileText size={20} />
                <span>打开最近文件</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Workflow Guide */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Layers, title: "1. 模型处理", desc: "导入几何模型，进行清理、修复与简化，准备仿真几何。" },
              { icon: Zap, title: "2. 即时仿真", desc: "无需画网格，直接施加载荷与边界条件，快速获取设计反馈。" },
              { icon: Cpu, title: "3. 自动化仿真", desc: "基于场景模板，一键执行复杂的标准化仿真流程，自动生成报告。" },
            ].map((step, i) => (
              <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                  <step.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Highlight Cases */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-2xl font-light">亮点案例展示</h3>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">查看更多案例 <ArrowRight size={14}/></a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl bg-slate-800 aspect-video cursor-pointer border border-slate-700 hover:border-blue-500/50 transition-colors">
                  {/* Placeholder for image - using gradient for now as no real assets provided yet */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <h4 className="text-lg font-semibold text-white mb-1">{c.title}</h4>
                    <p className="text-sm text-slate-300 flex items-center gap-2">
                      <Play size={14} className="fill-current" />
                      {c.desc}
                    </p>
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Play size={20} className="fill-white ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
