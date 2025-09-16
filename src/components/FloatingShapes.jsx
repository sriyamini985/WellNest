import { motion } from 'framer-motion';
import { useMemo } from 'react';

const Shape = ({ type, size, left, top, delay, duration, rotate }) => {
  const shapeStyle = useMemo(() => ({
    position: 'absolute',
    left: `${left}%`,
    top: `${top}%`,
    width: size,
    height: size,
    zIndex: 0,
  }), [left, top, size]);

  const getShape = () => {
    switch (type) {
      case 'circle':
        return (
          <motion.div
            className="rounded-full bg-indigo-200/30 dark:bg-indigo-500/20"
            style={shapeStyle}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: rotate ? [0, 180] : 0,
            }}
            transition={{
              duration: duration || 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: delay || 0,
              ease: 'easeInOut',
            }}
          />
        );
      case 'star':
        return (
          <motion.div
            className="text-yellow-300/40 dark:text-yellow-200/30"
            style={shapeStyle}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -40, 0],
              x: [0, -20, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: duration || 25 + Math.random() * 15,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: delay || 0,
              ease: 'easeInOut',
            }}
          >
            <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </motion.div>
        );
      case 'leaf':
        return (
          <motion.div
            className="text-green-300/40 dark:text-green-200/30"
            style={shapeStyle}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              y: [0, -50, 0],
              x: [0, 30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: duration || 30 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: delay || 0,
              ease: 'easeInOut',
            }}
          >
            <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21c1.9-1.14 3.82-2.24 5.46-3.36 1.74 1.29 3.4 2.54 4.72 3.36 1.32-.82 2.98-2.07 4.72-3.36 1.64 1.12 3.56 2.22 5.46 3.36-2.08-4.83-4.18-11-13.18-9z" />
            </svg>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return getShape();
};

const generateShapes = (count) => {
  const shapes = [];
  const types = ['circle', 'star', 'leaf'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const size = 20 + Math.random() * 60; // 20-80px
    const left = 5 + Math.random() * 90; // 5-95%
    const top = 5 + Math.random() * 90; // 5-95%
    const delay = Math.random() * 5;
    const duration = 20 + Math.random() * 40; // 20-60s
    const rotate = Math.random() > 0.5;
    
    shapes.push({
      id: i,
      type,
      size,
      left,
      top,
      delay,
      duration,
      rotate,
    });
  }
  
  return shapes;
};

const FloatingShapes = () => {
  const shapes = useMemo(() => generateShapes(15), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {shapes.map((shape) => (
        <Shape key={shape.id} {...shape} />
      ))}
    </div>
  );
};

export default FloatingShapes;
