import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ApplicantCard = ({ applicant }) => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const { id, name, email, status } = applicant;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 999 }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`p-3 rounded-xl shadow-md mb-3 cursor-grab transition select-none
        ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
      `}
    >
      <div className="flex flex-col">
        {/* Clickable name — stops propagation so dragging won't start */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // prevent dnd-kit from treating this as a drag start
            navigate(`/applicant/${id}`);
          }}
          onPointerDown={(e) => e.stopPropagation()} // prevents pointer sensor from starting drag
          className="text-left font-semibold break-words focus:outline-none hover:underline"
        >
          {name}
        </button>

        <p className="text-sm text-gray-500 break-words">{email}</p>
      </div>
    </div>
  );
};

export default ApplicantCard;
