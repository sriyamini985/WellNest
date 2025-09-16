import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, BookOpen, BarChart2, Bookmark, Share2, ExternalLink } from 'lucide-react';

// Sample research data
const researchData = [
  {
    id: 1,
    title: 'The Impact of Mindfulness Meditation on Stress Reduction',
    authors: 'Smith, J., Johnson, A., & Williams, M.',
    journal: 'Journal of Clinical Psychology',
    year: 2022,
    abstract: 'This study examines the effects of an 8-week mindfulness meditation program on stress levels in working adults...',
    link: 'https://example.com/research/1',
    tags: ['Mindfulness', 'Stress', 'Meditation'],
    saved: false
  },
  {
    id: 2,
    title: 'Cognitive Behavioral Therapy for Anxiety Disorders: A Meta-Analysis',
    authors: 'Chen, L., Kim, S., & Patel, R.',
    journal: 'Clinical Psychology Review',
    year: 2021,
    abstract: 'A comprehensive meta-analysis of 45 randomized controlled trials evaluating the efficacy of CBT for various anxiety disorders...',
    link: 'https://example.com/research/2',
    tags: ['CBT', 'Anxiety', 'Therapy'],
    saved: true
  },
  {
    id: 3,
    title: 'The Role of Exercise in Alleviating Symptoms of Depression',
    authors: 'Martinez, R., Davis, K., & Thompson, P.',
    journal: 'American Journal of Psychiatry',
    year: 2023,
    abstract: 'This longitudinal study investigates the relationship between regular physical activity and depressive symptoms over a 2-year period...',
    link: 'https://example.com/research/3',
    tags: ['Exercise', 'Depression', 'Mental Health'],
    saved: false
  },
  {
    id: 4,
    title: 'Digital Mental Health Interventions: Current Evidence and Future Directions',
    authors: 'Wilson, E., Brown, T., & Lee, M.',
    journal: 'Nature Digital Medicine',
    year: 2022,
    abstract: 'A review of the current state of digital mental health interventions, including mobile apps, online therapy, and AI-based tools...',
    link: 'https://example.com/research/4',
    tags: ['Digital Health', 'Therapy', 'Technology'],
    saved: false
  },
  {
    id: 5,
    title: 'The Effects of Sleep Quality on Cognitive Function and Emotional Regulation',
    authors: 'Garcia, S., Miller, D., & Anderson, L.',
    journal: 'Sleep Medicine Reviews',
    year: 2021,
    abstract: 'This study explores the bidirectional relationship between sleep quality and various aspects of mental health and cognitive performance...',
    link: 'https://example.com/research/5',
    tags: ['Sleep', 'Cognition', 'Emotional Health'],
    saved: true
  },
  {
    id: 6,
    title: 'Nutrition and Mental Health: The Gut-Brain Axis',
    authors: 'Patel, N., Thompson, R., & Wilson, K.',
    journal: 'Nutritional Neuroscience',
    year: 2023,
    abstract: 'A comprehensive review of emerging research on the connection between diet, gut microbiota, and mental health outcomes...',
    link: 'https://example.com/research/6',
    tags: ['Nutrition', 'Gut Health', 'Mental Health'],
    saved: false
  }
];

// Filter options
const filterOptions = {
  year: ['All', '2023', '2022', '2021', '2020 & earlier'],
  tags: ['All', 'Mindfulness', 'Therapy', 'Digital Health', 'Exercise', 'Sleep', 'Nutrition'],
  sortBy: ['Most Recent', 'Most Relevant', 'Most Cited']
};

const Research = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    year: 'All',
    tag: 'All',
    sortBy: 'Most Recent',
    showFilters: false
  });
  const [savedOnly, setSavedOnly] = useState(false);
  const [activeResearch, setActiveResearch] = useState(null);
  
  // Toggle save status for a research paper
  const toggleSave = (id) => {
    // In a real app, this would update the backend
    const updatedData = researchData.map(paper => 
      paper.id === id ? { ...paper, saved: !paper.saved } : paper
    );
    // For demo purposes, we're not persisting this change
    return updatedData.find(paper => paper.id === id).saved;
  };
  
  // Filter and sort research papers
  const filteredResearch = researchData
    .filter(paper => {
      // Search filter
      const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Year filter
      const matchesYear = filters.year === 'All' || 
                         (filters.year === '2020 & earlier' ? paper.year <= 2020 : paper.year.toString() === filters.year);
      
      // Tag filter
      const matchesTag = filters.tag === 'All' || paper.tags.includes(filters.tag);
      
      // Saved filter
      const matchesSaved = !savedOnly || paper.saved;
      
      return matchesSearch && matchesYear && matchesTag && matchesSaved;
    })
    .sort((a, b) => {
      // Sort by selected option
      switch (filters.sortBy) {
        case 'Most Recent':
          return b.year - a.year;
        case 'Most Cited':
          // Simulated citation count for demo
          return (b.id * 10) - (a.id * 10);
        case 'Most Relevant':
        default:
          // Simple relevance based on search query match
          if (searchQuery) {
            const aTitleMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
            const bTitleMatch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
          }
          return b.year - a.year;
      }
    });
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Research <span className="text-indigo-200">Library</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore the latest research on mental health, therapy approaches, and wellness strategies.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg leading-5 bg-white/10 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                placeholder="Search research papers, authors, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={() => setFilters({...filters, showFilters: !filters.showFilters})}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </button>
              </div>
            </div>
            
            {/* Filter Panel */}
            {filters.showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-indigo-100 mb-1">
                      Year Published
                    </label>
                    <div className="relative">
                      <select
                        id="year"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={filters.year}
                        onChange={(e) => setFilters({...filters, year: e.target.value})}
                      >
                        {filterOptions.year.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="tag" className="block text-sm font-medium text-indigo-100 mb-1">
                      Topic
                    </label>
                    <div className="relative">
                      <select
                        id="tag"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={filters.tag}
                        onChange={(e) => setFilters({...filters, tag: e.target.value})}
                      >
                        {filterOptions.tags.map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="sort" className="block text-sm font-medium text-indigo-100 mb-1">
                      Sort By
                    </label>
                    <div className="relative">
                      <select
                        id="sort"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={filters.sortBy}
                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                      >
                        {filterOptions.sortBy.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <input
                    id="saved-only"
                    name="saved-only"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={savedOnly}
                    onChange={() => setSavedOnly(!savedOnly)}
                  />
                  <label htmlFor="saved-only" className="ml-2 block text-sm text-indigo-100">
                    Show saved items only
                  </label>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Research List */}
          <div className={`${activeResearch ? 'hidden lg:block lg:w-1/2 xl:w-2/5' : 'w-full'} space-y-6`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                {savedOnly ? 'Saved Research' : 'All Research Papers'}
                <span className="ml-2 text-sm text-gray-500">
                  ({filteredResearch.length} {filteredResearch.length === 1 ? 'result' : 'results'})
                </span>
              </h2>
              <div className="text-sm text-gray-500">
                {filters.year !== 'All' && `${filters.year} • `}
                {filters.tag !== 'All' && `${filters.tag} • `}
                Sorted by {filters.sortBy.toLowerCase()}
              </div>
            </div>
            
            {filteredResearch.length > 0 ? (
              <div className="space-y-4">
                {filteredResearch.map((paper) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white overflow-hidden shadow rounded-lg border ${
                      activeResearch?.id === paper.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                    } transition-shadow`}
                    onClick={() => setActiveResearch(paper)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-medium text-indigo-600 line-clamp-2">
                          {paper.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const isSaved = toggleSave(paper.id);
                            if (isSaved && savedOnly) {
                              // If un-saving a paper in "saved only" view, remove it from the list
                              setActiveResearch(null);
                            }
                          }}
                          className="ml-2 text-gray-400 hover:text-indigo-500"
                          aria-label={paper.saved ? 'Remove from saved' : 'Save for later'}
                        >
                          <Bookmark 
                            className={`h-5 w-5 ${paper.saved ? 'fill-indigo-500 text-indigo-500' : ''}`} 
                          />
                        </button>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-500">
                        {paper.authors} • {paper.journal} • {paper.year}
                      </p>
                      
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {paper.abstract}
                      </p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {paper.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // In a real app, this would open a share dialog
                            alert(`Sharing: ${paper.title}`);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </button>
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          Read full paper
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No research papers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery 
                    ? 'Try adjusting your search or filter criteria.'
                    : savedOnly 
                      ? 'You haven\'t saved any research papers yet.'
                      : 'There are no research papers matching your criteria.'}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        year: 'All',
                        tag: 'All',
                        sortBy: 'Most Recent',
                        showFilters: false
                      });
                      setSavedOnly(false);
                    }}
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Research Detail View */}
          <div className={`${!activeResearch ? 'hidden lg:block lg:w-1/2 xl:w-3/5' : 'w-full'} bg-white rounded-lg shadow overflow-hidden`}>
            {activeResearch ? (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">{activeResearch.title}</h2>
                    <button
                      onClick={() => setActiveResearch(null)}
                      className="lg:hidden text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="mt-2 text-gray-600">
                    {activeResearch.authors}
                  </p>
                  
                  <p className="mt-1 text-sm text-gray-500">
                    {activeResearch.journal} • {activeResearch.year}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeResearch.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => {
                        const isSaved = toggleSave(activeResearch.id);
                        if (isSaved && savedOnly) {
                          setActiveResearch(null);
                        } else {
                          setActiveResearch({
                            ...activeResearch,
                            saved: isSaved
                          });
                        }
                      }}
                      className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                        activeResearch.saved
                          ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Bookmark 
                        className={`h-4 w-4 mr-1 ${activeResearch.saved ? 'fill-indigo-500 text-indigo-500' : 'text-gray-400'}`} 
                      />
                      {activeResearch.saved ? 'Saved' : 'Save'}
                    </button>
                    
                    <a
                      href={activeResearch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Full Paper
                    </a>
                    
                    <button
                      onClick={() => {
                        // In a real app, this would open a share dialog
                        alert(`Sharing: ${activeResearch.title}`);
                      }}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Abstract</h3>
                    <p className="text-gray-700">
                      {activeResearch.abstract.repeat(3)} {/* Repeating for demo purposes */}
                    </p>
                    
                    <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Key Findings</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Significant reduction in stress levels was observed in the intervention group (p &lt; 0.05).</li>
                      <li>Participants reported improved sleep quality and overall well-being.</li>
                      <li>The effects were maintained at the 3-month follow-up assessment.</li>
                      <li>No significant adverse effects were reported.</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Methods</h3>
                    <p className="text-gray-700">
                      This study employed a randomized controlled trial design with 200 participants aged 18-65. 
                      Participants were randomly assigned to either the intervention group (n=100) or the control 
                      group (n=100). The intervention group received an 8-week mindfulness-based stress reduction 
                      program, while the control group was placed on a waitlist. Assessments were conducted at 
                      baseline, post-intervention, and at 3-month follow-up using standardized measures of stress, 
                      anxiety, and quality of life.
                    </p>
                    
                    <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Citations</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="text-sm text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
                          <p className="font-medium">Related Study {i}</p>
                          <p className="text-gray-500">Author Name et al. (Year). <span className="text-indigo-600 hover:underline cursor-pointer">Title of the related study that provides additional context</span>. Journal Name, 12(3), 45-67.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      DOI: 10.1234/example.doi
                    </p>
                    <a
                      href={activeResearch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View on publisher's website
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No research paper selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a research paper from the list to view its details here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
