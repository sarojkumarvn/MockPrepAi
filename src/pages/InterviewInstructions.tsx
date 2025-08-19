
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Camera, 
  Wifi, 
  VolumeX, 
  Code2, 
  CheckCircle2,
  ArrowLeft,
  Play
} from 'lucide-react';

const InterviewInstructions = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const checklist = [
    {
      icon: Camera,
      title: 'Camera & Microphone',
      description: 'Ensure your camera and microphone are working properly for the best experience.',
      color: 'text-green-600'
    },
    {
      icon: Wifi,
      title: 'Stable Internet',
      description: 'Make sure you have a stable internet connection throughout the interview.',
      color: 'text-blue-600'
    },
    {
      icon: VolumeX,
      title: 'Quiet Environment',
      description: 'Find a quiet space where you won\'t be interrupted during the interview.',
      color: 'text-purple-600'
    },
    {
      icon: Code2,
      title: 'Code Editor',
      description: 'You can open the code editor during technical questions when needed.',
      color: 'text-orange-600'
    }
  ];

  const interviewDetails = {
    topic: 'React/Frontend Development',
    level: 'Senior (5+ years)',
    duration: '60 minutes',
    type: 'Behavioral Interview'
  };

  const handleStartInterview = () => {
    if (agreedToTerms) {
      navigate('/interview');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Interview Instructions
          </h1>
        </motion.div>

        <div className="space-y-8">
          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  {checklist.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${item.color}`}>
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className={`w-6 h-6 ${item.color}`}>
                        <item.icon />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interview Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Interview Details:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Topic:</div>
                    <div className="font-semibold text-foreground">{interviewDetails.topic}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Level:</div>
                    <div className="font-semibold text-foreground">{interviewDetails.level}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Duration:</div>
                    <div className="font-semibold text-foreground">{interviewDetails.duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Type:</div>
                    <div className="font-semibold text-foreground">{interviewDetails.type}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Agreement and Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg mb-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={setAgreedToTerms}
                      className="mt-0.5"
                    />
                    <label 
                      htmlFor="terms" 
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      I understand the instructions and agree to proceed with the interview
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/interview-setup')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Setup
                  </Button>
                  
                  <Button
                    onClick={handleStartInterview}
                    disabled={!agreedToTerms}
                    className="btn-gradient-lg"
                  >
                    Start Interview
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewInstructions;
