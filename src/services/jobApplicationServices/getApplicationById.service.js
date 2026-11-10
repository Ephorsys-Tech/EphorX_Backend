import JobApplication from "../../model/jobApply.model.js";

const getJobApplicationById = async (id) => {
  return await JobApplication.findById(id).populate("jobId", "title");
};

export default getJobApplicationById;