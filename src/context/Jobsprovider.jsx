import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "../jbSlice/jobSlice";

const JobsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.value);

  useEffect(() => {
    const loadJobs = async () => {
      if (!jobs || jobs.length === 0) {
        try {
          const res = await fetch("/jobs");
          const data = await res.json();
          dispatch(setJobs(data));
        } catch (err) {
          console.error("Failed to fetch jobs:", err);
        }
      }
    };
    loadJobs();
  }, [dispatch, jobs]);

  return <>{children}</>;
};

export default JobsProvider;
