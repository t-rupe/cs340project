/**
 * This is the DelayedParagraph component. It renders a paragraph with a delay of 2 seconds.
 * The paragraph is initially hidden and fades in after the delay.
 *
 * The component uses the useState and useEffect hooks from React, and the useAnimation and motion components from Framer Motion for the animation.
 *
 * The useEffect hook sets up a timer that starts the animation after the delay. The timer is cleared when the component unmounts.
 */

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function DelayedParagraph() {
  const [init, setInit] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInit(true);
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <motion.p
      animate={controls}
      initial={{ opacity: 0 }}
      className="text-white text-2xl font-semibold mt-4"
    >
      {init && "Welcome"}
    </motion.p>
  );
}
