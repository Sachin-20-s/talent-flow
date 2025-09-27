import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const QUESTION_TYPES = [
  "single-choice",
  "multi-choice",
  "short-text",
  "long-text",
  "numeric",
  "file-upload",
];

const AssessmentBuilder = () => {
  const [sections, setSections] = useState([]);
  const theme = useSelector((state) => state.theme.value);
  const { jobId } = useParams(); // for update
  const navigate = useNavigate();
  const [assessmentTitle, setAssessmentTitle] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/jobsAndId");
        

        // If a job is already selected, auto-set assessment title
        if (jobId) {
          const job = res.data.jobs.find((j) => j.jobId === jobId);
          if (job) setAssessmentTitle(`${job.title}`);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { title: `Section ${prev.length + 1}`, questions: [] },
    ]);
  };

  const deleteSection = (sIdx) => {
    const newSections = [...sections];
    newSections.splice(sIdx, 1);
    setSections(newSections);
  };

  const addQuestion = (sectionIndex, type) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions.push({
      type,
      text: "",
      required: false,
      options: type.includes("choice") ? ["Option 1"] : [],
      validation: {},
    });
    setSections(newSections);
  };

  const deleteQuestion = (sIdx, qIdx) => {
    const newSections = [...sections];
    newSections[sIdx].questions.splice(qIdx, 1);
    setSections(newSections);
  };

  const updateQuestionText = (sIdx, qIdx, text) => {
    const newSections = [...sections];
    newSections[sIdx].questions[qIdx].text = text;
    setSections(newSections);
  };

  const updateOption = (sIdx, qIdx, oIdx, value) => {
    const newSections = [...sections];
    newSections[sIdx].questions[qIdx].options[oIdx] = value;
    setSections(newSections);
  };

  const addOption = (sIdx, qIdx) => {
    const newSections = [...sections];
    const q = newSections[sIdx].questions[qIdx];
    q.options.push(`Option ${q.options.length + 1}`);
    setSections(newSections);
  };

  const removeOption = (sIdx, qIdx, oIdx) => {
    const newSections = [...sections];
    newSections[sIdx].questions[qIdx].options.splice(oIdx, 1);
    setSections(newSections);
  };

  const handleSubmit = async () => {

    // const hasEmptyQuestions = sections.some(
    //   (section) =>
    //     !section.title ||
    //     section.questions.some(
    //       (q) =>
    //         !q.text || (q.type.includes("choice") && q.options.length === 0)
    //     )
    // );

    // if (hasEmptyQuestions) {
    //   alert(
    //     "Please fill in all section titles and question texts/options before submitting."
    //   );
    //   return;
    // }

    console.log(assessmentTitle)

    try {
      const payload = {
        assessmentId: uuidv4(),
        jobId,
        sections,
        title: assessmentTitle,
      };

      console.log("payload    ", payload);

      const res = await axios.post("/assessments/created", payload);

      alert("Assessment created successfully!");
      navigate(`/assessments/${res.data.assessment.assessmentId}`, {
        replace: true,
      });
    } catch (err) {
      console.error("Error saving assessment:", err);
      alert("Failed to save assessment.");
    }
  };

  return (
    <div className="flex gap-6 p-4 h-[90vh]">
      {/* Builder panel */}
      <div className="flex flex-col w-[48vw]">
        <div
          className={`flex-1 border rounded p-4 overflow-y-auto ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Assessment Builder</h2>
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="mb-6 relative">
              {/* Delete section button */}
              <button
                className="absolute top-0 right-0 text-red-500 hover:text-red-700 flex items-center gap-1 mt-2 mr-2"
                onClick={() => deleteSection(sIdx)}
              >
                <FaTrash />
              </button>

              <input
                type="text"
                value={section.title}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[sIdx].title = e.target.value;
                  setSections(newSections);
                }}
                className={`border rounded p-1 w-full mb-3 font-semibold text-lg ${
                  theme === "dark"
                    ? "text-white bg-gray-800 border-gray-600"
                    : "text-black bg-white border-gray-300"
                }`}
              />

              {section.questions.map((q, qIdx) => (
                <div key={qIdx} className="mb-3 relative">
                  {/* Delete question button */}
                  <button
                    className="absolute top-0 right-0 text-red-500 hover:text-red-700 mt-2 mr-2"
                    onClick={() => deleteQuestion(sIdx, qIdx)}
                  >
                    <FaTrash />
                  </button>

                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) =>
                      updateQuestionText(sIdx, qIdx, e.target.value)
                    }
                    placeholder="Question text"
                    className={`border p-1 w-full rounded mb-1 ${
                      theme === "dark"
                        ? "text-white bg-gray-800 border-gray-600"
                        : "text-black bg-white border-gray-300"
                    }`}
                  />
                  <select
                    value={q.type}
                    onChange={(e) => {
                      const newSections = [...sections];
                      newSections[sIdx].questions[qIdx].type = e.target.value;
                      setSections(newSections);
                    }}
                    className={`border p-1 rounded w-full mb-1 ${
                      theme === "dark"
                        ? "text-white bg-gray-800 border-gray-600"
                        : "text-black bg-white border-gray-300"
                    }`}
                  >
                    {QUESTION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {(q.type === "single-choice" ||
                    q.type === "multi-choice") && (
                    <div className="ml-4">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex gap-2 mb-1">
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) =>
                              updateOption(sIdx, qIdx, oIdx, e.target.value)
                            }
                            className={`border p-1 rounded flex-1 ${
                              theme === "dark"
                                ? "text-white bg-gray-800 border-gray-600"
                                : "text-black bg-white border-gray-300"
                            }`}
                          />
                          <button
                            onClick={() => removeOption(sIdx, qIdx, oIdx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 mb-2"
                        onClick={() => addOption(sIdx, qIdx)}
                      >
                        <FaPlus /> Add Option
                      </button>
                    </div>
                  )}
                  <hr className="border-t border-gray-300" />
                </div>
              ))}

              <div className="flex gap-2 flex-wrap mt-2 mb-2">
                {QUESTION_TYPES.map((type) => (
                  <button
                    key={type}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => addQuestion(sIdx, type)}
                  >
                    + {type}
                  </button>
                ))}
              </div>
              <hr className="border-t-4 border-gray-400 mt-3 mb-3" />
            </div>
          ))}

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={addSection}
          >
            + Add Section
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-60 ml-auto"
          onClick={() => handleSubmit()}
        >
          Submit Assessment
        </button>
      </div>

      {/* Preview panel */}
      <div
        className={`flex-1 border rounded p-4 overflow-y-auto ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-6">
            <h3 className="font-bold text-xl mb-2">{section.title}</h3>
            {section.questions.map((q, qIdx) => (
              <div key={qIdx} className="mb-4">
                <label className="font-semibold block mb-1">{q.text}</label>
                {q.type === "single-choice" &&
                  q.options.map((opt, idx) => (
                    <div key={idx}>
                      <input type="radio" name={`q${sIdx}_${qIdx}`} /> {opt}
                    </div>
                  ))}
                {q.type === "multi-choice" &&
                  q.options.map((opt, idx) => (
                    <div key={idx}>
                      <input type="checkbox" /> {opt}
                    </div>
                  ))}
                {q.type === "short-text" && (
                  <input
                    type="text"
                    className={`border rounded p-1 w-full ${
                      theme === "dark"
                        ? "text-white bg-gray-800 border-gray-600"
                        : "text-black bg-white border-gray-300"
                    }`}
                  />
                )}
                {q.type === "long-text" && (
                  <textarea
                    className={`border rounded p-1 w-full ${
                      theme === "dark"
                        ? "text-white bg-gray-800 border-gray-600"
                        : "text-black bg-white border-gray-300"
                    }`}
                  />
                )}
                {q.type === "numeric" && (
                  <input
                    type="number"
                    className={`border rounded p-1 w-full ${
                      theme === "dark"
                        ? "text-white bg-gray-800 border-gray-600"
                        : "text-black bg-white border-gray-300"
                    }`}
                  />
                )}
                {q.type === "file-upload" && (
                  <div className="flex items-center gap-2">
                    <label
                      className={`cursor-pointer px-4 py-2 rounded border w-50 h-10 text-sm flex justify-center items-center ${
                        theme === "dark"
                          ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                          : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
                      }`}
                    >
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const newSections = [...sections];
                          newSections[sIdx].questions[qIdx].file =
                            e.target.files[0];
                          setSections(newSections);
                        }}
                      />
                    </label>
                    <span
                      className="text-sm truncate max-w-[400px]"
                      title={q.file ? q.file.name : ""}
                    >
                      {q.file
                        ? `${q.file.name.substring(0, 50)}... .${q.file.name
                            .split(".")
                            .pop()}`
                        : "No file chosen"}
                    </span>
                  </div>
                )}

                <hr className="border-t border-gray-300 mt-2" />
              </div>
            ))}
            <hr className="border-t-4 border-gray-400 mt-4 mb-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentBuilder;
