import Trainer from "../../model/trainer.model.js";

const getTrainerById = async (trainerId) => {
  const trainer = await Trainer.findById(trainerId);

  return trainer;
};

export default getTrainerById;
