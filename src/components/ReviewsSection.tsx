
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ReviewsSection = () => {
  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      rating: 5,
      text: 'InterviewAI helped me ace my technical interviews. The AI feedback was incredibly detailed and helped me improve my communication skills.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Johnson',
      role: 'Full Stack Developer',
      rating: 5,
      text: 'The behavioral interview practice was game-changing. I felt so much more confident during real interviews.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Frontend Developer at Netflix',
      rating: 5,
      text: 'Amazing platform! The real-time analysis helped me identify my weak points and improve them systematically.',
      avatar: '👩‍🎨'
    },
    {
      name: 'David Kim',
      role: 'Senior React Developer',
      rating: 5,
      text: 'Best interview prep tool I\'ve used. The AI interviewer asks relevant questions and provides actionable feedback.',
      avatar: '👨‍🔬'
    },
    {
      name: 'Lisa Wang',
      role: 'Tech Lead at Spotify',
      rating: 5,
      text: 'Incredibly realistic interview experience. Helped me land my dream job at a top tech company.',
      avatar: '👩‍💻'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who have transformed their interview skills with InterviewAI
          </p>
        </motion.div>

        {/* First Marquee Container */}
        <div className="relative mb-8">
          <div className="flex space-x-6 animate-marquee">
            {/* First set of reviews */}
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="min-w-[350px] max-w-[350px]"
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{review.avatar}</div>
                      <div>
                        <div className="font-semibold text-foreground">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                      <p className="text-sm text-foreground leading-relaxed pl-4">
                        {review.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {reviews.map((review, index) => (
              <div key={`duplicate-${index}`} className="min-w-[350px] max-w-[350px]">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{review.avatar}</div>
                      <div>
                        <div className="font-semibold text-foreground">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                      <p className="text-sm text-foreground leading-relaxed pl-4">
                        {review.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                </div>
            ))}
          </div>
        </div>

        {/* Second Marquee Container - Opposite Direction */}
        <div className="relative">
          <div className="flex space-x-6 animate-marquee-reverse">
            {/* First set of reviews */}
            {reviews.slice().reverse().map((review, index) => (
              <motion.div
                key={`reverse-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="min-w-[350px] max-w-[350px]"
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{review.avatar}</div>
                      <div>
                        <div className="font-semibold text-foreground">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                      <p className="text-sm text-foreground leading-relaxed pl-4">
                        {review.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {reviews.slice().reverse().map((review, index) => (
              <div key={`reverse-duplicate-${index}`} className="min-w-[350px] max-w-[350px]">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{review.avatar}</div>
                      <div>
                        <div className="font-semibold text-foreground">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                      <p className="text-sm text-foreground leading-relaxed pl-4">
                        {review.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
