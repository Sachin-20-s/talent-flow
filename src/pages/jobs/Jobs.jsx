import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobsCard from "./JobsCard";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import LoadingPage from "../LoadingPage";
import { useNavigate } from "react-router-dom";
import "./jobs.css";
import axios from "axios";
import { db } from "../../db";

const Jobs = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("order");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalJobs, setTotalJobs] = useState(0);

  const sensors = useSensors(useSensor(PointerSensor));

  const toggleStatus = async ( jobId ) => {
    
    const updatedJobs = jobs.map((job) => {
      if (job.jobId === jobId) {
        return {
          ...job,
          status: job.status === "active" ? "archived" : "active",
        };
      }
      return job;
    });

    
    try {
      const dbJob = await db.jobs.where("jobId").equals(String(jobId)).first();
      console.log("okawmfkamwfkmwkf",dbJob)
      if (dbJob) {
        await db.jobs.update(dbJob.id, {
          status: updatedJobs.find((j) => j.jobId === jobId).status,
          
        });
        fetchJobs()
      }
    } catch (err) {
      console.error("Failed to update job in Dexie:", err);
      
    }
  };

  // Fetch jobs from API based on filters
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status: statusFilter === "all" ? "" : statusFilter,
        page,
        pageSize,
        sort,
      });
      console.log("params string:", params.toString());
      const res = await fetch(`/jobs?${params.toString()}`);
      const data = await res.json(); 
      console.log("type=", data.jobs);
      setJobs(data.jobs);
      setTotalJobs(data.total);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setIsLoading(false); // done loading
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [search, statusFilter, page, pageSize, sort, dispatch]);

  const onDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) return; // exit if user cancels

    try {
      const res = await axios.delete(`/jobs/${jobId}`);
      console.log("Deleted job:", res.data);
      alert("Job deleted successfully!");
      // Optional: remove from state
      fetchJobs();
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job.");
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = jobs.findIndex((j) => j.id === active.id);
    const newIndex = jobs.findIndex((j) => j.id === over.id);

    const newJobs = arrayMove(jobs, oldIndex, newIndex);
    dispatch(setJobsOrder(newJobs));

    try {
      const reordered = newJobs.map((job, index) => ({
        id: job.id,
        order: index,
      }));
      await fetch("/jobs/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newOrder: reordered }),
      });
    } catch (err) {
      console.error("Reorder failed", err);
    }
  };

  const inputClasses = `px-4 py-2 rounded border focus:outline-none ${
    theme === "dark"
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-black placeholder-gray-500"
  }`;

  const buttonClasses = (active, color) =>
    `px-4 py-2 rounded font-semibold ${
      active
        ? color
        : theme === "dark"
        ? "bg-gray-700 text-white"
        : "bg-gray-300 text-black"
    }`;

  const btnSecondary = (theme) =>
    `px-6 py-3 rounded-lg font-semibold text-lg border cursor-pointer${
      theme === "dark"
        ? "border-white hover:bg-gray-700"
        : "border-black hover:bg-gray-100"
    }`;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      } h-[90vh] flex flex-col items-center relative`}
    >
      <div className="p-8 w-full flex flex-col gap-6 flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={inputClasses}
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={`${inputClasses} border-1`}
            >
              <option value="order">Order</option>
              <option value="title">Title</option>
            </select>
            <p className="text-gray-700 dark:text-gray-500 text-sm">
              Click title for details, drag title to reorder.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/jobs/createJob")}
              className={btnSecondary(theme)}
            >
              Create Job
            </button>
            <button
              className={buttonClasses(
                statusFilter === "all",
                theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
              )}
              onClick={() => {
                setPage(1);
                setStatusFilter("all");
              }}
            >
              All
            </button>
            <button
              className={buttonClasses(
                statusFilter === "active",
                "bg-green-500 text-white"
              )}
              onClick={() => {
                setPage(1);
                setStatusFilter("active");
              }}
            >
              Active
            </button>
            <button
              className={buttonClasses(
                statusFilter === "archived",
                "bg-gray-400 text-white"
              )}
              onClick={() => {
                setPage(1);
                setStatusFilter("archived");
              }}
            >
              Archived
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <LoadingPage />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={jobs.map((j) => j.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.isArray(jobs) &&
                  jobs.map((job) => (
                    <JobsCard
                      job={job}
                      id={job.jobId}
                      key={job.jobId}
                      onDelete={onDelete}
                      toggleStatus={toggleStatus}
                    />
                  ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Pagination fixed at bottom */}
      <div
        className={`w-full flex justify-center items-center gap-4 p-4 absolute bottom-0 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-gray-700 text-white disabled:opacity-50"
              : "bg-gray-300 text-black disabled:opacity-50"
          }`}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(totalJobs / pageSize)}
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-gray-700 text-white disabled:opacity-50"
              : "bg-gray-300 text-black disabled:opacity-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
