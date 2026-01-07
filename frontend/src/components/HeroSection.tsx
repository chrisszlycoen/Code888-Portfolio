import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Terminal, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Typing speed

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/chrisszlycoen" },
    { icon: Linkedin, href: "https://linkedin.com/in/code888" },
    { icon: Twitter, href: "https://twitter.com/chrisszlycoen" },
    { icon: Mail, href: "mailto:uhiriwechrisostom0@gmail.com" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden pt-20">
      {/* Abstract Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Content: Text & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="flex items-center space-x-3 text-primary font-mono mb-4">
              <Terminal className="w-5 h-5" />
              <span>root@code888:~# ./init_portfolio.sh</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
              I Build <br />
              <span className="text-primary">
                <TypewriterText text="Secure Systems." delay={500} />
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Full-Stack Developer & Ethical Hacker.
              Creating resilient, high-performance digital experiences with a focus on security and scalability.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="tech-button h-14 text-lg">
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 border-primary/20 hover:bg-primary/5 text-foreground" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-8 border-t border-border">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Content: Hacker Terminal Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-[#0c0c0c] border border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-black/50 max-w-lg mx-auto">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#151515]">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">bash — 80x24</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-4 h-[300px] overflow-hidden text-gray-300">
                <div className="flex">
                  <span className="text-green-500 mr-2">➜</span>
                  <span className="text-blue-500 mr-2">~</span>
                  <span>whoami</span>
                </div>
                <div className="text-white/80 pl-4">
                  Uhiriwe Chrisostom (Code888)<br />
                  &gt; Ethical Hacker<br />
                  &gt; Full-Stack Engineer<br />
                  &gt; Creative Designer
                </div>

                <div className="flex">
                  <span className="text-green-500 mr-2">➜</span>
                  <span className="text-blue-500 mr-2">~</span>
                  <span>ls skills/</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-4 text-blue-400">
                  <span>react.js</span>
                  <span>node.js</span>
                  <span>typescript</span>
                  <span>python</span>
                  <span>pentesting</span>
                  <span>network_sec</span>
                </div>

                <div className="flex">
                  <span className="text-green-500 mr-2">➜</span>
                  <span className="text-blue-500 mr-2">~</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2.5 h-5 bg-white block"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;