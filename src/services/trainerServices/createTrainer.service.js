import Trainer from '../../model/trainer.model.js'

const createTrainerService = async (trainerData) => {
  const trainer = await Trainer.create(trainerData);

  return trainer;
};

export default createTrainerService;
