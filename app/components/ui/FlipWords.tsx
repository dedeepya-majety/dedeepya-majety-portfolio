"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function FlipWords({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const next = words[words.indexOf(currentWord) + 1] ?? words[0];
    setCurrentWord(next);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const t = setTimeout(startAnimation, duration);
      return () => clearTimeout(t);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -28,
          x: 20,
          filter: "blur(6px)",
          scale: 1.6,
          position: "absolute",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className={className}
        style={{ display: "inline-block", position: "relative" }}
      >
        {currentWord.split(" ").map((word, wi) => (
          <motion.span
            key={word + wi}
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: wi * 0.25, duration: 0.3 }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((ch, ci) => (
              <motion.span
                key={ch + ci}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: wi * 0.25 + ci * 0.04, duration: 0.2 }}
                style={{ display: "inline-block" }}
              >
                {ch}
              </motion.span>
            ))}
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}
