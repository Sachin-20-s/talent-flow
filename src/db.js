import Dexie from "dexie"
import jobsData from "./jobs.json";

export const db=new Dexie("TalentFlowDB");

db.version(1).stores({
    jobs:"++id,title,&slug,status,order,description,whoCanApply,salary,jobId",
    applicants: "++id,jobIds,order,name,email,phone,resume,appliedAt,status,notes",
    assessments: "++id,assessmentId,jobId,title,sections",
})

db.open().catch((err)=>{
    console.log("Failed to open db:",err);
})

// const seedJobs = async () => {
//   const count = await db.jobs.count();
//   if (count === 0) {
//     await db.jobs.bulkAdd(jobsData);
//     console.log("Jobs data seeded");
//   } else {
//     console.log("Jobs already exist:", count);
//   }
// };

// seedJobs();
