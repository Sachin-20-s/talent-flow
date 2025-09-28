import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllAssessments = () => {
  const theme = useSelector((state) => state.theme.value);
  const [assessments, setAssessments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assessmentsRes, jobsRes] = await Promise.all([
          axios.get("/assessments"),
          axios.get("/jobsAndId"),
        ]);

        // Deduplicate assessments by assessmentId
        const uniqueAssessmentsMap = new Map();
        assessmentsRes.data.assessments.forEach((a) => {
          if (!uniqueAssessmentsMap.has(a.assessmentId)) {
            uniqueAssessmentsMap.set(a.assessmentId, a);
          }
        });
        setAssessments(Array.from(uniqueAssessmentsMap.values()));

        // Set jobs
        setJobs(jobsRes.data.jobs);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter assessments by selected jobId
  console.log("selctedJobId   ",selectedJobId);
  const filteredAssessments = assessments.filter(a => {
  
  if (!selectedJobId) return true;
  
  return a.jobId === selectedJobId;
});


  console.log("filter     ",filteredAssessments)

  return (
    <div
      className={`p-6 min-h-[90vh] ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">All Assessments</h2>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="font-medium">Select a Job:</label>
        <select
          className={`p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            theme === "dark"
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
        >
          <option value="">-- All Jobs --</option>
          {jobs.map((job) => (
            <option key={job.jobId} value={job.jobId}>
              {job.title}
            </option>
          ))}
        </select>

        {selectedJobId && (
          <button
            className="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
            onClick={() => navigate(`/${selectedJobId}/assessments/create`)}
          >
            + Add Assessment
          </button>
        )}
      </div>

      {filteredAssessments.length === 0 ? (
        <p className="text-center text-red-500 font-medium">
          No assessments found.
        </p>
      ) : (
        <div className="max-h-[70vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <a
              key={assessment.assessmentId}
              onClick={() => navigate(`/assessments/${assessment.assessmentId}`)}
              className={`p-4 rounded-lg border hover:shadow-lg transition transform hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{`${assessment.title} #${Math.floor(Math.random() * 6) + 1}`}</h3>
              <p className="text-sm text-gray-400">
                {assessment.sections.length} Sections
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAssessments;
