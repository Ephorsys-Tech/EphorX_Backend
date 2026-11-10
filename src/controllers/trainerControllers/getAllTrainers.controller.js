import getAllTrainers from "../../services/trainerServices/getAllTrainers.service.js";


const getAllTrainersController = async (req, res) => {
  try {
    const trainers = await getAllTrainers();

    return res.status(200).json({
      success: true,
      message: "Trainers fetched successfully",
      total: trainers.length,
      data: trainers,
    });
  } catch (error) {
    console.error("Get all trainers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trainers",
    });
  }
};

export default getAllTrainersController;
