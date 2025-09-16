import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageSquare, Search, Sun, Moon, User, LogIn, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Navigation links with icons
  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Resources', path: '/resources', icon: '📚' },
    { name: 'Peer Support', path: '/peer-support', icon: '🤝' },
    { name: 'Research', path: '/research', icon: '🔬' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/contact', icon: '✉️' },
    { name: 'MindConnect', path: '/mind-connect', icon: '💬' },
  ];
  
  // User menu items
  const userMenu = [
    { name: 'Profile', path: '/profile', icon: <User size={16} className="mr-2" /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={16} className="mr-2" /> },
    { name: 'Sign Out', path: '/logout', icon: <LogOut size={16} className="mr-2" /> },
  ];

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center group">
              <motion.div 
                className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-teal-200 dark:group-hover:shadow-teal-900/30 transition-all duration-300"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <span className="text-xl">🧠</span>
              </motion.div>
              <motion.span 
                className="ml-3 text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                WellNest
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  className={`px-4 py-2.5 text-sm font-medium transition-all duration-300 flex items-center relative ${
                    isActive(link.path)
                      ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 origin-left transition-transform duration-300 ${
                    isActive(link.path) ? 'scale-x-100' : 'group-hover:scale-x-75'
                  }`}></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>

            {/* Desktop CTA */}
            <motion.div 
              className="hidden md:flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link
                to="/mind-connect"
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-100 dark:shadow-indigo-900/30 transition-all duration-300 flex items-center group"
              >
                <MessageSquare className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-0.5 transition-transform">MindConnect</span>
              </Link>
              
              <Link
                to="/login"
                className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center group"
              >
                <LogIn className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-0.5 transition-transform">Sign In</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-3">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
              ref={searchRef}
            >
              <form onSubmit={handleSearch} className="py-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Search for resources, articles..."
                    autoFocus
                  />
                  <motion.button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Search
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl rounded-b-2xl overflow-hidden border border-white/20 dark:border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-5 py-3.5 text-base font-medium rounded-xl mx-2 my-1 transition-colors ${
                    isActive(link.path)
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50/70 dark:hover:bg-gray-800/50 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  {link.name}
                  {isActive(link.path) && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  )}
                </Link>
              ))}
              
              {/* User menu in mobile */}
              <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                <Link
                  to="/profile"
                  className="flex items-center px-5 py-3.5 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50/70 dark:hover:bg-gray-800/50 rounded-xl mx-2 my-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 mr-3 text-gray-500" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-5 py-3.5 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50/70 dark:hover:bg-gray-800/50 rounded-xl mx-2 my-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3 text-gray-500" />
                  Settings
                </Link>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
              <Link
                to="/mind-connect"
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-100 dark:shadow-indigo-900/30 transition-all duration-300 mb-3 group"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-0.5 transition-transform">MindConnect</span>
              </Link>
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-0.5 transition-transform">Sign In / Register</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
