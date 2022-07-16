import { CustomNextPage } from "@/types/next";
import Link from "next/link";
import React from "react";

const PageNotFound: CustomNextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-center p-4">
      <span className="text-[100px] md:text-[180px] font-black mb-4">
        Oops!
      </span>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        404 - Page Not Found 😵
      </h1>
      <p className="text-lg md:text-xl mb-4 text-gray-600 dark:text-gray-300">
        Seems like the page you are looking for doesn&apos;t exist.
      </p>

      <Link href={"/"}>
        <a className="text-indigo-500 dark:text-indigo-400 text-lg md:text-xl font-medium p-4 hover:underline">
          Go Back Home
        </a>
      </Link>
    </div>
  );
};

export default PageNotFound;
