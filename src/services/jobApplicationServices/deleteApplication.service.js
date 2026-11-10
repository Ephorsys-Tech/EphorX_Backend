import JobApplication from "../../model/jobApply.model.js";

const deleteJobApplication = async (id) => {
  return await JobApplication.findByIdAndDelete(id);
};

export default deleteJobApplication;