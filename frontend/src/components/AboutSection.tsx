import { useState, useEffect } from 'react';
import { Brain, Shield, Code, Palette, Zap, Target } from 'lucide-react';

interface Highlight {
  id: number;
  title: string;
  description: string;
  icon: 'Shield' | 'Code' | 'Brain' | 'Palette';
}

interface Skill {
  id: number;
  name: string;
  category: 'primary' | 'secondary' | 'accent';
}

const iconMap = {
  Shield: Shield,
  Code: Code,
  Brain: Brain,
  Palette: Palette
};

const AboutSection = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://code888-portfolio-backend.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [highlightResponse, skillResponse] = await Promise.all([
          fetch(`${API_URL}/highlights`),
          fetch(`${API_URL}/skills`)
        ]);

        if (!highlightResponse.ok) {
          throw new Error('Failed to fetch highlights');
        }
        if (!skillResponse.ok) {
          throw new Error('Failed to fetch skills');
        }

        const highlightData = await highlightResponse.json();
        const skillData = await skillResponse.json();

        setHighlights(highlightData);
        setSkills(skillData);
        setError(null);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading gradient-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          {loading && (
            <div className="text-center text-muted-foreground">Loading about info...</div>
          )}
          {error && (
            <div className="text-center text-destructive">{error}</div>
          )}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  I'm a passionate technologist currently studying at <span className="text-primary font-semibold">Rwanda Coding Academy</span>, 
                  where I'm sharpening my skills in software development, cybersecurity, and emerging technologies.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  My journey in tech is driven by a deep fascination with <span className="text-accent font-semibold">artificial intelligence</span> 
                  and its potential to transform how we work and live.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  As an aspiring <span className="text-secondary font-semibold">ethical hacker</span>, I'm committed to building 
                  secure digital infrastructure for Africa's growing tech ecosystem.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Currently Learning:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className={`px-3 py-1 bg-${skill.category}/10 text-${skill.category} rounded-full text-sm font-mono`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div 
                      key={item.id}
                      className="floating-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow-pulse">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1+", label: "Years Coding" },
              { number: "10+", label: "Projects Built" },
              { number: "100%", label: "Passion Level" },
              { number: "24/7", label: "Learning Mode" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;