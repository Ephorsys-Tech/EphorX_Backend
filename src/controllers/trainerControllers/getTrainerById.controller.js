import getTrainerById from "../../services/trainerServices/getTrainerById.service.js";


const getTrainerByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await getTrainerById(id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    // Public API: only return published trainers
    if (trainer.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trainer fetched successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Get trainer by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trainer",
    });
  }
};

export default getTrainerByIdController;
