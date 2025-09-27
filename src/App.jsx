import { useState, useEffect } from "react";
import {
  Home,
  Login,
  Layout,
  Jobs,
  Applicants,
  ApplicantsProfile,
  CreateJob,
  AssessmentBuilder,
  AllAssessments,
  AssessmentPreview,
  AssessmentEdit
} from "./pages";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import "./App.css";
import JobDetail from "./pages/jobs/JobDetail";

const App = () => {
  const jobs = useSelector((state) => state.jobs.value);
  console.log(jobs);
  const theme = useSelector((state) => state.theme.value);
  console.log(theme)
  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="min-h-screen">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/jobs"
            element={
              <ProtectedRoute>
                <Layout>
                  <Jobs />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/jobs/:jobId"
            element={
              <ProtectedRoute>
                <Layout>
                  <JobDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/jobs/:jobId/applicants/:filter"
            element={
              <ProtectedRoute>
                <Layout>
                  <Applicants />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/applicant/:applicantId"
            element={
              <ProtectedRoute>
                <Layout>
                  <ApplicantsProfile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/jobs/createJob"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateJob />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/applicants"
            element={
              <ProtectedRoute>
                <Layout>
                  <Applicants />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/:jobId/assessments/create"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssessmentBuilder />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/assessments"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllAssessments />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/assessments/:assessmentId"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssessmentPreview />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/assessments/:assessmentId/edit"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssessmentEdit />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
