import React from "react";
import { useSelector } from "react-redux";
import ApplicantCard from "./ApplicantCard";
import { useDroppable } from "@dnd-kit/core";
import "./Application.css";

const Column = ({ title, status, applicants }) => {
  const theme = useSelector((state) => state.theme.value);
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      className={`flex-1 p-4 rounded-xl transition min-h-[65vh] max-h-[73vh]
        ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} 
        flex flex-col`}
    >
      <h2
        className={`flex justify-between items-center text-xl font-bold mb-4 sticky top-0 z-10 px-2 py-1
          ${
            theme === "dark"
              ? "text-gray-200 bg-gray-900"
              : "text-gray-700 bg-gray-100"
          }`}
      >
        <span>{title}</span>
        <span>{applicants.length}</span>
      </h2>

      <div
        ref={setNodeRef}
        className={`flex-1 max-h-[63vh] overflow-y-auto pr-2 items-center justify-center ${
          theme === "dark" ? "nonScrollBarDark" : "nonScrollBarLight"
        }`}
      >
        {applicants.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center mt-8 max-h-[40vh]">
            <img
              src="https://res.cloudinary.com/dbbih2sm0/image/upload/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector-removebg-preview_1_bi5agi"
              alt="No applicants"
              className="w-30 h-28 mb-4"
            />
            {/* <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No applicants here yet.
            </p> */}
          </div>
        ) : (
          applicants.map((applicant, index) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
