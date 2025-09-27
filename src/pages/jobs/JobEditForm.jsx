import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const JobEditForm = ({ job, theme, onSave, onCancel, allJobs }) => {
  const [formData, setFormData] = useState(job);

  // Generate slug based on title
  const generateSlug = (title) => {
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const theme = useSelector((state) => state.theme.value);
    // Ensure uniqueness
    const existingSlugs = allJobs
      .filter((j) => j.jobId !== job.jobId)
      .map((j) => j.slug);
    let uniqueSlug = slug;
    let counter = 1;
    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    return uniqueSlug;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title") {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 w-[50vw] m-auto max-h-[80vh] overflow-y-auto p-6 rounded-xl shadow-md
    ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
    ${
      theme === "dark"
        ? "scrollbar-thumb-gray-600 scrollbar-track-gray-700"
        : ""
    }
  `}
    >
      <div>
        <label
          className={`block text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Job Title
        </label>

        <input
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
              : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
          } focus:outline-none focus:ring-2`}
          placeholder="Enter job title"
        />
      </div>

      <div>
        <label
          className={`block text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Slug
        </label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          readOnly
          className={`w-full p-3 rounded-lg border ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-gray-400 placeholder-gray-400"
              : "border-gray-300 bg-gray-50 text-gray-500 placeholder-gray-400"
          } focus:outline-none`}
          placeholder="Auto-generated slug"
        />
      </div>

      <div>
        <label
          className={`block text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-gray-50 text-gray-900"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label
          className={`block text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Salary
        </label>
        <input
        required
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter salary range"
        />
      </div>

      <div>
        <label
          className={`block text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Who Can Apply
        </label>
        <input
        required
          type="text"
          name="whoCanApply"
          value={formData.whoCanApply}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Eligible candidates"
        />
      </div>

      <div>
        <label
          className={`block text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Description
        </label>
        <textarea
        required
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`w-full p-3 rounded-lg border ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Job description and requirements"
        ></textarea>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className={`flex-1 px-6 py-3 rounded-lg ${
            theme === "dark"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-green-500 hover:bg-green-400"
          } text-white font-semibold shadow-md transition-all duration-200`}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`flex-1 px-6 py-3 rounded-lg ${
            theme === "dark"
              ? "bg-red-600 hover:bg-red-500"
              : "bg-red-500 hover:bg-red-400"
          } text-white font-semibold shadow-md transition-all duration-200`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobEditForm;
