import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Created by Tomasz Gziut.
      </p>
    </footer>
  );
};
