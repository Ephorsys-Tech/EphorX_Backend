import Job from "../../model/job.model.js";

const createJob = async (data) => {
  const job = await Job.create({
    title: data.title,
    employmentType: data.employmentType,
    experience: data.experience,
    location: data.location,
    jobDescription: data.jobDescription,
    responsibilities: data.responsibilities,
    requirements: data.requirements,
  });

  return job;
};

export default createJob;