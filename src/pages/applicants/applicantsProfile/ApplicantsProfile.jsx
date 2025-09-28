import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const statusOptions = [
  "pending",
  "screen",
  "tech",
  "offer",
  "shortlisted",
  "rejected",
];

const ApplicantsProfile = () => {
  const theme = useSelector((state) => state.theme.value);
  const { applicantId } = useParams();
  const navigate = useNavigate();

  const [applicant, setApplicant] = useState(null);
  const [jobsMap, setJobsMap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

        
  //       const res = await axios.get(`/applicant/${applicantId}`);
  //       console.log(res.data);
  //       setApplicant(res.data);
  //       setJobsMap(res.data.appliedJobs);
  //     } catch (err) {
  //       console.error("Error fetching applicant:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [applicantId]);

  useEffect(() => {
  const savedApplicant = localStorage.getItem("applicantProfile");
  const savedJobs = localStorage.getItem("applicantJobs");

  if (savedApplicant && savedJobs.length===0) {
    setApplicant(JSON.parse(savedApplicant));
    setJobsMap(JSON.parse(savedJobs));
    setLoading(false);
  } else {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/applicant/${applicantId}`);
        setApplicant(res.data);
        setJobsMap(res.data.appliedJobs);
        localStorage.setItem("applicantProfile", JSON.stringify(res.data));
        localStorage.setItem("applicantJobs", JSON.stringify(res.data.appliedJobs));
      } catch (err) {
        console.error("Error fetching applicant:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }

  // Save to localStorage whenever applicant or jobsMap changes
  

  
}, [applicantId]);


  const isDark = theme === "dark";

  const handleStatusChange = async (newStatus) => {
    if (!applicant) return;
    setUpdatingStatus(true);
    try {
      const updated = await axios.patch(`/applicants/${applicant.id}`, {
        status: newStatus,
      });

      console.log("Updated applicant:", updated);
      setApplicant((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500">Loading applicant profile...</p>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div
        className={`p-6 rounded-lg text-center ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        Applicant not found
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center p-6 min-h-[90vh] transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`gap-2 w-full max-w-3xl flex flex-col justify-between rounded-2xl shadow-lg p-6 transition-colors duration-300 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
        style={{ maxHeight: "75vh" }}
      >
        {/* Top Section: Name & Contact */}
        <div className="flex justify-between">
          <div className="space-y-7">
            <h1 className="text-3xl font-bold">{applicant.name}</h1>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l4-4m-4 4l4 4"
                  />
                </svg>
                <span className="truncate">{applicant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0v10a2 2 0 002 2h14a2 2 0 002-2V8m-18 0L12 13l7-5"
                  />
                </svg>
                <span>{applicant.phone}</span>
              </div>
            </div>

            <a
              href={applicant.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-md transition-all duration-200
        ${
          isDark
            ? "bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300"
            : "bg-gray-100 text-blue-600 hover:bg-gray-200 hover:text-blue-500"
        }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              View Resume
            </a>
            <br />
            <p
              className={`inline-block text-sm px-2 py-1 rounded-md font-medium 
        ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"}`}
            >
              <span className="font-semibold">Applied On:</span>{" "}
              <span className="ml-1">
                {new Date(applicant.appliedAt).toLocaleDateString()}
              </span>
            </p>
          </div>
          {/* Profile Photo */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // hardcoded placeholder image
              alt="Profile"
              className="w-70 h-70 rounded-full object-cover shadow-md"
            />
          </div>
        </div>

        {/* Middle Section: Status */}
        <div className="flex items-center gap-3">
          <span className="font-semibold">Status:</span>
          <select
            value={applicant.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updatingStatus}
            className={`px-2 py-1 rounded-md border ${
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Bottom Section: Jobs Applied */}
        <div>
          <p className="font-semibold mb-3 text-lg">Applied for Jobs:</p>
          <div className="flex flex-wrap gap-3">
            {jobsMap?.map((job) => (
              <button
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
            hover:scale-105 hover:shadow-md focus:outline-none ${
              isDark
                ? "bg-gray-700 text-blue-300 hover:bg-gray-600"
                : "bg-gray-200 text-blue-600 hover:bg-gray-300"
            }`}
              >
                {job.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsProfile;
