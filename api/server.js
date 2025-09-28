import { db } from "../src/db.js";
import { createServer } from "miragejs";
import jobsData from "../src/jobs.json";
import { seedApplicants } from "../src/seedApplication.js";
import { jobAssessments } from "../src/jobAssessments.js";
import { v4 as uuidv4 } from "uuid";

export async function makeServer() {
  await db.open();
  let server = createServer({
    routes() {
      // DELETE assessment by assessmentId
      this.delete("/assessments/:assessmentId", async (schema, request) => {
        const { assessmentId } = request.params;

        // Find assessment in Dexie
        const assessmentsToDelete = await db.assessments
          .where("assessmentId")
          .equals(assessmentId)
          .toArray();

        if (assessmentsToDelete.length === 0) {
          return new Response(404, {}, { error: "Assessment not found" });
        }

        // Delete all matching entries (usually one)
        await db.assessments
          .where("assessmentId")
          .equals(assessmentId)
          .delete();

        return { assessmentId };
      });

      this.post("/assessments/created", async (schema, request) => {
        await db.open();
        const newAssessment = JSON.parse(request.requestBody);
        console.log("await db.assessments.add(assessmentWithTitle); return { assessment: assessmentWithTitle };",newAssessment)
        try {
          const jobId = newAssessment.jobId;
          console.log("jobId::::::::::",newAssessment)
          // Get all assessments for this job

          let existing = await db.assessments
            .where("jobId")
            .equals(jobId)
            .toArray();
          console.log("Exirintg::",existing)

          const jobTitle =newAssessment.title;

          const counter = existing.length + 1;

          const assessmentWithTitle = {
            ...newAssessment,
            jobId,
            title: `${jobTitle}`,
          };

          await db.assessments.add(assessmentWithTitle);

          return { assessment: assessmentWithTitle };
        } catch (err) {
          console.error(err);
          return new Response(
            500,
            { "Content-Type": "application/json" },
            { error: "Failed to create assessment" }
          );
        }
      });

      this.put("/assessments/:assessmentId", async (schema, request) => {
        const { assessmentId } = request.params;
        const updatedData = JSON.parse(request.requestBody);
        console.log(assessmentId, "hello     ");
        try {
          // Find existing assessment
          let existing = await db.assessments
            .where("assessmentId")
            .equals(assessmentId)
            .first();
          console.log(existing, "exist    ");
          if (!existing) {
            return new Response(
              404,
              { "Content-Type": "application/json" },
              { error: "Assessment not found" }
            );
          }

          // Merge updates
          const updatedAssessment = { ...existing, ...updatedData };

          // Update in DB
          await db.assessments.put(updatedAssessment);

          return { assessment: updatedAssessment };
        } catch (err) {
          return new Response(
            500,
            { "Content-Type": "application/json" },
            { error: "Failed to update assessment" }
          );
        }
      });

      this.get("/assessments", async (schema, request) => {
        let assessments = await db.assessments.toArray();

        // Seed assessments if DB is empty
        if (assessments.length === 0) {
          // Ensure jobs are seeded
          let jobs = await db.jobs.toArray();
          if (jobs.length === 0) {
            await db.jobs.bulkAdd(jobsData);
            jobs = await db.jobs.toArray();
          }

          // Seed assessments from hardcoded data
          await db.assessments.bulkAdd(jobAssessments);
          assessments = await db.assessments.toArray();
        }

        return { assessments };
      });
      this.get("/jobsAndId", async (schema, request) => {
        let jobs = await db.jobs.toArray();

        // Seed jobs if DB is empty
        if (jobs.length === 0) {
          await db.jobs.bulkAdd(jobsData);
          jobs = await db.jobs.toArray();
        }

        return { jobs };
      });
      // POST new job to Dexie with slug generation and seeding

      this.post("/jobs", async (schema, request) => {
        let jobs = await db.jobs.toArray();

        // Seed jobs if DB is empty
        if (jobs.length === 0) {
          await db.jobs.bulkAdd(jobsData);
          jobs = await db.jobs.toArray();
        }

        const attrs = JSON.parse(request.requestBody);

        // Generate slug if not provided
        let slug = attrs.slug;
        if (!slug && attrs.title) {
          slug = attrs.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

          // Ensure uniqueness
          const existingSlugs = jobs.map((j) => j.slug);
          let uniqueSlug = slug;
          let counter = 1;
          while (existingSlugs.includes(uniqueSlug)) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
          }
          slug = uniqueSlug;
        }

        // Generate UUID for this job
        

        // Add the job with jobId as UUID
        const primaryKeyid=await db.jobs.add({ ...attrs, slug });

        // Fetch the added job
        const newJob = await db.jobs.get(primaryKeyid);

        return newJob;
      });

      this.get("/applicant/:applicantId", async (schema, request) => {
        let applicants = await db.applicants.toArray();
        let jobs = await db.jobs.toArray();

        // Seed applicants if empty
        if (applicants.length === 0) {
          await seedApplicants();
          applicants = await db.applicants.toArray();
        }

        const { applicantId } = request.params;

        // Find the applicant
        const applicant = applicants.find((a) => a.id === applicantId);

        if (!applicant) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            { error: "Applicant not found" }
          );
        }

        // Map applied jobs to full details
        const appliedJobs = applicant.jobIds.map((jobId) => {
          const job = jobs.find((j) => j.id === jobId);
          return job
            ? { id: job.id, title: job.title, status: job.status }
            : { id: jobId, title: "Unknown Job", status: "unknown" };
        });

        return { ...applicant, appliedJobs };
      });

      this.patch("/applicants/:id", async (schema, request) => {
        const applicantId = request.params.id;
        const { status } = JSON.parse(request.requestBody);

        // Fetch all applicants from IndexedDB
        let applicants = await db.applicants.toArray();

        // Find the applicant to update
        const applicant = applicants.find((a) => a.id === applicantId);
        if (!applicant) {
          return new Response(404, {}, { error: "Applicant not found" });
        }

        // Update status
        await db.applicants.update(applicantId, { status });

        // Return the updated applicant
        const updatedApplicant = await db.applicants.get(applicantId);
        return { applicant: updatedApplicant };
      });

      this.get("/jobs/:jobId/applicants/:filter", async (schema, request) => {
        let applicants = await db.applicants.toArray();

        // Seed if empty
        if (applicants.length === 0) {
          await seedApplicants();
          applicants = await db.applicants.toArray(); // re-fetch after seeding
        }

        const jobId = request.params.jobId;
        console.log(jobId, typeof jobId, "In server klanmf");
        if (jobId === "-1") {
          const shortlistedCand = applicants.filter(
            (j) => j.status === "shortlisted"
          );
          const rejectedCand = applicants.filter(
            (j) => j.status === "rejected"
          );
          const pendingCand = applicants.filter((j) => j.status === "pending");
          const screenCand = applicants.filter((j) => j.status === "screen");
          const techCand = applicants.filter((j) => j.status === "tech");
          const offerCand = applicants.filter((j) => j.status === "offer");
          return {
            shortlistedCand,
            rejectedCand,
            pendingCand,
            screenCand,
            techCand,
            offerCand,
          };
        }
        const filter = request.params.filter; // get filter param

        // Only applicants for this job
        // Ensure comparison as string
        applicants = applicants.filter((applicant) =>
          applicant.jobIds.map(String).includes(String(jobId))
        );

        console.log("Applicant    ", applicants);

        // Group applicants by status
        const shortlistedCand = applicants.filter(
          (j) => j.status === "shortlisted"
        );
        const rejectedCand = applicants.filter((j) => j.status === "rejected");
        const pendingCand = applicants.filter((j) => j.status === "pending");
        const screenCand = applicants.filter((j) => j.status === "screen");
        const techCand = applicants.filter((j) => j.status === "tech");
        const offerCand = applicants.filter((j) => j.status === "offer");

        // Return based on filter
        switch (filter) {
          case "all":
            return {
              shortlistedCand,
              rejectedCand,
              pendingCand,
              screenCand,
              techCand,
              offerCand,
            };
          case "shortlisted":
            return { shortlistedCand };
          case "rejected":
            return { rejectedCand };
          case "pending":
            return { pendingCand };
          case "screen":
            return { screenCand };
          case "tech":
            return { techCand };
          case "offer":
            return { offerCand };
          default:
            // Invalid filter → return empty lists
            return {
              shortlistedCand: [],
              rejectedCand: [],
              pendingCand: [],
              screenCand: [],
              techCand: [],
              offerCand: [],
            };
        }
      });

      this.get("/jobCandidatesAssigmentCount", async () => {
        let jobs = await db.jobs.toArray();
        if (jobs.length === 0) {
          await db.jobs.bulkAdd(jobsData);
          jobs = await db.jobs.toArray();
        }
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter((j) => j.status === "active").length;
        const archivedJobs = jobs.filter((j) => j.status === "archived").length;

        let applicants = await db.applicants.toArray();
        if (applicants.length === 0) {
          await seedApplicants();
          applicants = await db.applicants.toArray(); // re-fetch after seeding
        }
        const totalCand = applicants.length;

        const shortlistedCand = applicants.filter(
          (j) => j.status === "shortlisted"
        ).length;
        const rejectedCand = applicants.filter(
          (j) => j.status === "rejected"
        ).length;
        const pendingCand = applicants.filter(
          (j) => j.status === "pending"
        ).length;

        const semanticData = {
          jobs: { totalJobs, activeJobs, archivedJobs },
          applicants: { totalCand, shortlistedCand, rejectedCand, pendingCand },
        };

        return { semanticData };
      });
      this.get("/jobs/:jobId/applicants-summary", async (schema, request) => {
        const jobId = request.params.jobId;

        // Normalize type
        const parsedJobId = Number(jobId); // or String(jobId), depending on how you save

        // Get applicants for this job
        let applicants = await db.applicants.toArray();
        applicants = applicants.filter((a) => a.jobIds.includes(parsedJobId));

        // Build counts dynamically
        const counts = applicants.reduce(
          (acc, a) => {
            acc[a.status] = (acc[a.status] || 0) + 1;
            return acc;
          },
          { total: applicants.length }
        );

        return {
          jobId: parsedJobId,
          totalApplicants: counts.total,
          rejectedApplicants: counts.rejected || 0,
          selectedApplicants: counts.shortlisted || 0,
          pendingApplicants: counts.pending || 0,
        };
      });

      this.put("/jobs/:jobId", async (schema, request) => {
        const { jobId } = request.params;
        const updatedJob = JSON.parse(request.requestBody);

        // find by jobId (not PK)
        const existing = await db.jobs.get({ jobId });

        if (existing) {
          await db.jobs.update(existing.id, updatedJob); // update by PK
          const job = await db.jobs.get(existing.id);
          return { job };
        } else {
          return new Response(404, {}, { error: "Job not found" });
        }
      });
      this.get("/jobs/:jobId", async (schema, request) => {
        let jobs = await db.jobs.toArray();
        if (jobs.length === 0) {
          await db.jobs.bulkAdd(jobsData);
          jobs = await db.jobs.toArray();
        }
        const jobId = request.params.jobId;
        const job = jobs.find((j) => j.jobId === jobId);
        if (job) return { job };
        return new Response(404, {}, { error: "Job not found" });
      });
      this.get("/allJobs", async () => {
        let jobs = await db.jobs.toArray();

        // Seed jobs if DB is empty
        if (jobs.length === 0) {
          await db.jobs.bulkAdd(jobsData);
          jobs = await db.jobs.toArray();
        }
        return { jobs };
      });
      this.get("/jobs", async (schema, request) => {
        let jobs = await db.jobs.toArray();

        // Seed jobs if DB is empty
        if (jobs.length === 0) {
          await db.jobs.bulkAdd(jobsData);
          jobs = await db.jobs.toArray();
        }
        // console.log("params", request);
        // console.log("queryParams:", request.queryParams);

        const params = request.queryParams;
        //console.log("console.log(params.search)",params.search)
        const search = params.search;
        const status = params.status || "";
        const page = params.page || "1";
        const pageSize = params.pageSize || "12";
        const sort = params.sort || "order";

        // Filter by search
        let filtered = jobs.filter((job) => {
          const matchesSearch =
            job.title
              .toLowerCase()
              .includes((search ? search : "").toLowerCase()) ||
            job.slug
              .toLowerCase()
              .includes((search ? search : "").toLowerCase());
          const matchesStatus = status ? job.status === status : true;
          return matchesSearch && matchesStatus;
        });

        // Sort
        filtered.sort((a, b) => {
          if (sort === "title") return a.title.localeCompare(b.title);
          if (sort === "createdAt")
            return new Date(a.createdAt) - new Date(b.createdAt);
          // default: order
          return a.order - b.order;
        });

        // Pagination
        const pageNum = parseInt(page);
        const size = parseInt(pageSize);
        const start = (pageNum - 1) * size;
        const pagedJobs = filtered.slice(start, start + size);

        return {
          jobs: pagedJobs,
          total: filtered.length, // total jobs after filter (for frontend pagination)
        };
      });

      // DELETE job from Dexie
      this.delete("/jobs/:jobId", async (schema, request) => {
        const jobId = request.params.jobId; // get jobId from URL
        const jobsToDelete = await db.jobs
          .where("jobId")
          .equals(jobId)
          .toArray();

        if (jobsToDelete.length === 0) {
          return new Response(404, {}, { error: "Job not found" });
        }

        // Delete all matching entries (usually one)
        await db.jobs.where("jobId").equals(jobId).delete();

        let applicants = await db.applicants.toArray();
        for (let applicant of applicants) {
          if (applicant.jobIds.includes(jobId)) {
            // Remove the deleted jobId
            const updatedJobIds = applicant.jobIds.filter((id) => id !== jobId);

            if (updatedJobIds.length === 0) {
              // No more applied jobs → delete applicant
              await db.applicants.delete(applicant.id);
            } else {
              // Update applicant with remaining jobs
              await db.applicants.update(applicant.id, {
                jobIds: updatedJobIds,
              });
            }
          }
        }

        return { jobId, message: "Job and dependent applicants updated" };
      });

      this.patch("/jobs/reorder", async (schema, request) => {
        const { newOrder } = JSON.parse(request.requestBody); // array of {id, order}

        // Update IndexedDB
        await Promise.all(
          newOrder.map(({ id, order }) => db.jobs.update(id, { order }))
        );

        return { success: true, updated: newOrder };
      });

      this.timing = 250; // simulate delay
    },
  });

  return server;
}
