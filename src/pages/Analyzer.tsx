
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Brain } from 'lucide-react';

const Analyzer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-cyan-50/50 dark:from-purple-950/20 dark:via-blue-950/10 dark:to-cyan-950/20 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center min-h-[70vh]"
        >
          <Card className="shadow-2xl max-w-2xl w-full border-0 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20">
            <CardContent className="pt-16 pb-16 text-center">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mb-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-purple-600" />
                </div>
              </motion.div>
              
              <h1 className="text-4xl font-bold text-foreground mb-4">
                AI Analyzer Coming Soon
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our advanced AI analyzer is being developed to provide comprehensive 
                performance insights, detailed feedback reports, and personalized 
                improvement recommendations for your interviews.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate('/interview')}
                  className="flex items-center border-2 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Interview
                </Button>
                
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Explore Platform
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analyzer;
