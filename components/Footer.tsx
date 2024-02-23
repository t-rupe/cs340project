
export default function Footer() {
  const gif = "/icons8-github.gif";
  return (
    <footer className="bg-gray-50 sticky bottom-0 rounded-lg sm:flex sm:items-center sm:justify-center p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
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
            src={gif} // replace with your gif path
            alt="Github"
          />
          <span className="sr-only">Github</span>
        </a>
        <div
          id="tooltip-github"
          role="tooltip"
          className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          <div className="tooltip-arrow" data-popper-arrow="" />
        </div>
        . Built with Next.js, TailwindCSS and TypeScript.
      </p>
    </footer>
  );
}
