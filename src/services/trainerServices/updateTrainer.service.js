import Trainer from "../../model/trainer.model.js";

const updateTrainer = async (trainerId, updateData) => {
  const trainer = await Trainer.findByIdAndUpdate(
    trainerId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return trainer;
};

export default updateTrainer;
