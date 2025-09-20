import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Camera, 
  Wifi, 
  Volume2, 
  Code, 
  CheckCircle2,
  Clock,
  User,
  BookOpen,
  Play
} from 'lucide-react';
import { useState } from 'react';

const InterviewInstructions = () => {
  const navigate = useNavigate();
  const [agreedToInstructions, setAgreedToInstructions] = useState(false);

  const mockInterviewDetails = {
    topic: 'Full Stack Development',
    level: 'Senior',
    duration: '45 minutes',
    type: 'Technical + Behavioral'
  };

  const requirements = [
    {
      icon: Camera,
      title: 'Camera & Microphone',
      description: 'Ensure your camera and microphone are working properly',
      color: 'text-blue-600'
    },
    {
      icon: Wifi,
      title: 'Stable Internet Connection',
      description: 'Test your internet speed to avoid interruptions',
      color: 'text-green-600'
    },
    {
      icon: Volume2,
      title: 'Quiet Environment',
      description: 'Find a quiet space free from distractions',
      color: 'text-purple-600'
    },
    {
      icon: Code,
      title: 'Code Editor Ready',
      description: 'Have your preferred coding environment set up',
      color: 'text-orange-600'
    }
  ];

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setAgreedToInstructions(checked === true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/interview-setup')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Setup
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Interview Instructions
            </h1>
            <p className="text-xl text-muted-foreground">
              Please review these requirements before starting your interview
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Requirements Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                  Pre-Interview Checklist
                </CardTitle>
                <CardDescription>
                  Ensure you meet all requirements for the best interview experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${requirement.color}`}>
                      <requirement.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {requirement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {requirement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Interview Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Topic</div>
                    <div className="text-sm text-muted-foreground">{mockInterviewDetails.topic}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Level</div>
                    <div className="text-sm text-muted-foreground">{mockInterviewDetails.level}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-sm text-muted-foreground">{mockInterviewDetails.duration}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Type</div>
                    <div className="text-sm text-muted-foreground">{mockInterviewDetails.type}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agreement and Start */}
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="agreement" 
                      checked={agreedToInstructions}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label 
                      htmlFor="agreement" 
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I understand the instructions and confirm that I have met all the technical requirements for the interview.
                    </label>
                  </div>

                  <Button
                    className="btn-gradient w-full"
                    disabled={!agreedToInstructions}
                    onClick={() => navigate('/interview')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Interview
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
