import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Column from "./Column";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApplicantCard from "./ApplicantCard";
import { FaCheckCircle, FaArchive } from "react-icons/fa";

const Applicants = () => {
  const theme = useSelector((state) => state.theme.value);
  const { jobId, filter } = useParams();
  const [actualId, setActualId] = useState(jobId);
  const [allJobs, setAllJobs] = useState([]);
  const [chosenJob, setChosenJob] = useState({});
  const [applicants, setApplicants] = useState({
    shortlistedCand: [],
    rejectedCand: [],
    pendingCand: [],
    screenCand: [],
    techCand: [],
    offerCand: [],
  });
  const [columnFilter, setColumnFilter] = useState("shortlisted"); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const [draggedApplicant, setDraggedApplicant] = useState(null);

  // Fetch applicants and jobs from server

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        console.log("JobId==", actualId);
        const response = await axios.get(
          `/jobs/${actualId ? actualId : "-1"}/applicants/${
            filter ? filter : "all"
          }`
        );

        if (allJobs.length === 0) {
          const getAllJobs = await axios.get("/jobsAndId");
          const jobsData = getAllJobs.data.jobs;

          

          setAllJobs(jobsData);
        }
        setChosenJob(
          allJobs.find(
            (job) => job.jobId.toString() === actualId?.toString()
          ) || null
        );
        setApplicants(response.data);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
        setApplicants({
          shortlistedCand: [],
          rejectedCand: [],
          pendingCand: [],
          screenCand: [],
          techCand: [],
          offerCand: [],
        });
      }
    };

    fetchApplicants();
  }, [actualId, filter]);

  // Handle drag start
  const handleDragStart = ({ active }) => {
    const allApplicants = [
      ...applicants.shortlistedCand,
      ...applicants.pendingCand,
      ...applicants.rejectedCand,
      ...applicants.screenCand,
      ...applicants.techCand,
      ...applicants.offerCand,
    ];
    const applicant = allApplicants.find((a) => a.id === active.id);
    setDraggedApplicant(applicant || null);
  };

  // Handle drag end
  const handleDragEnd = async ({ active, over }) => {
    if (!over) {
      setDraggedApplicant(null);
      return;
    }

    const applicantId = active.id.toString();
    const newStatus = over.id.toString();

    const allApplicants = [
      ...applicants.shortlistedCand,
      ...applicants.pendingCand,
      ...applicants.rejectedCand,
      ...applicants.screenCand,
      ...applicants.techCand,
      ...applicants.offerCand,
    ];

    const dragged = allApplicants.find((a) => a.id === applicantId);
    const fromStatus = dragged.status;

    if (fromStatus === newStatus) {
      setDraggedApplicant(null);
      return;
    }

    // Show confirmation
    const confirmMsg = `Move ${
      dragged.name
    } from "${fromStatus.toUpperCase()}" to "${newStatus.toUpperCase()}"?`;
    const userConfirmed = window.confirm(confirmMsg);

    if (!userConfirmed) {
      setDraggedApplicant(null); // rollback visually
      return;
    }

    // Update local state
    setApplicants((prev) => {
      const updatedApplicants = allApplicants.map((app) =>
        app.id === applicantId ? { ...app, status: newStatus } : app
      );

      return {
        shortlistedCand: updatedApplicants.filter(
          (a) => a.status === "shortlisted"
        ),
        pendingCand: updatedApplicants.filter((a) => a.status === "pending"),
        rejectedCand: updatedApplicants.filter((a) => a.status === "rejected"),
        screenCand: updatedApplicants.filter((a) => a.status === "screen"),
        techCand: updatedApplicants.filter((a) => a.status === "tech"),
        offerCand: updatedApplicants.filter((a) => a.status === "offer"),
      };
    });

    // Update server
    try {
      await axios.patch(`/applicants/${applicantId}`, { status: newStatus });
      console.log(`Applicant ${applicantId} updated to ${newStatus} on server`);
    } catch (error) {
      console.error("Failed to update applicant status on server:", error);
    }

    setDraggedApplicant(null);
  };

  const getFilteredApplicants = (applicantsArray, colName) => {
    if (
      (columnFilter === colName || columnFilter === "all") &&
      searchQuery.trim()
    ) {
      const query = searchQuery.toLowerCase();
      return applicantsArray.filter(
        (a) =>
          a.name?.toLowerCase().includes(query) ||
          a.email?.toLowerCase().includes(query)
      );
    }
    return applicantsArray;
  };

  return (
    <div
      className={`p-6 min-h-[90vh] transition ${
        theme === "dark"
          ? "bg-gray-950 text-gray-100"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Applicants Board</h1>

        {/* Job select */}
        {!jobId && (
          <div className="ml-4 flex items-center gap-2">
            <select
              id="jobSelect"
              value={chosenJob?.jobId || ""}
              onChange={(e) => {
                const selectedJobId = e.target.value;
                console.log(selectedJobId, typeof selectedJobId);

                setActualId(selectedJobId);
              }}
              className={`p-2 rounded-xl shadow-md border w-64 h-10 cursor-pointer transition outline-0
      ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-100 hover:bg-gray-800"
          : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
      }`}
            >
              <option value="">Choose job</option>
              {allJobs &&
                allJobs.map((job) => (
                  <option key={job.id} value={job.jobId}>
                    {job.title}
                  </option>
                ))}
            </select>

            {chosenJob?.status === "active" && (
              <FaCheckCircle
                className="text-green-500 w-5 h-5 cursor-pointer"
                title="Active"
                onClick={async () => {
                  // toggle to archived
                  try {
                    await axios.patch(`/jobs/${chosenJob.jobId}`, {
                      status: "archived",
                    });
                    setChosenJob({ ...chosenJob, status: "archived" });
                    setAllJobs(
                      allJobs.map((job) =>
                        job.jobId === chosenJob.jobId
                          ? { ...job, status: "archived" }
                          : job
                      )
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            )}
            {chosenJob?.status === "archived" && (
              <FaArchive
                className="text-gray-500 w-5 h-5 cursor-pointer"
                title="Archived"
                onClick={async () => {
                  // toggle to active
                  try {
                    await axios.patch(`/jobs/${chosenJob.jobId}`, {
                      status: "active",
                    });
                    setChosenJob({ ...chosenJob, status: "active" });
                    setAllJobs(
                      allJobs.map((job) =>
                        job.jobId === chosenJob.jobId
                          ? { ...job, status: "active" }
                          : job
                      )
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            )}
          </div>
        )}
        <p
          className={`ml-2 text-sm italic transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Click on Title to get applicant Details / Drag the card to update the
          stage
        </p>
        <div className="flex items-center gap-4 ml-auto">
          {/* Column buttons */}
          <select
            value={columnFilter}
            onChange={(e) => setColumnFilter(e.target.value)}
            //disabled={!actualId} // disable if no job selected
            className={`p-2 rounded border shadow cursor-pointer ${
              theme === "dark"
                ? "bg-gray-900 border-gray-700 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          >
            <option value="all">All</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="screen">Screen</option>
            <option value="tech">Tech</option>
            <option value="offer">Offer</option>
          </select>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            //disabled={!actualId} // block if no job selected
            className="p-2 rounded border shadow w-64"
          />
        </div>
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-6 gap-6">
          <Column
            title="Shortlisted"
            status="shortlisted"
            applicants={getFilteredApplicants(
              applicants.shortlistedCand,
              "shortlisted"
            )}
          />
          <Column
            title="Pending"
            status="pending"
            applicants={getFilteredApplicants(
              applicants.pendingCand,
              "pending"
            )}
          />
          <Column
            title="Rejected"
            status="rejected"
            applicants={getFilteredApplicants(
              applicants.rejectedCand,
              "rejected"
            )}
          />
          <Column
            title="Screen"
            status="screen"
            applicants={getFilteredApplicants(applicants.screenCand, "screen")}
          />
          <Column
            title="Tech"
            status="tech"
            applicants={getFilteredApplicants(applicants.techCand, "tech")}
          />
          <Column
            title="Offer"
            status="offer"
            applicants={getFilteredApplicants(applicants.offerCand, "offer")}
          />
        </div>

        <DragOverlay>
          {draggedApplicant && <ApplicantCard applicant={draggedApplicant} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Applicants;
