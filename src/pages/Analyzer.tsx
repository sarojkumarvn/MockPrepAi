
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Brain,
  Target
} from 'lucide-react';

const Analyzer = () => {
  const navigate = useNavigate();

  const mockResults = {
    overallScore: 85,
    categories: [
      { name: 'Communication', score: 90, color: 'bg-green-500' },
      { name: 'Technical Knowledge', score: 82, color: 'bg-blue-500' },
      { name: 'Problem Solving', score: 88, color: 'bg-purple-500' },
      { name: 'Confidence', score: 80, color: 'bg-orange-500' }
    ],
    strengths: [
      'Clear and articulate communication',
      'Strong problem-solving approach',
      'Good technical fundamentals'
    ],
    improvements: [
      'More specific examples in behavioral questions',
      'Deeper system design considerations',
      'Practice edge case handling'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/interview')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interview
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Interview Analysis Report
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive breakdown of your interview performance
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  {mockResults.overallScore}%
                </div>
                <div className="text-lg font-medium text-green-600 mb-4">
                  Excellent Performance
                </div>
                <Progress value={mockResults.overallScore} className="h-3" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  Performance Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed analysis across different competencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockResults.categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={category.score} className="w-24 h-2" />
                      <span className="font-bold text-sm w-8">{category.score}%</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockResults.strengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm">{strength}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Areas for Improvement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockResults.improvements.map((improvement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start space-x-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20"
                  >
                    <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">{improvement}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="btn-gradient w-full">
                  Schedule Another Interview
                </Button>
                <Button variant="outline" className="w-full">
                  Download Detailed Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
