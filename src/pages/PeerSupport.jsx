import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, MessageCircle, Plus, Calendar, Clock, MapPin, User, Heart } from 'lucide-react';

const supportGroups = [
  {
    id: 1,
    name: 'Anxiety Support Circle',
    description: 'A safe space for individuals dealing with anxiety to share experiences and coping strategies.',
    members: 124,
    nextMeeting: '2023-06-15T18:00:00',
    frequency: 'Weekly on Thursdays',
    location: 'Online',
    isMember: false
  },
  {
    id: 2,
    name: 'Mindfulness Meditation Group',
    description: 'Join us for guided meditation sessions and discussions on mindfulness practices.',
    members: 89,
    nextMeeting: '2023-06-16T19:30:00',
    frequency: 'Bi-weekly on Fridays',
    location: 'Community Center, Room 3B',
    isMember: true
  },
  {
    id: 3,
    name: 'Depression Support Network',
    description: 'A supportive community for individuals navigating depression and related challenges.',
    members: 156,
    nextMeeting: '2023-06-17T17:00:00',
    frequency: 'Weekly on Saturdays',
    location: 'Online',
    isMember: false
  },
  {
    id: 4,
    name: 'Stress Management Workshop',
    description: 'Learn practical techniques to manage and reduce stress in your daily life.',
    members: 67,
    nextMeeting: '2023-06-20T18:30:00',
    frequency: 'Monthly on the 3rd Tuesday',
    location: 'Wellness Center, Room 102',
    isMember: false
  },
  {
    id: 5,
    name: 'LGBTQ+ Mental Health',
    description: 'A safe and inclusive space for LGBTQ+ individuals to discuss mental health.',
    members: 92,
    nextMeeting: '2023-06-18T16:00:00',
    frequency: 'Every other Sunday',
    location: 'Online',
    isMember: true
  },
  {
    id: 6,
    name: 'Parenting with Mental Health',
    description: 'For parents managing their mental health while raising children.',
    members: 78,
    nextMeeting: '2023-06-19T19:00:00',
    frequency: 'Monthly on the 3rd Monday',
    location: 'Family Resource Center',
    isMember: false
  }
];

const PeerSupport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [groups, setGroups] = useState(supportGroups);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    frequency: '',
    location: 'Online',
    isOnline: true
  });

  const handleJoinGroup = (groupId) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, isMember: !group.isMember } : group
    ));
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const newGroupObj = {
      id: groups.length + 1,
      name: newGroup.name,
      description: newGroup.description,
      members: 1,
      nextMeeting: new Date().toISOString(),
      frequency: newGroup.frequency,
      location: newGroup.location,
      isMember: true
    };
    
    setGroups([newGroupObj, ...groups]);
    setShowCreateForm(false);
    setNewGroup({
      name: '',
      description: '',
      frequency: '',
      location: 'Online',
      isOnline: true
    });
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'my-groups' && group.isMember) ||
      (filter === 'online' && group.location === 'Online') ||
      (filter === 'in-person' && group.location !== 'Online');
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Peer Support Groups</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with others who understand. Join a supportive community for shared experiences and mutual support.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search support groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Groups</option>
                <option value="my-groups">My Groups</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
              </select>
              
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </button>
            </div>
          </div>

          {/* Create Group Form */}
          {showCreateForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create a New Support Group</h3>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label htmlFor="group-name" className="block text-sm font-medium text-gray-700">
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="group-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                      Meeting Frequency
                    </label>
                    <input
                      type="text"
                      id="frequency"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., Weekly on Mondays"
                      value={newGroup.frequency}
                      onChange={(e) => setNewGroup({...newGroup, frequency: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        {newGroup.isOnline ? 'Online' : 'In-Person'}
                      </span>
                      <input
                        type={newGroup.isOnline ? 'text' : 'text'}
                        id="location"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={newGroup.location}
                        onChange={(e) => setNewGroup({...newGroup, location: e.target.value})}
                        placeholder={newGroup.isOnline ? 'e.g., Zoom, Google Meet' : 'e.g., Community Center, Room 101'}
                        required
                      />
                    </div>
                    <div className="mt-2 flex items-center">
                      <input
                        id="is-online"
                        name="is-online"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={newGroup.isOnline}
                        onChange={(e) => setNewGroup({...newGroup, isOnline: e.target.checked, location: e.target.checked ? 'Online' : ''})}
                      />
                      <label htmlFor="is-online" className="ml-2 block text-sm text-gray-700">
                        This is an online group
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{group.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {group.location === 'Online' ? 'Online' : 'In-Person'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{group.description}</p>
                  
                  <div className="mt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Next Meeting:</div>
                        <div>{formatDate(group.nextMeeting)}</div>
                        <div className="text-gray-500 text-sm">{group.frequency}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{group.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      group.isMember
                        ? 'bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-50'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {group.isMember ? (
                      <>
                        <User className="h-4 w-4 mr-2" />
                        <span>Leave Group</span>
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 mr-2" />
                        <span>Join Group</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No groups found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or create a new group.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeerSupport;
