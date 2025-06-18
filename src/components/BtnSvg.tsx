"use client";
export const btnSvg = (
  <motion.svg
    viewBox="0 0 68 87"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M1.50315 1.69727C5.28125 4.7002 9.38305 7.34398 11.6847 11.4336C16.8752 20.6561 19.8871 29.7913 21.4067 40.7604C23.1922 53.6486 22.9689 67.0275 13.6788 76.8015C10.696 79.3778 8.74611 80.975 2.9213 85.4895"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M66.2812 42.7012L31.2813 42.7012"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M28.6985 62.7012C31.5328 62.7012 34.0824 64.498 36.6962 65.4485C39.9333 66.6256 43.2229 67.7655 46.2812 69.2947"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M20.5339 79.7012C21.3468 79.8028 22.66 81.8273 23.2812 82.4485"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M28.6985 18.2949C31.5328 18.2949 34.0824 16.4981 36.6962 15.5476C39.9333 14.3705 43.2229 13.2306 46.2812 11.7014"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M22.5339 4.44727C23.3468 4.34566 24.66 2.32118 25.2812 1.69996"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
  </motion.svg>
); 


import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Transition } from "framer-motion";

export const BtnSvg = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const baseTransition:Transition = {
    duration: 1.2,
    ease: "easeOut",
    repeat: Infinity,
    repeatType: "reverse",
    repeatDelay: 2,
  };

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 68 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M1.50315 1.69727C5.28125 4.7002 9.38305 7.34398 11.6847 11.4336C16.8752 20.6561 19.8871 29.7913 21.4067 40.7604C23.1922 53.6486 22.9689 67.0275 13.6788 76.8015C10.696 79.3778 8.74611 80.975 2.9213 85.4895"
        stroke="#FF91B2"
        strokeWidth="3"
        strokeLinecap="butt"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={baseTransition}
      />
      <motion.path
        d="M66.2812 42.7012L31.2813 42.7012"
        stroke="#FF91B2"
        strokeWidth="3"
        strokeLinecap="butt"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ ...baseTransition, delay: 1.2 }}
      />
      <motion.path
        d="M28.6985 62.7012C31.5328 62.7012 34.0824 64.498 36.6962 65.4485C39.9333 66.6256 43.2229 67.7655 46.2812 69.2947"
        stroke="#FF91B2"
        strokeWidth="3"
        strokeLinecap="butt"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ ...baseTransition, delay: 1.2 }}
      />
      <motion.path
        d="M20.5339 79.7012C21.3468 79.8028 22.66 81.8273 23.2812 82.4485"
        stroke="#FF91B2"
        strokeWidth="3"
        strokeLinecap="butt"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ ...baseTransition, delay: 1.2 }}
      />
      <motion.path
        d="M28.6985 18.2949C31.5328 18.2949 34.0824 16.4981 36.6962 15.5476C39.9333 14.3705 43.2229 13.2306 46.2812 11.7014"
        stroke="#FF91B2"
        strokeWidth="3"
        strokeLinecap="butt"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ ...baseTransition, delay: 1.2 }}
      />
      <motion.path
        d="M22.5339 4.44727C23.3468 4.34566 24.66 2.32118 25.2812 1.69996"
        stroke="#FF91B2"
        strokeWidth="3"
        strokeLinecap="butt"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ ...baseTransition, delay: 1.2 }}
      />
    </motion.svg>
  );
};