import Job from "../../model/job.model.js"
const getJobById = async (id) => {
  return await Job.findById(id);
};

export default getJobById;