import getAllJobApplications from "../../services/jobApplicationServices/getAllApplication.service.js";

const getAllJobApplicationsController = async (req, res) => {
  try {
    const applications = await getAllJobApplications();

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getAllJobApplicationsController;