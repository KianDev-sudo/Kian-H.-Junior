import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
  id?: string;
  as?: 'div' | 'section' | 'article' | 'aside';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 24,
  amount = 0.12,
  once = true,
  id,
  as = 'div'
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === 'none') {
      return { x: 0, y: 0 };
    }
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: distance };
    }
  };

  const initialPos = getInitialPosition();

  const MotionComponent = as === 'section' ? motion.section : as === 'article' ? motion.article : as === 'aside' ? motion.aside : motion.div;

  return (
    <MotionComponent
      id={id}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom smooth cubic-bezier easing
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
}> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  amount = 0.1,
  once = true
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  distance?: number;
}> = ({ children, className = '', distance = 20 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: distance },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
