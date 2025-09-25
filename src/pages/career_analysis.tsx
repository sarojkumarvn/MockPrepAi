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
  { name: 'Correct', value: 78, color: '#059669' },
  { name: 'Incorrect', value: 22, color: '#DC2626' }
];

const detailedStats = {
  overallScore: { value: 78, change: '+5%', trend: 'up', description: 'Above average performance compared to peers' },
  questionsAnswered: { value: '8/10', completion: 80, description: '2 questions skipped due to time constraints' },
  timeSpent: { value: '42m', target: '45m', saved: '3m', description: 'Efficient time management throughout the session' },
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

// Custom Chart Tooltip Component
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const questionInfo = questionData.find(q => q.question === label);
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-xs">
        <div className="font-semibold text-gray-800 mb-2">{label}</div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Score:</span>
            <span className="text-blue-600 font-medium">{payload[0].value}/{questionInfo?.maxScore}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Topic:</span>
            <span className="text-gray-800">{questionInfo?.topic}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="text-gray-800">{questionInfo?.timeSpent}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <span className="text-gray-500 text-xs">{questionInfo?.hint}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Enhanced Tooltip Component with Better Positioning
const EnhancedTooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [finalPosition, setFinalPosition] = useState(position);
  const tooltipRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePosition = () => {
    if (!mounted || !tooltipRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    let newPosition = position;
    
    // Check if tooltip would overflow viewport
    if (position === 'top' && containerRect.top < tooltipRect.height + 10) {
      newPosition = 'bottom';
    } else if (position === 'bottom' && containerRect.bottom + tooltipRect.height + 10 > viewport.height) {
      newPosition = 'top';
    } else if (position === 'left' && containerRect.left < tooltipRect.width + 10) {
      newPosition = 'right';
    } else if (position === 'right' && containerRect.right + tooltipRect.width + 10 > viewport.width) {
      newPosition = 'left';
    }
    
    setFinalPosition(newPosition);
  };

  useEffect(() => {
    if (isVisible && mounted) {
      const timer = setTimeout(calculatePosition, 0);
      return () => clearTimeout(timer);
    }
  }, [isVisible, mounted]);

  const getTooltipClasses = () => {
    const base = "absolute z-50 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-xl max-w-xs break-words";
    
    switch (finalPosition) {
      case 'top':
        return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${base} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case 'left':
        return `${base} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case 'right':
        return `${base} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
    }
  };

  const getArrowClasses = () => {
    const base = "absolute w-2 h-2 bg-gray-800 transform rotate-45";
    
    switch (finalPosition) {
      case 'top':
        return `${base} top-full left-1/2 -translate-x-1/2 -mt-1`;
      case 'bottom':
        return `${base} bottom-full left-1/2 -translate-x-1/2 -mb-1`;
      case 'left':
        return `${base} left-full top-1/2 -translate-y-1/2 -ml-1`;
      case 'right':
        return `${base} right-full top-1/2 -translate-y-1/2 -mr-1`;
      default:
        return `${base} top-full left-1/2 -translate-x-1/2 -mt-1`;
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
      {isVisible && mounted && (
        <div 
          ref={tooltipRef}
          className={getTooltipClasses()}
          style={{ 
            transition: 'opacity 200ms, transform 200ms',
            opacity: isVisible ? 1 : 0 
          }}
        >
          {content}
          <div className={getArrowClasses()}></div>
        </div>
      )}
    </div>
  );
};

const Career_analysis = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold truncate">Interview Analysis</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Technical Interview • Dec 7, 2024</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Report</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-105">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-full">
        {/* Stats Cards */}
        <div 
          id="stats"
          data-animate
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 cursor-pointer group hover:scale-105 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600">Overall Score</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <TrendingUp className="w-3 h-3" />
                {detailedStats.overallScore.change}
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{detailedStats.overallScore.value}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${detailedStats.overallScore.value}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 cursor-pointer group hover:scale-105 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-600">Questions Answered</span>
            </div>
            <div className="text-3xl font-bold mb-2">{detailedStats.questionsAnswered.value}</div>
            <div className="text-gray-500 text-sm">{detailedStats.questionsAnswered.completion}% completion rate</div>
          </div>

          <div className="bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 cursor-pointer group hover:scale-105 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-gray-600">Time Taken</span>
            </div>
            <div className="text-3xl font-bold mb-2">{detailedStats.timeSpent.value}</div>
            <div className="text-green-600 text-sm">{detailedStats.timeSpent.saved} under time limit</div>
          </div>

          <div className="bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 cursor-pointer group hover:scale-105 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">Accuracy Rate</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <TrendingUp className="w-3 h-3" />
                {detailedStats.accuracy.change}
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{detailedStats.accuracy.value}%</div>
            <div className="text-green-600 text-sm">from last interview</div>
          </div>
        </div>

        {/* Question-wise Performance */}
        <div 
          id="questions"
          data-animate
          className={`mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-sm border">
            <div className="flex items-center gap-3 mb-6">
              <BarChart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">Question-wise Performance</h2>
            </div>
            
            <div className="mb-8">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={questionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="question" 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                    domain={[0, 20]}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Question Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
              {questionData.map((q, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 min-w-0 border">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="font-medium flex-shrink-0">{q.question}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 border ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  {q.status === 'correct' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 hover:scale-110 transition-transform flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 hover:scale-110 transition-transform flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Overview & Skills Assessment */}
        <div 
          id="overview"
          data-animate
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Performance Overview */}
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-sm border">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-green-600" />
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
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      color: '#111827'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm">Correct (78%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-sm">Incorrect (22%)</span>
              </div>
            </div>
          </div>

          {/* Skills Assessment */}
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-sm border">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold">Skills Assessment</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsRadarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis 
                  dataKey="skill" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#6B7280', fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
                          <div className="font-semibold text-gray-800">{data.skill}</div>
                          <div className="text-blue-600 font-medium">{data.score}%</div>
                          <div className="text-xs text-gray-600 mt-1">{data.description}</div>
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

        {/* Feedback Sections */}
        <div 
          id="feedback"
          data-animate
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Strengths */}
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-green-700">What You Did Well</h3>
            </div>
            <div className="space-y-3">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200 cursor-pointer border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{strength.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-700">Areas to Improve</h3>
            </div>
            <div className="space-y-3">
              {improvements.map((improvement, index) => (
                <div key={index} className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all duration-200 cursor-pointer border border-orange-200">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 flex-1">{improvement.text}</span>
                    <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(improvement.priority)}`}>
                      {improvement.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700">AI Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 cursor-pointer border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-700">{recommendation.text}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 ml-5">
                    <span className="text-xs text-blue-600">{recommendation.platform}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{recommendation.timeEstimate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div 
          id="action-plan"
          data-animate
          className={`mt-8 transition-all duration-1000 delay-1200 ${
            isVisible['action-plan'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 shadow-sm border">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Target className="w-8 h-8 text-yellow-600" />
                <h3 className="text-2xl font-bold">Your Improvement Plan</h3>
              </div>
              <p className="text-gray-600">Personalized roadmap based on your performance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 cursor-pointer hover:scale-105 border border-blue-200">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 hover:bg-blue-700 transition-colors">
                  1
                </div>
                <h4 className="font-semibold mb-2 text-blue-700">Master Algorithms</h4>
                <p className="text-sm text-gray-600">
                  Focus on dynamic programming and graph algorithms for the next 2 weeks
                </p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-600">
                  <Clock className="w-3 h-3" />
                  <span>2 weeks</span>
                </div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 cursor-pointer hover:scale-105 border border-purple-200">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 hover:bg-purple-700 transition-colors">
                  2
                </div>
                <h4 className="font-semibold mb-2 text-purple-700">System Design</h4>
                <p className="text-sm text-gray-600">
                  Practice designing scalable systems with focus on trade-offs
                </p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-purple-600">
                  <Clock className="w-3 h-3" />
                  <span>4 weeks</span>
                </div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 cursor-pointer hover:scale-105 border border-green-200">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 hover:bg-green-700 transition-colors">
                  3
                </div>
                <h4 className="font-semibold mb-2 text-green-700">Mock Interviews</h4>
                <p className="text-sm text-gray-600">
                  Take 3 mock interviews per week to build confidence and timing
                </p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-green-600">
                  <Clock className="w-3 h-3" />
                  <span>Ongoing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career_analysis;