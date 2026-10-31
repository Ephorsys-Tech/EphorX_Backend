import Job from "../../model/job.model.js"

const getAllJobs = async () => {
  return await Job.find().sort({ createdAt: -1 });
};

export default getAllJobs;