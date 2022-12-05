import Link from "next/link";

const BackToSearchButton = () => (
  <Link
    href="/"
    className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-700 focus:ring-pink-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mb-4"
  >
    Back to search
  </Link>
);

export default BackToSearchButton;
