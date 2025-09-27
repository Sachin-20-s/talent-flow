import React, { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import { useSelector } from "react-redux";

const JobApplicantsNumber = ({ jobId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state) => state.theme.value);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/jobs/${jobId}/applicants-summary`);
        if (!res.ok) throw new Error("Failed to fetch applicants summary");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [jobId]);

  if (loading) return <LoadingPage />;

  if (!summary)
    return (
      <div
        className={`p-6 rounded-lg shadow text-center ${
          theme === "dark"
            ? "bg-gray-1000 text-gray-300"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        No data available
      </div>
    );

  const stats = [
    {
      label: "Total",
      value: summary.totalApplicants,
      color: "blue",
    },
    {
      label: "Selected",
      value: summary.selectedApplicants,
      color: "green",
    },
    {
      label: "Rejected",
      value: summary.rejectedApplicants,
      color: "red",
    },
    {
      label: "Pending",
      value: summary.pendingApplicants,
      color: "yellow",
    },
  ];

  return (
    <div
      className={`p-3 w-[100%] mr-auto rounded-xl shadow-lg transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
        Applicants Summary
      </h2>

      <div className="grid grid-cols-1 gap-6 text-lg">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-lg text-center shadow transition duration-200 h-20
              ${
                stat.color === "blue"
                  ? `bg-blue-400 dark:bg-blue-200 text-blue-800 dark:text-blue-800`
                  : stat.color === "green"
                  ? `bg-green-400 dark:bg-green-200 text-green-600 dark:text-green-800`
                  : stat.color === "red"
                  ? `bg-red-400 dark:bg-red-200 text-red-600 dark:text-red-800`
                  : `bg-yellow-400 dark:bg-yellow-200 text-yellow-600 dark:text-yellow-800`
              }`}
          >
            <p className="font-semibold">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* View Applicants Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() =>
            (window.location.href = `/jobs/${jobId}/applicants/all`)
          }
          className={`py-3 px-5 rounded-lg font-semibold transition duration-200 shadow 
            ${
              theme === "dark"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
        >
          View Applicants
        </button>
      </div>
    </div>
  );
};

export default JobApplicantsNumber;
