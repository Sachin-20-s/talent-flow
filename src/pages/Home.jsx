import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJobs } from "../jbSlice/jobSlice";
import { useNavigate } from "react-router-dom";
import AssessmentPopUp from "./assessments/AssessmentPopUp";
import axios from "axios";
// import your Redux action

const Home = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const [stats, setStats] = useState({ total: 0, active: 0, archived: 0 });
  const [applicants, setApplicants] = useState([]);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const res = await fetch("/jobCandidatesAssigmentCount");
        
        const data = await res.json();
        const resp = await axios.get("/assessments"); // your GET endpoint
        setTotal(resp.data.assessments.length); 
        // expects { total, active, archived }

        const { applicants, jobs } = data.semanticData;
        console.log(jobs);
        setStats(jobs);
        setApplicants(applicants);
      } catch (err) {
        console.error("Failed to fetch job stats", err);
      }
    };

    fetchJobStats();
  }, []);

  const cardBase =
    "w-full aspect-square p-8 rounded-xl flex flex-col items-center justify-center text-center transform transition duration-200";

  const lightCard =
    "bg-white text-black shadow-xl hover:shadow-2xl hover:scale-105";
  const darkCard = "bg-gray-800 text-white hover:scale-105";

  const btnPrimary = (theme) =>
    `px-6 py-3 rounded-lg font-semibold text-lg cursor-pointer ${
      theme === "dark"
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`;

  const btnSecondary = (theme) =>
    `px-6 py-3 rounded-lg font-semibold text-lg border cursor-pointer${
      theme === "dark"
        ? "border-white hover:bg-gray-700"
        : "border-black hover:bg-gray-100"
    }`;

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-900 text-white min-h-[90vh]"
          : "bg-gray-50 text-black min-h-[90vh]"
      }
    >
      <div className="p-8">
        <h1 className="text-5xl font-bold mb-10 text-center">Welcome Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Jobs Card */}
          <div
            className={`${cardBase} ${theme === "dark" ? darkCard : lightCard}`}
          >
            <h3 className="text-4xl font-bold mb-6">Jobs</h3>
            <p className="text-2xl mb-8 font-semibold">
              Total:{" "}
              <span className="font-semibold text-4xl">{stats.totalJobs}</span>{" "}
              <br />
              Active:{" "}
              <span className="font-medium text-4xl">
                {stats.activeJobs}
              </span>{" "}
              <span className="text-3xl mx-2">|</span>
              Archived:{" "}
              <span className="font-medium text-4xl">{stats.archivedJobs}</span>
            </p>
            <div className="flex gap-4">
              <button
                className={btnPrimary(theme)}
                onClick={() => navigate("/jobs")}
              >
                View Jobs
              </button>
              <button
                onClick={() => navigate("/jobs/createJob")}
                className={btnSecondary(theme)}
              >
                Create Job
              </button>
            </div>
          </div>

          {/* Candidates Card */}
          <div
            className={`${cardBase} ${theme === "dark" ? darkCard : lightCard}`}
          >
            <h3 className="text-4xl font-bold mb-6">Applicants</h3>
            <p className="text-2xl mb-8 font-semibold text-center">
              {/* Top */}
              Total:{" "}
              <span className="font-semibold text-4xl">
                {applicants.totalCand}
              </span>
              <br />
              {/* Middle */}
              Applied:{" "}
              <span className="font-medium text-4xl">
                {applicants.shortlistedCand}
              </span>
              <span className="text-3xl mx-2">|</span>
              Rejected:{" "}
              <span className="font-medium text-4xl">
                {applicants.rejectedCand}
              </span>
              <br />
              {/* Bottom */}
              Pending:{" "}
              <span className="font-medium text-4xl">
                {applicants.pendingCand}
              </span>
            </p>

            <div className="flex gap-4">
              <button
                className={btnPrimary(theme)}
                onClick={() => navigate("/applicants")}
              >
                View Applicants
              </button>
            </div>
          </div>

          {/* Assessments Card */}
          <div
            className={`${cardBase} ${theme === "dark" ? darkCard : lightCard}`}
          >
            <h3 className="text-4xl font-bold mb-6">Assessments</h3>
            <p className="text-2xl font-semibold mb-8">
              Total: <span className="font-semibold text-4xl">{total}</span>
            </p>
            <div className="flex gap-4">
              <button
                className={btnPrimary(theme)}
                // onClick={() => setShowPopup(true)}
                onClick={() => navigate("/assessments")}

              >
                View Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <AssessmentPopUp onClose={() => setShowPopup(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
