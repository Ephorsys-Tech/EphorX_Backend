import JobApplication from "../../model/jobApply.model.js";
import Job from "../../model/job.model.js";

const createJobApplication = async (data, resumePath) => {
  const job = await Job.findById(data.jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  const application = await JobApplication.create({
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    jobId: job._id,
    jobTitle: job.title,
    resume: resumePath,
  });

  return application;
};

export default createJobApplication;