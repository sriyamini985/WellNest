import { motion } from "framer-motion";
import { Brain, Heart, MessageSquare, Sparkles, Search, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Searching for:", inputValue);
      // Handle search functionality here
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero section */}
      <div className="text-center">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Your Mental Wellness Journey Starts Here
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Find support, resources, and community to help you thrive. 
          <span className="block mt-2 text-indigo-500 dark:text-indigo-400 font-medium">How can we help you today?</span>
        </motion.p>
        
        {/* Search input */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="block w-full pl-12 pr-16 py-4 border border-gray-200 dark:border-gray-700 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg shadow-lg"
                placeholder="Ask me anything about mental health..."
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-6 flex items-center pr-4 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full m-1 hover:opacity-90 transition-opacity"
              >
                <span className="mr-2 font-medium">Search</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
          
          {/* Quick suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {["Anxiety relief", "Stress management", "Sleep better", "Boost mood"].map((suggestion, index) => (
              <motion.button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700/50 transition-colors flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
              >
                <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <Brain className="h-8 w-8 text-indigo-500" />,
              title: "Expert Resources",
              description: "Access evidence-based articles, exercises, and tools to support your mental health journey."
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-pink-500" />,
              title: "Peer Support",
              description: "Connect with others who understand what you're going through in a safe, moderated space."
            },
            {
              icon: <Heart className="h-8 w-8 text-purple-500" />,
              title: "Self-Care Tools",
              description: "Discover personalized self-care strategies and track your progress over time."
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              <button className="mt-4 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center">
                Learn more
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take the first step?</h2>
            <p className="text-lg text-indigo-100 mb-8">Join thousands of others on their journey to better mental health.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/mind-connect" 
                className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-full font-medium flex items-center justify-center transition-colors"
              >
                Get Started Now
              </Link>
              <Link 
                to="/resources" 
                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-medium flex items-center justify-center transition-colors"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
