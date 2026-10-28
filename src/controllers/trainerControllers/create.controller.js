import createTrainerService from "../../services/trainerServices/createTrainer.service.js";


const createTrainerController = async (req, res) => {
  try {
    const trainer = await createTrainerService(req.body);

    return res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Create trainer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create trainer",
    });
  }
};

export default createTrainerController;
