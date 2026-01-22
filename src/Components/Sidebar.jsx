import React, { useEffect, useRef, useState } from "react";
import { sidebarStyles } from "../assets/dummyStyle";
import { BiGlobe } from "react-icons/bi";
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Code,
  Coffee,
  Cpu,
  Database,
  Layout,
  Sparkles,
  Star,
  Target,
  Terminal,
  Trophy,
  X,
  Zap,
  Menu,
  XCircle,
  CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";
import questionsData from '../assets/dummyData';
import HeroSection from "./HeroSection";

export default function Sidebar() {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* --- Quiz States --- */
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });

  const asideRef = useRef(null);

  /* ---------------- RESPONSIVE ---------------- */
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- DATA ---------------- */
  const technologies = [
    { id: "html", name: "HTML", icon: <BiGlobe size={20} />, color: "bg-orange-50 text-orange-600 border-orange-200" },
    { id: "css", name: "CSS", icon: <Layout size={20} />, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { id: "js", name: "JavaScript", icon: <Code size={20} />, color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
    { id: "react", name: "React", icon: <Cpu size={20} />, color: "bg-cyan-50 text-cyan-600 border-cyan-200" },
    { id: "node", name: "Node.js", icon: <Code size={20} />, color: "bg-green-50 text-green-600 border-green-200" },
    { id: "mongodb", name: "MongoDB", icon: <Database size={20} />, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: "java", name: "Java", icon: <Coffee size={20} />, color: "bg-red-50 text-red-600 border-red-200" },
    { id: "python", name: "Python", icon: <Terminal size={20} />, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { id: "cpp", name: "C++", icon: <Code size={20} />, color: "bg-purple-50 text-purple-600 border-purple-200" },
    { id: "bootstrap", name: "Bootstrap", icon: <Layout size={20} />, color: "bg-pink-50 text-pink-600 border-pink-200" },
  ];

  const levels = [
    { id: "basic", name: "Basic", icon: <Star size={16} />, color: "bg-green-50 text-green-600" },
    { id: "intermediate", name: "Intermediate", icon: <Zap size={16} />, color: "bg-blue-50 text-blue-600" },
    { id: "advanced", name: "Advanced", icon: <Target size={16} />, color: "bg-purple-50 text-purple-600" },
  ];

  /* ---------------- HANDLERS ---------------- */
  const handleTechSelect = (techId) => {
    setSelectedTech(prev => (prev === techId ? null : techId));
    setSelectedLevel(null);
    setShowResults(false);
  };

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    
    if (questionsData[selectedTech] && questionsData[selectedTech][levelId]) {
      setQuestions(questionsData[selectedTech][levelId]);
    } else {
      setQuestions([]);
      toast.error("Questions coming soon!");
    }

    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleAnswerSelect = (index) => {
    if (userAnswers[currentQuestion] !== undefined) return;
    const updatedAnswers = { ...userAnswers, [currentQuestion]: index };
    setUserAnswers(updatedAnswers);
    
    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 600);
    } else {
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (updatedAnswers[idx] === q.correctAnswer) correctCount++;
      });
      const percentage = Math.round((correctCount / questions.length) * 100);
      setScore({ correct: correctCount, total: questions.length, percentage });
      setShowResults(true);
    }
  };

  const currentQ = questions[currentQuestion];
  const performance = (() => {
    if (score.percentage >= 80) return { text: "Excellent!", color: "text-green-600 bg-green-50", icon: <Trophy size={48}/> };
    if (score.percentage >= 60) return { text: "Good Job!", color: "text-yellow-600 bg-yellow-50", icon: <Award size={48}/> };
    return { text: "Keep Practicing!", color: "text-red-600 bg-red-50", icon: <Target size={48}/> };
  })();

  return (
    <div className={sidebarStyles.pageContainer}>
      {isSidebarOpen && (
        <div className={sidebarStyles.mobileOverlay} onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className={sidebarStyles.mainContainer}>
        <aside
          ref={asideRef}
          className={`${sidebarStyles.sidebar} ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={sidebarStyles.sidebarHeader}>
            <div className={sidebarStyles.headerDecoration1} />
            <div className={sidebarStyles.headerDecoration2} />
            <div className={sidebarStyles.logoContainer}>
              <div className={sidebarStyles.logoIcon}><BookOpen size={28} className="text-indigo-700" /></div>
              <div>
                <span className={sidebarStyles.logoTitle}>Tech Quiz Master</span>
                <p className={sidebarStyles.logoSubtitle}>Improve coding skills</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className={sidebarStyles.closeButton}><X size={20} /></button>
          </div>

          <div className={sidebarStyles.sidebarContent}>
            <div className={sidebarStyles.technologiesHeader}>
              <h2 className={sidebarStyles.technologiesTitle}>Technologies</h2>
              <span className={sidebarStyles.technologiesCount}>{technologies.length} options</span>
            </div>

            {technologies.map((tech) => (
              <div key={tech.id} className={sidebarStyles.techItem}>
                <button
                  onClick={() => handleTechSelect(tech.id)}
                  className={`${sidebarStyles.techButton} ${selectedTech === tech.id ? `${tech.color} ${sidebarStyles.techButtonSelected}` : sidebarStyles.techButtonNormal}`}
                >
                  <div className={sidebarStyles.techButtonContent}>
                    <span className={`${sidebarStyles.techIcon} ${tech.color}`}>{tech.icon}</span>
                    <span className={sidebarStyles.techName}>{tech.name}</span>
                  </div>
                  {selectedTech === tech.id ? <ChevronDown size={16} /> : <ChevronRight size={16} className="text-gray-400" />}
                </button>

                {selectedTech === tech.id && (
                  <div className={sidebarStyles.levelsContainer}>
                    {levels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => handleLevelSelect(level.id)}
                        className={`${sidebarStyles.levelButton} ${selectedLevel === level.id ? `${level.color} ${sidebarStyles.levelButtonSelected}` : sidebarStyles.levelButtonNormal}`}
                      >
                        <div className={sidebarStyles.levelButtonContent}>
                          <span className={`${sidebarStyles.levelIcon} ${selectedLevel === level.id ? "bg-white/40" : "bg-gray-100"}`}>{level.icon}</span>
                          <span>{level.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={sidebarStyles.sidebarFooter}>
            <div className={sidebarStyles.footerContent}>
              <div className={sidebarStyles.footerContentCenter}>
                <p>Master your skills one quiz at a time</p>
                <p className={sidebarStyles.footerHighlight}>Keep learning and keep going</p>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className={sidebarStyles.mainContent}>
          <div className={sidebarStyles.mobileHeader}>
            <button onClick={() => setIsSidebarOpen(true)} className={sidebarStyles.menuButton}><Menu size={20} /></button>
            <div className={sidebarStyles.mobileTitle}>
              {selectedTech ? technologies.find(t => t.id === selectedTech).name : "Tech Quiz Master"}
            </div>
          </div>

          {!selectedTech ? (
            <HeroSection />
          ) : !selectedLevel ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-10 space-y-4">
              <div className="p-6 bg-indigo-100 rounded-3xl animate-pulse text-indigo-600"><Star size={48} fill="currentColor"/></div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Pick Your Difficulty</h2>
              <p className="text-gray-500 max-w-sm">Please select a level from the sidebar to start the <strong>{selectedTech.toUpperCase()}</strong> assessment.</p>
            </div>
          ) : showResults ? (
            /* --- RESULTS UI --- */
            <div className={sidebarStyles.resultsContainer}>
              <div className={sidebarStyles.resultsContent}>
                <div className={sidebarStyles.resultsHeader}>
                  <div className={`${sidebarStyles.performanceIcon} ${performance.color}`}>{performance.icon}</div>
                  <h2 className={sidebarStyles.resultsTitle}>Quiz Completed!</h2>
                  <div className={`${sidebarStyles.performanceBadge} ${performance.color}`}>{performance.text}</div>
                  <div className={sidebarStyles.scoreGrid}>
                    <div className={sidebarStyles.scoreCard}>
                      <CheckCircle size={24} className="text-green-500" />
                      <p className={sidebarStyles.scoreNumber}>{score.correct}</p>
                      <p className={sidebarStyles.scoreLabel}>Correct</p>
                    </div>
                    <div className={sidebarStyles.scoreCard}>
                      <XCircle size={24} className="text-red-500" />
                      <p className={sidebarStyles.scoreNumber}>{score.total - score.correct}</p>
                      <p className={sidebarStyles.scoreLabel}>Incorrect</p>
                    </div>
                  </div>
                  <div className={sidebarStyles.scoreProgress}>
                    <div className={sidebarStyles.scoreProgressHeader}>
                      <span>Overall Score</span>
                      <span>{score.percentage}%</span>
                    </div>
                    <div className={sidebarStyles.scoreProgressBar}>
                      <div className={sidebarStyles.scoreProgressFill} style={{ width: `${score.percentage}%`, backgroundColor: score.percentage >= 60 ? '#10b981' : '#ef4444' }} />
                    </div>
                  </div>
                  <button onClick={() => setSelectedLevel(null)} className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Try Another</button>
                </div>
              </div>
            </div>
          ) : (
            /* --- QUIZ UI --- */
            <div className={sidebarStyles.quizContainer}>
              <div className={sidebarStyles.quizHeader}>
                <h1 className={sidebarStyles.quizTitle}>{selectedTech.toUpperCase()} - {selectedLevel}</h1>
                <span className={sidebarStyles.quizCounter}>Question {currentQuestion + 1} of {questions.length}</span>
                <div className={sidebarStyles.progressBar}>
                  <div className={sidebarStyles.progressFill} style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
                </div>
              </div>
              <div className={sidebarStyles.questionContainer}>
                <h2 className={sidebarStyles.questionText}>{currentQ?.question}</h2>
                <div className={sidebarStyles.optionsContainer}>
                  {currentQ?.options.map((option, index) => {
                    const isSelected = userAnswers[currentQuestion] === index;
                    const isCorrect = index === currentQ.correctAnswer;
                    const showFeedback = userAnswers[currentQuestion] !== undefined;
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`${sidebarStyles.optionButton} ${isSelected ? (isCorrect ? sidebarStyles.optionCorrect : sidebarStyles.optionIncorrect) : showFeedback && isCorrect ? sidebarStyles.optionCorrect : sidebarStyles.optionNormal}`}
                      >
                         <div className={sidebarStyles.optionContent}>
                            {showFeedback && (isCorrect ? <CheckCircle size={20} className="text-green-600" /> : isSelected ? <XCircle size={20} className="text-red-600" /> : null)}
                            <span className={sidebarStyles.optionText}>{option}</span>
                         </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}