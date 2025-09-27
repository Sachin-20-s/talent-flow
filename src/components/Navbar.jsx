import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "react-bootstrap-icons";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../theme/themeSlice";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("validUser");
    navigate("/login", { replace: true });
  };

  return (
    <nav
      className={`flex items-center justify-between p-5 h-[10vh] transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-black shadow-md"
      }`}
    >
      {/* Brand */}
      <h1
        className={`text-2xl font-bold cursor-pointer transition-colors duration-200 ${
          theme === "dark"
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-700 hover:text-blue-900"
        }`}
        onClick={() => navigate("/")}
      >
        Job Board
      </h1>

      {/* Navigation buttons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate("/jobs")}
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            theme === "dark"
              ? "border border-gray-600 hover:bg-gray-700"
              : "border border-gray-400 hover:bg-gray-300"
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => navigate("/applicants")}
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            theme === "dark"
              ? "border border-gray-600 hover:bg-gray-700"
              : "border border-gray-400 hover:bg-gray-300"
          }`}
        >
          Applicants
        </button>
        <button
          onClick={() => navigate("/assessments")}
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            theme === "dark"
              ? "border border-gray-600 hover:bg-gray-700"
              : "border border-gray-400 hover:bg-gray-300"
          }`}
        >
          Assessments
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch(setTheme())}
          className={`p-2 rounded transition-colors duration-200 ${
            theme === "dark"
              ? "border border-gray-600 hover:bg-gray-700"
              : "border border-gray-400 hover:bg-gray-300"
          }`}
        >
          {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`ml-4 px-4 py-2 rounded transition-colors duration-200 ${
            theme === "dark"
              ? "border border-gray-600 hover:bg-gray-700"
              : "border border-gray-400 hover:bg-gray-300"
          }`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
