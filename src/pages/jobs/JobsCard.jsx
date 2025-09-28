import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaArchive, FaEllipsisV,FaGripVertical  } from "react-icons/fa";
import { updateJobStatus } from "../../jbSlice/jobSlice";
import { useSortable } from "@dnd-kit/sortable";
import { useNavigate } from "react-router-dom";

const JobsCard = ({ job, id, onDelete, toggleStatus }) => {
  const theme = useSelector((state) => state.theme.value);
  const jobs = useSelector((state) => state.jobs.value);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // add this
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      animateLayoutChanges: () => true,
      onDragStart: () => setIsDragging(true),
      onDragEnd: () => setIsDragging(false),
    });

  const menuRef = useRef(null);
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({ id, animateLayoutChanges: () => true });
  console.log(job);
  const navigate = useNavigate();

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transition || "transform 300ms ease", // smooth
  };

  const shadowClass =
    job.status === "active"
      ? "hover:shadow-green-400"
      : "hover:shadow-gray-400";

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      // {...attributes}
      //     {...listeners}
      className={`relative w-11/12 h-36 p-4 rounded-lg flex flex-col justify-center items-center text-center transform transition duration-200
        ${
          theme === "dark"
            ? "bg-gray-800 hover:scale-105"
            : `bg-white shadow-md ${shadowClass} hover:scale-105`
        }
      `}
      ref={setNodeRef}
      style={style}
    >
      <div className="w-full flex justify-between items-start">
        {/* <h2
          className="text-xl font-semibold mb-1 "
          onClick={(e) => {e.stopPropagation();navigate(`/jobs/${job.jobId}`)}}
          {...attributes}
          {...listeners}
        >
          {job.title}
        </h2> */}
        {/* Drag handle */}
        <div
          {...listeners} // drag works only here
          {...attributes}
          className="cursor-grab p-2 mr-2 text-gray-400 hover:text-gray-600 flex items-center"
          onMouseDown={(e) => e.stopPropagation()} // prevents unwanted click triggers
        >
          <FaGripVertical className="w-5 h-5" />
        </div>
        <h2
          className="text-xl font-semibold mb-1 cursor-pointer "
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation()
            if (!isDragging) navigate(`/jobs/${job.jobId}`);
          }}
          
        >
          {job.title}
        </h2>

        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="p-1 cursor-pointer rounded-full"
          >
            <FaEllipsisV className="w-5 h-5" />
          </button>
          {open && (
            <div
              className={`absolute right-0 mt-2 w-32 border rounded shadow-lg z-10 
                ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                }`}
            >
              <button
                onClick={() => {
                  toggleStatus(job.jobId);
                  setOpen(!open);
                }}
                className={`w-full text-left px-4 py-2 rounded 
                  ${
                    theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                  }`}
              >
                {job.status === "active" ? "Archive" : "Unarchive"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between align-bottom w-70 ">
        <button
          onClick={() => onDelete(job.jobId)}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 focus:outline-none backdrop-blur-sm ${
            theme === "dark"
              ? "bg-red-500/70 hover:bg-red-600/80"
              : "bg-red-600/70 hover:bg-red-700/80"
          } place-self-end`}
        >
          Delete
        </button>

        <p className="text-lg flex items-center justify-center gap-2 mt-10 place-self-end ">
          {job.status === "active" ? (
            <FaCheckCircle className="text-green-500 w-4 h-4" />
          ) : (
            <FaArchive className="text-gray-500 w-4 h-4" />
          )}
          <span className="font-semibold">{job.status}</span>
        </p>
      </div>
    </div>
  );
};

export default JobsCard;
