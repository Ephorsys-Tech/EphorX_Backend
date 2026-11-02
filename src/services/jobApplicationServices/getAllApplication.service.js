import JobApplication from "../../model/jobApply.model.js";

const getAllJobApplications = async () => {
  return await JobApplication.find()
    .populate("jobId", "title")
    .sort({ createdAt: -1 });
};

export default getAllJobApplications;