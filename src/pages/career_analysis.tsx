import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, Download, Share2, CheckCircle, XCircle, Clock, TrendingUp, Target, AlertCircle, BookOpen, Lightbulb, Info, Calendar, Timer, Award, Star, Zap, Brain, Code2 } from 'lucide-react';

// Enhanced mock data with more details
const questionData = [
  { 
    question: 'Q1', 
    score: 5, 
    difficulty: 'Easy', 
    status: 'correct',
    topic: 'Array Manipulation',
    timeSpent: '3m 45s',
    maxScore: 10,
    hint: 'Well executed with optimal solution'
  },
  { 
    question: 'Q2', 
    score: 8, 
    difficulty: 'Medium', 
    status: 'correct',
    topic: 'Binary Search',
    timeSpent: '7m 20s',
    maxScore: 12,
    hint: 'Good approach, minor optimization possible'
  },
  { 
    question: 'Q3', 
    score: 12, 
    difficulty: 'Hard', 
    status: 'incorrect',
    topic: 'Dynamic Programming',
    timeSpent: '12m 15s',
    maxScore: 20,
    hint: 'Logical error in state transition'
  },
  { 
    question: 'Q4', 
    score: 6, 
    difficulty: 'Easy', 
    status: 'correct',
    topic: 'String Processing',
    timeSpent: '4m 10s',
    maxScore: 8,
    hint: 'Perfect implementation'
  },
  { 
    question: 'Q5', 
    score: 15, 
    difficulty: 'Hard', 
    status: 'correct',
    topic: 'Graph Traversal',
    timeSpent: '15m 30s',
    maxScore: 18,
    hint: 'Excellent problem-solving approach'
  },
  { 
    question: 'Q6', 
    score: 9, 
    difficulty: 'Medium', 
    status: 'incorrect',
    topic: 'Tree Operations',
    timeSpent: '8m 45s',
    maxScore: 15,
    hint: 'Edge case handling needed improvement'
  },
  { 
    question: 'Q7', 
    score: 7, 
    difficulty: 'Medium', 
    status: 'correct',
    topic: 'Hash Tables',
    timeSpent: '6m 30s',
    maxScore: 10,
    hint: 'Clean and efficient solution'
  },
  { 
    question: 'Q8', 
    score: 11, 
    difficulty: 'Hard', 
    status: 'correct',
    topic: 'System Design',
    timeSpent: '18m 20s',
    maxScore: 15,
    hint: 'Good scalability considerations'
  },
];

const skillsRadarData = [
  { skill: 'Data Structures', score: 85, description: 'Strong foundation in arrays, trees, and graphs' },
  { skill: 'Algorithms', score: 70, description: 'Good grasp of sorting and searching algorithms' },
  { skill: 'System Design', score: 60, description: 'Basic understanding, needs more practice' },
  { skill: 'Problem Solving', score: 90, description: 'Excellent analytical thinking' },
  { skill: 'Communication', score: 65, description: 'Clear explanation but could be more structured' },
  { skill: 'Code Quality', score: 80, description: 'Well-structured and readable code' },
];

const pieData = [
  { name: 'Correct', value: 78, color: '#10B981' },
  { name: 'Incorrect', value: 22, color: '#EF4444' }
];

const detailedStats = {
  overallScore: { value: 78, change: '+5%', trend: 'up', description: 'Above average performance' },
  questionsAnswered: { value: '8/10', completion: 80, description: '2 questions skipped due to time' },
  timeSpent: { value: '42m', target: '45m', saved: '3m', description: 'Efficient time management' },
  accuracy: { value: 78, change: '+12%', trend: 'up', description: 'Significant improvement from last attempt' }
};

const strengths = [
  { text: 'Excellent problem-solving approach', category: 'Problem Solving', impact: 'High' },
  { text: 'Strong understanding of data structures', category: 'Technical', impact: 'High' },
  { text: 'Optimal time complexity solutions', category: 'Algorithms', impact: 'Medium' },
  { text: 'Clean and readable code structure', category: 'Code Quality', impact: 'Medium' }
];

const improvements = [
  { text: 'Practice more complex algorithms', category: 'Algorithms', priority: 'High', estimatedTime: '2-3 weeks' },
  { text: 'Improve time complexity analysis', category: 'Technical', priority: 'High', estimatedTime: '1-2 weeks' },
  { text: 'Work on edge case handling', category: 'Problem Solving', priority: 'Medium', estimatedTime: '1 week' },
  { text: 'Better explanation of thought process', category: 'Communication', priority: 'Medium', estimatedTime: '2 weeks' }
];

const recommendations = [
  { text: 'Complete the Advanced Algorithms roadmap', platform: 'LeetCode', difficulty: 'Hard', timeEstimate: '4 weeks' },
  { text: 'Practice system design interviews daily', platform: 'Educative', difficulty: 'Medium', timeEstimate: '6 weeks' },
  { text: 'Join mock interview sessions', platform: 'Pramp', difficulty: 'Medium', timeEstimate: 'Ongoing' },
  { text: 'Study dynamic programming patterns', platform: 'AlgoExpert', difficulty: 'Hard', timeEstimate: '3 weeks' }
];

// Custom Tooltip Component
const CustomTooltip: React.FC<{ active?: boolean; payload?: any; label?: any; data?: any }> = ({ 
  active, payload, label, data 
}) => {
  if (active && payload && payload.length) {
    const questionInfo = questionData.find(q => q.question === label);
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-xl max-w-xs">
        <div className="font-semibold text-white mb-2">{label}</div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Score:</span>
            <span className="text-cyan-400">{payload[0].value}/{questionInfo?.maxScore}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Topic:</span>
            <span className="text-white">{questionInfo?.topic}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Time:</span>
            <span className="text-white">{questionInfo?.timeSpent}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-600">
            <span className="text-gray-300 text-xs">{questionInfo?.hint}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Enhanced Tooltip Component
const EnhancedTooltip: React.FC<{ children: React.ReactNode; content: string; position?: 'top' | 'bottom' | 'left' | 'right' }> = ({ 
  children, content, position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updateTooltipPosition = () => {
    if (!tooltipRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let newPosition = position;
    
    // Check vertical bounds first - most important for preventing scrollbars
    if (position === 'top' && rect.top < tooltipRect.height + 20) {
      newPosition = 'bottom';
    } else if (position === 'bottom' && rect.bottom > viewportHeight - tooltipRect.height - 20) {
      newPosition = 'top';
    }
    
    // Check horizontal bounds
    if (newPosition === 'top' || newPosition === 'bottom') {
      const tooltipCenter = rect.left + rect.width / 2;
      const tooltipHalfWidth = tooltipRect.width / 2;
      
      if (tooltipCenter - tooltipHalfWidth < 10) {
        // Too far left, align to left edge with margin
        tooltipRef.current.style.left = '10px';
        tooltipRef.current.style.transform = 'translateX(0)';
      } else if (tooltipCenter + tooltipHalfWidth > viewportWidth - 10) {
        // Too far right, align to right edge with margin
        tooltipRef.current.style.left = 'auto';
        tooltipRef.current.style.right = '10px';
        tooltipRef.current.style.transform = 'translateX(0)';
      }
    }
    
    // For left/right tooltips, switch to top/bottom if too close to edges
    if ((newPosition === 'left' && rect.left < 200) || (newPosition === 'right' && rect.right > viewportWidth - 200)) {
      newPosition = rect.top > viewportHeight / 2 ? 'top' : 'bottom';
    }
    
    setTooltipPosition(newPosition);
  };

  React.useEffect(() => {
    if (isVisible) {
      setTimeout(updateTooltipPosition, 0);
    }
  }, [isVisible]);

  const getPositionClasses = (pos: string) => {
    switch (pos) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = (pos: string) => {
    switch (pos) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 -mt-1 border-r border-b';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l border-t';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 -ml-1 border-t border-r';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 -mr-1 border-b border-l';
      default:
        return 'top-full left-1/2 -translate-x-1/2 -mt-1 border-r border-b';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl border border-gray-700 max-w-xs whitespace-pre-wrap animate-in fade-in-0 zoom-in-95 duration-200 ${getPositionClasses(tooltipPosition)}`}
          style={{ 
            wordBreak: 'break-word',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 border-gray-700 transform rotate-45 ${getArrowClasses(tooltipPosition)}`}></div>
        </div>
      )}
    </div>
  );
};

const Interview_Analysis: React.FC = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [questionHoverPosition, setQuestionHoverPosition] = useState<{ [key: string]: 'top' | 'bottom' }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Hard': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <EnhancedTooltip content="Back to Dashboard">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-105 flex-shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </EnhancedTooltip>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold truncate">Interview Analysis</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Technical Interview • Dec 7, 2024</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <EnhancedTooltip content="Download PDF Report">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Report</span>
            </button>
          </EnhancedTooltip>
          <EnhancedTooltip content="Share Results">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </EnhancedTooltip>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-full">
        {/* Enhanced Stats Cards */}
        <div 
          id="stats"
          data-animate
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-1000 ${
            isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <EnhancedTooltip content={detailedStats.overallScore.description}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 rounded-lg group-hover:bg-green-500 transition-colors">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400">Overall Score</span>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  {detailedStats.overallScore.change}
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{detailedStats.overallScore.value}%</div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${detailedStats.overallScore.value}%` }}
                ></div>
              </div>
            </div>
          </EnhancedTooltip>

          <EnhancedTooltip content={detailedStats.questionsAnswered.description}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-gray-400">Questions Answered</span>
              </div>
              <div className="text-3xl font-bold mb-2">{detailedStats.questionsAnswered.value}</div>
              <div className="text-gray-400 text-sm">{detailedStats.questionsAnswered.completion}% completion rate</div>
            </div>
          </EnhancedTooltip>

          <EnhancedTooltip content={detailedStats.timeSpent.description}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-600 rounded-lg group-hover:bg-purple-500 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-gray-400">Time Taken</span>
              </div>
              <div className="text-3xl font-bold mb-2">{detailedStats.timeSpent.value}</div>
              <div className="text-green-400 text-sm">{detailedStats.timeSpent.saved} under time</div>
            </div>
          </EnhancedTooltip>

          <EnhancedTooltip content={detailedStats.accuracy.description}>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-600 rounded-lg group-hover:bg-orange-500 transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-gray-400">Accuracy Rate</span>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  {detailedStats.accuracy.change}
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{detailedStats.accuracy.value}%</div>
              <div className="text-green-400 text-sm">from last interview</div>
            </div>
          </EnhancedTooltip>
        </div>

        {/* Enhanced Question-wise Performance */}
        <div 
          id="questions"
          data-animate
          className={`mb-8 transition-all duration-1000 delay-300 ${
            isVisible.questions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <BarChart className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold">Question-wise Performance</h2>
            </div>
            
            {/* Enhanced Bar Chart */}
            <div className="mb-8">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={questionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="question" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    domain={[0, 20]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="score" 
                    fill="#06B6D4" 
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Enhanced Question Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
              {questionData.map((q, index) => (
                <div 
                  key={index} 
                  className="group relative"
                  onMouseEnter={(e) => {
                    setHoveredQuestion(q.question);
                    // Check if we're in bottom half of viewport
                    const rect = e.currentTarget.getBoundingClientRect();
                    const isBottomHalf = rect.bottom > window.innerHeight - 200;
                    setQuestionHoverPosition(prev => ({
                      ...prev,
                      [q.question]: isBottomHalf ? 'top' : 'bottom'
                    }));
                  }}
                  onMouseLeave={() => setHoveredQuestion(null)}
                >
                  <div className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-650 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 min-w-0">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="font-medium flex-shrink-0">{q.question}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${getDifficultyColor(q.difficulty)}`}>
                        {q.difficulty}
                      </span>
                    </div>
                    {q.status === 'correct' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    )}
                  </div>
                  
                  {/* Hover Details - Smart positioning to prevent vertical overflow */}
                  {hoveredQuestion === q.question && (
                    <div 
                      className={`absolute left-0 right-0 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-xl z-10 animate-in slide-in-from-top-2 duration-200 max-w-sm ${
                        questionHoverPosition[q.question] === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
                      }`}
                      style={{
                        maxHeight: '120px',
                        overflowY: 'auto'
                      }}
                    >
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Topic:</span>
                          <span className="text-white truncate ml-2">{q.topic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Score:</span>
                          <span className="text-cyan-400">{q.score}/{q.maxScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Time:</span>
                          <span className="text-white">{q.timeSpent}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Performance Overview & Skills Assessment */}
        <div 
          id="overview"
          data-animate
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 transition-all duration-1000 delay-600 ${
            isVisible.overview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Enhanced Performance Overview */}
          <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold">Performance Overview</h3>
            </div>
            <div className="flex items-center justify-center mb-6">
              <ResponsiveContainer width={250} height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Correct (78%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Incorrect (22%)</span>
              </div>
            </div>
          </div>

          {/* Enhanced Skills Assessment */}
          <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-bold">Skills Assessment</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsRadarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis 
                  dataKey="skill" 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-xl">
                          <div className="font-semibold text-white">{data.skill}</div>
                          <div className="text-cyan-400">{data.score}%</div>
                          <div className="text-xs text-gray-300 mt-1">{data.description}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced Feedback Sections */}
        <div 
          id="feedback"
          data-animate
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 transition-all duration-1000 delay-900 ${
            isVisible.feedback ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Enhanced Strengths */}
          <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-green-400">What You Did Well</h3>
            </div>
            <div className="space-y-3">
              {strengths.map((strength, index) => (
                <EnhancedTooltip key={index} content={`Impact: ${strength.impact} • Category: ${strength.category}`}>
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-all duration-200 cursor-pointer">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{strength.text}</span>
                  </div>
                </EnhancedTooltip>
              ))}
            </div>
          </div>

          {/* Enhanced Areas to Improve */}
          <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-bold text-orange-400">Areas to Improve</h3>
            </div>
            <div className="space-y-3">
              {improvements.map((improvement, index) => (
                <EnhancedTooltip key={index} content={`Estimated time: ${improvement.estimatedTime} • Category: ${improvement.category}`}>
                  <div className="p-3 bg-orange-500/10 rounded-lg hover:bg-orange-500/20 transition-all duration-200 cursor-pointer">
                    <div className="flex items-start gap-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 flex-1">{improvement.text}</span>
                      <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(improvement.priority)}`}>
                        {improvement.priority}
                      </span>
                    </div>
                  </div>
                </EnhancedTooltip>
              ))}
            </div>
          </div>

          {/* Enhanced AI Recommendations */}
          <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold text-blue-400">AI Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <EnhancedTooltip key={index} content={`Platform: ${recommendation.platform} • Difficulty: ${recommendation.difficulty} • Time: ${recommendation.timeEstimate}`}>
                  <div className="p-3 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-all duration-200 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <span className="text-gray-300">{recommendation.text}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-5">
                      <span className="text-xs text-blue-400">{recommendation.platform}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{recommendation.timeEstimate}</span>
                    </div>
                  </div>
                </EnhancedTooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Action Plan */}
        <div 
          id="action-plan"
          data-animate
          className={`mt-8 transition-all duration-1000 delay-1200 ${
            isVisible['action-plan'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gray-800 rounded-xl p-8 hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Target className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-bold">Your Improvement Plan</h3>
              </div>
              <p className="text-gray-400">Personalized roadmap based on your performance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <EnhancedTooltip content="Focus on mastering complex algorithmic patterns and optimization techniques">
                <div className="text-center p-6 bg-gray-700 rounded-xl hover:bg-gray-650 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 hover:bg-blue-500 transition-colors">
                    1
                  </div>
                  <h4 className="font-semibold mb-2 text-blue-400">Master Algorithms</h4>
                  <p className="text-sm text-gray-400">
                    Focus on dynamic programming and graph algorithms for the next 2 weeks
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-400">
                    <Clock className="w-3 h-3" />
                    <span>2 weeks</span>
                  </div>
                </div>
              </EnhancedTooltip>
              
              <EnhancedTooltip content="Learn to design scalable systems and understand architectural trade-offs">
                <div className="text-center p-6 bg-gray-700 rounded-xl hover:bg-gray-650 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 hover:bg-purple-500 transition-colors">
                    2
                  </div>
                  <h4 className="font-semibold mb-2 text-purple-400">System Design</h4>
                  <p className="text-sm text-gray-400">
                    Practice designing scalable systems with focus on trade-offs
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-1 text-xs text-purple-400">
                    <Clock className="w-3 h-3" />
                    <span>4 weeks</span>
                  </div>
                </div>
              </EnhancedTooltip>
              
              <EnhancedTooltip content="Regular practice sessions to build confidence and improve timing">
                <div className="text-center p-6 bg-gray-700 rounded-xl hover:bg-gray-650 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 hover:bg-green-500 transition-colors">
                    3
                  </div>
                  <h4 className="font-semibold mb-2 text-green-400">Mock Interviews</h4>
                  <p className="text-sm text-gray-400">
                    Take 3 mock interviews per week to build confidence and timing
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-1 text-xs text-green-400">
                    <Clock className="w-3 h-3" />
                    <span>Ongoing</span>
                  </div>
                </div>
              </EnhancedTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview_Analysis;