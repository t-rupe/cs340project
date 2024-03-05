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
