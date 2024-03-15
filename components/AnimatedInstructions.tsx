/**
 * This is the DelayInstructions component. It displays a message instructing the user to scroll to the bottom of the page.
 * The message is initially hidden and fades in after a delay of 3 seconds.
 * 
 * The component uses the useState and useEffect hooks from React, and the useAnimation and motion components from Framer Motion for the animation.
 * The ChevronDownIcon from lucide-react is used to indicate the direction to scroll.
 * 
 * The useEffect hook sets up a timer that starts the animation after the delay. The timer is cleared when the component unmounts.
 * 
 */

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

export default function DelayInstructions() {
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
    }, 3000); // delay of 3 seconds

    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <motion.p
      animate={controls}
      initial={{ opacity: 0 }}
      className="flex justify-center items-center text-gray-50 text-2xl font-semibold"
    >
      {init && (
        <>
          Scroll to the&nbsp;
          <span className="underline">bottom of the page</span>&nbsp; to view
          instructions.
          <ChevronDownIcon className="inline-flex pl-1" />
        </>
      )}
    </motion.p>
  );
}
