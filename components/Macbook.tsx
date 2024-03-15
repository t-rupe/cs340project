/**
 * This is a macbook component created by Aceternity UI library, an open source reusuable component provider. 
 * 
 * Source: https://ui.aceternity.com/
 */
import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function Macbook() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full relative">
      <MacbookScroll
        title={
          <span>
            Just click any tab on the left to view a table. <br /> It&apos;s
            that simple.
          </span>
        }
        showGradient={false}
      />
    </div>
  );
}
