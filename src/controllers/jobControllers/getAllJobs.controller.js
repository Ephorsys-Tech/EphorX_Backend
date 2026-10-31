import getAllJobs from "../../services/jobServices/getAllJob.service.js"

const getAllJobsController = async (req, res) => {
  try {
    const jobs = await getAllJobs();

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getAllJobsController;