
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
  Users,
  FileText,
  BookOpen,
  PenTool,
  Map,
  FileImage,
  Star,
  Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Interviews',
      description: 'Advanced AI interviewer that adapts to your experience level and provides personalized questions.',
      color: 'text-blue-600',
      available: true
    },
    {
      icon: Video,
      title: 'Real-time Analysis',
      description: 'Get instant feedback on your communication, body language, and technical responses.',
      color: 'text-green-600',
      available: true
    },
    {
      icon: BarChart3,
      title: 'Detailed Reports',
      description: 'Comprehensive performance analytics with actionable insights for improvement.',
      color: 'text-purple-600',
      available: true
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Practice anytime with customizable interview durations and difficulty levels.',
      color: 'text-orange-600',
      available: true
    }
  ];

  const upcomingFeatures = [
    {
      icon: FileText,
      title: 'AI Resume Builder',
      description: 'Create professional resumes tailored to specific job roles with AI assistance.',
      color: 'text-indigo-600',
      comingSoon: true
    },
    {
      icon: BookOpen,
      title: 'Mock Preparation',
      description: 'Comprehensive mock interview sessions with industry-specific scenarios.',
      color: 'text-rose-600',
      comingSoon: true
    },
    {
      icon: PenTool,
      title: 'PDF Editor & Analyzer',
      description: 'Edit and analyze documents with intelligent suggestions and formatting.',
      color: 'text-cyan-600',
      comingSoon: true
    },
    {
      icon: Map,
      title: 'Learning Roadmaps',
      description: 'Personalized learning paths based on your career goals and current skills.',
      color: 'text-emerald-600',
      comingSoon: true
    },
    {
      icon: FileImage,
      title: 'Documentation Hub',
      description: 'Comprehensive guides, tutorials, and best practices for interview success.',
      color: 'text-amber-600',
      comingSoon: true
    },
    {
      icon: Zap,
      title: 'Skills Assessment',
      description: 'Evaluate your technical and soft skills with AI-powered assessments.',
      color: 'text-violet-600',
      comingSoon: true
    }
  ];

  const AnimatedCounter = ({ end, duration = 2000, label, icon: Icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [end, duration]);

    return (
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {count.toLocaleString()}+
        </div>
        <div className="text-sm text-muted-foreground">
          {label}
        </div>
      </div>
    );
  };

  const stats = [
    { label: 'Developers Trained', value: 10000, icon: Users },
    { label: 'Success Rate', value: 94, icon: CheckCircle2, suffix: '%' },
    { label: 'Companies Hiring', value: 500, icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-cyan-50/50 dark:from-purple-950/20 dark:via-blue-950/10 dark:to-cyan-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 60% */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex mb-6">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full border border-purple-200/50 dark:border-purple-800/50">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI-Powered Career Growth</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                  Master Your{' '}
                  <span className="text-gradient-visible">
                    Tech Career
                  </span>{' '}
                  with AI
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
                  From interview preparation to resume building, roadmaps to skill assessments - 
                  your complete AI-powered career companion for landing your dream tech job.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-16">
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-white font-semibold"
                    onClick={() => navigate('/signup')}
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="text-lg px-10 py-4 border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold"
                    onClick={() => navigate('/signin')}
                  >
                    Watch Demo
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right Visual - 40% */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Main Visual Container */}
                <div className="relative bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl p-8 backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30">
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute -bottom-6 -right-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
                  
                  {/* Central Icon Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white shadow-lg">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white shadow-lg">
                      <Video className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl text-white shadow-lg">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl text-white shadow-lg">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white shadow-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-purple-500 rounded-xl text-white shadow-lg">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Career Progress</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
                </div>
              </motion.div>
            </div>
          </div>

            {/* Animated Stats - Moved to center below hero */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                >
                  <AnimatedCounter
                    end={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    duration={2500 + index * 200}
                  />
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Current Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-purple-50/30 dark:from-background dark:to-purple-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Available Now
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start your interview preparation journey with our AI-powered platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 h-full border-0 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20 border border-purple-200/30 dark:border-purple-800/30">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center ${feature.color}`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="py-24 bg-gradient-to-b from-purple-50/30 to-blue-50/20 dark:from-purple-950/10 dark:to-blue-950/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Coming Soon
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exciting new features are in development to supercharge your career journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-all duration-500 h-full border-0 bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-900/60 dark:to-gray-800/60 opacity-70 hover:opacity-90 relative overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Soon
                    </span>
                  </div>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center ${feature.color} opacity-60`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-xl text-gray-600 dark:text-gray-400">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed text-gray-500 dark:text-gray-500">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
              Join thousands of developers who have already accelerated their career growth with our AI platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-10 py-4 bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 font-semibold"
                onClick={() => navigate('/signup')}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Index;
