
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Video, 
  BarChart3, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Interviews',
      description: 'Advanced AI interviewer that adapts to your experience level and provides personalized questions.',
      color: 'text-blue-600'
    },
    {
      icon: Video,
      title: 'Real-time Analysis',
      description: 'Get instant feedback on your communication, body language, and technical responses.',
      color: 'text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Detailed Reports',
      description: 'Comprehensive performance analytics with actionable insights for improvement.',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Practice anytime with customizable interview durations and difficulty levels.',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Developers Trained', value: '10,000+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: CheckCircle2 },
    { label: 'Companies Hiring', value: '500+', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Master Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Technical Interviews
                </span>{' '}
                with AI
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Practice with our advanced AI interviewer, get real-time feedback, and land your dream tech job. 
                Personalized questions for your experience level and role.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-gradient-lg text-lg px-8"
                  onClick={() => navigate('/signup')}
                >
                  Start Practicing Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => navigate('/signin')}
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose InterviewAI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to excel in technical interviews, powered by cutting-edge AI technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Index;
