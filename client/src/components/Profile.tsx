import { useState, useEffect, useRef } from 'react';

// Define TypeScript interfaces
interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  featured: boolean;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  logo: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

const Profile = () => {
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);
  // State for active tab
  const [activeTab, setActiveTab] = useState('about');
  // State for notification
  const [showNotification, setShowNotification] = useState(false);
  // State for menu on mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for animated elements
  const [animatedElements, setAnimatedElements] = useState<string[]>([]);
  // State for profile views
  const [profileViews, setProfileViews] = useState(1284);
  
  // Ref for observer
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Sample data
  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'Frontend', icon: 'fab fa-react' },
    { name: 'TypeScript', level: 85, category: 'Frontend', icon: 'fas fa-code' },
    { name: 'Tailwind CSS', level: 95, category: 'Frontend', icon: 'fas fa-palette' },
    { name: 'Node.js', level: 80, category: 'Backend', icon: 'fab fa-node-js' },
    { name: 'Python', level: 75, category: 'Backend', icon: 'fab fa-python' },
    { name: 'UI/UX Design', level: 85, category: 'Design', icon: 'fas fa-pencil-ruler' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration and advanced analytics',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/api/placeholder/300/200',
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Productivity app with drag-and-drop functionality and real-time updates',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
      image: '/api/placeholder/300/200',
      link: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Health & Fitness Tracker',
      description: 'Comprehensive health monitoring application with data visualization',
      technologies: ['React Native', 'GraphQL', 'Chart.js', 'Python'],
      image: '/api/placeholder/300/200',
      link: '#',
      featured: false
    },
    {
      id: 4,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time analytics with machine learning predictions',
      technologies: ['Vue.js', 'TensorFlow.js', 'D3.js', 'FastAPI'],
      image: '/api/placeholder/300/200',
      link: '#',
      featured: true
    }
  ];

  const experiences: Experience[] = [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2021 - Present',
      description: 'Leading frontend development for enterprise SaaS products. Implemented modern UI frameworks reducing development time by 40%.',
      logo: '/api/placeholder/40/40'
    },
    {
      id: 2,
      role: 'Web Developer',
      company: 'Digital Solutions LLC',
      period: '2018 - 2021',
      description: 'Developed responsive web applications for various clients. Increased client satisfaction scores by 35% through improved UX.',
      logo: '/api/placeholder/40/40'
    },
    {
      id: 3,
      role: 'UI/UX Designer',
      company: 'Creative Minds Agency',
      period: '2016 - 2018',
      description: 'Created user interfaces and experiences for mobile and web apps. Designed award-winning interfaces for Fortune 500 companies.',
      logo: '/api/placeholder/40/40'
    }
  ];

  const socialLinks: SocialLink[] = [
    { name: 'GitHub', icon: 'fab fa-github', url: '#', color: 'hover:text-purple-500' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: '#', color: 'hover:text-sky-400' },
    { name: 'Dribbble', icon: 'fab fa-dribbble', url: '#', color: 'hover:text-pink-500' },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  // Effect for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      if (el.id) {
        observerRef.current?.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${darkMode ? 'bg-purple-600' : 'bg-purple-400'}`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${darkMode ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium animate-fade-in">
          {darkMode ? 'Dark mode enabled' : 'Light mode enabled'}
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Portfolio
            </h1>
            <span className="ml-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full">
              Available for work
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Profile views */}
            <div className={`hidden md:flex items-center px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <i className="fas fa-eye text-blue-500 mr-2"></i>
              <span className="text-sm font-medium">{profileViews.toLocaleString()}</span>
            </div>
            
            {/* Desktop Navigation */}
            
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full shadow-md ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mb-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              {['about', 'skills', 'projects', 'experience'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                    document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-3 font-medium capitalize transition-all rounded-xl ${activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'opacity-70 hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* Profile Card */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} border ${darkMode ? 'border-gray-700' : 'border-white'}`}>
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 right-6 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-white/80"></div>
                <div className="w-3 h-3 rounded-full bg-white/50"></div>
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="px-6 md:px-8 pb-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row items-center md:items-end -mt-20">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                    <img 
                      src="/api/placeholder/160/160" 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-md">
                    <i className="fas fa-check text-xs text-white"></i>
                  </div>
                </div>
                
                {/* Name and Title */}
                <div className="mt-4 md:mt-0 md:ml-6 md:mb-4 text-center md:text-left">
                  <h2 className="text-3xl font-bold">Alex Morgan</h2>
                  <p className="text-lg opacity-75 mt-1">Senior Frontend Developer & UI Designer</p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs rounded-full flex items-center">
                      <i className="fas fa-star text-yellow-500 mr-1"></i> React Expert
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 text-xs rounded-full flex items-center">
                      <i className="fas fa-palette mr-1"></i> UI/UX Designer
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs rounded-full flex items-center">
                      <i className="fas fa-bolt mr-1"></i> Available for freelance
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex mt-6 md:mt-0 md:ml-auto space-x-4">
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center group">
                    <i className="fas fa-paper-plane mr-2 group-hover:animate-pulse"></i> Contact Me
                  </button>
                  <button className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center shadow-md hover:shadow-lg">
                    <i className="fas fa-download mr-2"></i> Download CV
                  </button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className={`text-center p-4 rounded-2xl transition-all duration-500 animate-on-scroll ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'} ${animatedElements.includes('stat-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} id="stat-1">
                  <div className="text-2xl font-bold text-blue-500 flex items-center justify-center">
                    <i className="fas fa-project-diagram mr-2"></i> 42
                  </div>
                  <div className="opacity-75 mt-1">Projects</div>
                </div>
                <div className={`text-center p-4 rounded-2xl transition-all duration-500 delay-100 animate-on-scroll ${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'} ${animatedElements.includes('stat-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} id="stat-2">
                  <div className="text-2xl font-bold text-purple-500 flex items-center justify-center">
                    <i className="fas fa-users mr-2"></i> 128
                  </div>
                  <div className="opacity-75 mt-1">Clients</div>
                </div>
                <div className={`text-center p-4 rounded-2xl transition-all duration-500 delay-200 animate-on-scroll ${darkMode ? 'bg-gray-700/50' : 'bg-green-50'} ${animatedElements.includes('stat-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} id="stat-3">
                  <div className="text-2xl font-bold text-green-500 flex items-center justify-center">
                    <i className="fas fa-calendar-alt mr-2"></i> 5+
                  </div>
                  <div className="opacity-75 mt-1">Years Exp</div>
                </div>
                <div className={`text-center p-4 rounded-2xl transition-all duration-500 delay-300 animate-on-scroll ${darkMode ? 'bg-gray-700/50' : 'bg-yellow-50'} ${animatedElements.includes('stat-4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} id="stat-4">
                  <div className="text-2xl font-bold text-yellow-500 flex items-center justify-center">
                    <i className="fas fa-smile mr-2"></i> 98%
                  </div>
                  <div className="opacity-75 mt-1">Satisfaction</div>
                </div>
              </div>

              <nav className="hidden md:flex space-x-6 my-6">
              {['about', 'skills', 'projects', 'experience'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 font-medium capitalize transition-all rounded-xl ${activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'opacity-70 hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            
              
              {/* Tab Content */}
              <div className="mt-8">
                {/* About Tab */}
                <div id="about" className={`${activeTab === 'about' ? 'block' : 'hidden'}`}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="w-2 h-6 bg-blue-500 mr-3 rounded-full"></span>
                    About Me
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="animate-on-scroll" id="about-1">
                      <p className="opacity-80 leading-relaxed text-lg">
                        I'm a passionate frontend developer and UI/UX designer with over 5 years of experience 
                        creating beautiful, functional, and user-centered digital experiences. I am dedicated to 
                        crafting interfaces that are both aesthetically pleasing and highly usable.
                      </p>
                      <p className="opacity-80 leading-relaxed mt-4 text-lg">
                        When I'm not coding, you can find me hiking, reading psychology books, or experimenting 
                        with new design tools and techniques. I believe that great design solves problems and 
                        creates emotional connections.
                      </p>
                      <div className="mt-6 flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Available for freelance work</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm">Open to full-time opportunities</span>
                        </div>
                      </div>
                    </div>
                    <div className="animate-on-scroll" id="about-2">
                      <h3 className="text-xl font-bold mb-4">Personal Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                            <i className="fas fa-envelope text-blue-500"></i>
                          </div>
                          <div>
                            <div className="font-medium opacity-75">Email</div>
                            <div>alex.morgan@example.com</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                            <i className="fas fa-map-marker-alt text-purple-500"></i>
                          </div>
                          <div>
                            <div className="font-medium opacity-75">Location</div>
                            <div>San Francisco, CA</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                            <i className="fas fa-graduation-cap text-green-500"></i>
                          </div>
                          <div>
                            <div className="font-medium opacity-75">Education</div>
                            <div>B.S. Computer Science, Stanford University</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-xl bg-gray-100 dark:bg-gray-700/50">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-4">
                            <i className="fas fa-language text-yellow-500"></i>
                          </div>
                          <div>
                            <div className="font-medium opacity-75">Languages</div>
                            <div>English, Spanish, French</div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mt-8 mb-4">Connect With Me</h3>
                      <div className="flex space-x-4">
                        {socialLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.url}
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} ${link.color} transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
                            aria-label={link.name}
                          >
                            <i className={link.icon}></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Skills Tab */}
                <div id="skills" className={`${activeTab === 'skills' ? 'block' : 'hidden'}`}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="w-2 h-6 bg-blue-500 mr-3 rounded-full"></span>
                    My Skills
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} animate-on-scroll transition-all duration-300 hover:shadow-lg`}
                        id={`skill-${index}`}
                      >
                        <div className="flex items-center mb-2">
                          <i className={`${skill.icon} text-blue-500 mr-3 text-lg`}></i>
                          <div className="flex justify-between w-full">
                            <span className="font-medium">{skill.name}</span>
                            <span className="opacity-75">{skill.level}%</span>
                          </div>
                        </div>
                        <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                            style={{ width: animatedElements.includes(`skill-${index}`) ? `${skill.level}%` : '0%' }}
                          ></div>
                        </div>
                        <div className="text-xs opacity-75 mt-1">{skill.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Projects Tab */}
                <div id="projects" className={`${activeTab === 'projects' ? 'block' : 'hidden'}`}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="w-2 h-6 bg-blue-500 mr-3 rounded-full"></span>
                    Featured Projects
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {projects.filter(p => p.featured).map((project, index) => (
                      <div 
                        key={project.id} 
                        className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-700/50' : 'bg-white'} animate-on-scroll group`}
                        id={`project-${index}`}
                      >
                        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20 transition-all duration-300">
                            <button className="px-4 py-2 bg-white text-gray-800 rounded-full font-medium transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                              View Project <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                          <p className="opacity-75 text-sm mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Experience Tab */}
                <div id="experience" className={`${activeTab === 'experience' ? 'block' : 'hidden'}`}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="w-2 h-6 bg-blue-500 mr-3 rounded-full"></span>
                    Work Experience
                  </h3>
                  <div className="space-y-8">
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="flex animate-on-scroll group" id={`exp-${index}`}>
                        <div className="flex flex-col items-center mr-6">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <i className="fas fa-briefcase"></i>
                          </div>
                          {index < experiences.length - 1 && (
                            <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 my-2"></div>
                          )}
                        </div>
                        <div className={`flex-1 p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'} transition-all duration-300 hover:shadow-lg group-hover:border-l-4 group-hover:border-blue-500`}>
                          <h4 className="font-bold text-lg">{exp.role}</h4>
                          <div className="flex items-center opacity-75 my-2">
                            <i className="fas fa-building mr-2 text-blue-500"></i>
                            <span className="font-medium">{exp.company}</span>
                            <i className="fas fa-calendar-alt ml-4 mr-2 text-purple-500"></i>
                            <span>{exp.period}</span>
                          </div>
                          <p className="opacity-80">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-12 opacity-75 py-6 border-t dark:border-gray-800">
          <p>© {new Date().getFullYear()} Alex Morgan. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className={`${link.color} transition-all transform hover:-translate-y-1`}
                aria-label={link.name}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </footer>
      </div>
      
      {/* Floating action button for easy navigation */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all z-10 transform hover:-translate-y-1"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;