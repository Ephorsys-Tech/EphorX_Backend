import Trainer from "../../model/trainer.model.js";

const deleteTrainerService = async (trainerId) => {
  const trainer = await Trainer.findByIdAndDelete(trainerId);

  return trainer;
};

export default deleteTrainerService;
