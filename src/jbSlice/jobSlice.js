import { createSlice } from "@reduxjs/toolkit";
import { db } from "../db"; // Dexie instance

const initialState = { value: [] };

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.value = action.payload;
    },
    updateJobStatus: (state, action) => {
      const { jobId, status } = action.payload;
      const job = state.value.find((j) => String(j.jobId) === String(jobId));
      if (job) job.status = status;
    },
  },
});

export const { setJobs, updateJobStatus } = jobSlice.actions;

// Async helper to update Dexie
export const updateJobStatusAsync = (jobId, status) => async (dispatch) => {
  const dbJob = await db.jobs.where("jobId").equals(String(jobId)).first();
  if (dbJob) await db.jobs.update(dbJob.id, { status });
  dispatch(updateJobStatus({ jobId, status }));
};

export default jobSlice.reducer;
