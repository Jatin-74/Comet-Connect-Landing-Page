"use client";

import { useState, useEffect, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  trigger?: boolean; 
}

const CHARS = "!@#$%^&*():{};|,.<>/?";

export default function GlitchText({ text, className = "", trigger }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; 
    }, 30);
  };

  
  useEffect(() => {
    if (trigger) {
      scramble();
    }
  }, [trigger]);

  return (
    <span 
      onMouseEnter={scramble} 
      className={`cursor-pointer inline-block ${className}`}
    >
      {displayText}
    </span>
  );
}