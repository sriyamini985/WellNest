import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, AnimatePresence as AP } from 'framer-motion';
import { 
  Send, 
  X, 
  Bot, 
  User as UserIcon, 
  Loader2, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  ChevronDown,
  Mic,
  Paperclip,
  Smile,
  ArrowRight
} from 'lucide-react';

const MithraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Mithra, your mental wellness assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sample responses from the bot with typing indicators
  const botResponses = [
    { 
      text: "I'm here to listen. Can you tell me more about how you're feeling? 🌸",
      delay: 1.5,
      typingSpeed: 0.03
    },
    { 
      text: "That sounds challenging. Have you tried any coping strategies? 💭",
      delay: 1.2,
      typingSpeed: 0.025
    },
    { 
      text: "I understand. It's okay to feel this way. Would you like some resources to help? 📚",
      delay: 1.7,
      typingSpeed: 0.028
    },
    { 
      text: "Thank you for sharing. Remember to be kind to yourself. 💖",
      delay: 1.0,
      typingSpeed: 0.02
    },
  ];

  const getRandomResponse = () => {
    return botResponses[Math.floor(Math.random() * botResponses.length)];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getRandomResponse(),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Quick suggestion prompts
  const quickPrompts = [
    { text: "I'm feeling anxious", icon: <Heart className="h-4 w-4 mr-1" /> },
    { text: "I need motivation", icon: <Sparkles className="h-4 w-4 mr-1" /> },
    { text: "Help me relax", icon: <MessageSquare className="h-4 w-4 mr-1" /> },
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className={`fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Mithra"
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bot size={28} />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-8 z-50 w-96 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <motion.div 
                  className="bg-white/20 p-1.5 rounded-lg mr-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="h-5 w-5" />
                </motion.div>
                <h3 className="font-semibold text-lg">Mithra 🌸</h3>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-indigo-50">
              {messages.length === 1 && (
                <motion.div 
                  className="text-center py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-gray-500 mb-3">How can I help you today?</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setInputValue(prompt.text);
                          // Auto-focus the input after setting the value
                          setTimeout(() => document.getElementById('chat-input')?.focus(), 0);
                        }}
                        className="flex items-center px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {prompt.icon}
                        {prompt.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none shadow-md'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1.5 text-right ${
                        message.sender === 'user' ? 'text-indigo-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    className="flex items-center space-x-2 p-2 w-20 bg-white rounded-full shadow-sm border border-gray-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 p-4 bg-white">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  id="chat-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message Mithra..."
                  className="flex-1 pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400 transition-all duration-300"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`absolute right-2 p-2 rounded-lg ${
                    inputValue.trim() 
                      ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg' 
                      : 'text-gray-400 bg-gray-100'
                  } transition-all duration-300`}
                  whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </form>
              <p className="text-xs text-gray-400 text-center mt-2">
                Mithra is here to listen and support you
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MithraBot;
