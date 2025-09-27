import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4} from "uuid";

const CreateJobForm = ({ allJobs, onSave, onCancel }) => {
  const theme = useSelector((state) => state.theme.value);
  const [formData, setFormData] = useState({
    jobId: uuidv4(),
    title: "",
    slug: "",
    status: "archived",
    order: allJobs.length + 1,
    description: "",
    whoCanApply: "",
    salary: "",
  });
  const navigate = useNavigate();
  const [redirectToAssessment, setRedirectToAssessment] = useState(false);
  // Generate slug based on title
  const generateSlug = (title) => {
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const existingSlugs = allJobs.map((j) => j.slug);
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
    if (redirectToAssessment) {
      navigate("/assessments");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 w-[50vw] m-auto max-h-[80vh] overflow-y-auto p-6 rounded-xl shadow-md
        ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }
      `}
    >
      <div>
        <label className="block text-sm font-semibold mb-1">Job Title</label>
        <input
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border bg-gray-50 text-gray-900"
          placeholder="Enter job title"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Slug</label>
        <input
          required
          type="text"
          name="slug"
          value={formData.slug}
          readOnly
          className="w-full p-3 rounded-lg border bg-gray-50 text-gray-500"
          placeholder="Auto-generated slug"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select
          required
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border bg-gray-50 text-gray-900"
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Salary</label>
        <input
          required
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border bg-gray-50 text-gray-900"
          placeholder="Enter salary range"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Who Can Apply
        </label>
        <input
          required
          type="text"
          name="whoCanApply"
          value={formData.whoCanApply}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border bg-gray-50 text-gray-900"
          placeholder="Eligible candidates"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 rounded-lg border bg-gray-50 text-gray-900"
          placeholder="Job description and requirements"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          onClick={() => onSave(formData, "save")}
          className="px-6 py-3 rounded-lg bg-green-500 text-white"
        >
          Save
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => onSave(formData, "addAssessment")}
        >
          Add Assessment
        </button>
        <button
          type="submit"
          onClick={(e) => {e.preventDefault();navigate(-1,{replace:true})}}
          className="px-6 py-3 rounded-lg bg-red-500 text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateJobForm;
