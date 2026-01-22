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
  CheckCircle,
  BrainCircuit,
  ZapIcon,
  MousePointer2
} from "lucide-react";
import toast from "react-hot-toast";
import questionsData from '../assets/dummyData';

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

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isSidebarOpen]);

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
      toast.error("Questions not found for this selection");
    }

    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleAnswerSelect = (index) => {
    const updatedAnswers = { ...userAnswers, [currentQuestion]: index };
    setUserAnswers(updatedAnswers);
    
    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 600);
    } else {
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (updatedAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      
      const percentage = Math.round((correctCount / questions.length) * 100);
      setScore({ correct: correctCount, total: questions.length, percentage });
      setShowResults(true);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const currentQ = questions[currentQuestion];
  
  const getPerformance = () => {
    if (score.percentage >= 80) return { text: "Excellent!", color: "text-green-600 bg-green-50", icon: <Trophy size={48}/> };
    if (score.percentage >= 60) return { text: "Good Job!", color: "text-yellow-600 bg-yellow-50", icon: <Award size={48}/> };
    return { text: "Keep Practicing!", color: "text-red-600 bg-red-50", icon: <Target size={48}/> };
  };
  const performance = getPerformance();

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
                <p className={sidebarStyles.logoSubtitle}>Improve your coding skills</p>
              </div>
            </div>
            <button onClick={toggleSidebar} className={sidebarStyles.closeButton}><X size={20} /></button>
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
        </aside>

        <main className={sidebarStyles.mainContent}>
          <div className={sidebarStyles.mobileHeader}>
            <button onClick={toggleSidebar} className={sidebarStyles.menuButton}><Menu size={20} /></button>
            <div className={sidebarStyles.mobileTitle}>
              {selectedTech ? technologies.find(t => t.id === selectedTech).name : "Tech Quiz Master"}
            </div>
          </div>

          {!selectedTech ? (
            /* --- HERO SECTION --- */
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-4">
                  <Sparkles size={16} className="mr-2" /> AI Powered Platform
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  Master Your Coding Skills with <span className="text-indigo-600">AI Quizzes</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Test your knowledge across 10+ modern technologies. From Basic syntax to Advanced architecture, we help you prepare for interviews and exams.
                </p>
              </div>

              {/* INFORMATION CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <BrainCircuit size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Smart Learning</h3>
                  <p className="text-sm text-gray-500">Curated questions designed to challenge your understanding of core concepts.</p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <ZapIcon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-500">Get immediate feedback on your answers and a full performance score at the end.</p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <MousePointer2 size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Multi-Level</h3>
                  <p className="text-sm text-gray-500">Choose between Basic, Intermediate, or Advanced tracks to match your expertise.</p>
                </div>
              </div>

              <div className="mt-12 animate-bounce flex flex-col items-center text-gray-400">
                 <p className="text-sm font-medium mb-2">Select a technology from the sidebar to start</p>
                 <ChevronRight className="rotate-90 md:-rotate-180" />
              </div>
            </div>
          ) : !selectedLevel ? (
            <div className={sidebarStyles.levelSelectionContainer}>
              <div className={sidebarStyles.levelSelectionContent}>
                <h2 className={sidebarStyles.techSelectionTitle}>{technologies.find(t => t.id === selectedTech).name} Quiz</h2>
                <p>Select a difficulty level to begin your challenge.</p>
              </div>
            </div>
          ) : showResults ? (
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
                  <button onClick={() => setSelectedLevel(null)} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg">Try Another</button>
                </div>
              </div>
            </div>
          ) : currentQ ? (
            <div className={sidebarStyles.quizContainer}>
              <div className={sidebarStyles.quizHeader}>
                <h1 className={sidebarStyles.quizTitle}>{technologies.find(t => t.id === selectedTech).name} - {selectedLevel}</h1>
                <span className={sidebarStyles.quizCounter}>Question {currentQuestion + 1} of {questions.length}</span>
                <div className={sidebarStyles.progressBar}>
                  <div className={sidebarStyles.progressFill} style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
                </div>
              </div>
              <div className={sidebarStyles.questionContainer}>
                <h2 className={sidebarStyles.questionText}>{currentQ.question}</h2>
                <div className={sidebarStyles.optionsContainer}>
                  {currentQ.options.map((option, index) => {
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
                            {showFeedback && (isCorrect ? <CheckCircle size={20} /> : isSelected ? <XCircle size={20} /> : null)}
                            <span className={sidebarStyles.optionText}>{option}</span>
                         </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className={sidebarStyles.loadingContainer}>Loading questions...</div>
          )}
        </main>
      </div>
    </div>
  );
}