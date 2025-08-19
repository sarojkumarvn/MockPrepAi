
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Clock, FileText, User, ChevronRight } from 'lucide-react';

const InterviewSetup = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (topic && level && duration && type) {
      navigate('/interview-instructions');
    }
  };

  const isFormValid = topic && level && duration && type;

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
            AI Interview Setup
          </h1>
          <p className="text-xl text-muted-foreground">
            Configure your interview preferences to get the most relevant questions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-primary" />
                  Interview Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Interview Topic
                    </label>
                    <Select onValueChange={setTopic}>
                      <SelectTrigger>
                        <SelectValue placeholder="React/Frontend Development" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React/Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend Development</SelectItem>
                        <SelectItem value="fullstack">Full Stack Development</SelectItem>
                        <SelectItem value="devops">DevOps Engineering</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Experience Level
                    </label>
                    <Select onValueChange={setLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Senior (5+ years)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                        <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Interview Duration
                    </label>
                    <Select onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="60 minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Interview Type
                    </label>
                    <Select onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Behavioral Interview" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                        <SelectItem value="technical">Technical Interview</SelectItem>
                        <SelectItem value="coding">Coding Challenge</SelectItem>
                        <SelectItem value="system">System Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    onClick={handleContinue}
                    disabled={!isFormValid}
                    className="btn-gradient"
                  >
                    Continue to Instructions
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Interview Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="preview-item">
                  <div className="preview-icon bg-cyan-100 text-cyan-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Topic</div>
                    <div className="text-sm text-muted-foreground">
                      {topic || 'React/Frontend Development'}
                    </div>
                  </div>
                </div>

                <div className="preview-item">
                  <div className="preview-icon bg-blue-100 text-blue-600">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Level</div>
                    <div className="text-sm text-muted-foreground">
                      {level || 'Senior (5+ years)'}
                    </div>
                  </div>
                </div>

                <div className="preview-item">
                  <div className="preview-icon bg-green-100 text-green-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Duration</div>
                    <div className="text-sm text-muted-foreground">
                      {duration ? `${duration} min` : '60 min'}
                    </div>
                  </div>
                </div>

                <div className="preview-item">
                  <div className="preview-icon bg-purple-100 text-purple-600">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Type</div>
                    <div className="text-sm text-muted-foreground">
                      {type || 'Behavioral Interview'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;
