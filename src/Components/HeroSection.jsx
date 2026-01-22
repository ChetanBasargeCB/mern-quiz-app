import React from "react";
import { Sparkles, BrainCircuit, ZapIcon, MousePointer2, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-12 max-w-5xl mx-auto py-20">
      <div className="space-y-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-100 shadow-sm">
          <Sparkles size={16} className="mr-2" /> AI-Driven Learning Platform
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
          Level Up Your Code <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Smart AI Quizzes</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Challenge yourself with interactive tests in 10+ modern tech stacks. 
          Get instant analysis and personalized feedback to bridge your knowledge gaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-xl hover:scale-105 transition-all">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <BrainCircuit size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Concept Mastery</h3>
          <p className="text-gray-500 text-sm">Deep-dive questions designed by AI to test logic, not just memory.</p>
        </div>

        <div className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-xl hover:scale-105 transition-all">
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-amber-500 group-hover:text-white transition-colors">
            <ZapIcon size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Live Feedback</h3>
          <p className="text-gray-500 text-sm">Real-time correction and performance tracking to keep you motivated.</p>
        </div>

        <div className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-xl hover:scale-105 transition-all">
          <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <MousePointer2 size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Progression</h3>
          <p className="text-gray-500 text-sm">Adaptive levels from Junior syntax to Senior System Design.</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 text-indigo-400 font-semibold animate-pulse mt-10">
        <span>Select a language from the menu to start</span>
        <ChevronRight size={32} className="rotate-90" />
      </div>
    </div>
  );
};

export default HeroSection;