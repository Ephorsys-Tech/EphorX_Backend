import JobApplication from "../../model/jobApply.model.js";
import Job from "../../model/job.model.js";

const updateJobApplication = async (id, data, resumePath) => {
  const updateData = {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
  };

  // Remove fields that were not provided
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  if (data.jobId) {
    const job = await Job.findById(data.jobId);

    if (!job) {
      throw new Error("Job not found");
    }

    updateData.jobId = job._id;
    updateData.jobTitle = job.title;
  }

  if (resumePath) {
    updateData.resume = resumePath;
  }

  return await JobApplication.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  ).populate("jobId", "title");
};

export default updateJobApplication;