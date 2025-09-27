// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AllAssessments = () => {
//   const theme = useSelector((state) => state.theme.value);
//   const [assessments, setAssessments] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [selectedJobId, setSelectedJobId] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [assessmentsRes, jobsRes] = await Promise.all([
//           axios.get("/assessments"),
//           axios.get("/jobsAndId"),
//         ]);

//         // Deduplicate assessments by assessmentId
//         const uniqueAssessmentsMap = new Map();
//         assessmentsRes.data.assessments.forEach((a) => {
//           if (!uniqueAssessmentsMap.has(a.assessmentId)) {
//             uniqueAssessmentsMap.set(a.assessmentId, a);
//           }
//         });
//         setAssessments(Array.from(uniqueAssessmentsMap.values()));

//         // Set jobs
//         setJobs(jobsRes.data.jobs);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter assessments by selected jobId
//   console.log("selctedJobId   ",selectedJobId);
//   const filteredAssessments = assessments.filter(a => {
  
//   if (!selectedJobId) return true;
  
//   return a.jobId === selectedJobId;
// });


//   console.log("filter     ",filteredAssessments)

//   return (
//     <div
//       className={`p-6 min-h-[90vh] ${
//         theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center">All Assessments</h2>

//       <div className="flex flex-wrap items-center gap-4 mb-6">
//         <label className="font-medium">Select a Job:</label>
//         <select
//           className={`p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
//             theme === "dark"
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//           value={selectedJobId}
//           onChange={(e) => setSelectedJobId(e.target.value)}
//         >
//           <option value="">-- All Jobs --</option>
//           {jobs.map((job) => (
//             <option key={job.jobId} value={job.jobId}>
//               {job.title}
//             </option>
//           ))}
//         </select>

//         {selectedJobId && (
//           <button
//             className="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//             onClick={() => navigate(`/${selectedJobId}/assessments/create`)}
//           >
//             + Add Assessment
//           </button>
//         )}
//       </div>

//       {filteredAssessments.length === 0 ? (
//         <p className="text-center text-red-500 font-medium">
//           No assessments found.
//         </p>
//       ) : (
//         <div className="max-h-[70vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredAssessments.map((assessment) => (
//             <a
//               key={assessment.assessmentId}
//               href={`/assessments/${assessment.assessmentId}`}
//               className={`p-4 rounded-lg border hover:shadow-lg transition transform hover:-translate-y-1 ${
//                 theme === "dark"
//                   ? "bg-gray-700 border-gray-600 text-white"
//                   : "bg-white border-gray-300 text-gray-900"
//               }`}
//             >
//               <h3 className="text-lg font-semibold mb-2">{`${assessment.title} #${Math.floor(Math.random() * 6) + 1}`}</h3>
//               <p className="text-sm text-gray-400">
//                 {assessment.sections.length} Sections
//               </p>
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllAssessments;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AssessmentPreview = () => {
  const { assessmentId } = useParams();
  const theme = useSelector((state) => state.theme.value);
  const [assessment, setAssessment] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await axios.get("/assessments");
        // Type-flexible match
        const found = res.data.assessments.find(
          (a) => String(a.assessmentId) === String(assessmentId)
        );
        setAssessment(found || null);
      } catch (err) {
        console.error("Error fetching assessment:", err);
        setAssessment(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [assessmentId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this assessment?")) return;

    try {
      await axios.delete(`/assessments/${assessmentId}`);
      alert("Assessment deleted successfully!");
      navigate("/assessments", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Failed to delete assessment.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-semibold text-lg">Assessment not found</p>
      </div>
    );
  }

  return (
    <div className={`p-6 max-h-[90vh] overflow-y-auto space-y-6 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <div className="flex items-center justify-center gap-4 mb-6">
        <h1 className="text-3xl font-extrabold">{assessment.title}</h1>
        <button
          onClick={() => navigate(`/assessments/${assessmentId}/edit`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          Cancel
        </button>
      </div>

      <div className="w-[70vw] m-auto max-h-[75vh] overflow-y-auto space-y-6">
        {assessment.sections?.map((section, sIdx) => (
          <div
            key={sIdx}
            className={`p-6 rounded-xl shadow-md ${
              theme === "dark" ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-gray-300"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-400">
              {section.title}
            </h2>

            <div className="space-y-4">
              {section.questions?.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className={`p-3 rounded-lg border ${
                    theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <label className="font-medium mb-2 block">{q.text}</label>

                  {/* Single choice */}
                  {q.type === "single-choice" &&
                    q.options?.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <input type="radio" name={`q${sIdx}_${qIdx}`} />
                        <span>{opt}</span>
                      </div>
                    ))}

                  {/* Multi choice */}
                  {q.type === "multi-choice" &&
                    q.options?.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <input type="checkbox" />
                        <span>{opt}</span>
                      </div>
                    ))}

                  {/* Short text */}
                  {q.type === "short-text" && (
                    <input
                      type="text"
                      className={`border rounded p-2 w-full mt-1 ${
                        theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"
                      }`}
                      placeholder="Answer here..."
                    />
                  )}

                  {/* Long text */}
                  {q.type === "long-text" && (
                    <textarea
                      rows={4}
                      className={`border rounded p-2 w-full mt-1 ${
                        theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"
                      }`}
                      placeholder="Answer here..."
                    />
                  )}

                  {/* Numeric */}
                  {q.type === "numeric" && (
                    <input
                      type="number"
                      className={`border rounded p-2 w-full mt-1 ${
                        theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"
                      }`}
                      placeholder="Enter a number..."
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentPreview;

