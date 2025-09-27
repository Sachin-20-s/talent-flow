import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- import navigate
import axios from "axios";
import CreateJobForm from "./CreateJobForm";
import { v4 as uuidv4 } from "uuid";

const CreateJobPage = () => {
  const theme = useSelector((state) => state.theme.value);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- initialize navigate

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/allJobs");
        setAllJobs(res.data.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleAddJob = async (jobData, action = "save") => {
    try {
      const newJob = { ...jobData };
      await axios.post("/jobs", newJob);
      setAllJobs((prev) => [...prev, jobData]);
      alert("Job created successfully!"); // confirmation
      console.log(jobData,"jhvbjhbjhb")
      if (action === "save") {
        navigate("/jobs", { replace: true });
      } else if (action === "addAssessment") {
        
        navigate(`/${jobData.jobId}/assessments/create`, { replace: true });
      }
    } catch (err) {
      console.error("Failed to create job:", err);
      alert("Failed to create job. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div
      className={`p-6 shadow-md transition-all duration-300 min-h-[90vh] ${
        theme === "dark"
          ? "bg-gray-700 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <CreateJobForm
        allJobs={allJobs}
        onSave={handleAddJob}
        onCancel={() => navigate("/jobs")} // <-- cancel also redirects
      />
    </div>
  );
};

export default CreateJobPage;
