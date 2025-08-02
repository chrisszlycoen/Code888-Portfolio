import { useState, useEffect } from 'react';
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

  const API_URL = 'http://localhost:5000';

  const isImageUrl = (image: string) => {
    return image.startsWith('/uploads/');
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
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading gradient-text">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my skills in security, AI, development, and design
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                  : 'bg-surface hover:bg-surface-elevated text-muted-foreground hover:text-foreground'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-muted-foreground">Loading projects...</div>
        )}
        {error && (
          <div className="text-center text-destructive">{error}</div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`floating-card group relative overflow-hidden ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-accent text-accent-foreground border-0">
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Project Image/Icon */}
                <div className="h-48 bg-gradient-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {isImageUrl(project.image) ? (
                    <img
                      src={`${API_URL}${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">{project.image}</span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-muted/30 text-muted-foreground rounded text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {project.demoUrl && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-primary hover:opacity-90"
                        asChild
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-border hover:bg-surface"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
          <Button className="tech-button" asChild>
            <a href="https://github.com/chrisszlycoen" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
