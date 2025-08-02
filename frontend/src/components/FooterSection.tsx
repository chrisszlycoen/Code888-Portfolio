import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Call to Action Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            I'm open to <span className="text-primary font-semibold">freelance gigs</span>, 
            <span className="text-secondary font-semibold"> internships</span>, or 
            <span className="text-accent font-semibold"> junior dev/security roles</span>. 
            Let's build something great together!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="tech-button" asChild>
              <a href="#contact">
                Start a Project
              </a>
            </Button>
            <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10" asChild>
              <a href="mailto:uhiriwe.code888@gmail.com">
                Hire Me
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">🎯</div>
              <div className="text-sm text-muted-foreground">Focused on Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">🚀</div>
              <div className="text-sm text-muted-foreground">Always Learning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">💡</div>
              <div className="text-sm text-muted-foreground">Problem Solver</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">🤝</div>
              <div className="text-sm text-muted-foreground">Team Player</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border bg-surface">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© 2024 Uhiriwe Chrisostom (Code888)</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>in Rwanda</span>
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                Skills
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>

            {/* Scroll to Top */}
            <Button 
              size="sm" 
              variant="outline" 
              onClick={scrollToTop}
              className="border-border hover:bg-surface-elevated"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>

          {/* Additional Footer Info */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Currently studying at <span className="text-primary font-semibold">Rwanda Coding Academy</span> | 
              Passionate about <span className="text-secondary font-semibold">Ethical Hacking</span> & 
              <span className="text-accent font-semibold"> AI Innovation</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;