import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { assets } from "../assets/assets";

// Particle component for background effects
const Particle = ({ x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      x: x + (Math.random() * 100 - 50),
      y: y + (Math.random() * 100 - 50),
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 2,
      ease: "easeOut",
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
);

function Hero() {
  const controls = useAnimation();
  const containerRef = useRef(null);

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotate: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -5,
      color: "#FFD700",
      transition: { duration: 0.3 },
    },
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 1, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.5)",
      transition: { duration: 0.3, yoyo: Infinity },
    },
  };

  // Background pulse effect
  const bgVariants = {
    animate: {
      backgroundColor: ["#f0f0f0", "#e0e0e0", "#f0f0f0"],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Split title into letters
  const titleText = "Latest Arrivals";
  const titleLetters = titleText.split("");

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col sm:flex-row border border-gray-400 overflow-hidden"
      variants={bgVariants}
      animate="animate"
    >
      {/* Particle Background */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Particle
          key={i}
          x={Math.random() * (window.innerWidth / 2)}
          y={Math.random() * (window.innerHeight / 2)}
        />
      ))}

      {/* Hero Left Side */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          },
        }}
        className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 relative z-10"
      >
        <div className="text-[#414141]">
          {/* Bestseller Tag */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="w-8 md:w-11 h-[2px] bg-[#414141]"
              animate={{ width: [8, 20, 8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"
          >
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Shop Now Button */}
          <motion.div
            className="flex items-center gap-2"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <motion.p
              className="font-semibold text-sm md:text-base cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              SHOP NOW
            </motion.p>
            <motion.div
              className="w-8 md:w-11 h-[1px] bg-[#414141]"
              animate={{ width: [8, 20, 8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Right Side */}
      <motion.img
        src={assets.hero_img}
        alt="Hero"
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          rotate: 1,
          transition: { duration: 0.3 },
        }}
        className="w-full sm:w-1/2 object-cover relative z-10"
      />

      {/* Overlay Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-200/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  );
}

export default Hero;

