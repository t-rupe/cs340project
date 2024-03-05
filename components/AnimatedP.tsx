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
    }, 2000); // delay of 3 seconds

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
