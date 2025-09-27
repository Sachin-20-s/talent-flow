import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";
import JobEditForm from "./JobEditForm";
import JobApplicantsNumber from "./JobApplicantsNumber";
import { useNavigate } from "react-router-dom";

const JobDetail = () => {
  const { jobId } = useParams();
  const theme = useSelector((state) => state.theme.value);
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/allJobs");
        const resp = await fetch("/assessments");
        const data = await res.json();
        const datap = await resp.json();
        setAllJobs(data.jobs);
        const currentJob = data.jobs.find((j) => String(j.jobId) === jobId);
        setJob(currentJob);

        // Filter for jobId
        setAssessments(
          datap.assessments.filter((a) => a.jobId === Number(jobId))
        );
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [jobId]);

  if (loading) return <LoadingPage />;

  if (!job)
    return (
      <div
        className={`p-6 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h2 className="text-xl font-bold">Job not found</h2>
      </div>
    );

  const handleSave = (updatedJob) => {
    
    fetch(`/jobs/${job.jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("data   ",data.job);
        setJob(data.job);
        setEditMode(false);
      });
  };

  return (
    <div
      className={`p-6 shadow-xl ${
        theme === "dark"
          ? "bg-gray-700 text-white min-h-[90vh]"
          : "bg-white text-gray-900 min-h-[90vh]"
      }`}
    >
      {!editMode ? (
        <div
          className={`p-6 rounded-xl shadow-md ${
            theme === "dark"
              ? "bg-gray-600 text-white min-h-[82vh]"
              : "bg-gray-50 text-gray-900 min-h-[82vh]"
          }`}
        >
          <div className="flex flex-row gap-10">
            <div className="w-[45%]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">{job.title}</h1>
              </div>

              <p className="mb-2 text-lg">
                Status:{" "}
                <span
                  className={
                    job.status === "active"
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {job?.status?.toUpperCase() ?? ""}
                </span>
              </p>

              <p className="mb-2 text-lg">
                <span className="font-semibold">Salary:</span> {job.salary}
              </p>

              <p className="mb-2 text-lg">
                <span className="font-semibold">Who Can Apply:</span>{" "}
                {job.whoCanApply}
              </p>

              {/* {job.assignment && (
                <div className="mb-4">
                  <p className="font-semibold mb-1">Assignment Preview:</p>
                  <a
                    href={job.assignment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {job.assignment.name}
                  </a>
                </div>
              )} */}

              <p className="mb-6 text-xl text-gray-300 dark:text-gray-400">
                {job.description}
              </p>

              <button
                onClick={() => setEditMode(true)}
                className={`px-5 py-2 mb-3 rounded-lg font-semibold shadow-md ${
                  theme === "dark"
                    ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black"
                }`}
              >
                Edit
              </button>
            </div>

            <div className="w-[30%]">
              <JobApplicantsNumber jobId={jobId} />
            </div>
            <div className="w-[30%]">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-2">Assessments</h2>

                {assessments.length === 0 ? (
                  <p className="text-gray-400">No assessments created yet.</p>
                ) : (
                  <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
                    {assessments.map((a) => (
                      <button
                        key={a.assessmentId}
                        onClick={() =>
                          navigate(`/assessments/${a.assessmentId}`)
                        }
                        className="text-left px-4 py-3 bg-blue-500/70 text-white rounded-xl backdrop-blur-sm hover:bg-blue-500/90 transition shadow-md"
                      >
                        {a.title}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => navigate(`/${jobId}/assessments/create`)}
                  className="mt-4 px-4 py-3 bg-green-500/70 text-white rounded-xl backdrop-blur-sm hover:bg-green-500/90 transition shadow-md"
                >
                  + Add Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <JobEditForm
          job={job}
          theme={theme}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
          allJobs={allJobs}
        />
      )}
    </div>
  );
};

export default JobDetail;
