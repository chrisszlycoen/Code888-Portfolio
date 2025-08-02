import { useState, useEffect } from 'react';
import { ExternalLink, Eye, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Design {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  behanceUrl: string | null;
}

const DesignGallery = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Brand Identity', 'UI/UX Design', 'Web Design', 'Mobile Design'];
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const isImageUrl = (image: string) => {
    return image.startsWith('/uploads/');
  };

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'All'
          ? `${API_URL}/designs`
          : `${API_URL}/designs?category=${encodeURIComponent(activeCategory)}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch designs');
        }
        const data = await response.json();
        setDesigns(data);
        setError(null);
      } catch (err) {
        setError('Error fetching designs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [activeCategory]);

  const filteredDesigns = designs; // Filtering handled by backend

  return (
    <section id="design" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading gradient-text">Design Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my graphic design work, UI/UX projects, and brand identity creations
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                  : 'bg-surface hover:bg-surface-elevated text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-muted-foreground">Loading designs...</div>
        )}
        {error && (
          <div className="text-center text-destructive">{error}</div>
        )}

        {/* Design Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((design, index) => (
              <div 
                key={design.id}
                className="floating-card group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Design Preview */}
                <div className="relative h-48 bg-gradient-surface flex items-center justify-center text-6xl overflow-hidden">
                  {isImageUrl(design.image) ? (
                    <img
                      src={`${API_URL}${design.image}`}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {design.image}
                    </span>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-background/90"
                          onClick={() => setSelectedDesign(design)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="space-y-6">
                          {isImageUrl(design.image) ? (
                            <img
                              src={`${API_URL}${design.image}`}
                              alt={design.title}
                              className="w-full h-64 object-cover rounded"
                            />
                          ) : (
                            <div className="text-center text-6xl">{design.image}</div>
                          )}
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{design.title}</h3>
                            <p className="text-muted-foreground mb-4">{design.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {design.tags.map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex}
                                  className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button size="sm" asChild>
                      <a href={design.behanceUrl || '#'} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Design Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {design.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                      {design.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {design.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {design.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Interested in working together on a design project?
          </p>
          <Button className="tech-button" asChild>
            <a href="https://behance.net/code888" target="_blank" rel="noopener noreferrer">
              <Palette className="mr-2 h-4 w-4" />
              View Full Portfolio on Behance
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DesignGallery;