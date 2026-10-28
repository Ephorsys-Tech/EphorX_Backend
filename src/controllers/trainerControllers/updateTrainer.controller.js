import updateTrainer from "../../services/trainerServices/updateTrainer.service.js"

const updateTrainerController = async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await updateTrainer(id, req.body);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Update trainer error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update trainer",
    });
  }
};

export default updateTrainerController;
