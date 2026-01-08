import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Shield, Palette, Brain, Terminal } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: number;
  title: string;
  icon: 'Code' | 'Database' | 'Shield' | 'Palette' | 'Brain' | 'Terminal';
  color: 'primary' | 'secondary' | 'accent';
  skills: Skill[];
}

interface Learning {
  id: number;
  title: string;
  description: string;
  category: 'primary' | 'secondary' | 'accent';
}

const iconMap = {
  Code: Code,
  Database: Database,
  Shield: Shield,
  Palette: Palette,
  Brain: Brain,
  Terminal: Terminal
};

const SkillsSection = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://code888-portfolio-backend.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [skillResponse, learningResponse] = await Promise.all([
          fetch(`${API_URL}/skill-categories`),
          fetch(`${API_URL}/learnings`)
        ]);

        if (!skillResponse.ok) {
          throw new Error('Failed to fetch skill categories');
        }
        if (!learningResponse.ok) {
          throw new Error('Failed to fetch learnings');
        }

        const skillData = await skillResponse.json();
        const learningData = await learningResponse.json();

        setSkillCategories(skillData);
        setLearnings(learningData);
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

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colorMap = {
      primary: { bg: 'bg-primary', text: 'text-primary', border: 'border-primary' },
      secondary: { bg: 'bg-secondary', text: 'text-secondary', border: 'border-secondary' },
      accent: { bg: 'bg-accent', text: 'text-accent', border: 'border-accent' }
    };
    return colorMap[color as keyof typeof colorMap]?.[type] || '';
  };

  return (
    <section id="skills" className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </div>

        {loading && (
          <div className="text-center text-muted-foreground">Loading skills...</div>
        )}
        {error && (
          <div className="text-center text-destructive">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = iconMap[category.icon];
              // Custom override for Terminal skills: Deep Grey in Light Mode, Primary in Dark Mode
              const isTerminal = category.icon === 'Terminal';
              const colorClass = isTerminal
                ? 'bg-muted-foreground dark:bg-primary'
                : getColorClass(category.color, 'bg');

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                  key={category.id}
                  className="floating-card p-6"
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mr-4`}>
                      <Icon className="h-6 w-6 text-background" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + (skillIndex * 0.1) }}
                            className={`h-2 rounded-full ${colorClass}`}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Current Learning Focus */}
        {!loading && !error && (
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto floating-card p-8">
              <h3 className="text-2xl font-bold gradient-text mb-6">Current Learning Focus</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                {learnings.map((learning) => (
                  <div key={learning.id} className="space-y-2">
                    <h4 className={`font-semibold ${learning.title.includes('Java')
                        ? 'text-muted-foreground'
                        : getColorClass(learning.category, 'text')
                      }`}>
                      {learning.title}
                    </h4>
                    <p className="text-muted-foreground">{learning.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;