import Job from "../../model/job.model.js";

const updateJob = async (id, data) => {
  const updatedJob = await Job.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedJob;
};

export default updateJob;