/**
 * Github Logo icon provided by icons8
 * source: https://icons8.com/icons/set/github--animated
 */
'use client';

export default async function Footer() {
  const gif = "/icons8-github.gif";
  return (
    <footer className="bg-gray-50 sticky bottom-0 sm:flex sm:items-center sm:justify-center p-4 sm:p-2 xl:p-4 dark:bg-gray-800 antialiased">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        © 2024 NexaLibrium. A project by Taylor Rupe &  Caleb Kasprzyk. All rights reserved. Designed by{" "}
        <span className="underline text-black font-bold">Taylor Rupe</span>
        <a
          href="https://github.com/t-rupe/"
          target="_blank"
          rel="noopener noreferrer"
          data-tooltip-target="tooltip-github"
          className="inline-flex justify-center text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <img
            style={{ position: "relative", top: "5px" }}
            className="h-6 w-6"
            src={gif} 
            alt="Github"
          />
          <span className="sr-only">Github</span>
        </a>
       
          
        . Built with Next.js, TailwindCSS and TypeScript.
      </p>
    </footer>
  );
}
