"use client"

import { motion, useAnimation, type Variants, type TargetAndTransition } from "framer-motion"
import { useEffect } from "react"

export default function LoadingFlexora() {
  const text = "Flexora"
  const textControls = useAnimation() // Controls for the Flexora text animation
  const dotControls = useAnimation() // Controls for the dot animation

  // Define the functional variants explicitly to help TypeScript
  const getVisibleLetterVariant = (i: number): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
      delay: i * 0.07, // Stagger delay for each letter
    },
  })

  const getFadeHiddenLetterVariant = (i: number): TargetAndTransition => ({
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      delay: i * 0.03, // Staggered fade out
    },
  })

  const getPulseDotVariant = (i: number): TargetAndTransition => ({
    scale: [1, 1.15, 1], // Slightly less aggressive scale for elegance
    opacity: [1, 0.8, 1], // Subtle opacity change
    transition: {
      duration: 0.6, // Slightly slower pulse for more elegance
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY, // Use Infinity for type compatibility
      delay: i * 0.15, // Staggered pulse
    },
  })

  // Variants for the Flexora text animation
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: getVisibleLetterVariant,
    fadeHidden: getFadeHiddenLetterVariant,
  }

  // Variants for the dot loading animation
  const dotVariants: Variants = {
    pulse: getPulseDotVariant,
  }

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // --- Flexora Typing Sequence ---
        // 1. Instantly reset all letters to hidden
        await textControls.set("hidden")
        await new Promise((resolve) => setTimeout(resolve, 100)) // Small pause before typing starts

        // 2. Type out "Flexora" letter by letter (FASTER)
        await textControls.start("visible")

        // 3. Pause after Flexora is typed
        await new Promise((resolve) => setTimeout(resolve, 500)) // Shorter pause

        // --- Dot Loading Sequence (Continuous & Fast) ---
        // 4. Start dots pulsing immediately and continuously
        dotControls.start("pulse") // This will trigger the 'pulse' variant on all dots

        await new Promise((resolve) => setTimeout(resolve, 1500)) // Let dots pulse for a bit

        // 5. Fade out Flexora text for a clean loop
        await textControls.start("fadeHidden")
        await new Promise((resolve) => setTimeout(resolve, 300)) // Short pause before next full loop
      }
    }
    sequence()
  }, [textControls, dotControls]) // Dependencies for useEffect

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-black relative overflow-hidden">
      {/* Subtle Radial Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-gray-100/10 to-transparent dark:from-gray-900/10 dark:to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content directly on background */}
      <div className="relative z-10 flex flex-col items-center space-y-6 sm:space-y-8 w-full max-w-md">
        {/* Flexora Typing Animation */}
        <div className="flex justify-center items-baseline">
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-gray-100 inline-block drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
              custom={index} // Pass index to the animation controls
              initial="hidden"
              animate={textControls} // Animate letters using textControls
              variants={letterVariants} // Define the hidden/visible/fadeHidden states
            >
              {char === " " ? "\u00A0" : char} {/* Handle spaces */}
            </motion.span>
          ))}
        </div>

        {/* Dot Loading Animation (Continuously Visible & Fast) */}
        <div className="flex space-x-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              className="block w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-100"
              custom={i} // Pass index to the animation controls
              initial="pulse" // Start with the pulse animation immediately
              animate={dotControls} // Animate dots using dotControls
              variants={dotVariants} // Define the pulse variant
            />
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }} // Tagline appears once and stays
        >
          Finding your next opportunity...
        </motion.p>
      </div>
    </div>
  )
}
