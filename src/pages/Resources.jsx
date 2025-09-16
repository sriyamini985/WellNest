import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Headphones, Film, Bookmark, ExternalLink } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'Understanding Anxiety',
    type: 'article',
    category: 'Anxiety',
    description: 'Learn about the symptoms, causes, and treatments for anxiety disorders.',
    url: '#',
    saved: false
  },
  {
    id: 2,
    title: 'Daily Meditation Guide',
    type: 'audio',
    category: 'Meditation',
    description: 'A 10-minute guided meditation to help you start your day mindfully.',
    url: '#',
    saved: true
  },
  {
    id: 3,
    title: 'Coping with Stress',
    type: 'video',
    category: 'Stress',
    description: 'Effective strategies to manage and reduce stress in your daily life.',
    url: '#',
    saved: false
  },
  {
    id: 4,
    title: 'Sleep Better Tonight',
    type: 'article',
    category: 'Sleep',
    description: 'Tips and techniques to improve your sleep quality naturally.',
    url: '#',
    saved: false
  },
  {
    id: 5,
    title: 'Mindfulness for Beginners',
    type: 'video',
    category: 'Mindfulness',
    description: 'An introduction to mindfulness practices for daily life.',
    url: '#',
    saved: true
  },
  {
    id: 6,
    title: 'Building Resilience',
    type: 'article',
    category: 'Resilience',
    description: 'Learn how to develop emotional resilience in challenging times.',
    url: '#',
    saved: false
  }
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedResources, setSavedResources] = useState(resources.filter(r => r.saved));
  const [activeTab, setActiveTab] = useState('all');

  const categories = ['All', 'Anxiety', 'Meditation', 'Stress', 'Sleep', 'Mindfulness', 'Resilience'];
  const resourceTypes = [
    { id: 'all', name: 'All Resources', icon: null },
    { id: 'articles', name: 'Articles', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'audio', name: 'Audio', icon: <Headphones className="h-5 w-5" /> },
    { id: 'videos', name: 'Videos', icon: <Film className="h-5 w-5" /> }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = activeTab === 'all' || 
      (activeTab === 'articles' && resource.type === 'article') ||
      (activeTab === 'audio' && resource.type === 'audio') ||
      (activeTab === 'videos' && resource.type === 'video');
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleSave = (id) => {
    const updatedResources = resources.map(resource => 
      resource.id === id ? { ...resource, saved: !resource.saved } : resource
    );
    setSavedResources(updatedResources.filter(r => r.saved));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'article':
        return <BookOpen className="h-5 w-5 text-indigo-600" />;
      case 'audio':
        return <Headphones className="h-5 w-5 text-indigo-600" />;
      case 'video':
        return <Film className="h-5 w-5 text-indigo-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wellness Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated collection of articles, guided meditations, and videos to support your mental health journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Resource Type Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex justify-center space-x-8">
              {resourceTypes.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon && <span>{tab.icon}</span>}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(resource.type)}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {resource.category}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSave(resource.id)}
                    className={`p-1 rounded-full ${resource.saved ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                    aria-label={resource.saved ? 'Remove from saved' : 'Save for later'}
                  >
                    <Bookmark 
                      className={`h-5 w-5 ${resource.saved ? 'fill-current' : ''}`} 
                    />
                  </button>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {resource.description}
                  </p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={resource.url}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View {resource.type}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                  <span className="text-xs text-gray-500">
                    {resource.type === 'article' ? '5 min read' : resource.type === 'audio' ? '10 min' : '15 min'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
