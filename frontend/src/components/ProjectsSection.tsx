import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Brain, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  demoUrl: string | null;
  githubUrl: string | null;
  image: string;
  featured: boolean;
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Code2 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'ai', label: 'AI/ML', icon: Brain },
    { id: 'fullstack', label: 'Full-Stack', icon: Code2 },
    { id: 'design', label: 'Design', icon: Palette }
  ];

  const API_URL = 'https://code888-portfolio-backend.onrender.com';

  const isImageUrl = (image: string) => {
    return image.startsWith('/uploads/') || image.startsWith('https://res.cloudinary.com/');
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const url = activeFilter === 'all'
          ? `${API_URL}/projects`
          : `${API_URL}/projects?category=${activeFilter}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Error fetching projects. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 bg-background border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-primary font-mono tracking-widest text-sm uppercase">
            <span>// Portfolio</span>
            <div className="h-[1px] w-12 bg-primary"></div>
          </div>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Security. Intelligence. Engineering.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-none border transition-all duration-300 ${activeFilter === category.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-muted-foreground border-white/10 hover:border-primary/50 hover:text-primary'
                }`}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-muted-foreground py-20 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-mono text-primary animate-pulse">Establishing Secure Connection...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-10 bg-red-500/5 border border-red-500/20 p-6">
            <p className="font-bold text-lg mb-2 font-mono">CONNECTION_ERROR</p>
            <p>{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`floating-card group relative bg-surface border border-white/10 overflow-hidden ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-primary text-white border-none rounded-none font-bold shadow-none">
                        FEATURED
                      </Badge>
                    </div>
                  )}

                  {/* Project Image/Icon */}
                  <div className="h-56 bg-[#0c0c0c] flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-10"></div>

                    {isImageUrl(project.image) ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <span className="text-5xl text-muted-foreground/20 group-hover:text-primary transition-colors duration-300 font-mono">
                        {project.image}
                      </span>
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
                      {project.title}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 text-primary" />
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 text-sm">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.slice(0, 5).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-surface-elevated text-xs text-primary/80 border border-white/5 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground font-mono">+{project.technologies.length - 5}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          className="flex-1 tech-button rounded-none"
                          asChild
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 rounded-none border-white/10 hover:bg-white/5 hover:text-white text-muted-foreground"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 text-muted-foreground font-mono text-sm">
            <Github className="w-4 h-4" />
            <span>git checkout more-projects</span>
          </div>
          <div className="mt-6">
            <Button className="tech-button h-14 px-8 text-lg rounded-none" asChild>
              <a href="https://github.com/chrisszlycoen" target="_blank" rel="noopener noreferrer">
                View Full Repository
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;