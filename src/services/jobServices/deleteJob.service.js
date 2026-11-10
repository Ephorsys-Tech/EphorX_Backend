import Job from "../../model/job.model.js";

const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};

export default deleteJob;