import React from "react";
import { useSelector } from "react-redux";
import { FaPlus, FaEdit, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AssessmentPopup = ({ onClose }) => {
  const theme = useSelector((state) => state.theme.value);
  const navigate = useNavigate();

  const baseStyles =
    "w-full p-3 rounded-lg text-white flex items-center justify-center gap-2 transition hover:opacity-90";

  const handleClick = () => {
    // Navigate to create job page
    navigate("/jobs/createJob");
  };
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-xl shadow-xl w-96 transition ${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">Create Assessment</h2>

        <div className="space-y-3">
          <button
            type="button" // ensures it's not treated as a form submit
            className={`${baseStyles} bg-blue-500 hover:bg-blue-600 flex items-center gap-2`}
            onClick={handleClick}
          >
            <FaPlus /> New Job & Assessment
          </button>

          <button
            className={`${baseStyles} bg-yellow-500 hover:bg-yellow-600`}
            onClick={() => navigate("/assessments")}
          >
            <FaEdit /> Edit Job Assessment
          </button>
        </div>

        <button
          onClick={onClose}
          className={`mt-5 w-full p-2 rounded-lg transition ${
            theme === "dark"
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssessmentPopup;
