import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({
  storage,
  fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Create uploads directory if it doesn't exist
const UploadsDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(UploadsDir)) {
  fs.mkdirSync(UploadsDir);
}

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define schemas
const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  category: { type: String, required: true, enum: ['security', 'ai', 'fullstack', 'design'] },
  demoUrl: { type: String, default: null },
  githubUrl: { type: String, default: null },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false }
});

const designSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Brand Identity', 'UI/UX Design', 'Web Design', 'Mobile Design'] },
  tags: { type: [String], required: true },
  behanceUrl: { type: String, default: null },
  image: { type: String, required: true }
});

const blogSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, required: true },
  category: { type: String, required: true, enum: ['Security', 'AI/ML', 'CTF', 'Tech Insights'] },
  tags: { type: [String], required: true }
});

const skillSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['primary', 'secondary', 'accent'] }
});

const learningSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['primary', 'secondary', 'accent'] }
});

const skillCategorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String, required: true, enum: ['Code', 'Database', 'Shield', 'Palette', 'Brain', 'Terminal'] },
  color: { type: String, required: true, enum: ['primary', 'secondary', 'accent'] },
  skills: [{
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 }
  }]
});

const highlightSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true, enum: ['Shield', 'Code', 'Brain', 'Palette'] }
});

// Create models
const Project = mongoose.model('Project', projectSchema);
const Design = mongoose.model('Design', designSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Learning = mongoose.model('Learning', learningSchema);
const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
const Highlight = mongoose.model('Highlight', highlightSchema);

// Initialize database with sample data
const initializeData = async () => {
  try {
    // Initialize Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const initialProjects = [
        {
          id: 1,
          title: "SecureScholars",
          description: "Intelligent vulnerability assessment tool that uses machine learning to identify potential security threats in web applications.",
          technologies: ["Python", "TensorFlow", "Flask", "PostgreSQL"],
          category: "security",
          demoUrl: "https://demo.example.com",
          githubUrl: "https://github.com/chrisszlycoen/securescholars",
          image: "🛡️",
          featured: true
        }
      ];
      await Project.insertMany(initialProjects);
      console.log('Initial projects inserted');
    }

    // Initialize Designs
    const designCount = await Design.countDocuments();
    if (designCount === 0) {
      const initialDesigns = [
        {
          id: 1,
          title: "Tech Startup Branding",
          category: "Brand Identity",
          description: "Complete brand identity for a fintech startup including logo, color palette, and brand guidelines.",
          image: "🎨",
          tags: ["Branding", "Logo Design", "Fintech"],
          behanceUrl: "https://behance.net/gallery/1"
        },
        {
          id: 2,
          title: "E-commerce Mobile App UI",
          category: "UI/UX Design",
          description: "Modern mobile app interface design with focus on user experience and conversion optimization.",
          image: "📱",
          tags: ["Mobile UI", "E-commerce", "UX"],
          behanceUrl: "https://behance.net/gallery/2"
        }
      ];
      await Design.insertMany(initialDesigns);
      console.log('Initial designs inserted');
    }

    // Initialize Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      const initialBlogs = [
        {
          id: 1,
          title: "My Journey into Ethical Hacking: From Code to Cybersecurity",
          excerpt: "How I transitioned from web development to cybersecurity...",
          content: "In this post, I share my journey from being a web developer...",
          date: "2024-01-15",
          readTime: "5 min read",
          category: "Security",
          tags: ["Ethical Hacking", "Career", "Cybersecurity"]
        },
        // ... other blogs ...
      ];
      await Blog.insertMany(initialBlogs);
      console.log('Initial blogs inserted');
    }

    // Initialize Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const initialSkills = [
        { id: 1, name: "Penetration Testing", category: "primary" },
        { id: 2, name: "Cloud Security", category: "secondary" },
        { id: 3, name: "Machine Learning", category: "accent" }
      ];
      await Skill.insertMany(initialSkills);
      console.log('Initial skills inserted');
    }

    // Initialize Learnings
    const learningCount = await Learning.countDocuments();
    if (learningCount === 0) {
      const initialLearnings = [
        {
          id: 1,
          title: "Security Certifications",
          description: "Working towards CEH and OSCP certifications",
          category: "primary"
        },
        {
          id: 2,
          title: "Cloud Technologies",
          description: "Deepening knowledge in AWS and Azure security",
          category: "secondary"
        },
        {
          id: 3,
          title: "Advanced AI",
          description: "Exploring LangChain and custom AI model development",
          category: "accent"
        }
      ];
      await Learning.insertMany(initialLearnings);
      console.log('Initial learnings inserted');
    }

    // Initialize Skill Categories
    const skillCategoryCount = await SkillCategory.countDocuments();
    if (skillCategoryCount === 0) {
      const initialSkillCategories = [
        {
          id: 1,
          title: "Programming Languages",
          icon: "Code",
          color: "primary",
          skills: [
            { name: "Python", level: 90 },
            { name: "JavaScript/TypeScript", level: 85 },
            { name: "Java", level: 75 },
            { name: "C++", level: 70 },
            { name: "SQL", level: 80 },
            { name: "Bash", level: 85 }
          ]
        },
        {
          id: 2,
          title: "Frameworks & Libraries",
          icon: "Database",
          color: "secondary",
          skills: [
            { name: "React/Next.js", level: 85 },
            { name: "Node.js/Express", level: 80 },
            { name: "Django/Flask", level: 85 },
            { name: "TensorFlow/PyTorch", level: 75 },
            { name: "MongoDB/PostgreSQL", level: 80 },
            { name: "Docker/Kubernetes", level: 70 }
          ]
        },
        {
          id: 3,
          title: "Security & Ethical Hacking",
          icon: "Shield",
          color: "accent",
          skills: [
            { name: "Penetration Testing", level: 75 },
            { name: "Kali Linux", level: 85 },
            { name: "Metasploit", level: 70 },
            { name: "Wireshark", level: 80 },
            { name: "Burp Suite", level: 75 },
            { name: "OWASP Top 10", level: 85 }
          ]
        },
        {
          id: 4,
          title: "AI & Automation",
          icon: "Brain",
          color: "primary",
          skills: [
            { name: "Machine Learning", level: 80 },
            { name: "Natural Language Processing", level: 75 },
            { name: "OpenAI API Integration", level: 85 },
            { name: "Automation Scripts", level: 90 },
            { name: "Voice Assistants", level: 70 },
            { name: "Data Analysis", level: 85 }
          ]
        },
        {
          id: 5,
          title: "Design & Creative",
          icon: "Palette",
          color: "secondary",
          skills: [
            { name: "Adobe Photoshop", level: 85 },
            { name: "Adobe Illustrator", level: 80 },
            { name: "Figma", level: 90 },
            { name: "UI/UX Design", level: 85 },
            { name: "Brand Identity", level: 80 },
            { name: "Web Design", level: 90 }
          ]
        },
        {
          id: 6,
          title: "Tools & Operating Systems",
          icon: "Terminal",
          color: "accent",
          skills: [
            { name: "Git/GitHub", level: 90 },
            { name: "Linux (Ubuntu/Kali)", level: 85 },
            { name: "VS Code", level: 95 },
            { name: "AWS/Cloud Platforms", level: 70 },
            { name: "Vim/Nano", level: 80 },
            { name: "Virtual Machines", level: 85 }
          ]
        }
      ];
      await SkillCategory.insertMany(initialSkillCategories);
      console.log('Initial skill categories inserted');
    }

    // Initialize Highlights
    const highlightCount = await Highlight.countDocuments();
    if (highlightCount === 0) {
      const initialHighlights = [
        {
          id: 1,
          title: "Ethical Hacking",
          description: "Passionate about cybersecurity and protecting digital infrastructure",
          icon: "Shield"
        },
        {
          id: 2,
          title: "Full-Stack Development",
          description: "Building modern web applications with cutting-edge technologies",
          icon: "Code"
        },
        {
          id: 3,
          title: "AI Integration",
          description: "Leveraging AI for productivity, automation, and intelligent solutions",
          icon: "Brain"
        },
        {
          id: 4,
          title: "Graphic Design",
          description: "Creating visually stunning and user-friendly digital experiences",
          icon: "Palette"
        }
      ];
      await Highlight.insertMany(initialHighlights);
      console.log('Initial highlights inserted');
    }
  } catch (err) {
    console.error('Error initializing data:', err);
  }
};

// Run initialization
initializeData();

// Generate a new ID for models
const generateId = async (Model: any) => {
  try {
    const lastItem = await Model.findOne().sort({ id: -1 });
    return lastItem ? lastItem.id + 1 : 1;
  } catch (err) {
    console.error('Error generating ID:', err);
    throw err;
  }
};

// GET /projects
app.get('/projects', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    if (category && category !== 'all') {
      const validCategories = ['security', 'ai', 'fullstack', 'design'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
      }
      const filteredProjects = await Project.find({ category });
      return res.json(filteredProjects);
    }
    const allProjects = await Project.find();
    res.json(allProjects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// GET /designs
app.get('/designs', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    if (category && category !== 'All') {
      const validCategories = ['Brand Identity', 'UI/UX Design', 'Web Design', 'Mobile Design'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
      }
      const filteredDesigns = await Design.find({ category });
      return res.json(filteredDesigns);
    }
    const allDesigns = await Design.find();
    res.json(allDesigns);
  } catch (err) {
    console.error('Error fetching designs:', err);
    res.status(500).json({ error: 'Error fetching designs' });
  }
});

// GET /blogs
app.get('/blogs', async (req: Request, res: Response) => {
  try {
    const allBlogs = await Blog.find();
    res.json(allBlogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// GET /skills
app.get('/skills', async (req: Request, res: Response) => {
  try {
    const allSkills = await Skill.find();
    res.json(allSkills);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ error: 'Error fetching skills' });
  }
});

// GET /learnings
app.get('/learnings', async (req: Request, res: Response) => {
  try {
    const allLearnings = await Learning.find();
    res.json(allLearnings);
  } catch (err) {
    console.error('Error fetching learnings:', err);
    res.status(500).json({ error: 'Error fetching learnings' });
  }
});

// GET /skill-categories
app.get('/skill-categories', async (req: Request, res: Response) => {
  try {
    const allSkillCategories = await SkillCategory.find();
    res.json(allSkillCategories);
  } catch (err) {
    console.error('Error fetching skill categories:', err);
    res.status(500).json({ error: 'Error fetching skill categories' });
  }
});

// GET /highlights
app.get('/highlights', async (req: Request, res: Response) => {
  try {
    const allHighlights = await Highlight.find();
    res.json(allHighlights);
  } catch (err) {
    console.error('Error fetching highlights:', err);
    res.status(500).json({ error: 'Error fetching highlights' });
  }
});

// GET /real/admin
app.get('/real/admin', (req: Request, res: Response) => {
  console.log('Accessed /real/admin');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Add New Item</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
        h1 { text-align: center; color: #333; }
        h2 { color: #555; margin-top: 30px; }
        form { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        textarea { resize: vertical; min-height: 100px; }
        button { background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background-color: #0056b3; }
        .error { color: red; font-size: 14px; }
        .skill-group { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Add New Item</h1>

      <!-- Project Form -->
      <h2>Add Project</h2>
      <form action="/projects" method="POST" enctype="multipart/form-data">
        <div class="form-group">
          <label for="project-title">Title *</label>
          <input type="text" id="project-title" name="title" required>
        </div>
        <div class="form-group">
          <label for="project-description">Description *</label>
          <textarea id="project-description" name="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="project-technologies">Technologies (comma-separated) *</label>
          <input type="text" id="project-technologies" name="technologies" placeholder="e.g., React, Node.js, MongoDB" required>
        </div>
        <div class="form-group">
          <label for="project-category">Category *</label>
          <select id="project-category" name="category" required>
            <option value="security">Security</option>
            <option value="ai">AI/ML</option>
            <option value="fullstack">Full-Stack</option>
            <option value="design">Design</option>
          </select>
        </div>
        <div class="form-group">
          <label for="project-demoUrl">Demo URL</label>
          <input type="url" id="project-demoUrl" name="demoUrl" placeholder="https://demo.example.com">
        </div>
        <div class="form-group">
          <label for="project-githubUrl">GitHub URL</label>
          <input type="url" id="project-githubUrl" name="githubUrl" placeholder="https://github.com/username/repo">
        </div>
        <div class="form-group">
          <label for="project-image">Image (JPEG/PNG) *</label>
          <input type="file" id="project-image" name="image" accept="image/jpeg,image/png" required>
        </div>
        <div class="form-group">
          <label for="project-featured">Featured</label>
          <input type="checkbox" id="project-featured" name="featured">
        </div>
        <button type="submit">Add Project</button>
      </form>

      <!-- Design Form -->
      <h2>Add Design</h2>
      <form action="/designs" method="POST" enctype="multipart/form-data">
        <div class="form-group">
          <label for="design-title">Title *</label>
          <input type="text" id="design-title" name="title" required>
        </div>
        <div class="form-group">
          <label for="design-description">Description *</label>
          <textarea id="design-description" name="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="design-tags">Tags (comma-separated) *</label>
          <input type="text" id="design-tags" name="tags" placeholder="e.g., Branding, UI, UX" required>
        </div>
        <div class="form-group">
          <label for="design-category">Category *</label>
          <select id="design-category" name="category" required>
            <option value="Brand Identity">Brand Identity</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Web Design">Web Design</option>
            <option value="Mobile Design">Mobile Design</option>
          </select>
        </div>
        <div class="form-group">
          <label for="design-behanceUrl">Behance URL</label>
          <input type="url" id="design-behanceUrl" name="behanceUrl" placeholder="https://behance.net/gallery/123">
        </div>
        <div class="form-group">
          <label for="design-image">Image (JPEG/PNG) *</label>
          <input type="file" id="design-image" name="image" accept="image/jpeg,image/png" required>
        </div>
        <button type="submit">Add Design</button>
      </form>

      <!-- Blog Form -->
      <h2>Add Blog Post</h2>
      <form action="/blogs" method="POST">
        <div class="form-group">
          <label for="blog-title">Title *</label>
          <input type="text" id="blog-title" name="title" required>
        </div>
        <div class="form-group">
          <label for="blog-excerpt">Excerpt *</label>
          <textarea id="blog-excerpt" name="excerpt" required></textarea>
        </div>
        <div class="form-group">
          <label for="blog-content">Full Content *</label>
          <textarea id="blog-content" name="content" required style="min-height: 200px;"></textarea>
        </div>
        <div class="form-group">
          <label for="blog-date">Date (YYYY-MM-DD) *</label>
          <input type="date" id="blog-date" name="date" required>
        </div>
        <div class="form-group">
          <label for="blog-readTime">Read Time *</label>
          <input type="text" id="blog-readTime" name="readTime" placeholder="e.g., 5 min read" required>
        </div>
        <div class="form-group">
          <label for="blog-category">Category *</label>
          <select id="blog-category" name="category" required>
            <option value="Security">Security</option>
            <option value="AI/ML">AI/ML</option>
            <option value="CTF">CTF</option>
            <option value="Tech Insights">Tech Insights</option>
          </select>
        </div>
        <div class="form-group">
          <label for="blog-tags">Tags (comma-separated) *</label>
          <input type="text" id="blog-tags" name="tags" placeholder="e.g., Cybersecurity, AI, Development" required>
        </div>
        <button type="submit">Add Blog Post</button>
      </form>

      <!-- Skill Form -->
      <h2>Add Skill</h2>
      <form action="/skills" method="POST">
        <div class="form-group">
          <label for="skill-name">Name *</label>
          <input type="text" id="skill-name" name="name" required>
        </div>
        <div class="form-group">
          <label for="skill-category">Category *</label>
          <select id="skill-category" name="category" required>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="accent">Accent</option>
          </select>
        </div>
        <button type="submit">Add Skill</button>
      </form>

      <!-- Learning Form -->
      <h2>Add Learning Focus</h2>
      <form action="/learnings" method="POST">
        <div class="form-group">
          <label for="learning-title">Title *</label>
          <input type="text" id="learning-title" name="title" required>
        </div>
        <div class="form-group">
          <label for="learning-description">Description *</label>
          <textarea id="learning-description" name="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="learning-category">Category *</label>
          <select id="learning-category" name="category" required>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="accent">Accent</option>
          </select>
        </div>
        <button type="submit">Add Learning Focus</button>
      </form>

      <!-- Skill Category Form -->
      <h2>Add Skill Category</h2>
      <form action="/skill-categories" method="POST">
        <div class="form-group">
          <label for="skill-category-title">Title *</label>
          <input type="text" id="skill-category-title" name="title" required>
        </div>
        <div class="form-group">
          <label for="skill-category-icon">Icon *</label>
          <select id="skill-category-icon" name="icon" required>
            <option value="Code">Code</option>
            <option value="Database">Database</option>
            <option value="Shield">Shield</option>
            <option value="Palette">Palette</option>
            <option value="Brain">Brain</option>
            <option value="Terminal">Terminal</option>
          </select>
        </div>
        <div class="form-group">
          <label for="skill-category-color">Color *</label>
          <select id="skill-category-color" name="color" required>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="accent">Accent</option>
          </select>
        </div>
        <div class="form-group">
          <label>Skills (add multiple, one per line, format: Name,Level) *</label>
          <textarea id="skill-category-skills" name="skills" placeholder="e.g., Python,90\nJavaScript,85" required></textarea>
        </div>
        <button type="submit">Add Skill Category</button>
      </form>

      <!-- Highlight Form -->
      <h2>Add Highlight</h2>
      <form action="/highlights" method="POST">
        <div class="form-group">
          <label for="highlight-title">Title *</label>
          <input type="text" id="highlight-title" name="title" required>
        </div>
        <div class="form-group">
          <label for="highlight-description">Description *</label>
          <textarea id="highlight-description" name="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="highlight-icon">Icon *</label>
          <select id="highlight-icon" name="icon" required>
            <option value="Shield">Shield</option>
            <option value="Code">Code</option>
            <option value="Brain">Brain</option>
            <option value="Palette">Palette</option>
          </select>
        </div>
        <button type="submit">Add Highlight</button>
      </form>
    </body>
    </html>
  `);
});

// POST /projects
app.post('/projects', upload.single('image'), async (req: Request, res: Response) => {
  const { title, description, technologies, category, demoUrl, githubUrl, featured } = req.body;
  const file = req.file;

  if (!title || !description || !technologies || !category || !file) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>All required fields (title, description, technologies, category, image) must be provided.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const validCategories = ['security', 'ai', 'fullstack', 'design'];
  if (!validCategories.includes(category)) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>Invalid category.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const techArray = technologies.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech.length > 0);

  try {
    const id = await generateId(Project);
    const newProject = new Project({
      id, title, description, technologies: techArray, category,
      demoUrl: demoUrl || null, githubUrl: githubUrl || null,
      image: `/uploads/${file.filename}`, featured: featured === 'on' || featured === true
    });
    await newProject.save();
    res.send(`<html><body><h1>Success</h1><p>Project "${title}" added successfully!</p><a href="/real/admin">Add Another Item</a> | <a href="/projects">View All Projects</a></body></html>`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving project:', err);
    res.status(500).send(`<html><body><h1>Error</h1><p>Error saving project: ${errorMessage}</p><a href="/real/admin">Go Back</a></body></html>`);
  }
});

// POST /designs
app.post('/designs', upload.single('image'), async (req: Request, res: Response) => {
  const { title, description, tags, category, behanceUrl } = req.body;
  const file = req.file;

  if (!title || !description || !tags || !category || !file) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>All required fields (title, description, tags, category, image) must be provided.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const validCategories = ['Brand Identity', 'UI/UX Design', 'Web Design', 'Mobile Design'];
  if (!validCategories.includes(category)) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>Invalid category.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const tagArray = tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);

  try {
    const id = await generateId(Design);
    const newDesign = new Design({
      id, title, description, tags: tagArray, category,
      behanceUrl: behanceUrl || null, image: `/uploads/${file.filename}`
    });
    await newDesign.save();
    res.send(`<html><body><h1>Success</h1><p>Design "${title}" added successfully!</p><a href="/real/admin">Add Another Item</a> | <a href="/designs">View All Designs</a></body></html>`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving design:', err);
    res.status(500).send(`<html><body><h1>Error</h1><p>Error saving design: ${errorMessage}</p><a href="/real/admin">Go Back</a></body></html>`);
  }
});

// POST /blogs
app.post('/blogs', async (req: Request, res: Response) => {
  const { title, excerpt, content, date, readTime, category, tags } = req.body;

  if (!title || !excerpt || !content || !date || !readTime || !category || !tags) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>All required fields (title, excerpt, content, date, readTime, category, tags) must be provided.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const validCategories = ['Security', 'AI/ML', 'CTF', 'Tech Insights'];
  if (!validCategories.includes(category)) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>Invalid category.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const tagArray = tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);

  try {
    const id = await generateId(Blog);
    const newBlog = new Blog({
      id, title, excerpt, content, date, readTime, category, tags: tagArray
    });
    await newBlog.save();
    res.send(`<html><body><h1>Success</h1><p>Blog post "${title}" added successfully!</p><a href="/real/admin">Add Another Item</a> | <a href="/blogs">View All Blogs</a></body></html>`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving blog:', err);
    res.status(500).send(`<html><body><h1>Error</h1><p>Error saving blog: ${errorMessage}</p><a href="/real/admin">Go Back</a></body></html>`);
  }
});

// POST /skills
app.post('/skills', async (req: Request, res: Response) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>All required fields (name, category) must be provided.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const validCategories = ['primary', 'secondary', 'accent'];
  if (!validCategories.includes(category)) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>Invalid category.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  try {
    const id = await generateId(Skill);
    const newSkill = new Skill({ id, name, category });
    await newSkill.save();
    res.send(`<html><body><h1>Success</h1><p>Skill "${name}" added successfully!</p><a href="/real/admin">Add Another Item</a> | <a href="/skills">View All Skills</a></body></html>`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving skill:', err);
    res.status(500).send(`<html><body><h1>Error</h1><p>Error saving skill: ${errorMessage}</p><a href="/real/admin">Go Back</a></body></html>`);
  }
});

// POST /learnings
app.post('/learnings', async (req: Request, res: Response) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>All required fields (title, description, category) must be provided.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const validCategories = ['primary', 'secondary', 'accent'];
  if (!validCategories.includes(category)) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>Invalid category.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  try {
    const id = await generateId(Learning);
    const newLearning = new Learning({ id, title, description, category });
    await newLearning.save();
    res.send(`<html><body><h1>Success</h1><p>Learning focus "${title}" added successfully!</p><a href="/real/admin">Add Another Item</a> | <a href="/learnings">View All Learnings</a></body></html>`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving learning:', err);
    res.status(500).send(`<html><body><h1>Error</h1><p>Error saving learning: ${errorMessage}</p><a href="/real/admin">Go Back</a></body></html>`);
  }
});

// POST /skill-categories
app.post('/skill-categories', async (req: Request, res: Response) => {
  const { title, icon, color, skills } = req.body;

  if (!title || !icon || !color || !skills) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>All required fields (title, icon, color, skills) must be provided.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const validIcons = ['Code', 'Database', 'Shield', 'Palette', 'Brain', 'Terminal'];
  const validColors = ['primary', 'secondary', 'accent'];
  if (!validIcons.includes(icon) || !validColors.includes(color)) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>Invalid icon or color.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  try {
    const skillArray = skills
      .split('\n')
      .map((line: string) => {
        const [name, level] = line.split(',').map(s => s.trim());
        if (!name || !level || isNaN(parseInt(level)) || parseInt(level) < 0 || parseInt(level) > 100) {
          throw new Error(`Invalid skill format: ${line}`);
        }
        return { name, level: parseInt(level) };
      })
      .filter((skill: any) => skill.name && skill.level >= 0 && skill.level <= 100);

    const id = await generateId(SkillCategory);
    const newSkillCategory = new SkillCategory({
      id, title, icon, color, skills: skillArray
    });
    await newSkillCategory.save();
    res.send(`<html><body><h1>Success</h1><p>Skill category "${title}" added successfully!</p><a href="/real/admin">Add Another Item</a> | <a href="/skill-categories">View All Skill Categories</a></body></html>`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving skill category:', err);
    res.status(500).send(`<html><body><h1>Error</h1><p>Error saving skill category: ${errorMessage}</p><a href="/real/admin">Go Back</a></body></html>`);
  }
});

// POST /highlights
app.post('/highlights', async (req: Request, res: Response) => {
  const { title, description, icon } = req.body;

  if (!title || !description || !icon) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>All required fields (title, description, icon) must be provided.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  const validIcons = ['Shield', 'Code', 'Brain', 'Palette'];
  if (!validIcons.includes(icon)) {
    return res.status(400).send(`<html><body><h1>Error</h1><p>Invalid icon.</p><a href="/real/admin">Go Back</a></body></html>`);
  }

  try {
    const id = await generateId(Highlight);
    const newHighlight = new Highlight({ id, title, description, icon });
    await newHighlight.save();
    res.send(`<html><body><h1>Success</h1><p>Highlight "${title}" added successfully!</p><a href="/real/admin">Add Another Item</a> | <a href="/highlights">View All Highlights</a></body></html>`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error saving highlight:', err);
    res.status(500).send(`<html><body><h1>Error</h1><p>Error saving highlight: ${errorMessage}</p><a href="/real/admin">Go Back</a></body></html>`);
  }
});

// Start the server
try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error('Error starting server:', err);
  process.exit(1);
}