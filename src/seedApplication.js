import { faker } from "@faker-js/faker";
import { db } from "./db";

export async function seedApplicants() {
  const existing = await db.applicants.count();
  if (existing > 0) return; // already seeded

  const jobs = await db.jobs.toArray();
  if (jobs.length === 0) return; // no jobs yet, skip

  const applicants = [];
  for (let i = 0; i < 1017; i++) {
  const jobIds = faker.helpers.arrayElements(
    jobs.map(j => j.id), // all job IDs
    { min: 1, max: 7 }   // each applicant applies to 1–3 jobs
  );

  applicants.push({
  id: faker.string.uuid(),
  jobIds, // array of job IDs
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  resume: faker.internet.url(),
  appliedAt: faker.date.recent({ days: 90 }).toISOString(),
  status: faker.helpers.arrayElement(["pending", "shortlisted", "rejected","screen","tech","offer"]),
  order: i, // global order
  profilePhoto: faker.image.avatar(), // generates a random avatar URL
  notes:""
}
);
}
  console.log(applicants)
  await db.applicants.bulkAdd(applicants);
  console.log("Seeded 1000 applicants");
}
