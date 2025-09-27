// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AssessmentPreview = () => {
//   const { assessmentId } = useParams();
//   const theme = useSelector((state) => state.theme.value);
//   const [assessment, setAssessment] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssessment = async () => {
//       try {
//         const res = await axios.get("/assessments");
//         const found = res.data.assessments.find(
//           (a) => a.assessmentId === assessmentId
//         );
//         console.log(found, "fount   ====");
//         setAssessment(found || null);
//       } catch (err) {
//         console.error("Error fetching assessment:", err);
//       }
//     };
//     fetchAssessment();
//   }, [assessmentId]);

//   const handleDelete = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this assessment?"
//     );
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/assessments/${assessmentId}`);
//       alert("Assessment deleted successfully!");
//       navigate("/assessments",{replace:true}); // redirect back to assessments list
//     } catch (err) {
//       console.error("Failed to delete assessment:", err);
//       alert("Failed to delete assessment.");
//     }
//   };

//   console.log("assessment    ",assessment)

//   if (!assessment) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500 font-semibold text-lg">
//           Assessment not found
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`p-6 max-h-[90vh] overflow-y-auto space-y-6 ${
//         theme === "dark"
//           ? "bg-gray-900 text-white"
//           : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <div className="flex items-center justify-center gap-4 mb-6">
//         <h1 className="text-3xl font-extrabold">{assessment.title}</h1>
//         <button
//           onClick={() => navigate(`/assessments/${assessmentId}/edit`)}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//         >
//           Edit
//         </button>
//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//         >
//           Delete
//         </button>
//         <button
//           type="submit"
//           onClick={(e) => {e.preventDefault();navigate(-1,{replace:true})}}
//           className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
//         >
//           Cancel
//         </button>
//       </div>

//       <div className="w-[70vw] m-auto max-h-[75vh] overflow-y-auto">
//         {assessment.sections.map((section, sIdx) => (
//           <div
//             key={sIdx}
//             className={`p-6 rounded-xl shadow-md ${
//               theme === "dark"
//                 ? "bg-gray-800 shadow-gray-700"
//                 : "bg-white shadow-gray-300"
//             }`}
//           >
//             <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-400">
//               {section.title}
//             </h2>

//             <div className="space-y-4">
//               {section.questions.map((q, qIdx) => (
//                 <div
//                   key={qIdx}
//                   className={`p-3 rounded-lg border ${
//                     theme === "dark"
//                       ? "border-gray-700 bg-gray-900"
//                       : "border-gray-200 bg-gray-50"
//                   }`}
//                 >
//                   <label className="font-medium mb-2 block">{q.text}</label>

//                   {q.type === "single-choice" &&
//                     q.options.map((opt, idx) => (
//                       <div key={idx} className="flex items-center gap-2 mb-1">
//                         <input type="radio" name={`q${sIdx}_${qIdx}`} />
//                         <span>{opt}</span>
//                       </div>
//                     ))}

//                   {q.type === "multi-choice" &&
//                     q.options.map((opt, idx) => (
//                       <div key={idx} className="flex items-center gap-2 mb-1">
//                         <input type="checkbox" />
//                         <span>{opt}</span>
//                       </div>
//                     ))}

//                   {q.type === "short-text" && (
//                     <input
//                       type="text"
//                       className={`border rounded p-2 w-full mt-1 ${
//                         theme === "dark"
//                           ? "bg-gray-800 border-gray-700 text-white"
//                           : "bg-white border-gray-300 text-black"
//                       }`}
//                       placeholder="Answer here..."
//                     />
//                   )}

//                   {q.type === "long-text" && (
//                     <textarea
//                       className={`border rounded p-2 w-full mt-1 ${
//                         theme === "dark"
//                           ? "bg-gray-800 border-gray-700 text-white"
//                           : "bg-white border-gray-300 text-black"
//                       }`}
//                       rows={4}
//                       placeholder="Answer here..."
//                     />
//                   )}

//                   {q.type === "numeric" && (
//                     <input
//                       type="number"
//                       className={`border rounded p-2 w-full mt-1 ${
//                         theme === "dark"
//                           ? "bg-gray-800 border-gray-700 text-white"
//                           : "bg-white border-gray-300 text-black"
//                       }`}
//                       placeholder="Enter a number..."
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AssessmentPreview;

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
    if (!window.confirm("Are you sure you want to delete this assessment?"))
      return;

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
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-semibold text-lg">
          Assessment not found
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 max-h-[90vh] overflow-y-auto space-y-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
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
        {assessment.sections.map((section) => (
          <div
            key={section.id || section.title}
            className={`p-6 rounded-xl shadow-md ${
              theme === "dark"
                ? "bg-gray-800 shadow-gray-700"
                : "bg-white shadow-gray-300"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-400">
              {section.title}
            </h2>

            <div className="space-y-4">
              {section.questions.map((q) => (
                <div
                  key={q.id || q.text}
                  className={`p-3 rounded-lg border ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-900"
                      : "border-gray-200 bg-gray-50"
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
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      }`}
                      placeholder="Answer here..."
                    />
                  )}

                  {/* Long text */}
                  {q.type === "long-text" && (
                    <textarea
                      rows={4}
                      className={`border rounded p-2 w-full mt-1 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      }`}
                      placeholder="Answer here..."
                    />
                  )}

                  {/* Numeric */}
                  {q.type === "numeric" && (
                    <input
                      type="number"
                      className={`border rounded p-2 w-full mt-1 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
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
