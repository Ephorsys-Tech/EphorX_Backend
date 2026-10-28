import deleteTrainerService from "../../services/trainerServices/deleteTrainer.service.js";

const deleteTrainerController = async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await deleteTrainerService(id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trainer deleted successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Delete trainer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete trainer",
    });
  }
};

export default deleteTrainerController;
