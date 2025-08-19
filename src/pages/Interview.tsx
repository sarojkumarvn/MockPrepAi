
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Construction, ArrowLeft, Settings } from 'lucide-react';

const Interview = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center min-h-[70vh]"
        >
          <Card className="shadow-2xl max-w-2xl w-full">
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
                <div className="text-8xl mb-4">🚧</div>
              </motion.div>
              
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Coming Soon
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The AI interview experience is being crafted with precision. 
                Our intelligent system will soon provide personalized questions, 
                real-time feedback, and comprehensive analysis.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate('/interview-instructions')}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Instructions
                </Button>
                
                <Button
                  onClick={() => navigate('/analyzer')}
                  className="btn-gradient flex items-center"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  View Analyzer Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Interview;
