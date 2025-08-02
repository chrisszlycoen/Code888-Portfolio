import { useState, useEffect } from 'react';
import { ChevronDown, Download, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/profile.jpg';
import { profile } from 'console';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-glow-pulse animation-delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-secondary rounded-full animate-glow-pulse animation-delay-2000"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Image */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/30 glow-effect mx-auto animate-float">
                <img 
                  src={heroPortrait} 
                  alt="Uhiriwe Chrisostom (Code888)" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-glow-pulse">
                <span className="text-accent-foreground text-sm font-bold">🔥</span>
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="hero-text gradient-text mb-4 animate-fade-in-up">
            Uhiriwe Chrisostom
          </h1>
          
          <div className="text-xl md:text-2xl text-muted-foreground mb-2 font-mono animate-fade-in-up animation-delay-300">
            <span className="text-primary">Code888</span>
          </div>

          <div className="text-lg md:text-xl text-muted-foreground mb-6 animate-fade-in-up animation-delay-500">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Ethical Hacker</span> • 
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Full-Stack Dev</span> • 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> AI Passionist</span> • 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Graphic Designer</span>
          </div>

          <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-700">
            "Building and securing <span className="gradient-text font-semibold">smart systems</span> for Africa's and world's future."
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-1000">
            <Button className="tech-button group">
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download CV
            </Button>
            <Button
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
>             
              <Mail className="mr-2 h-4 w-4" />
               Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up animation-delay-1200">
            <a href="https://github.com/chrisszlycoen" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/in/code888" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://instagram.com/u.h.i.r.i.w.e___" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="mailto:uhiriwechrisostom0@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover-glow">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce hover:text-primary transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;