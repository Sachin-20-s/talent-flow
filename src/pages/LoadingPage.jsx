import React from "react";
import { useSelector } from "react-redux";

const LoadingPage = () => {
  const theme = useSelector((state) => state.theme.value);

  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const spinnerClass =
    theme === "dark"
      ? "border-blue-400 border-t-transparent"
      : "border-blue-500 border-t-transparent";

  return (
    <div className={`flex items-center justify-center min-h-[70vh] ${bgClass}`}>
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div
          className={`w-16 h-16 border-4 ${spinnerClass} border-solid rounded-full animate-spin`}
        ></div>
        {/* Loading Text */}
        <p className={`mt-4 ${textClass} text-lg font-medium`}>
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
