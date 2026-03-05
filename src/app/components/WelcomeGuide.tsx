import React, { useState } from "react";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Cpu, 
  Box, 
  PlayCircle, 
  FileText,
  HelpCircle,
  Play,
  ArrowRight,
  MonitorPlay,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WelcomeGuideProps {
  onClose: () => void;
}

export function WelcomeGuide({ onClose }: WelcomeGuideProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "欢迎使用 INTESIM",
      subtitle: "高易用结构仿真软件 (2026.1)",
      content: "INTESIM 是一款专为 CAD 设计师和结构工程师打造的即时仿真平台。无论是快速方案验证还是精细工程分析，INTESIM 都能为您提供高效的工具集。",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      icon: <Zap className="text-blue-500" size={32} />
    },
    {
      title: "即时仿真 (Instant Simulation)",
      subtitle: "边设计，边仿真",
      content: "无需复杂的网格划分，基于八叉树自适应算法，即时获取结构和热场反馈。设计师可以直接在几何模型上施加载荷并查看结果。",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      icon: <Zap className="text-yellow-500" size={32} />
    },
    {
      title: "自动化仿真 (Auto-Flow)",
      subtitle: "流程驱动，效率至上",
      content: "针对模具行业设计的自动化流程。通过 AI 零件识别和 BOM 解析，自动构建仿真场景。支持两板模、三板模等多种工艺场景的一键分析。",
      image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800",
      icon: <Cpu className="text-purple-500" size={32} />
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex h-[520px]"
      >
        {/* Left: Illustration */}
        <div className="w-1/2 relative bg-blue-50">
          <AnimatePresence mode="wait">
            <motion.img 
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={steps[step].image} 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Simulation Illustration"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
              {steps[step].icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{steps[step].title}</h3>
            <p className="text-sm text-white/80">{steps[step].subtitle}</p>
          </div>
        </div>

        {/* Right: Content & Actions */}
        <div className="w-1/2 p-10 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>

          <div className="flex-1">
            <h2 className="text-gray-900 text-xl font-bold mb-4">新手引导</h2>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-gray-600 text-[15px] leading-relaxed"
                >
                  {steps[step].content}
                </motion.p>
              </AnimatePresence>
              
              <div className="grid grid-cols-2 gap-3 mt-8">
                <button className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-100 text-left group">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <MonitorPlay size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-700">观看视频</span>
                    <span className="text-[10px] text-gray-400">了解核心优势</span>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-100 text-left group">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-600 shadow-sm transition-colors group-hover:bg-green-600 group-hover:text-white">
                    <BookOpen size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-700">帮助文档</span>
                    <span className="text-[10px] text-gray-400">快速查阅手册</span>
                  </div>
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">亮点案例展示</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-center overflow-hidden grayscale hover:grayscale-0">
                      <img 
                        src={`https://images.unsplash.com/photo-${1581092120000 + i * 100}?auto=format&fit=crop&q=80&w=100`} 
                        className="w-full h-full object-cover" 
                        alt="Case" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all ${step === i ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-200'}`}
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              {step > 0 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  返回
                </button>
              )}
              {step < steps.length - 1 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
                >
                  下一步
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
                >
                  开始使用
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
