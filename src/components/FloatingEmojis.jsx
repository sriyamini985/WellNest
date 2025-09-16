import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emojis = ['😊', '🧠', '💭', '🌈', '🌱', '🌙', '✨', '💫', '🌸', '🌼', '🦋', '🧘', '🎯', '💖', '🌍'];

const FloatingEmojis = () => {
  const [emojisState, setEmojisState] = useState([]);

  useEffect(() => {
    // Create initial emojis
    const initialEmojis = Array(15).fill().map((_, index) => ({
      id: index,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    
    setEmojisState(initialEmojis);
    
    // Update emojis position periodically
    const interval = setInterval(() => {
      setEmojisState(currentEmojis => 
        currentEmojis.map(emoji => ({
          ...emoji,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 5,
        }))
      );
    }, 15000); // Change positions every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <AnimatePresence>
        {emojisState.map(({ id, emoji, x, y, size, duration, delay, opacity }) => (
          <motion.span
            key={id}
            className="absolute select-none"
            style={{
              fontSize: `${size}px`,
              opacity: opacity,
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingEmojis;
