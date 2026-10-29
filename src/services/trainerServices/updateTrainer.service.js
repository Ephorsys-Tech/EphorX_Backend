import Trainer from "../../model/trainer.model.js";

const updateTrainer = async (trainerId, updateData) => {
  // Find the existing trainer first
  const existingTrainer = await Trainer.findById(trainerId);

  if (!existingTrainer) {
    return null;
  }

  // Save the old avatar ID so it can be deleted after a successful update
  const previousAvatarPublicId = existingTrainer.avatarPublicId;

  // Update the trainer
  Object.assign(existingTrainer, updateData);

  const updatedTrainer = await existingTrainer.save();

  // Return the old avatar ID separately for cleanup
  return {
    ...updatedTrainer.toObject(),
    previousAvatarPublicId,
  };
};

export default updateTrainer;