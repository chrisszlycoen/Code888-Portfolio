import { ArrowUp, Github, Linkedin, Twitter, Mail, ExternalLink, Terminal, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-white/10 pt-20 pb-10 relative overflow-hidden">

      {/* Footer Top */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">

        {/* Brand Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center space-x-2 text-2xl font-bold text-white tracking-tighter">
            <Terminal className="text-primary w-8 h-8" />
            <span>CODE<span className="text-primary">888</span></span>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Building the next generation of secure, intelligent, and scalable digital systems.
            Open for collaborations on high-impact projects.
          </p>
          <div className="flex space-x-4 pt-4">
            {[
              { icon: Github, href: "https://github.com/chrisszlycoen" },
              { icon: Linkedin, href: "https://linkedin.com/in/code888" },
              { icon: Twitter, href: "https://twitter.com/chrisszlycoen" },
              { icon: Mail, href: "mailto:uhiriwechrisostom0@gmail.com" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center rounded-none bg-background border border-white/10 text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 font-mono">/EXPLORE</h4>
          <ul className="space-y-4 text-muted-foreground">
            {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Status & Tech */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 font-mono">/SYSTEM_STATUS</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background border border-white/5">
              <span className="text-muted-foreground text-sm">Status</span>
              <span className="flex items-center text-green-500 text-sm font-mono tracking-wider">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                ONLINE
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background border border-white/5">
              <span className="text-muted-foreground text-sm">Version</span>
              <span className="text-white text-sm font-mono">v2.0.4 (Stable)</span>
            </div>
            <Button className="w-full tech-button rounded-none h-12 text-sm" onClick={scrollToTop}>
              <ArrowUp className="w-4 h-4 mr-2" />
              BACK TO TOP
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-mono">
        <div>
          &copy; {currentYear} Uhiriwe Chrisostom. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;