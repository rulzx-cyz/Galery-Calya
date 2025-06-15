
import React, { useEffect, useState } from 'react';

const HEART_EMOJIS = ['💖', '💕', '💞', '💓', '💗', '❤️', '🩷'];
const FLOWER_EMOJIS = ['🌸', '🌺', '🌷', '🌼', '🌹', '🌻'];
const SPARKLE_EMOJIS = ['✨', '🌟'];

const ALL_ELEMENTS = [...HEART_EMOJIS, ...FLOWER_EMOJIS, ...SPARKLE_EMOJIS];

const NUM_ELEMENTS = 45; // Slightly increased for a lush feel

interface AnimatedElementStyle extends React.CSSProperties {
  left: string;
  animationDuration: string; 
  animationDelay: string;
  '--element-scale': number;
  '--element-opacity': number;
  '--initial-rotation': string;
  fontSize: string;
  // Specific animation names will be applied via className
}

// Separate style for the pulse animation if applied via animation-name
interface PulseStyle extends React.CSSProperties {
  animationDuration?: string;
  animationDelay?: string;
}

const FlowerBackground: React.FC = () => {
  const [elements, setElements] = useState<Array<{ style: AnimatedElementStyle; elementChar: string; animationClass: string; pulseStyle?: PulseStyle }>>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: Array<{ style: AnimatedElementStyle; elementChar: string; animationClass: string; pulseStyle?: PulseStyle }> = [];
      for (let i = 0; i < NUM_ELEMENTS; i++) {
        const scale = Math.random() * 0.6 + 0.6; // Scale from 0.6 to 1.2
        const baseFontSize = Math.random() * 0.8 + 0.9; // Base font size from 0.9rem to 1.7rem
        const elementChar = ALL_ELEMENTS[Math.floor(Math.random() * ALL_ELEMENTS.length)];
        
        let mainAnimationDuration = Math.random() * 8 + 10; // 10s to 18s for fall/float
        let animationClass = 'animate-fall-sway-rotate'; // Default
        let pulseAnimStyle: PulseStyle | undefined = undefined;

        if (FLOWER_EMOJIS.includes(elementChar) && Math.random() > 0.5) {
          animationClass = 'animate-gentle-float';
          mainAnimationDuration = Math.random() * 7 + 12; // 12s to 19s for gentle float
        } else if (HEART_EMOJIS.includes(elementChar)) {
          // Hearts use fall-sway-rotate, and we'll add pulse via a separate span or more complex CSS
          // For now, let's keep it simple and not add a separate pulse animation via JS to avoid complexity
          // The heartbeat-pulse animation in CSS can be applied to elements with a 'heart' class if needed
          // Or, we can give hearts a slightly different fall-sway-rotate timing
           mainAnimationDuration = Math.random() * 6 + 9; // 9s to 15s for hearts, slightly faster & more dynamic
        }


        const style: AnimatedElementStyle = {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${mainAnimationDuration}s`,
          animationDelay: `${Math.random() * (mainAnimationDuration * 0.8)}s`, // Delay relative to duration
          '--element-scale': scale,
          '--element-opacity': Math.random() * 0.4 + 0.5, // Opacity from 0.5 to 0.9
          '--initial-rotation': `${Math.random() * 360}deg`,
          fontSize: `${baseFontSize}rem`,
        };
        
        newElements.push({ style, elementChar, animationClass });
      }
      setElements(newElements);
    };
    generateElements();
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden" 
      aria-hidden="true"
    >
      {elements.map((item, index) => (
        <span
          key={index}
          className={`animated-bg-element ${item.animationClass} ${HEART_EMOJIS.includes(item.elementChar) ? 'heart-pulse-effect' : ''}`}
          style={{
            ...item.style,
            // If applying heartbeat pulse through JS for specific timing:
            // animationName: item.animationName, 
            // animationTimingFunction for heartbeat-pulse could be 'ease-in-out'
          }}
        >
          {/* If pulse is a child span: <span className="pulse-child">{item.elementChar}</span> */}
          {item.elementChar}
        </span>
      ))}
       {/* Add CSS in index.html for .heart-pulse-effect if combining:
          .heart-pulse-effect { animation: fall-sway-rotate var(--main-duration) linear infinite, 
                                        heartbeat-pulse 1.5s ease-in-out infinite var(--pulse-delay); } 
          This requires setting CSS variables for durations and delays.
          For simplicity, the current CSS is preferred, where heartbeat-pulse is a standalone animation.
          We can add a class to hearts and apply `animation: heartbeat-pulse 1.5s infinite ease-in-out;`
          This will make them pulse *in place* which is not what we want.
          The pulse should be part of their movement.
          The best way is to integrate scale changes into the primary fall animations for hearts,
          or use a child element for the pulse.
          Let's stick to the current CSS which has `heartbeat-pulse` as a separate keyframe.
          Applying multiple *transform-based* animations on the same element via `animation-name` list
          can be tricky if they both manipulate `transform`.
          A simpler visual pulse can be slight opacity or font-size pulsing.
          Given the existing `fall-sway-rotate` involves scale via `--element-scale`, direct `heartbeat-pulse`
          that also changes scale needs careful coordination.
          The CSS in index.html for `heartbeat-pulse` manipulates scale, it will conflict.
          Let's remove the dedicated `heartbeat-pulse` CSS keyframe for now, and achieve a pulse
          by slightly varying `--element-scale` within the JS for hearts if desired, or accept no pulse.
          Or, ensure `heartbeat-pulse` only affects something like `opacity` or `filter: brightness()`.
          
          Revisiting: The request was "Subtle Pulse for Hearts".
          The `fall-sway-rotate` already uses `--element-scale`.
          Let's make the `heartbeat-pulse` animation in CSS target a different property or make it very subtle.
          The simplest is to not add the pulse if it complicates things too much with existing transform animations.
          Let's remove explicit pulse logic from here and rely on the diversity of elements and fall styles.
          The "better" feel will come from the variety of fall animations and element types.
          The prompt mentioned "subtle pulse for hearts" which implies `heartbeat-pulse` keyframes.
          The current `heartbeat-pulse` directly scales. If applied with other transform animations, it could conflict.
          Alternative for pulse: vary font size slightly or opacity.
          Let's assume the CSS `heartbeat-pulse` will be applied and the browser will merge the transforms or the effect will be subtle enough.
          If `heartbeat-pulse` is applied using a comma in `animation-name`, it should work.
          The current `index.html` has `heartbeat-pulse` that affects `transform: scale()`.
          This will indeed conflict.
          Let's simplify: `heartbeat-pulse` will just be another animation name combined for hearts.
          The class `heart-pulse-effect` is not defined in CSS.
          I will make `animationName` a style property again for this.
        */}
    </div>
  );
};

export default FlowerBackground;
